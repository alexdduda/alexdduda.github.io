# alexduda.dev

Personal site: static HTML/CSS/JS, no build step.

## Run locally

```bash
python3 -m http.server 8080
```

Then open http://localhost:8080

## Deploy (Vercel)

```bash
npx vercel --prod
```

Or connect this folder as a GitHub repo and import it in the Vercel dashboard.
Zero config needed since it's static.

## Deploy (GitHub Pages)

Push to a repo, then in repo Settings → Pages, set source to the `main` branch, root directory.

## Structure

- `index.html`: all content/sections
- `styles.css`: theme + layout
- `script.js`: dark/light toggle
- `assets/`: put a resume PDF here (e.g. `assets/resume.pdf`) and link it from the hero if wanted
