#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const verbsPath = resolve(__dirname, '../resources/parus/extracted_verbs/CAMEO.080612.verbs');
const outPath = resolve(__dirname, '../resources/ontology.parus.json');

async function main() {
  const text = await fs.readFile(verbsPath, 'utf-8');
  const lines = text.split(/\r?\n/);

  const mapping = {};
  let currentVerb = null;
  for (const raw of lines) {
    const line = raw.trim();
    if (!line) continue;
    // Main verb lines: WORD  [CODE]
    const mainMatch = line.match(/^([A-Z0-9_\-]+)\s+\[([^\]]+)\]/);
    if (mainMatch) {
      currentVerb = mainMatch[1];
      const code = mainMatch[2];
      if (!mapping[code]) mapping[code] = { label: currentVerb, examples: [] };
      continue;
    }
    // Pattern lines start with '-' and may have [CODE]
    const patternMatch = line.match(/^[-\s]*(.+?)\s+\[([^\]]+)\]/);
    if (patternMatch) {
      const pattern = patternMatch[1].trim();
      const code = patternMatch[2];
      if (!mapping[code]) mapping[code] = { label: currentVerb || pattern.split(/\s+/)[0], examples: [] };
      mapping[code].examples.push(pattern);
      continue;
    }
  }

  const out = { source: 'Parus CAMEO verbs (CAMEO.080612.verbs)', generated: new Date().toISOString(), mapping };
  await fs.writeFile(outPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log('Wrote', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
