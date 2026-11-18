const fs = require('fs');
const path = require('path');

const ROOT = 'd:/portfolio';
const BRAIN = 'C:/Users/Samarpith/.gemini/antigravity/brain/f1a2deb0-8417-48c7-8e70-30b8ec72afc7';

// 1. Read and encode images
console.log('Reading and encoding images...');
const pfpB64 = fs.readFileSync(path.join(BRAIN, '.user_uploaded/media_1794910051289_01fdd63d.jpg')).toString('base64');
const deepfakeB64 = fs.readFileSync(path.join(BRAIN, '.user_uploaded/media_1794908890613_270a7c44.jpg')).toString('base64');
const contextiqB64 = fs.readFileSync(path.join(BRAIN, 'contextiq_rag_pipeline_dashboard_1794909503462.jpg')).toString('base64');
const churnB64 = fs.readFileSync(path.join(BRAIN, 'sales_customer_analytics_dashboard_1794909496925.jpg')).toString('base64');

console.log('Image lengths:');
console.log('  Hero avatar:', pfpB64.length);
console.log('  Deepfake:', deepfakeB64.length);
console.log('  ContextIQ:', contextiqB64.length);
console.log('  ChurnLens:', churnB64.length);

let html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

// 2. Add new CSS for hero avatar & modal points
const newCSS = `
/* Theme-matching hero circular profile avatar */
.circle {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 60% 35%, var(--accent-glow) 0%, rgba(11, 15, 25, 0.95) 75%), var(--accent);
  border: 3.5px solid var(--accent);
  box-shadow: 0 0 35px var(--accent-glow), 0 0 70px rgba(0, 229, 255, 0.22), inset 0 0 30px rgba(0, 0, 0, 0.85);
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transition: border-color .3s, box-shadow .3s;
}
.hero-pfp-box {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-pfp-img {
  width: 105%;
  height: 105%;
  object-fit: cover;
  object-position: center 25%;
  filter: contrast(1.15) brightness(1.06);
  transition: transform .4s cubic-bezier(.2, .8, .2, 1), filter .3s;
}
.disc:hover .hero-pfp-img {
  transform: scale(1.06);
  filter: contrast(1.2) brightness(1.1);
}
.hero-pfp-overlay {
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
}
.hero-pfp-scanlines {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  pointer-events: none;
  background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.28) 50%);
  background-size: 100% 4px;
  opacity: 0.35;
}
/* Modal improvements for bullet points and year badge */
.dlg-header { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-top: 14px; flex-wrap: wrap; }
.dlg-yr .badge { display: inline-block; font-size: .78rem; font-weight: 700; padding: 3px 12px; border-radius: 999px; background: rgba(0, 229, 255, 0.12); color: var(--accent); border: 1.5px solid var(--accent); }
.dlg-points { margin: 14px 0 16px 22px; line-height: 1.65; color: var(--muted); text-align: left; font-size: .92rem; }
.dlg-points li { margin-bottom: 10px; }
.dlg-points li::marker { color: var(--accent); }
`;

// Insert new CSS right before </style>
html = html.replace('</style>', newCSS + '\n</style>');

// 3. Replace the hero circle inside .disc
const oldHeroRegex = /<div class="circle"><\/div>\s*<span class="ring r1"><\/span><span class="ring r2"><\/span>\s*<svg class="person"[\s\S]*?<\/svg>/;

const newHeroHTML = `<div class="circle" role="button" aria-label="Samarpith Menezes profile avatar - click for confetti">
          <div class="hero-pfp-box">
            <img class="hero-pfp-img" src="data:image/jpeg;base64,${pfpB64}" alt="Samarpith Menezes — Data Analyst &amp; AI/ML Builder">
            <div class="hero-pfp-overlay"></div>
            <div class="hero-pfp-scanlines"></div>
          </div>
        </div>
        <span class="ring r1"></span><span class="ring r2"></span>
        <svg class="person" viewBox="0 0 380 340" role="img" aria-label="Interactive floating holo dashboard cards" style="pointer-events: none;">
          <!-- floating dashboard cards -->
          <g class="holo">
            <rect x="206" y="22" width="96" height="64" rx="10" fill="#FFFFFF"/>
            <rect x="216" y="32" width="38" height="6" rx="3" fill="#24252A"/>
            <rect class="bar" style="--i:0" x="218" y="58" width="10" height="20" rx="3" fill="var(--accent)"/>
            <rect class="bar" style="--i:1" x="234" y="48" width="10" height="30" rx="3" fill="#24252A"/>
            <rect class="bar" style="--i:2" x="250" y="54" width="10" height="24" rx="3" fill="var(--accent)"/>
            <rect class="bar" style="--i:3" x="266" y="44" width="10" height="34" rx="3" fill="#24252A"/>
            <rect class="bar" style="--i:4" x="282" y="52" width="10" height="26" rx="3" fill="var(--accent)"/>
          </g>
          <g class="holo h2">
            <rect x="312" y="54" width="62" height="56" rx="10" fill="#FFFFFF"/>
            <circle cx="343" cy="82" r="14" fill="none" stroke="#E3E4E8" stroke-width="6"/>
            <circle class="spin" cx="343" cy="82" r="14" fill="none" stroke="var(--accent)" stroke-width="6" stroke-dasharray="52 100" stroke-linecap="round"/>
          </g>
          <g class="holo h3">
            <rect x="170" y="2" width="30" height="22" rx="6" fill="#24252A"/>
            <path class="draw" pathLength="160" d="M176 18 L183 11 L189 15 L195 7" fill="none" stroke="#F6C453" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <path class="spark" d="M356 28 l4 10 10 4 -10 4 -4 10 -4 -10 -10 -4 10 -4 z" fill="#FFFFFF"/>
          <path class="spark" style="animation-delay:-1.2s" d="M24 70 l3 7 7 3 -7 3 -3 7 -3 -7 -7 -3 7 -3 z" fill="#FFFFFF"/>
        </svg>`;

