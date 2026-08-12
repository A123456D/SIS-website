/**
 * Properly crop Pip from the blink sheet — KEEP THE FEET.
 * Labels are wiped; character bbox is kept intact.
 */
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const source = path.resolve(__dirname, 'pip-source/pip-blink-sheet.jpg');
const outDir = path.resolve(__dirname, '../public/assets/pip');

function isNearWhite(r, g, b) {
  const bri = (r + g + b) / 3;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  return bri >= 245 && sat <= 0.12;
}

function isLabelInk(r, g, b) {
  const bri = (r + g + b) / 3;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max === 0 ? 0 : (max - min) / max;
  return bri < 60 && sat < 0.25;
}

function findGridLines(data, width, height, channels) {
  const rowScore = new Float64Array(height);
  const colScore = new Float64Array(width);
  for (let y = 0; y < height; y++) {
    let dark = 0;
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * channels;
      const bri = (data[o] + data[o + 1] + data[o + 2]) / 3;
      if (bri < 50) dark++;
    }
    rowScore[y] = dark / width;
  }
  for (let x = 0; x < width; x++) {
    let dark = 0;
    for (let y = 0; y < height; y++) {
      const o = (y * width + x) * channels;
      const bri = (data[o] + data[o + 1] + data[o + 2]) / 3;
      if (bri < 50) dark++;
    }
    colScore[x] = dark / height;
  }

  const hLines = [];
  const vLines = [];
  for (let y = 1; y < height - 1; y++) {
    if (rowScore[y] > 0.55 && rowScore[y] >= rowScore[y - 1] && rowScore[y] >= rowScore[y + 1]) {
      if (!hLines.length || y - hLines[hLines.length - 1] > 40) hLines.push(y);
    }
  }
  for (let x = 1; x < width - 1; x++) {
    if (colScore[x] > 0.55 && colScore[x] >= colScore[x - 1] && colScore[x] >= colScore[x + 1]) {
      if (!vLines.length || x - vLines[vLines.length - 1] > 40) vLines.push(x);
    }
  }
  return { hLines, vLines, rowScore, colScore };
}

function buildMask(data, width, height) {
  const n = width * height;
  const fg = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const o = i * 4;
    // Treat label ink as background seed material
    if (isLabelInk(data[o], data[o + 1], data[o + 2])) {
      fg[i] = 0;
      continue;
    }
    fg[i] = isNearWhite(data[o], data[o + 1], data[o + 2]) ? 0 : 1;
  }

  const edgeBg = new Uint8Array(n);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (fg[i] || edgeBg[i]) return;
    const o = i * 4;
    if (!isNearWhite(data[o], data[o + 1], data[o + 2]) && !isLabelInk(data[o], data[o + 1], data[o + 2])) {
      return;
    }
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

  for (let i = 0; i < n; i++) {
    if (!fg[i] && !edgeBg[i]) fg[i] = 1; // interior whites (highlights)
  }

  // Keep largest component only (Pip)
  const seen = new Uint8Array(n);
  let best = [];
  for (let i = 0; i < n; i++) {
    if (!fg[i] || seen[i]) continue;
    const q = [i];
    seen[i] = 1;
    const comp = [i];
    for (let qi = 0; qi < q.length; qi++) {
      const cur = q[qi];
      const x = cur % width;
      const y = (cur / width) | 0;
      for (const [dx, dy] of [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
        const ni = ny * width + nx;
        if (!fg[ni] || seen[ni]) continue;
        seen[ni] = 1;
        q.push(ni);
        comp.push(ni);
      }
    }
    if (comp.length > best.length) best = comp;
  }

  const keep = new Uint8Array(n);
  for (const j of best) keep[j] = 1;

  // Dilate once for anti-alias fringe
  const dil = new Uint8Array(keep);
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      if (keep[i]) continue;
      if (keep[i - 1] || keep[i + 1] || keep[i - width] || keep[i + width]) dil[i] = 1;
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
    }
  }
}

function contentBounds(data, width, height) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 20) {
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

async function extractCell(sheetData, sheetInfo, left, top, width, height, outPath) {
  const { data, info } = await sharp(sheetData, {
    raw: { width: sheetInfo.width, height: sheetInfo.height, channels: sheetInfo.channels },
  })
    .extract({ left, top, width, height })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Turn label ink white first so flood doesn't treat it as character
  for (let i = 0; i < info.width * info.height; i++) {
    const o = i * 4;
    if (isLabelInk(data[o], data[o + 1], data[o + 2])) {
      data[o] = 255;
      data[o + 1] = 255;
      data[o + 2] = 255;
    }
  }

  const mask = buildMask(data, info.width, info.height);
  applyMask(data, mask, info.width, info.height);
  const box = contentBounds(data, info.width, info.height);
  if (!box) throw new Error(`No content for ${outPath}`);

  const pad = 4;
  const crop = {
    left: Math.max(0, box.left - pad),
    top: Math.max(0, box.top - pad),
    width: Math.min(info.width - Math.max(0, box.left - pad), box.width + pad * 2),
    height: Math.min(info.height - Math.max(0, box.top - pad), box.height + pad * 2),
  };

  await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .extract(crop)
    .extend({
      top: 6,
      bottom: 10,
      left: 6,
      right: 6,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toFile(outPath);

  return crop;
}

async function main() {
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  const { hLines, vLines } = findGridLines(data, info.width, info.height, info.channels);
  console.log('hLines', hLines, 'vLines', vLines);

  // Build 3x3 cell rects from grid (or equal thirds fallback)
  const xs = [0, ...vLines, info.width];
  const ys = [0, ...hLines, info.height];
  // Deduplicate close edges
  const uniq = (arr) => {
    const out = [arr[0]];
    for (const v of arr.slice(1)) if (v - out[out.length - 1] > 20) out.push(v);
    return out;
  };
  const X = uniq(xs);
  const Y = uniq(ys);
  console.log('X', X, 'Y', Y);

  // Prefer equal thirds if grid detection incomplete
  const colBounds =
    X.length >= 4
      ? [
          [X[0], X[1]],
          [X[1], X[2]],
          [X[2], X[3]],
        ]
      : [
          [0, 268],
          [268, 538],
          [538, 806],
        ];
  const rowBounds =
    Y.length >= 4
      ? [
          [Y[0], Y[1]],
          [Y[1], Y[2]],
          [Y[2], Y[3]],
        ]
      : [
          [0, 341],
          [341, 683],
          [683, 1024],
        ];

  const inset = 3;
  let frame = 0;
  const crops = [];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      frame += 1;
      const left = colBounds[c][0] + inset;
      const top = rowBounds[r][0] + inset;
      const width = colBounds[c][1] - colBounds[c][0] - inset * 2;
      const height = rowBounds[r][1] - rowBounds[r][0] - inset * 2;
      const out = path.join(outDir, 'blink', `pip-blink-${String(frame).padStart(2, '0')}.png`);
      const crop = await extractCell(data, info, left, top, width, height, out);
      crops.push({ frame, left, top, width, height, crop });
      console.log(`frame ${frame} cell ${width}x${height} content ${crop.width}x${crop.height}`);
    }
  }

  // Hero = frame 1 (eyes open, full body)
  const heroSrc = path.join(outDir, 'blink', 'pip-blink-01.png');
  await sharp(heroSrc).png().toFile(path.join(outDir, 'pip-hero.png'));
  await sharp(heroSrc).png().toFile(path.join(outDir, 'pip-happy.png'));
  await sharp(heroSrc).png().toFile(path.join(outDir, 'pip-idle.png'));
  console.log('updated pip-hero / happy / idle from frame 1');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
