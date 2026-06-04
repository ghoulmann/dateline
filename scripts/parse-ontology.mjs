#!/usr/bin/env node
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { promises as fs } from 'fs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const resourcesDir = resolve(__dirname, '../resources');
const outPath = resolve(resourcesDir, 'ontology.auto.json');

function cleanItem(line) {
  return line.replace(/^[-*\d\.\s]+/, '').trim().replace(/[`"'\.\,]$/,'').trim();
}

async function main() {
  const files = await fs.readdir(resourcesDir);
  const candidates = files.filter(f => /CAMEO|cameo|ontology/i.test(f));
  const result = {
    generated: new Date().toISOString(),
    source_files: candidates,
    parsed: {},
  };

  for (const fname of candidates) {
    try {
      const text = await fs.readFile(resolve(resourcesDir, fname), 'utf-8');
      const lines = text.split(/\r?\n/);
      const headings = {};
      let current = null;
      for (const raw of lines) {
        const line = raw.trim();
        // heading
        const m = line.match(/^#{1,6}\s*(.+)/);
        if (m) { current = m[1].trim(); headings[current] = []; continue; }
        // list item
        if (/^[-*\d\.\s]+\w/.test(line) && current) {
          const item = cleanItem(line);
          if (item) headings[current].push(item);
          continue;
        }
        // bullet-like lines without hyphen under no heading: collect under _misc
        if (!current && (/^[-*]\s+/.test(line) || /^\d+\./.test(line))) {
          current = '_misc'; headings[current] = headings[current] || [];
          headings[current].push(cleanItem(line));
        }
      }

      // Also attempt to extract any comma-separated keyword lists
      const keywords = new Set();
      for (const l of lines) {
        const commaMatch = l.match(/([a-zA-Z\- ]{3,})(?:,\s*[a-zA-Z\- ]+){1,}/);
        if (commaMatch) {
          l.split(',').map(s => s.trim()).forEach(s => { if (s.length>2) keywords.add(s.replace(/[\.\n]+/,'').trim()); });
        }
      }

      result.parsed[fname] = { headings, keywords: Array.from(keywords).slice(0,100) };
    } catch (err) {
      result.parsed[fname] = { error: String(err) };
    }
  }

  await fs.writeFile(outPath, JSON.stringify(result, null, 2), 'utf-8');
  console.log('Wrote', outPath);
}

main().catch(err => { console.error(err); process.exit(1); });
