import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const idlePath = path.resolve(__dirname, '../public/assets/pip/pip-idle.png');
const outPath = path.resolve(__dirname, '../public/assets/pip/pip-idle-blink.png');

const { data, info } = await sharp(idlePath).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

const pts = [];
for (let y = 160; y < 250; y++) {
  for (let x = 190; x < 510; x++) {
    const o = (y * W + x) * 4;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    if (data[o + 3] < 220) continue;
    if (r < 95 && g > 150 && b > 165 && b + g > 2.8 * r) pts.push([x, y]);
  }
}

const leftPts = pts.filter(([x]) => x < 340);
const rightPts = pts.filter(([x]) => x >= 340);

function centroid(list) {
  let sx = 0;
  let sy = 0;
  for (const [x, y] of list) {
    sx += x;
    sy += y;
  }
  return [sx / list.length, sy / list.length];
}

function radius(list, c) {
  const ds = list.map(([x, y]) => Math.hypot(x - c[0], y - c[1])).sort((a, b) => a - b);
  return ds[Math.floor(ds.length * 0.85)] || 30;
}

const c1 = centroid(leftPts);
const c2 = centroid(rightPts);
const r1 = Math.min(radius(leftPts, c1), 42);
const r2 = Math.min(radius(rightPts, c2), 42);
console.log({ left: leftPts.length, right: rightPts.length, c1, c2, r1, r2 });

const out = Buffer.from(data);

function fillDisk(cx, cy, rad, rgba) {
  const R = Math.ceil(rad + 1);
  for (let y = Math.floor(cy - R); y <= cy + R; y++) {
    for (let x = Math.floor(cx - R); x <= cx + R; x++) {
      if (x < 0 || y < 0 || x >= W || y >= H) continue;
      if (Math.hypot(x - cx, y - cy) > rad) continue;
      const o = (y * W + x) * 4;
      out[o] = rgba[0];
      out[o + 1] = rgba[1];
      out[o + 2] = rgba[2];
      out[o + 3] = rgba[3];
    }
  }
}

fillDisk(c1[0], c1[1], r1 + 2, [6, 12, 18, 255]);
fillDisk(c2[0], c2[1], r2 + 2, [6, 12, 18, 255]);

const yLine = Math.round((c1[1] + c2[1]) / 2);
const x0 = Math.round(c1[0] - r1 * 0.5);
const x1 = Math.round(c2[0] + r2 * 0.5);
for (let x = x0; x <= x1; x++) {
  for (let dy = -2; dy <= 2; dy++) {
    const y = yLine + dy;
    const o = (y * W + x) * 4;
    const fall = 1 - Math.abs(dy) / 2.4;
    if (fall <= 0) continue;
    out[o] = Math.round(64 * fall);
    out[o + 1] = Math.round(214 * fall);
    out[o + 2] = Math.round(232 * fall);
    out[o + 3] = 255;
  }
}

await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile(outPath);
console.log('wrote', outPath);
