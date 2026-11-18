const fs = require('fs');
const path = require('path');

const ROOT = 'd:/portfolio';
const colorAvatarPath = 'C:/Users/Samarpith/.gemini/antigravity/brain/f1a2deb0-8417-48c7-8e70-30b8ec72afc7/hacker_avatar_vibrant_1794910624842.jpg';

const colorAvatarB64 = fs.readFileSync(colorAvatarPath).toString('base64');
console.log('Color avatar base64 length:', colorAvatarB64.length);

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// Replace the image src in .hero-pfp-img
const oldImgRegex = /<img class="hero-pfp-img" src="data:image\/jpeg;base64,[^"]*"/;
if (oldImgRegex.test(html)) {
  html = html.replace(oldImgRegex, `<img class="hero-pfp-img" src="data:image/jpeg;base64,${colorAvatarB64}"`);
  console.log('Replaced hero-pfp-img src with color avatar!');
} else {
  console.error('ERROR: oldImgRegex did not match!');
}

// Adjust CSS to let the full vibrant colors shine through without washed-out overlay
const oldOverlayCSS = `.hero-pfp-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(circle at 75% 25%, var(--accent-glow) 0%, transparent 55%),
    radial-gradient(circle at 20% 85%, var(--accent-glow) 0%, transparent 50%),
    linear-gradient(135deg, rgba(0, 229, 255, 0.16) 0%, transparent 60%);
  mix-blend-mode: screen;
  opacity: 0.92;
}`;

const newOverlayCSS = `.hero-pfp-img {
  width: 102%;
  height: 102%;
  object-fit: cover;
  object-position: center 30%;
  transition: transform .4s cubic-bezier(.2, .8, .2, 1);
}
.disc:hover .hero-pfp-img {
  transform: scale(1.05);
}
.hero-pfp-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(circle at 80% 20%, var(--accent-glow) 0%, transparent 50%),
    linear-gradient(to top, rgba(11, 15, 25, 0.35) 0%, transparent 40%);
  mix-blend-mode: screen;
  opacity: 0.45;
}`;

if (html.includes(oldOverlayCSS)) {
  html = html.replace(oldOverlayCSS, newOverlayCSS);
  console.log('Updated overlay CSS to enhance full vibrant color!');
} else {
  console.log('oldOverlayCSS exact match not found, checking regex replacement...');
  html = html.replace(/\.hero-pfp-overlay\s*\{[\s\S]*?opacity:\s*0\.92;\s*\}/, newOverlayCSS);
}

fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
console.log('SUCCESS! Updated index.html with colorful avatar.');
