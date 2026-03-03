/**
 * Copy Website Templates folder into public/website-templates so the app can serve them.
 * Run: node scripts/copy-website-templates.mjs
 * Also run before build (prebuild) so deployed site has templates.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const source = path.join(root, 'Website Templates');
const dest = path.join(root, 'public', 'website-templates');

function copyRecursive(src, dst) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dst)) {
      fs.mkdirSync(dst, { recursive: true });
    }
    for (const name of fs.readdirSync(src)) {
      const srcPath = path.join(src, name);
      const dstPath = path.join(dst, name);
      if (path.basename(srcPath) === 'docs') continue;
      copyRecursive(srcPath, dstPath);
    }
  } else {
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
  }
}

if (!fs.existsSync(source)) {
  console.error('Source not found:', source);
  process.exit(1);
}

if (fs.existsSync(dest)) {
  fs.rmSync(dest, { recursive: true });
}
fs.mkdirSync(dest, { recursive: true });
copyRecursive(source, dest);
console.log('Copied Website Templates to public/website-templates');
