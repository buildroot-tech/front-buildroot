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

  // Replace import { motion, ... } with import { m, ... }
  // We need to be careful with regex here
  if (content.includes('import { motion') || content.includes('import {motion')) {
    content = content.replace(/import\s*{\s*([^}]*)\bmotion\b([^}]*)\s*}\s*from\s*['"]framer-motion['"]/g, (match, p1, p2) => {
      let inner = p1 + p2;
      let parts = inner.split(',').map(s => s.trim()).filter(Boolean);
      parts.push('m');
      return `import { ${parts.join(', ')} } from "framer-motion"`;
    });
    changed = true;
  }

  // Replace <motion. to <m. and </motion. to </m.
  if (content.includes('<motion.') || content.includes('</motion.')) {
    content = content.replace(/<motion\./g, '<m.');
    content = content.replace(/<\/motion\./g, '</m.');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(file, content);
    console.log(`Updated ${file}`);
  }
});
