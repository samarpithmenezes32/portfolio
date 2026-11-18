const fs = require('fs');
const path = require('path');

const ROOT = 'd:/portfolio';
let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

console.log('Original size:', html.length);

// 1. Update LinkedIn link to https://www.linkedin.com/in/samarpith-menezes/
html = html.replace(
  /<a class="btn" href="https:\/\/linkedin\.com\/in\/[^"]*">LinkedIn ↗<\/a>/g,
  '<a class="btn" href="https://www.linkedin.com/in/samarpith-menezes/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>'
);
// Also ensure GitHub link has target="_blank"
html = html.replace(
  /<a class="btn" href="https:\/\/github\.com\/samarpithmenezes32">GitHub ↗<\/a>/g,
  '<a class="btn" href="https://github.com/samarpithmenezes32" target="_blank" rel="noopener noreferrer">GitHub ↗</a>'
);

// 2. Add GPU compositing & smoothness CSS rules before </style>
const perfCSS = `
/* Production performance optimizations: zero jitter, 60/120fps hardware acceleration */
#cursor {
  will-change: transform;
  pointer-events: none;
  contain: layout style;
}
.disc {
  will-change: transform;
  transform-style: preserve-3d;
  backface-visibility: hidden;
}
.hero-pfp-img {
  will-change: transform;
  backface-visibility: hidden;
}
.pol {
  will-change: transform;
  backface-visibility: hidden;
  transform: translateZ(0);
}
.cert {
  will-change: transform;
  backface-visibility: hidden;
}
.btn {
  will-change: transform;
  backface-visibility: hidden;
}
.progress {
  will-change: transform;
}
/* Ensure smooth transitions without layout reflows */
html {
  scroll-behavior: smooth;
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
}
`;

html = html.replace('</style>', perfCSS + '\n</style>');

// 3. Optimize scroll and pointer interaction scripts for zero jitter
const oldScrollRegex = /\/\* scroll progress, nav highlight, timeline \*\/[\s\S]*?window\.addEventListener\('scroll', onScroll, \{ passive: true \}\);\s*window\.addEventListener\('resize', onScroll\);/;

const newScrollCode = `/* scroll progress, nav highlight, timeline (rAF throttled for 60/120fps butter-smooth scroll) */
  var progress = $('#progress');
  var tl = $('#timeline');
  var rows = $$('.row', tl);
  var scrollTicking = false;
  function updateScroll() {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.setProperty('--sp', h > 0 ? Math.min(1, window.scrollY / h) : 0);
    if (tl) {
      var r = tl.getBoundingClientRect();
      var line = window.innerHeight * 0.6;
      var p = Math.max(0, Math.min(1, (line - r.top) / (r.height || 1)));
      tl.style.setProperty('--tp', p);
      rows.forEach(function (row) {
        var b = row.getBoundingClientRect();
        row.classList.toggle('done', b.top + 14 < line);
      });
    }
    scrollTicking = false;
  }
  function onScroll() {
    if (!scrollTicking) {
      requestAnimationFrame(updateScroll);
      scrollTicking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });`;

if (oldScrollRegex.test(html)) {
  html = html.replace(oldScrollRegex, newScrollCode);
  console.log('Scroll handler upgraded with rAF decoupling!');
} else {
  console.error('ERROR: oldScrollRegex did not match!');
}

// 4. Optimize tilt, pointer tracking, and cursor code for ultra-fluid motion
const oldTiltRegex = /\/\* tilt: the hero circle and project cards lean toward the pointer \*\/[\s\S]*?document\.addEventListener\('pointerover', function \(e\) \{\s*cur\.classList\.toggle\('big', !!e\.target\.closest\('a, button, \.pol, \.cert'\)\);\s*\}\);/;