if (oldHeroRegex.test(html)) {
  html = html.replace(oldHeroRegex, newHeroHTML);
  console.log('Replaced hero circle with manga avatar & floating holo elements!');
} else {
  console.error('ERROR: oldHeroRegex did not match!');
}

// 4. Update the IMG object
const newImgObject = `var IMG = {
    "churn-1": "data:image/jpeg;base64,${churnB64}",
    "contextiq-1": "data:image/jpeg;base64,${contextiqB64}",
    "deepfake-1": "data:image/jpeg;base64,${deepfakeB64}"
  };`;

html = html.replace(/var IMG = \{[\s\S]*?\};/, newImgObject);
console.log('Updated IMG object with new project images!');

// 5. Update the projects array and modal handler
const oldProjectsRegex = /\/\* projects \*\/[\s\S]*?dlg\.addEventListener\('click', function \(e\) \{ if \(e\.target === dlg\) dlg\.close\(\); \}\);/;

const newProjectsCode = `/* projects */
  var gh = 'https://github.com/samarpithmenezes32';
  var projects = [
    {
      t: 'ChurnLens — Customer Retention Analysis',
      yr: '2026',
      tags: ['Python', 'SQL', 'Scikit-Learn', 'Cohort Analysis', 'Tableau'],
      v: 'v1', a: '#00E5FF', b: '#00897B',
      href: gh,
      cta: 'Source code ↗',
      points: [
        'Analysed 50,000 customer records in Python to work out why people were leaving. Cleaned the raw export, handled missing values, engineered features around usage frequency and support contact history, then ran cohort analysis by signup month.',
        'Found that customers who raised more than two support tickets in their first 30 days churned at roughly three times the base rate. Built a Scikit-learn classification model on top of the analysis reaching 87% recall on the churn class, which mattered more than overall accuracy for this use case.',
        'Wrote the SQL queries and Python reporting script that refreshed the dashboard daily, with null checks and row-count assertions so a broken upstream feed showed up immediately instead of silently producing wrong numbers.'
      ],
      imgs: [['churn-1', 'ChurnLens Retention Dashboard: 50,000 customer records, cohort churn curves, ticket frequency impact, and daily KPI tracking.']]
    },
    {
      t: 'ContextIQ — Document Data Pipeline with Natural Language Querying',
      yr: '2026',
      tags: ['Python', 'FastAPI', 'Pinecone', 'LangGraph', 'Azure OpenAI'],
      v: 'v2', a: '#6EA8FE', b: '#3B5BDB',
      href: gh,
      cta: 'GitHub repository ↗',
      points: [
        'Built a Python pipeline that ingests unstructured business documents, splits them with overlap-aware chunking, generates embeddings, and indexes them in Pinecone. Every chunk carries metadata linking it back to the source file and page, so any answer can be traced to where it came from.',
        'Added validation at the parsing stage covering schema checks, encoding normalisation, and rejection of malformed inputs. Bad documents fail loudly at ingestion rather than quietly corrupting downstream results.',
        'Built a FastAPI service on top that lets non-technical staff ask questions of their own data in plain English and get answers with citations attached, so they can check the source themselves.'
      ],
      imgs: [['contextiq-1', 'ContextIQ Pipeline Dashboard: document ingestion, vector embeddings visualization, metadata citation tracing, and natural language Q&A playground.']]
    },
    {
      t: 'Deepfake Detection — Dataset Profiling & ML Research',
      yr: '2025 – 2026',
      tags: ['PyTorch', 'TensorFlow', 'FastAPI', 'Vision Transformer', 'Ensemble'],
      v: 'v2', a: '#A78BFA', b: '#6D28D9',
      href: 'https://deepfake-detector-sz.onrender.com/',
      cta: 'Live Demo ↗',
      points: [
        'Profiled a 1,000-video dataset before any modelling: checked class balance, found and removed corrupted frames, and standardised resolution and encoding. The dataset had quality issues that would have skewed results if left in.',
        'Built a five-model ensemble reaching 99.2% accuracy and 0.995 AUC on the benchmark.',
        'Deployed production web application on Render with model intelligence, live scan telemetry, and real-time inference latency under 57ms.'
      ],
      imgs: [['deepfake-1', 'Deepfake Detection System: Operations dashboard, live scan feeds, threat blocking metrics, model intelligence, and 57ms inference latency.']]
    }
  ];
  function shot(p) {
    if (p.imgs) {
      return '<div class="shot ' + p.v + '" style="--a:' + p.a + ';--b:' + p.b + '"><img src="' + IMG[p.imgs[0][0]] + '" alt="" loading="lazy"></div>';
    }
    return '<div class="shot ' + p.v + '" style="--a:' + p.a + ';--b:' + p.b + '"><i class="tb"></i><i class="b1"></i><i class="b2"></i><i class="b3"></i></div>';
  }
  function gallery(p) {
    var first = p.imgs[0];
    var main = '<img class="dlg-main" id="dlg-main" src="' + IMG[first[0]] + '" alt="' + first[1] + '">' +
      '<p class="cap" id="dlg-cap">' + first[1] + '</p>';
    if (p.imgs.length < 2) return main;
    return main + '<div class="thumbs" id="dlg-thumbs">' + p.imgs.map(function (im, k) {
      return '<button type="button" data-k="' + k + '" aria-label="Screenshot ' + (k + 1) + '"' + (k === 0 ? ' aria-current="true"' : '') + '><img src="' + IMG[im[0]] + '" alt=""></button>';
    }).join('') + '</div>';
  }
  var grid = $('#projects');
  grid.innerHTML = projects.map(function (p, i) {
    return '<button class="pol" type="button" data-i="' + i + '">' + shot(p) + '<h3>' + p.t + '</h3><div class="tags">' +
      p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div></button>';
  }).join('');
  var dlg = $('#dlg'), current = null;
  $('#dlg-body').addEventListener('click', function (e) {
    var b = e.target.closest('#dlg-thumbs button');
    if (!b || !current) return;
    var im = current.imgs[+b.dataset.k];
    var main = $('#dlg-main');
    main.src = '' + IMG[im[0]] + '';
    main.alt = im[1];
    $('#dlg-cap').textContent = im[1];
    $$('#dlg-thumbs button').forEach(function (t) { t.setAttribute('aria-current', t === b ? 'true' : 'false'); });
  });
  grid.addEventListener('click', function (e) {
    var b = e.target.closest('.pol');
    if (!b) return;
    var p = projects[+b.dataset.i];
    current = p;
    var pointsHtml = p.points ? '<ul class="dlg-points">' + p.points.map(function (pt) { return '<li>' + pt + '</li>'; }).join('') + '</ul>' : ('<p>' + p.d + '</p>');
    var yearBadge = p.yr ? '<div class="dlg-yr"><span class="badge">' + p.yr + '</span></div>' : '';
    $('#dlg-body').innerHTML = (p.imgs ? gallery(p) : shot(p)) +
      '<div class="dlg-header"><h3 id="dlg-title">' + p.t + '</h3>' + yearBadge + '</div>' +
      pointsHtml +
      '<div class="tags">' + p.tags.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</div>' +
      '<div class="dlg-actions"><a class="btn fill" href="' + p.href + '" target="_blank" rel="noopener">' + p.cta + '</a></div>';
    if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', '');
  });
  $('#dlg-x').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });`;

if (oldProjectsRegex.test(html)) {
  html = html.replace(oldProjectsRegex, newProjectsCode);
  console.log('Updated projects array and modal handler!');
} else {
  console.error('ERROR: oldProjectsRegex did not match!');
}

// 6. Update confetti click handler on hero circle
html = html.replace(
  /\$\('\.person'\)\.addEventListener\('click', function \(e\) \{ burst\(e\.clientX, e\.clientY\); \}\);/,
  "var heroD = $('.disc'); if (heroD) heroD.addEventListener('click', function (e) { burst(e.clientX, e.clientY); });"
);

// Save updated index.html
fs.writeFileSync(path.join(ROOT, 'index.html'), html, 'utf8');
console.log('SUCCESS! index.html saved. New size:', fs.statSync(path.join(ROOT, 'index.html')).size, 'bytes');
