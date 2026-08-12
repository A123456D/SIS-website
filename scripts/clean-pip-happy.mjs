/**
 * Fast clean of dark splotches on Pip happy (main FAB art).
 */
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const file = path.resolve(__dirname, '../public/assets/pip/pip-happy.png');

const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const out = Buffer.from(data);

// Protect face screen: dark blob in upper-middle
const protect = new Uint8Array(W * H);
const qx = [];
for (let y = (H * 0.1) | 0; y < (H * 0.4) | 0; y++) {
  for (let x = (W * 0.3) | 0; x < (W * 0.7) | 0; x++) {
    const i = y * W + x;
    const o = i * 4;
    if (data[o + 3] > 200 && (data[o] + data[o + 1] + data[o + 2]) / 3 < 40) {
      protect[i] = 1;
      qx.push(i);
    }
  }
}
for (let qi = 0; qi < qx.length; qi++) {
  const i = qx[qi];
  const x = i % W;
  const y = (i / W) | 0;
  for (const [dx, dy] of [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ]) {
    const nx = x + dx;
    const ny = y + dy;
    if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
    const ni = ny * W + nx;
    if (protect[ni]) continue;
    const o = ni * 4;
    if (data[o + 3] < 180) continue;
    if ((data[o] + data[o + 1] + data[o + 2]) / 3 < 75) {
      protect[ni] = 1;
      qx.push(ni);
    }
  }
}

let fixed = 0;
for (let pass = 0; pass < 3; pass++) {
  for (let y = 2; y < H - 2; y++) {
    for (let x = 2; x < W - 2; x++) {
      const i = y * W + x;
      if (protect[i]) continue;
      const o = i * 4;
      if (out[o + 3] < 40) continue;
      const bri = (out[o] + out[o + 1] + out[o + 2]) / 3;
      if (bri > 125) continue;

      let br = 0;
      let bg = 0;
      let bb = 0;
      let bn = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          if (!dx && !dy) continue;
          const no = ((y + dy) * W + (x + dx)) * 4;
          if (out[no + 3] < 40) continue;
          const nb = (out[no] + out[no + 1] + out[no + 2]) / 3;
          if (nb > 160) {
            br += out[no];
            bg += out[no + 1];
            bb += out[no + 2];
            bn += 1;
          }
        }
      }
      if (bn < 6) continue;
      out[o] = (br / bn) | 0;
      out[o + 1] = (bg / bn) | 0;
      out[o + 2] = (bb / bn) | 0;
      out[o + 3] = 255;
      fixed += 1;
    }
  }
}

await sharp(out, { raw: { width: W, height: H, channels: 4 } }).png().toFile(file);
console.log('pip-happy cleaned pixels:', fixed);
