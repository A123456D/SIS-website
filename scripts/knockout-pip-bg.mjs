import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.resolve(__dirname, '../public/assets/pip');

function alphaFor(r, g, b) {
  const brightness = (r + g + b) / 3;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const saturation = max === 0 ? 0 : (max - min) / max;

  // Magenta / hot-pink key
  const isMagenta =
    r > 180 && b > 180 && g < 140 && r - g > 40 && b - g > 40;
  if (isMagenta) return 0;
  if (r > 210 && b > 210 && g < 180 && saturation > 0.15) {
    return Math.round(Math.max(0, Math.min(1, (g - 100) / 80)) * 255);
  }

  // Near-white studio
  if (brightness > 245 && saturation < 0.1) return 0;
  if (brightness > 232 && saturation < 0.08) return 0;
  if (brightness > 218 && saturation < 0.07) {
    return Math.round(((232 - brightness) / 14) * 255);
  }

  // Pale lavender fringe
  if (brightness > 205 && saturation < 0.14 && b >= r - 5 && b > g) {
    return Math.round(Math.max(0, (220 - brightness) / 18) * 255);
  }

  return 255;
}

async function processFile(file) {
  const input = path.join(dir, file);
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const a = alphaFor(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = Math.min(data[i + 3], a);
    if (data[i + 3] === 0) {
      data[i] = 0;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
  }

  // Trim transparent edges
  const buf = await sharp(data, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim({ threshold: 5 })
    .png()
    .toBuffer();

  await sharp(buf).png().toFile(input);
  console.log('processed', file);
}

// Re-copy originals if we still have them in cursor assets
const srcDir =
  'C:/Users/PC/.cursor/projects/c-Users-PC-OneDrive-Desktop-Folders-SIS-Website-SIS/assets';
for (const file of [
  'pip-idle.png',
  'pip-happy.png',
  'pip-thinking.png',
  'pip-confused.png',
  'pip-wave.png',
  'pip-listen.png',
]) {
  const from = path.join(srcDir, file);
  const to = path.join(dir, file);
  if (fs.existsSync(from)) fs.copyFileSync(from, to);
  await processFile(file);
}
