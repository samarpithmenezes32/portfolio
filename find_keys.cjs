const fs = require('fs');
const html = fs.readFileSync('d:/portfolio/index.html', 'utf8');
// Find all keys in the IMG object
const match = html.match(/var IMG = \{([\s\S]*?)\};/);
if (match) {
  const keys = match[1].match(/"([^"]+)":\s*"/g);
  if (keys) {
    keys.forEach(k => console.log(k.replace(/[":\s]/g, '')));
  }
} else {
  console.log('IMG object not found');
}
