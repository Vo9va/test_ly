// Групує всі тести в junit.xml під один пакет для Jenkins / Test Results Analyzer.
// "specs/forms.spec.ts" -> classname "e2e.specs_forms"  (пакет "e2e", клас "specs_forms")
const fs = require('fs');

const file = process.argv[2] || 'test-results/junit.xml';
const root = process.argv[3] || 'e2e';

if (!fs.existsSync(file)) {
  console.log(`${file} не знайдено, пропускаю`);
  process.exit(0);
}

const xml = fs.readFileSync(file, 'utf8').replace(/classname="([^"]*)"/g, (_, original) => {
  const cls = original
    .replace(/\\/g, '/')
    .replace(/\.(spec|test)\.[cm]?[jt]s$/, '')
    .split('/')
    .filter(Boolean)
    .join('_')
    .replace(/\./g, '_') || 'tests';
  return `classname="${root}.${cls}"`;
});

fs.writeFileSync(file, xml);
console.log(`junit.xml: усі тести згруповано під пакет "${root}"`);
