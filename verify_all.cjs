const fs = require('fs');
const html = fs.readFileSync('d:/portfolio/index.html', 'utf8');

// 1. Extract and check JS syntax
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
console.log('Scripts found:', scripts ? scripts.length : 0);
if (scripts) {
  scripts.forEach((s, i) => {
    const code = s.replace(/<script>|<\/script>/g, '');
    try {
      new Function(code);
      console.log(`Script ${i + 1} syntax: OK`);
    } catch (err) {
      console.error(`Script ${i + 1} syntax ERROR:`, err.message);
    }
  });
}

// 2. Check for broken HTML tags or unclosed tags
const unclosed = [];
['div', 'section', 'article', 'button', 'dialog', 'svg'].forEach(tag => {
  const opens = (html.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length;
  const closes = (html.match(new RegExp(`</${tag}>`, 'gi')) || []).length;
  if (opens !== closes) {
    unclosed.push(`${tag}: ${opens} opens vs ${closes} closes`);
  }
});
console.log('Unclosed tags check:', unclosed.length === 0 ? 'ALL MATCHED PERFECTLY' : unclosed.join(', '));

// 3. Check all links
const hrefs = html.match(/href="([^"]+)"/g) || [];
console.log('Total links:', hrefs.length);
hrefs.forEach(h => {
  const val = h.replace(/href="|"/g, '');
  if (!val.startsWith('#') && !val.startsWith('mailto:') && !val.startsWith('http') && !val.startsWith('data:')) {
    console.warn('Suspicious link:', val);
  }
});
console.log('Link verification complete.');
