import fs from 'fs';
import path from 'path';
const SCRIPT_DIR = path.dirname(new URL(import.meta.url).pathname);
const ont = JSON.parse(fs.readFileSync(path.join(SCRIPT_DIR,'..','resources','ontology.merged.json'),'utf8'));
import('file://' + path.join(SCRIPT_DIR,'..','src','api','geocode.js')).then(m=>{
  m.setAliases({city_aliases:ont.city_aliases,country_aliases:ont.country_aliases});
  const title = 'US launches strikes';
  const titleLower = title.toLowerCase();
  console.log('titleLower:', titleLower);
  const countryMatches = [];
  for (const [aliasLower, code] of Object.entries(ont.country_aliases)){
    const idx = titleLower.indexOf(aliasLower);
    if (idx >= 0) countryMatches.push({alias:aliasLower, code, idx});
  }
  console.log('matches length:', countryMatches.length);
  countryMatches.slice(0,20).forEach(m=>console.log(m));
  console.log('resolve:', m.resolveLocation({title, sourcecountry:''}));
}).catch(e=>console.error(e));
