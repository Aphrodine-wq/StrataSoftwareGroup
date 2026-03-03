/**
 * Make black (and near-black) background of logo.png transparent.
 * Run: node scripts/make-logo-transparent.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_PATH = path.join(__dirname, '..', 'public', 'logo.png');
const BLACK_THRESHOLD = 28;

async function main() {
  const { data, info } = await sharp(LOGO_PATH)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8ClampedArray(data.buffer);
  const { width, height } = info;
  const channels = 4; // RGBA

  for (let i = 0; i < width * height * channels; i += channels) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      pixels[i + 3] = 0; // Set alpha to transparent
    }
  }

  await sharp(pixels, { raw: { width, height, channels } })
    .png()
    .toFile(LOGO_PATH);

  console.log('Done: public/logo.png now has transparent background.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
