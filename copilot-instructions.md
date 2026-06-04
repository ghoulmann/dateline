Copilot Instructions — Dateline project

Purpose
- Treat `resources/CAMEO.Manual.1.1b3.pdf` (project-root relative) as the canonical ontology/resource files for the "first headlines" API used by this repo (the headlines ingestion/aggregation workflow — e.g., GDELT / initial article source).

When editing or generating code related to headlines ingestion, location resolution, categorization, or article linking:

- Always consult `resources/CAMEO.Manual.1.1b3.pdf` as the ontology/resource documents for entity definitions, canonical location names, and taxonomy mappings before proposing or writing code changes.
- Prefer extracting canonical place names, aliases, and category-term mappings from `resources/CAMEO*` when resolving datelines and hotspots.
- When modifying `scripts/refresh-locations.mjs`, `src/api/geocode.js`, or `src/api/gdelt.js`, annotate any changes that rely on ontology lookups and reference the relevant section in `resources/CAMEO*`.
- Use the ontology to improve:
  - Dateline detection heuristics (avoid reporter-city misassignment)
  - City ↔ country fallback rules
  - Category keyword normalization and mapping
  - Deduplication/grouping of articles into `articles[]` per location

Developer notes
- The ontology path(s): any file matching `resources/CAMEO.Manual.1.1b3.pdf` (project-root relative). Optionally also consult `resources/details.md` for supplementary notes.
- If the ontology needs to be parsed programmatically, prefer adding a small utility under `scripts/` (e.g., `scripts/parse-ontology.mjs`) that extracts structured JSON from `resources/CAMEO*` and writes to `resources/ontology.json`.
- Add references to the ontology in commit messages or PR descriptions when changes depend on specific ontology entries.

How Copilot should behave
- When asked to generate code, prefer making calls to or adding brief TODOs that call the ontology parser (if not present) rather than hardcoding taxonomy values.
- When resolving ambiguous headlines, suggest consulting `resources/CAMEO.Manual.1.1b3.pdf` and include an explicit citation line in the code comment with the filename (e.g., `resources/CAMEO_v1.md`) and any section reference if known.

If you want, I can also:
- Add a small `scripts/parse-ontology.mjs` scaffold that reads `resources/CAMEO.Manual.1.1b3.pdf` (or the best-matching file) and produces `resources/ontology.json`.
- Wire `scripts/refresh-locations.mjs` to optionally read `resources/ontology.json` when present.

