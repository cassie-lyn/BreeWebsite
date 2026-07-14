/**
 * One-time (re-runnable) image prep for the Happy Horses RI site.
 *
 * What it does for each source photo in C:\Users\Cassa\Downloads\Bree:
 *   - .rotate()  -> bakes in EXIF orientation so rotated phone photos stand upright
 *   - strips metadata (sharp drops it by default when we don't call withMetadata)
 *   - resizes so the long edge is <= 2400px (never enlarges small images)
 *   - re-encodes as JPEG quality ~82 (mozjpeg)
 *   - writes to src/assets/photos/  (committed; consumed by astro:assets <Image>)
 *
 * Special cases:
 *   - Brees_Horse.jpeg is an Instagram screenshot -> crop the bottom ~13%
 *     to remove the carousel dots / UI chrome.
 *   - Generates a 1200x630 branded OpenGraph image at public/og-image.jpg
 *     from bree_riding_Dezi.jpg.
 *
 * Originals are never modified. Run with: npm run prepare-images
 */

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SRC_DIR = 'C:/Users/Cassa/Downloads/Bree';
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(projectRoot, 'src', 'assets', 'photos');
const PUBLIC_DIR = path.join(projectRoot, 'public');

const MAX_EDGE = 2400;
const QUALITY = 82;

/** source file -> output basename (in src/assets/photos) */
const JOBS = [
  { in: 'bree_riding_Dezi.jpg', out: 'bree-riding-dezi.jpg' },
  { in: 'blacknwhite_bree_cole_hemi.jpg', out: 'bree-son-horse-bw.jpg' },
  { in: 'bree_headshot.jpg', out: 'bree-headshot.jpg' },
  { in: 'BreeScotty.jpeg', out: 'bree-scotty.jpg' },
  { in: 'bree_riding_2.jpg', out: 'bree-riding-2.jpg' },
  { in: 'Brees_Horse.jpeg', out: 'brees-horse.jpg', cropBottomPct: 0.13 },
  { in: 'PEMF_SI.jpeg', out: 'pemf-si.jpg' },
  { in: 'PEMF_SI2.jpeg', out: 'pemf-si2.jpg' },
  { in: 'PEMF_Back.jpeg', out: 'pemf-back.jpg' },
  { in: 'PEMF_Shoulder.jpeg', out: 'pemf-shoulder.jpg' },
  { in: 'Scotty_PEMF_Shoulder.jpeg', out: 'scotty-pemf-shoulder.jpg' },
  { in: 'PEMF_dog.jpeg', out: 'pemf-dog.jpg' },
];

async function processOne(job) {
  const inPath = path.join(SRC_DIR, job.in);
  const outPath = path.join(OUT_DIR, job.out);

  let pipeline = sharp(inPath).rotate(); // bake EXIF orientation

  if (job.cropBottomPct) {
    // Need post-rotation dimensions to crop reliably.
    const meta = await sharp(inPath).rotate().toBuffer({ resolveWithObject: true });
    const { width, height } = meta.info;
    const keepH = Math.round(height * (1 - job.cropBottomPct));
    pipeline = sharp(meta.data).extract({ left: 0, top: 0, width, height: keepH });
  }

  const info = await pipeline
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: QUALITY, mozjpeg: true })
    .toFile(outPath);

  console.log(
    `  ${job.in.padEnd(30)} -> ${job.out.padEnd(26)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kb`,
  );
}

async function makeOgImage() {
  const src = path.join(SRC_DIR, 'bree_riding_Dezi.jpg');
  const out = path.join(PUBLIC_DIR, 'og-image.jpg');

  const W = 1200;
  const H = 630;
  const PANEL_W = 520;
  const PANEL_X = W - PANEL_W; // 680

  // The rider + horse sit on the LEFT of the source photo, so keep the full
  // width (extract a wider vertical slice, no horizontal crop) and place it on
  // the right with a soft pine seam that stops short of Bree.
  const panel = await sharp(src)
    .rotate()
    .extract({ left: 0, top: 44, width: 720, height: 872 })
    .resize({ width: PANEL_W, height: H, fit: 'cover' })
    .toBuffer();

  // Left-side text + a thin saddle rule + a soft seam over the photo's left edge.
  const textSvg = Buffer.from(`
    <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0.53" stop-color="#2E4A3B" stop-opacity="1"/>
          <stop offset="0.635" stop-color="#2E4A3B" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${W}" height="${H}" fill="url(#fade)"/>
      <rect x="80" y="470" width="70" height="5" rx="2.5" fill="#B07D4F"/>
      <text x="80" y="250" font-family="Georgia, serif" font-size="76" font-weight="700" fill="#FAF6F0">Happy Horses RI</text>
      <text x="82" y="330" font-family="Georgia, serif" font-size="34" fill="#9DB29A">MagnaWave PEMF Therapy</text>
      <text x="82" y="380" font-family="Georgia, serif" font-size="34" fill="#9DB29A">for Horses &amp; Dogs</text>
      <text x="80" y="530" font-family="Arial, sans-serif" font-size="26" letter-spacing="2" fill="#FAF6F0">MOBILE &#183; RHODE ISLAND &amp; NEARBY MA</text>
    </svg>
  `);

  const info = await sharp({
    create: { width: W, height: H, channels: 3, background: '#2E4A3B' },
  })
    .composite([
      { input: panel, left: PANEL_X, top: 0 },
      { input: textSvg, left: 0, top: 0 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(out);

  console.log(`  og-image.jpg  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kb`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(PUBLIC_DIR, { recursive: true });

  console.log('Processing photos -> src/assets/photos/');
  for (const job of JOBS) {
    await processOne(job);
  }

  console.log('Generating OpenGraph image -> public/og-image.jpg');
  await makeOgImage();

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
