#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const curatedPath = resolve(__dirname, '../resources/ontology.json');
const parusPath = resolve(__dirname, '../resources/ontology.parus.json');
const autoPath = resolve(__dirname, '../resources/ontology.auto.json');
const outPath = resolve(__dirname, '../resources/ontology.merged.json');

function normalize(s){
  return (s||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();
}

async function main(){
  const curated = JSON.parse(await fs.readFile(curatedPath,'utf8'));
  const parus = JSON.parse(await fs.readFile(parusPath,'utf8'));
  const auto = JSON.parse(await fs.readFile(autoPath,'utf8'));

  const categories = curated.category_keywords || {};
  const categoryTerms = {};
  for (const [cat, meta] of Object.entries(categories)){
    categoryTerms[cat] = (meta.keywords||[]).map(k=>normalize(k));
  }

  const merged = { generated: new Date().toISOString(), provenance: { curated: curatedPath, parus: parusPath, auto: autoPath }, mapping: {}, category_map: {} };

  for (const [code, info] of Object.entries(parus.mapping||{})){
    const label = info.label || '';
    const examples = (info.examples||[]).join(' ');
    const corpus = normalize(label + ' ' + examples);

    // score against categories by keyword occurrence
    const scores = {};
    for (const [cat, terms] of Object.entries(categoryTerms)){
      let matches = 0;
      for (const t of terms){ if (t && corpus.includes(t)) matches++; }
      if (matches>0) scores[cat]=matches;
    }

    // also consult auto-extracted keywords (best-effort)
    const autoKeywords = new Set();
    for (const f of Object.values(auto.parsed||{})){
      for (const k of (f.keywords||[])) autoKeywords.add(normalize(k));
      for (const h of Object.keys(f.headings||{})) autoKeywords.add(normalize(h));
    }
    for (const cat of Object.keys(categoryTerms)){
      for (const t of categoryTerms[cat]){ if (t && autoKeywords.has(t) && corpus.includes(t)) scores[cat]=(scores[cat]||0)+1; }
    }

    // pick best category
    let best = null; let bestScore = 0;
    for (const [cat, sc] of Object.entries(scores)){ if (sc>bestScore){ best=cat; bestScore=sc; } }

    const confidence = best ? Math.min(1, bestScore / Math.max(1, (categoryTerms[best]||[]).length)) : 0;

    merged.mapping[code] = { code, label, examples: info.examples||[], matched_categories: scores, assigned_category: best || 'uncategorized', confidence };
    merged.category_map[code] = { category: best || null, confidence };
  }

  // Also include curated categories for reference
  merged.curated = { category_keywords: curated.category_keywords, notes: curated.notes };

  await fs.writeFile(outPath, JSON.stringify(merged, null, 2), 'utf8');
  console.log('Wrote', outPath);
}

main().catch(err=>{ console.error(err); process.exit(1); });
