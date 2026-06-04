#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import vm from 'vm';

const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const ROOT = path.resolve(SCRIPT_DIR, '..');
const geocodePath = path.join(ROOT, 'src/api/geocode.js');
const mergedPath = path.join(ROOT, 'resources/ontology.merged.json');

function readFile(p) { return fs.readFileSync(p, 'utf8'); }

const geocodeSrc = readFile(geocodePath);

function extractObject(src, varName) {
  const re = new RegExp(`const ${varName}\\s*=\\s*\\{([\\s\\S]*?)\\n\\};`);
  const m = src.match(re);
  if (!m) return null;
  const body = '{' + m[1] + '\n}';
  const script = new vm.Script('(' + body + ')');
  return script.runInNewContext();
}

const COUNTRY_CAPITALS = extractObject(geocodeSrc, 'COUNTRY_CAPITALS') || {};
const HOTSPOT_TABLE = extractObject(geocodeSrc, 'HOTSPOT_TABLE') || {};
const COUNTRY_NAME_MAP = extractObject(geocodeSrc, 'COUNTRY_NAME_MAP') || {};

function normalize(s) {
  return String(s).toLowerCase().normalize('NFD').replace(/\p{M}/gu, '').replace(/[\u2019']/g, "'").replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}

const DEMONYMS = {
  'american': 'US', 'us': 'US', 'u.s.': 'US', 'u.s.a': 'US', 'usa': 'US', 'british': 'GB', 'uk': 'GB', 'u.k.': 'GB',
  'russian': 'RU', 'iranian': 'IR', 'israeli': 'IL', 'palestinian': 'PS', 'ukrainian': 'UA', 'chinese': 'CN',
  'syrian': 'SY', 'iraqi': 'IQ', 'yemeni': 'YE', 'afghan': 'AF'
};

const merged = JSON.parse(readFile(mergedPath));
merged.city_aliases = merged.city_aliases || {};
merged.country_aliases = merged.country_aliases || {};

for (const [name, code] of Object.entries(COUNTRY_NAME_MAP)) {
  merged.country_aliases[normalize(name)] = code;
}

for (const [code, capital] of Object.entries(COUNTRY_CAPITALS)) {
  if (!capital) continue;
  merged.country_aliases[normalize(capital)] = code;
}

for (const [dem, code] of Object.entries(DEMONYMS)) merged.country_aliases[dem] = code;

for (const city of Object.keys(HOTSPOT_TABLE)) {
  const canon = city;
  const n = normalize(city);
  merged.city_aliases[n] = canon;
  const variants = [n.replace(/ city$/,''), n.replace(/ strip$/,''), n.replace(/\\s+\\(.+\\)$/,'')];
  for (const v of variants) merged.city_aliases[v] = canon;
}

merged.city_aliases['washington dc'] = 'Washington';
merged.city_aliases['dc'] = 'Washington';
merged.city_aliases['gaza strip'] = 'Gaza';

const normCity = {};
for (const [k, v] of Object.entries(merged.city_aliases)) normCity[normalize(k)] = v;
merged.city_aliases = normCity;

const ALLOW_SHORT = new Set(['us','uk','ua','ir','ru','cn','in','fr','de','it','es']);
const normCountry = {};
for (const [k, v] of Object.entries(merged.country_aliases)) {
  const nk = normalize(k);
  if (nk.length === 2 && /^[a-z]{2}$/.test(nk) && !ALLOW_SHORT.has(nk)) continue;
  normCountry[nk] = v;
}
merged.country_aliases = normCountry;

merged.generated = new Date().toISOString();

fs.writeFileSync(mergedPath, JSON.stringify(merged, null, 2), 'utf8');
console.log('Wrote', mergedPath);
console.log('country_aliases sample:', Object.keys(merged.country_aliases).slice(0,20));
console.log('city_aliases sample:', Object.keys(merged.city_aliases).slice(0,20));

try {
  const ont = merged;
  import('file://' + path.join(ROOT, 'src/api/geocode.js')).then(m=>{
    m.setAliases({ city_aliases: ont.city_aliases, country_aliases: ont.country_aliases });
    const tests = [
      'US launches strikes',
      'US launches strikes in Syria',
      'U.S. launches strikes in Tehran',
      'American forces clash in Gaza',
      'Bombing reported in Washington'
    ];
    for (const t of tests) console.log(t, '=>', m.resolveLocation({ title: t, sourcecountry: '' }));
  }).catch(err=>console.error('test import failed', err));
} catch(e) {}
