const fs = require('fs');
const path = require('path');

const ROOT = 'd:/portfolio';
const imgPath = 'C:/Users/Samarpith/.gemini/antigravity/brain/f1a2deb0-8417-48c7-8e70-30b8ec72afc7/aesthetic_coder_avatar_1794910837966.jpg';

const aestheticB64 = fs.readFileSync(imgPath).toString('base64');
console.log('Aesthetic avatar base64 length:', aestheticB64.length);

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 1. Update Hero section image src
const heroImgRegex = /<img class="hero-pfp-img" src="data:image\/jpeg;base64,[^"]*"/;
if (heroImgRegex.test(html)) {
  html = html.replace(heroImgRegex, `<img class="hero-pfp-img" src="data:image/jpeg;base64,${aestheticB64}"`);
  console.log('Hero image replaced with aesthetic coder avatar!');
} else {
  console.error('ERROR: heroImgRegex did not match!');
}

// 2. Update ID Card avatar with the same pfp
const oldIdAvatarRegex = /<svg class="avatar" viewBox="0 0 120 120" role="img"[\s\S]*?<\/svg>/;
const newIdAvatarSVG = `<svg class="avatar" viewBox="0 0 120 120" role="img" aria-label="Portrait of Samarpith Menezes — Data Analyst &amp; AI/ML Builder">
                <defs><clipPath id="avclip"><circle cx="60" cy="60" r="56"/></clipPath></defs>
                <circle cx="60" cy="60" r="58" fill="var(--accent)"/>
                <circle cx="60" cy="60" r="56" fill="#0B0F19"/>
                <image href="data:image/jpeg;base64,${aestheticB64}" x="4" y="4" width="112" height="112" preserveAspectRatio="xMidYMid slice" clip-path="url(#avclip)"/>
                <circle cx="60" cy="60" r="56" fill="none" stroke="var(--accent)" stroke-width="2.5"/>
              </svg>`;

if (oldIdAvatarRegex.test(html)) {
  html = html.replace(oldIdAvatarRegex, newIdAvatarSVG);
  console.log('ID card avatar replaced with matching aesthetic coder pfp!');
} else {
  console.error('ERROR: oldIdAvatarRegex did not match!');
}

// 3. Fine-tune CSS for aesthetic coder style
const cssTarget = /\.hero-pfp-overlay\s*\{[\s\S]*?opacity:\s*0\.45;\s*\}/;
const refinedCSS = `.hero-pfp-overlay {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  background:
    radial-gradient(circle at 75% 25%, var(--accent-glow) 0%, transparent 55%),
    linear-gradient(to top, rgba(11, 15, 25, 0.45) 0%, transparent 40%);
  mix-blend-mode: screen;
  opacity: 0.35;
}`;

if (cssTarget.test(html)) {
  html = html.replace(cssTarget, refinedCSS);
  console.log('Refined overlay CSS!');
}

fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
console.log('SUCCESS! index.html saved with aesthetic coder avatar in both Hero and ID card.');