const newTiltCode = `/* tilt: rAF-debounced GPU tilt tracking without layout thrashing */
  if (fine && !reduce) {
    var disc = $('.disc');
    var discRect = null, discTicking = false, discX = 0, discY = 0;
    function cacheDiscRect() { if (disc) discRect = disc.getBoundingClientRect(); }
    cacheDiscRect();
    window.addEventListener('resize', cacheDiscRect, { passive: true });
    $('.stage').addEventListener('pointerenter', cacheDiscRect, { passive: true });
    $('.stage').addEventListener('pointermove', function (e) {
      if (!disc || !discRect) return;
      discX = (e.clientX - discRect.left) / discRect.width - .5;
      discY = (e.clientY - discRect.top) / discRect.height - .5;
      if (!discTicking) {
        requestAnimationFrame(function () {
          if (disc) disc.style.transform = 'perspective(800px) rotateY(' + (discX * 10) + 'deg) rotateX(' + (-discY * 8) + 'deg)';
          discTicking = false;
        });
        discTicking = true;
      }
    }, { passive: true });
    $('.stage').addEventListener('pointerleave', function () {
      if (disc) disc.style.transform = '';
    }, { passive: true });

    /* project cards tilt */
    var activePol = null, polRect = null, polTicking = false, polX = 0, polY = 0;
    grid.addEventListener('pointermove', function (e) {
      var c = e.target.closest('.pol');
      if (!c) {
        if (activePol) { activePol.style.transform = ''; activePol = null; polRect = null; }
        return;
      }
      if (activePol !== c) {
        if (activePol) activePol.style.transform = '';
        activePol = c;
        polRect = c.getBoundingClientRect();
      }
      if (!polRect) return;
      polX = (e.clientX - polRect.left) / polRect.width - .5;
      polY = (e.clientY - polRect.top) / polRect.height - .5;
      if (!polTicking) {
        requestAnimationFrame(function () {
          if (activePol) {
            activePol.style.transform = 'rotate(0) perspective(700px) rotateY(' + (polX * 10) + 'deg) rotateX(' + (-polY * 8) + 'deg) translateY(-8px) scale(1.02)';
          }
          polTicking = false;
        });
        polTicking = true;
      }
    }, { passive: true });
    grid.addEventListener('pointerleave', function () {
      if (activePol) { activePol.style.transform = ''; activePol = null; polRect = null; }
    }, { passive: true });

    /* services mouse glow */
    $$('.svc').forEach(function (s) {
      var sRect = null, sTicking = false, smx = 0, smy = 0;
      s.addEventListener('pointerenter', function () { sRect = s.getBoundingClientRect(); }, { passive: true });
      s.addEventListener('pointermove', function (e) {
        if (!sRect) sRect = s.getBoundingClientRect();
        smx = e.clientX - sRect.left; smy = e.clientY - sRect.top;
        if (!sTicking) {
          requestAnimationFrame(function () {
            s.style.setProperty('--mx', smx + 'px');
            s.style.setProperty('--my', smy + 'px');
            sTicking = false;
          });
          sTicking = true;
        }
      }, { passive: true });
      s.addEventListener('pointerleave', function () { sRect = null; }, { passive: true });
    });

    /* magnetic buttons */
    $$('.ctas .btn, .contact .btn').forEach(function (b) {
      var bRect = null, bTicking = false, bdx = 0, bdy = 0;
      b.addEventListener('pointerenter', function () { bRect = b.getBoundingClientRect(); }, { passive: true });
      b.addEventListener('pointermove', function (e) {
        if (!bRect) bRect = b.getBoundingClientRect();
        bdx = (e.clientX - bRect.left - bRect.width / 2) * .2;
        bdy = (e.clientY - bRect.top - bRect.height / 2) * .28 - 3;
        if (!bTicking) {
          requestAnimationFrame(function () {
            b.style.transform = 'translate3d(' + bdx + 'px,' + bdy + 'px, 0)';
            bTicking = false;
          });
          bTicking = true;
        }
      }, { passive: true });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; bRect = null; }, { passive: true });
    });

    /* cursor ring (GPU translate3d) */
    var cur = $('#cursor'), cx = 0, cy = 0, tx = 0, ty = 0, curActive = false;
    window.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (!curActive) { cur.classList.add('on'); curActive = true; }
    }, { passive: true });
    document.addEventListener('pointerleave', function () {
      cur.classList.remove('on'); curActive = false;
    }, { passive: true });
    (function follow() {
      cx += (tx - cx) * .22; cy += (ty - cy) * .22;
      cur.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px, 0)';
      requestAnimationFrame(follow);
    })();
    document.addEventListener('pointerover', function (e) {
      cur.classList.toggle('big', !!e.target.closest('a, button, .pol, .cert'));
    }, { passive: true });
  }`;

if (oldTiltRegex.test(html)) {
  html = html.replace(oldTiltRegex, newTiltCode);
  console.log('Tilt and cursor tracking upgraded with rAF GPU pipeline!');
} else {
  console.error('ERROR: oldTiltRegex did not match!');
}

// 5. Optimize confetti burst with DocumentFragment
const oldBurstRegex = /function burst\(x, y\) \{[\s\S]*?\}\s*\}\s*var heroD/;

const newBurstCode = `function burst(x, y) {
    if (reduce) return;
    var colors = ['var(--accent)', '#00E5FF', '#64FFDA', '#A78BFA', '#38BDF8', '#5EE0B0'];
    var frag = document.createDocumentFragment();
    var elems = [];
    for (var i = 0; i < 24; i++) {
      var p = document.createElement('span');
      p.className = 'confetti';
      p.style.left = x + 'px'; p.style.top = y + 'px';
      p.style.background = colors[i % colors.length];
      frag.appendChild(p);
      elems.push(p);
    }
    document.body.appendChild(frag);
    elems.forEach(function (p) {
      var a = Math.random() * Math.PI * 2, d = 90 + Math.random() * 150;
      p.animate([
        { transform: 'translate3d(0,0,0) rotate(0)', opacity: 1 },
        { transform: 'translate3d(' + (Math.cos(a) * d) + 'px,' + (Math.sin(a) * d + 120) + 'px, 0) rotate(' + (Math.random() * 720) + 'deg)', opacity: 0 }
      ], { duration: 1100 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,.3,1)' }).onfinish = function () { p.remove(); };
    });
  }
  var heroD`;

if (oldBurstRegex.test(html)) {
  html = html.replace(oldBurstRegex, newBurstCode);
  console.log('Confetti burst upgraded with DocumentFragment & translate3d!');
} else {
  console.error('ERROR: oldBurstRegex did not match!');
}

// 6. Ensure all img tags have decoding="async"
html = html.replace(/<img (?!.*?decoding=)/g, '<img decoding="async" ');

fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
console.log('SUCCESS! index.html saved. Final size:', fs.statSync(path.join(ROOT, 'index.html')).size);
