const fs = require('fs');
const vm = require('vm');

let html = fs.readFileSync('d:/portfolio/index.html', 'utf8');

// Fix the double closing brace
const searchStr = `    document.addEventListener('pointerover', function (e) {
      cur.classList.toggle('big', !!e.target.closest('a, button, .pol, .cert'));
    }, { passive: true });
  }
  }

  /* confetti burst`;

const replaceStr = `    document.addEventListener('pointerover', function (e) {
      cur.classList.toggle('big', !!e.target.closest('a, button, .pol, .cert'));
    }, { passive: true });
  }

  /* confetti burst`;

if (html.includes(searchStr)) {
  html = html.replace(searchStr, replaceStr);
  console.log('Successfully removed duplicate closing brace!');
} else {
  console.error('Exact search string not found, trying regex...');
  html = html.replace(/(\},\s*\{\s*passive:\s*true\s*\}\);\s*\}\s*)\}\s*(\/\*\s*confetti)/, '$1$2');
}

fs.writeFileSync('d:/portfolio/index.html', html, 'utf8');

// Now test with vm.Script
const scripts = html.match(/<script>([\s\S]*?)<\/script>/g);
scripts.forEach((s, idx) => {
  const code = s.replace(/<script>|<\/script>/g, '');
  try {
    new vm.Script(code);
    console.log(`Script ${idx + 1} parses PERFECTLY without any errors!`);
  } catch (e) {
    console.error(`Script ${idx + 1} parse error:`, e.message);
  }
});
