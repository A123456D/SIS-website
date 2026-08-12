/**
 * Re-register blink frames so head/face stay locked (eyes-only perceived motion).
 */
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, '../public/assets/pip/blink');

function findFace(data, width, height) {
  // Dark face screen = low brightness, mid saturation, upper half of character
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  let sumX = 0;
  let sumY = 0;
  let n = 0;
  const yMax = Math.floor(height * 0.62);
  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * 4;
      if (data[o + 3] < 40) continue;
      const bri = (data[o] + data[o + 1] + data[o + 2]) / 3;
      // Face plate is very dark; teal bezel excluded (higher g/b)
      if (bri < 55 && data[o + 1] < 70) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
        sumX += x;
        sumY += y;
        n += 1;
      }
    }
  }
  if (n < 30 || maxX < 0) return null;
  return {
    cx: sumX / n,
    cy: sumY / n,
    width: maxX - minX + 1,
    height: maxY - minY + 1,
    left: minX,
    top: minY,
  };
}

async function loadFrame(i) {
  const file = path.join(outDir, `pip-blink-${String(i).padStart(2, '0')}.png`);
  const { data, info } = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  return { data, info, file };
}

async function main() {
  const frames = [];
  for (let i = 1; i <= 9; i++) frames.push(await loadFrame(i));

  const faces = frames.map((f) => findFace(f.data, f.info.width, f.info.height));
  if (faces.some((f) => !f)) {
    throw new Error('Could not locate face on a blink frame');
  }

  const ref = faces[0];
  const canvasW = frames[0].info.width;
  const canvasH = frames[0].info.height;
  console.log('ref face', ref);

  for (let i = 0; i < frames.length; i++) {
    const face = faces[i];
    const scale = ref.width / face.width;
    const f = frames[i];

    // Scale whole frame around face, then translate so face centers match
    const scaledW = Math.round(f.info.width * scale);
    const scaledH = Math.round(f.info.height * scale);
    const scaled = await sharp(f.data, {
      raw: { width: f.info.width, height: f.info.height, channels: 4 },
    })
      .resize(scaledW, scaledH)
      .png()
      .toBuffer();

    const scaledFaceCx = face.cx * scale;
    const scaledFaceCy = face.cy * scale;
    const left = Math.round(ref.cx - scaledFaceCx);
    const top = Math.round(ref.cy - scaledFaceCy);

    const out = path.join(outDir, `pip-blink-${String(i + 1).padStart(2, '0')}.png`);
    await sharp({
      create: {
        width: canvasW,
        height: canvasH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([{ input: scaled, left, top }])
      .png()
      .toFile(out);

    console.log(`aligned ${i + 1} scale=${scale.toFixed(3)} left=${left} top=${top}`);
  }

  // Remove preview from public if present
  const preview = path.join(outDir, '_preview-strip.png');
  if (fs.existsSync(preview)) fs.unlinkSync(preview);
  console.log('done');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
