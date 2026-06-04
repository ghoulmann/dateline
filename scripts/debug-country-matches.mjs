import fs from 'fs';
import path from 'path';
import vm from 'vm';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const geocodeSrc = fs.readFileSync(path.join(ROOT, 'src/api/geocode.js'), 'utf8');
function extractObject(src, varName) {
  const re = new RegExp(`const ${varName}\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`);
  const m = src.match(re);
  if (!m) return null;
  const body = '{' + m[1] + '\n}';
  return new vm.Script('(' + body + ')').runInNewContext();
}

const COUNTRY_NAME_MAP = extractObject(geocodeSrc, 'COUNTRY_NAME_MAP') || {};
const merged = JSON.parse(fs.readFileSync(path.join(ROOT, 'resources/ontology.merged.json'), 'utf8'));
const title = 'US launches strikes'.toLowerCase();
const countryMatches = [];
for (const [aliasLower, code] of Object.entries(merged.country_aliases)) {
  const idx = title.indexOf(aliasLower);
  if (idx >= 0) countryMatches.push({ alias: aliasLower, code, idx });
}
for (const [name, code] of Object.entries(COUNTRY_NAME_MAP)) {
  const idx = title.indexOf(name);
  if (idx >= 0) countryMatches.push({ alias: name, code, idx });
}
console.log('countryMatches:', countryMatches);
console.log('country_aliases contains us?', merged.country_aliases.hasOwnProperty('us'));
