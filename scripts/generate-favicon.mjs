import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Dark mode vector mark SVG
const darkSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141414" />
      <stop offset="100%" stop-color="#080808" />
    </linearGradient>
    <linearGradient id="textDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0ece1" />
    </linearGradient>
  </defs>

  <!-- Circular Outer Container -->
  <circle cx="256" cy="256" r="236" fill="url(#bgDarkGrad)" stroke="#262626" stroke-width="12" />
  
  <!-- Inset Ring -->
  <circle cx="256" cy="256" r="218" fill="none" stroke="rgba(255, 255, 255, 0.1)" stroke-width="4" />

  <!-- Initials Mark SV -->
  <g stroke="url(#textDarkGrad)" stroke-width="38" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- 'S' Path -->
    <path d="M 211,190 C 211,152 141,152 141,210 C 141,268 211,244 211,302 C 211,360 141,360 141,322" />
    <!-- 'V' Path -->
    <path d="M 261,165 L 317,347 L 373,165" />
  </g>
</svg>`;

// Light mode vector mark SVG
const lightSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bgLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fcfbfa" />
      <stop offset="100%" stop-color="#e9e5dd" />
    </linearGradient>
    <linearGradient id="textLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d0d" />
      <stop offset="100%" stop-color="#1f1f1f" />
    </linearGradient>
  </defs>

  <!-- Circular Outer Container -->
  <circle cx="256" cy="256" r="236" fill="url(#bgLightGrad)" stroke="#d4cecf" stroke-width="12" />
  
  <!-- Inset Ring -->
  <circle cx="256" cy="256" r="218" fill="none" stroke="rgba(0, 0, 0, 0.08)" stroke-width="4" />

  <!-- Initials Mark SV -->
  <g stroke="url(#textLightGrad)" stroke-width="38" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <!-- 'S' Path -->
    <path d="M 211,190 C 211,152 141,152 141,210 C 141,268 211,244 211,302 C 211,360 141,360 141,322" />
    <!-- 'V' Path -->
    <path d="M 261,165 L 317,347 L 373,165" />
  </g>
</svg>`;

// Adaptive SVG containing media queries for both Light and Dark modes
const adaptiveSvgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <style>
    :root {
      --bg-fill: url(#bgDarkGrad);
      --stroke-outer: #262626;
      --stroke-inner: rgba(255, 255, 255, 0.1);
      --text-stroke: url(#textDarkGrad);
    }
    @media (prefers-color-scheme: light) {
      :root {
        --bg-fill: url(#bgLightGrad);
        --stroke-outer: #d4cecf;
        --stroke-inner: rgba(0, 0, 0, 0.08);
        --text-stroke: url(#textLightGrad);
      }
    }
    .bg-circle { fill: var(--bg-fill); stroke: var(--stroke-outer); }
    .inner-ring { stroke: var(--stroke-inner); }
    .mark-path { stroke: var(--text-stroke); }
  </style>
  <defs>
    <linearGradient id="bgDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141414" />
      <stop offset="100%" stop-color="#080808" />
    </linearGradient>
    <linearGradient id="textDarkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#f0ece1" />
    </linearGradient>
    <linearGradient id="bgLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fcfbfa" />
      <stop offset="100%" stop-color="#e9e5dd" />
    </linearGradient>
    <linearGradient id="textLightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0d0d0d" />
      <stop offset="100%" stop-color="#1f1f1f" />
    </linearGradient>
  </defs>

  <circle class="bg-circle" cx="256" cy="256" r="236" stroke-width="12" />
  <circle class="inner-ring" cx="256" cy="256" r="218" fill="none" stroke-width="4" />

  <g class="mark-path" stroke-width="38" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M 211,190 C 211,152 141,152 141,210 C 141,268 211,244 211,302 C 211,360 141,360 141,322" />
    <path d="M 261,165 L 317,347 L 373,165" />
  </g>
</svg>`;

async function generate() {
  const publicDir = path.resolve('public');
  const appDir = path.resolve('src/app');

  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  if (!fs.existsSync(appDir)) fs.mkdirSync(appDir, { recursive: true });

  // 1. Write adaptive SVG
  fs.writeFileSync(path.join(publicDir, 'favicon.svg'), adaptiveSvgContent);
  fs.writeFileSync(path.join(publicDir, 'icon.svg'), adaptiveSvgContent);
  fs.writeFileSync(path.join(appDir, 'icon.svg'), adaptiveSvgContent);

  // 2. Write Dark & Light SVG variants
  fs.writeFileSync(path.join(publicDir, 'icon-dark.svg'), darkSvgContent);
  fs.writeFileSync(path.join(publicDir, 'icon-light.svg'), lightSvgContent);

  // 3. Render Dark PNGs
  const darkBuf = Buffer.from(darkSvgContent);
  const darkPng512 = await sharp(darkBuf).resize(512, 512).png().toBuffer();
  const darkPng192 = await sharp(darkBuf).resize(192, 192).png().toBuffer();
  const darkPng32 = await sharp(darkBuf).resize(32, 32).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon-dark-512.png'), darkPng512);
  fs.writeFileSync(path.join(publicDir, 'icon-dark-192.png'), darkPng192);
  fs.writeFileSync(path.join(publicDir, 'icon-dark-32.png'), darkPng32);
  fs.writeFileSync(path.join(publicDir, 'icon-dark.png'), darkPng32);

  // 4. Render Light PNGs
  const lightBuf = Buffer.from(lightSvgContent);
  const lightPng512 = await sharp(lightBuf).resize(512, 512).png().toBuffer();
  const lightPng192 = await sharp(lightBuf).resize(192, 192).png().toBuffer();
  const lightPng32 = await sharp(lightBuf).resize(32, 32).png().toBuffer();

  fs.writeFileSync(path.join(publicDir, 'icon-light-512.png'), lightPng512);
  fs.writeFileSync(path.join(publicDir, 'icon-light-192.png'), lightPng192);
  fs.writeFileSync(path.join(publicDir, 'icon-light-32.png'), lightPng32);
  fs.writeFileSync(path.join(publicDir, 'icon-light.png'), lightPng32);

  // 5. Default Fallbacks (32x32, Apple Touch 180x180, ICO)
  const apple180 = await sharp(darkBuf).resize(180, 180).png().toBuffer();
  fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), apple180);
  fs.writeFileSync(path.join(appDir, 'apple-icon.png'), apple180);

  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), darkPng32);
  fs.writeFileSync(path.join(publicDir, 'favicon.png'), darkPng32);
  fs.writeFileSync(path.join(publicDir, 'icon.png'), darkPng32);
  fs.writeFileSync(path.join(appDir, 'favicon.ico'), darkPng32);
  fs.writeFileSync(path.join(appDir, 'icon.png'), darkPng32);

  console.log('All adaptive Light & Dark favicons generated successfully!');
}

generate().catch(err => {
  console.error(err);
  process.exit(1);
});
