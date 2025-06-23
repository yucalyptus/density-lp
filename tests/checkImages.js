const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);

let missing = [];
$('img').each((_, img) => {
  let src = $(img).attr('src');
  if (!src) return;
  src = src.split('?')[0].split('#')[0];
  if (src.startsWith('./')) src = src.slice(2);
  if (src.startsWith('/')) src = src.slice(1);
  if (!src.startsWith('img/')) return;
  const filePath = path.join(__dirname, '..', src);
  if (!fs.existsSync(filePath)) {
    missing.push(src);
  }
});

if (missing.length) {
  console.error('Missing images:', missing.join(', '));
  process.exitCode = 1;
} else {
  console.log('All images exist.');
}
