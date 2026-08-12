/**
 * Aggressively inpaint dark splotch artifacts on Pip’s white body.
 * Protects the intentional dark face screen.
 */
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

function markFaceScreen(data, width, height) {
  const protectedPix = new Uint8Array(width * height);
  // Seed: very dark pixels in upper-middle face band
  const seeds = [];
  for (let y = Math.floor(height * 0.08); y < Math.floor(height * 0.42); y++) {
    for (let x = Math.floor(width * 0.28); x < Math.floor(width * 0.72); x++) {
      const o = (y * width + x) * 4;
      if (data[o + 3] < 200) continue;
      const bri = (data[o] + data[o + 1] + data[o + 2]) / 3;
      if (bri < 35) seeds.push(y * width + x);
    }
  }
  const stack = [...seeds];
  for (const i of seeds) protectedPix[i] = 1;
  while (stack.length) {
    const i = stack.pop();
    const x = i % width;
    const y = (i / width) | 0;
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
      if (protectedPix[ni]) continue;
      const o = ni * 4;
      if (data[o + 3] < 180) continue;
      const bri = (data[o] + data[o + 1] + data[o + 2]) / 3;
      // Grow into dark screen / near-black face
      if (bri < 70) {
        protectedPix[ni] = 1;
        stack.push(ni);
      }
    }
  }
  return protectedPix;
}

function cleanPass(data, width, height, protectedPix) {
  const out = Buffer.from(data);
  let fixed = 0;
  for (let y = 3; y < height - 3; y++) {
    for (let x = 3; x < width - 3; x++) {
      const idx = y * width + x;
      if (protectedPix[idx]) continue;
      const i = idx * 4;
      if (data[i + 3] < 30) continue;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const bri = (r + g + b) / 3;
      if (bri > 130) continue;

      let brightN = 0;
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let n = 0;
      for (let dy = -4; dy <= 4; dy++) {
        for (let dx = -4; dx <= 4; dx++) {
          if (!dx && !dy) continue;
          const ni = (y + dy) * width + (x + dx);
          const o = ni * 4;
          if (data[o + 3] < 30) continue;
          if (protectedPix[ni]) continue;
          n += 1;
          const nb = (data[o] + data[o + 1] + data[o + 2]) / 3;
          if (nb > 155) {
            brightN += 1;
            sumR += data[o];
            sumG += data[o + 1];
            sumB += data[o + 2];
          }
        }
      }
      if (n < 10 || brightN / n < 0.35) continue;

      const c = brightN;
      out[i] = Math.round(sumR / c);
      out[i + 1] = Math.round(sumG / c);
      out[i + 2] = Math.round(sumB / c);
      out[i + 3] = 255;
      fixed += 1;
    }
  }
  out.copy(data);
  return fixed;
}

async function processFile(file) {
  const input = path.join(dir, file);
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const protectedPix = markFaceScreen(data, info.width, info.height);
  let total = 0;
  for (let p = 0; p < 4; p++) {
    total += cleanPass(data, info.width, info.height, protectedPix);
  }
  await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toFile(input);
  console.log(file, 'inpainted', total);
}

for (const file of FILES) {
  await processFile(file);
}
