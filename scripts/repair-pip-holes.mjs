/**
 * Repair interior holes in Pip PNGs caused by aggressive background knockout.
 * Keeps edge transparency; fills holes that aren't connected to the border.
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '../public/assets/pip');

const FILES = [
  'pip-idle.png',
  'pip-happy.png',
  'pip-wave.png',
  'pip-thinking.png',
  'pip-confused.png',
  'pip-listen.png',
];

function repair(data, width, height) {
  const n = width * height;
  const opaque = new Uint8Array(n);
  for (let i = 0; i < n; i++) opaque[i] = data[i * 4 + 3] > 24 ? 1 : 0;

  // Edge-connected transparent = real background
  const edgeClear = new Uint8Array(n);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const i = y * width + x;
    if (opaque[i] || edgeClear[i]) return;
    edgeClear[i] = 1;
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

  // Interior holes → inpaint from nearest opaque neighbor
  let filled = 0;
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const i = y * width + x;
      if (opaque[i] || edgeClear[i]) continue;

      let best = null;
      let bestD = 1e9;
      const R = 14;
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue;
          const ni = ny * width + nx;
          if (!opaque[ni]) continue;
          const d = dx * dx + dy * dy;
          if (d < bestD) {
            bestD = d;
            best = ni * 4;
          }
        }
      }
      if (best == null) continue;
      const o = i * 4;
      data[o] = data[best];
      data[o + 1] = data[best + 1];
      data[o + 2] = data[best + 2];
      data[o + 3] = 255;
      opaque[i] = 1;
      filled += 1;
    }
  }
  return filled;
}

async function processFile(file) {
  const input = path.join(dir, file);
  if (!fs.existsSync(input)) {
    console.log('skip missing', file);
    return;
  }
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const filled = repair(data, info.width, info.height);
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(input);
  console.log(file, 'filled', filled, 'holes');
}

for (const file of FILES) {
  await processFile(file);
}
