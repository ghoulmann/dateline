# Repository exclusions

This repository intentionally excludes certain files and directories from version control and deployment.

## Excluded files

- `CLAUDE.md`
  - Private project notes and architecture commentary.
  - This file is not intended to remain in repository history.
- `dist/`
  - Vite build output.
- `node_modules/`
  - Installed dependencies.
- `.env`, `.env.local`, `.env.*.local`
  - Local environment configuration.
- `.vscode/`, `.idea/`
  - Editor and IDE settings.
- OS artifacts such as `.DS_Store`, `Thumbs.db`, `*~`, and swap files.

## Deployment note

GitHub Pages deployment is handled by GitHub Actions in `.github/workflows/deploy.yml`.
This repository uses workflow deployment, not a published `gh-pages` branch or `/docs` folder.

## Local-only ignore rules

If you have personal files that should not be tracked in this clone only, use `.git/info/exclude`.
That file is local to your clone and is not shared with other contributors.
