/**
 * Slice Pip blink sprite sheet → transparent PNG frames.
 * Mask = non-white content + fill interior holes (keeps white plastic).
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/assets/pip/blink');
const source = path.resolve(__dirname, 'pip-source/pip-blink-sheet.jpg');

const COLS = 3;
const ROWS = 3;
const CELL_W = 268;
const CELL_H = 341;

function isNearWhite(r, g, b) {
  const brightness = (r + g + b) / 3;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  return brightness >= 247 && sat <= 0.1;
}

/** Build foreground mask; fill holes not connected to edges. */
function buildMask(data, width, height) {
  const n = width * height;
  const fg = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    const o = i * 4;
    fg[i] = isNearWhite(data[o], data[o + 1], data[o + 2]) ? 0 : 1;
  }

  // Mark background components connected to edges
  const edgeBg = new Uint8Array(n);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (fg[i] || edgeBg[i]) return;
    edgeBg[i] = 1;
    stack.push(i);
  };
  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % width;
    const y = (i / width) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // Interior near-white (specular) → foreground
  for (let i = 0; i < n; i++) {
    if (!fg[i] && !edgeBg[i]) fg[i] = 1;
  }

  // Remove small isolated speckles (label crumbs): keep only large components
  const seen = new Uint8Array(n);
  const keep = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    if (!fg[i] || seen[i]) continue;
    const q = [i];
    seen[i] = 1;
    const comp = [i];
    for (let qi = 0; qi < q.length; qi++) {
      const cur = q[qi];
      const x = cur % width;
      const y = (cur / width) | 0;
      const neigh = [cur + 1, cur - 1, cur + width, cur - width];
      const coords = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ];
      for (let k = 0; k < 4; k++) {
        const nx = coords[k][0];
        const ny = coords[k][1];
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const ni = ny * width + nx;
        if (!fg[ni] || seen[ni]) continue;
        seen[ni] = 1;
        q.push(ni);
        comp.push(ni);
      }
    }
    // Pip is large; drop tiny blobs (text fragments)
    if (comp.length >= 800) {
      for (const j of comp) keep[j] = 1;
    }
  }

  // Light dilate to cover anti-aliased fringe, then erode once for tightness
  const dil = new Uint8Array(keep);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      if (keep[i]) continue;
      if (
        keep[i - 1] ||
        keep[i + 1] ||
        keep[i - width] ||
        keep[i + width] ||
        keep[i - width - 1] ||
        keep[i - width + 1] ||
        keep[i + width - 1] ||
        keep[i + width + 1]
      ) {
        dil[i] = 1;
      }
    }
  }

  return dil;
}

function applyMask(data, mask, width, height) {
  for (let i = 0; i < width * height; i++) {
    const o = i * 4;
    if (!mask[i]) {
      data[o] = 0;
      data[o + 1] = 0;
      data[o + 2] = 0;
      data[o + 3] = 0;
      continue;
    }
    // Soften only if neighbor is transparent and pixel is pale
    const x = i % width;
    const y = (i / width) | 0;
    let border = false;
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= width || ny >= height) {
        border = true;
        break;
      }
      if (!mask[ny * width + nx]) {
        border = true;
        break;
      }
    }
    if (border) {
      const brightness = (data[o] + data[o + 1] + data[o + 2]) / 3;
      if (brightness > 230) {
        data[o + 3] = Math.min(data[o + 3], Math.round(((250 - brightness) / 20) * 255));
      }
    }
  }
}

function contentBounds(data, width, height, alphaThreshold = 16) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > alphaThreshold) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX < 0) return null;
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

function cellRect(row, col) {
  // Labels bleed under each row into the next; cut top/bottom bands on every cell.
  const topInset = Math.floor(CELL_H * (row === 0 ? 0.02 : 0.15));
  const bottom = row * CELL_H + Math.floor(CELL_H * 0.84);
  const top = row * CELL_H + topInset;
  const left = col * CELL_W + 8;
  const maxRight = col === COLS - 1 ? 806 : (col + 1) * CELL_W - 8;
  const width = Math.min(CELL_W - 16, maxRight - left);
  const height = bottom - top;
  return { left, top, width, height };
}

async function main() {
  fs.mkdirSync(outDir, { recursive: true });

  // Clean previous QA dumps
  for (const f of fs.readdirSync(outDir)) {
    if (f.startsWith('raw-') || f.startsWith('tight-')) {
      fs.unlinkSync(path.join(outDir, f));
    }
  }

  const frames = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const index = row * COLS + col;
      const rect = cellRect(row, col);
      const { data, info } = await sharp(source)
        .extract(rect)
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true });

      const mask = buildMask(data, info.width, info.height);
      applyMask(data, mask, info.width, info.height);

      const box = contentBounds(data, info.width, info.height);
      if (!box) throw new Error(`No content in frame ${index + 1}`);

      const pad = 2;
      const crop = {
        left: Math.max(0, box.left - pad),
        top: Math.max(0, box.top - pad),
        width: Math.min(info.width - Math.max(0, box.left - pad), box.width + pad * 2),
        height: Math.min(info.height - Math.max(0, box.top - pad), box.height + pad * 2),
      };

      frames.push({ index, data: Buffer.from(data), info, crop });
      console.log(`frame ${String(index + 1).padStart(2, '0')} ${crop.width}x${crop.height}`);
    }
  }

  let maxW = 0;
  let maxH = 0;
  for (const f of frames) {
    maxW = Math.max(maxW, f.crop.width);
    maxH = Math.max(maxH, f.crop.height);
  }
  maxW = Math.ceil(maxW / 2) * 2;
  maxH = Math.ceil(maxH / 2) * 2 + 4; // small slack for rounding
  console.log(`canvas ${maxW}x${maxH}`);

  for (const f of frames) {
    // Normalize by fitting inside canvas; top-align so the head/eyes don't jump.
    const scaled = await sharp(f.data, {
      raw: { width: f.info.width, height: f.info.height, channels: 4 },
    })
      .extract(f.crop)
      .resize({
        width: maxW,
        height: maxH,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .png()
      .toBuffer();

    const scaledMeta = await sharp(scaled).metadata();
    const left = Math.max(0, Math.round((maxW - scaledMeta.width) / 2));
    const top = 0;

    const outName = `pip-blink-${String(f.index + 1).padStart(2, '0')}.png`;
    await sharp({
      create: {
        width: maxW,
        height: maxH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: scaled, left, top }])
      .png()
      .toFile(path.join(outDir, outName));
    console.log('wrote', outName, `${scaledMeta.width}x${scaledMeta.height}`);
  }

  await sharp({
    create: {
      width: maxW * COLS,
      height: maxH * ROWS,
      channels: 4,
      background: { r: 36, g: 40, b: 46, alpha: 1 },
    },
  })
    .composite(
      frames.map((f) => ({
        input: path.join(outDir, `pip-blink-${String(f.index + 1).padStart(2, '0')}.png`),
        left: (f.index % COLS) * maxW,
        top: Math.floor(f.index / COLS) * maxH,
      })),
    )
    .png()
    .toFile(path.join(outDir, '_preview-strip.png'));

  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
