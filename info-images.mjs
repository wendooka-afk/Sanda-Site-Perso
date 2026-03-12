import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = './public';
const files = fs.readdirSync(dir).filter(f => f.match(/^Oumarou Sanda.*\.webp$/));

async function run() {
  for (const f of files) {
    const p = path.join(dir, f);
    const meta = await sharp(p).metadata();
    console.log(`${f} - ${meta.width}x${meta.height}`);
  }
}
run();
