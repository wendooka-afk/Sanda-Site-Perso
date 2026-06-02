// One-shot: rename public images to clean ASCII slugs + rewrite all refs.
// Fixes production 404s caused by spaces/accents/trailing-spaces in filenames.
// Run: node rename-images.mjs  (safe to delete after)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pub = path.join(__dirname, 'public');

// old filename -> new clean filename
const renameMap = {
  'Couverture livre si lafrique rate lia elle rate le futur .webp': 'livre-afrique-ia.webp',
  'Le Cerveau Augmenté .webp': 'cerveau-augmente.webp',
  'logo Sanda.webp': 'logo-sanda.webp',
  'Mockup livre.webp': 'mockup-livre.webp',
  'OFFSHORE EMPIRE BOX.webp': 'offshore-empire-box.webp',
  'Oumarou Sanda 1.webp': 'oumarou-sanda-1.webp',
  'Oumarou Sanda 10 .webp': 'oumarou-sanda-10.webp',
  'Oumarou Sanda 11 .webp': 'oumarou-sanda-11.webp',
  'Oumarou Sanda 12 .webp': 'oumarou-sanda-12.webp',
  'Oumarou Sanda 13.webp': 'oumarou-sanda-13.webp',
  'Oumarou Sanda 14 .webp': 'oumarou-sanda-14.webp',
  'Oumarou Sanda 15 .webp': 'oumarou-sanda-15.webp',
  'Oumarou Sanda 16 .webp': 'oumarou-sanda-16.webp',
  'Oumarou Sanda 17 .webp': 'oumarou-sanda-17.webp',
  'Oumarou Sanda 2.webp': 'oumarou-sanda-2.webp',
  'Oumarou Sanda 3.webp': 'oumarou-sanda-3.webp',
  'Oumarou Sanda 4.webp': 'oumarou-sanda-4.webp',
  'Oumarou Sanda 5.webp': 'oumarou-sanda-5.webp',
  'Oumarou Sanda 7 .webp': 'oumarou-sanda-7.webp',
  'Oumarou Sanda 8.webp': 'oumarou-sanda-8.webp',
  'Oumarou Sanda 9 .webp': 'oumarou-sanda-9.webp',
  'Oumarou Sanda homepage about section.webp': 'oumarou-sanda-about.webp',
  'Oumarou Sanda Homepage hero .webp': 'oumarou-sanda-hero.webp',
  'Oumarou Sanda6.webp': 'oumarou-sanda-6.webp',
};

// reference-only rewrites (file already missing) -> point to a real image
const refOnly = { 'SANDA.webp': 'oumarou-sanda-1.webp' };

// 1) rename files
let renamed = 0;
for (const [oldN, newN] of Object.entries(renameMap)) {
  const src = path.join(pub, oldN);
  const dst = path.join(pub, newN);
  if (fs.existsSync(src)) {
    fs.renameSync(src, dst);
    renamed++;
  } else if (!fs.existsSync(dst)) {
    console.warn('!! missing source, no dst:', oldN);
  }
}
console.log(`Renamed ${renamed}/${Object.keys(renameMap).length} files.`);

// 2) gather text files to rewrite
const exts = new Set(['.ts', '.tsx', '.html', '.mjs', '.json', '.xml', '.css']);
function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === 'dist' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (exts.has(path.extname(e.name))) acc.push(p);
  }
  return acc;
}
const files = walk(path.join(__dirname, 'src'));
for (const extra of ['index.html', 'prerender.mjs', path.join('public', 'manifest.json'), path.join('public', 'sitemap.xml')]) {
  const p = path.join(__dirname, extra);
  if (fs.existsSync(p)) files.push(p);
}

const allMap = { ...renameMap, ...refOnly };
let edits = 0;
const touched = [];
for (const f of files) {
  let c = fs.readFileSync(f, 'utf8');
  const before = c;
  for (const [oldN, newN] of Object.entries(allMap)) {
    // raw form
    c = c.split(oldN).join(newN);
    // URL-encoded form (spaces -> %20, accents -> %C3..)
    const enc = encodeURI(oldN);
    if (enc !== oldN) c = c.split(enc).join(newN);
  }
  if (c !== before) {
    fs.writeFileSync(f, c, 'utf8');
    edits++;
    touched.push(path.relative(__dirname, f));
  }
}
console.log(`Rewrote refs in ${edits} files:`);
touched.forEach((t) => console.log('  -', t));

// 3) leftover scan: any .webp ref still containing space, %20, accent, or uppercase
const leftovers = [];
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const re = /[^\s"'`()]*\.webp/g;
  let m;
  while ((m = re.exec(c))) {
    const ref = m[0];
    if (/%20|%C3|[A-Z]/.test(ref) || / /.test(ref)) {
      leftovers.push(`${path.relative(__dirname, f)}: ${ref}`);
    }
  }
}
// also scan raw with spaces (regex above won't catch spaces inside)
for (const f of files) {
  const c = fs.readFileSync(f, 'utf8');
  const re2 = /["'`(][^"'`()\n]*\.webp/g;
  let m;
  while ((m = re2.exec(c))) {
    const ref = m[0].slice(1);
    if (/ |%20|%C3|[A-Z]/.test(ref) && !leftovers.some((l) => l.endsWith(ref))) {
      leftovers.push(`${path.relative(__dirname, f)}: ${ref}`);
    }
  }
}
console.log(leftovers.length ? `\n⚠️ ${leftovers.length} leftover refs:` : '\n✓ No leftover problematic .webp refs.');
leftovers.forEach((l) => console.log('  -', l));
