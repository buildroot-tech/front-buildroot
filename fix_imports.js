const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = [...walk('./components'), ...walk('./app')];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace import { motion, ... } with import { m, ... } even across newlines
  if (/import\s*\{[^}]*\bmotion\b[^}]*\}\s*from\s*['"]framer-motion['"]/.test(content)) {
    content = content.replace(/import\s*\{([^}]*)\bmotion\b([^}]*)\}\s*from\s*['"]framer-motion['"]/g, (match, p1, p2) => {
      let inner = p1 + p2;
      let parts = inner.split(',').map(s => s.trim()).filter(Boolean);
      parts.push('m');
      return `import { ${parts.join(', ')} } from "framer-motion"`;
    });
    changed = true;
  }

  // Double check if there are `<m.` tags but no `import { m` or `m,`
  if (content.includes('<m.') && !/\bm\b/.test(content.match(/import\s*\{[^}]*\}\s*from\s*['"]framer-motion['"]/)?.[0] || '')) {
     console.log(`WARNING: missed import in ${file}`);
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated imports in ${file}`);
  }
});
