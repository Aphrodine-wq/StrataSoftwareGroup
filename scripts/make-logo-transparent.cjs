/**
 * One-time script: make black (and near-black) background of logo.png transparent.
 * Run: npm install jimp && node scripts/make-logo-transparent.cjs
 */
const Jimp = require("jimp");
const path = require("path");
const fs = require("fs");

const LOGO_PATH = path.join(__dirname, "..", "public", "logo.png");
const BLACK_THRESHOLD = 28; // Pixels with R,G,B all below this become transparent

async function main() {
  const image = await Jimp.read(LOGO_PATH);
  const w = image.bitmap.width;
  const h = image.bitmap.height;

  image.scan(0, 0, w, h, function (x, y, idx) {
    const r = this.bitmap.data[idx + 0];
    const g = this.bitmap.data[idx + 1];
    const b = this.bitmap.data[idx + 2];
    if (r <= BLACK_THRESHOLD && g <= BLACK_THRESHOLD && b <= BLACK_THRESHOLD) {
      this.bitmap.data[idx + 3] = 0;
    }
  });

  await image.writeAsync(LOGO_PATH);
  console.log("Done: public/logo.png now has transparent background.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
