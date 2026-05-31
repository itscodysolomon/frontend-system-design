# Frontend System Design Academy

A complete, free, open-source learning platform for mastering frontend system design — from fundamentals to senior-level interview preparation.

**[Live Demo →](https://yourusername.github.io/frontend-system-design/)**

## Features

- **12 comprehensive modules** covering the full spectrum of frontend architecture
- **Complete lesson content** — no placeholders, real educational material
- **Interactive quizzes** with instant feedback for each module
- **Practical exercises** with auto-saving answer areas
- **6 interview walkthroughs** (Netflix, Slack, YouTube, Ecommerce, Analytics Dashboard, Collaborative Editor)
- **Architecture diagrams** using inline SVG
- **Progress tracking** persisted in localStorage
- **Personal notes** per module, auto-saved
- **Mobile-first responsive design** — works on phones, tablets, and desktops
- **Dark mode by default** with clean, modern UI
- **No backend required** — fully static, deployable anywhere

## Modules

1. Frontend Architecture
2. State Management
3. API Layer Design
4. Caching Strategies
5. Rendering Models (CSR, SSR, SSG, ISR, RSC)
6. Performance Optimization
7. Authentication & Security
8. Design Systems
9. Real-Time Applications
10. Micro Frontends
11. Frontend Observability
12. Frontend System Design Interviews

## How to Run Locally

No build step required. Open the files directly or use any static server:

```bash
# Option 1: Python
python3 -m http.server 8000

# Option 2: Node.js (npx)
npx serve .

# Option 3: Open directly
open index.html
```

Then visit `http://localhost:8000` in your browser.

## Deploy to GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Under "Source", select the branch (e.g., `main`) and root folder (`/`)
4. Click Save
5. Your site will be live at `https://yourusername.github.io/repository-name/`

Alternatively, use GitHub Actions:

```yaml
name: Deploy to Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4
```

## Progress Tracking

All progress is stored in the browser's `localStorage`:

- **Module completion** — tracked per module
- **Quiz answers** — checked client-side with immediate feedback
- **Exercise responses** — auto-saved as you type
- **Personal notes** — per-module note-taking area

Progress persists across browser sessions. Use the "Reset Progress" button on the dashboard to start fresh.

Storage keys:
- `fsd-academy-progress` — module completion status
- `fsd-academy-notes` — per-module notes
- `fsd-academy-exercises` — exercise answers

## Tech Stack

- Pure HTML, CSS, JavaScript
- No frameworks, no build tools, no dependencies
- SVG diagrams (inline)
- CSS custom properties for theming
- Responsive CSS Grid/Flexbox layout

## File Structure

```
├── index.html        # App shell and structure
├── styles.css        # All styles (dark mode, responsive)
├── data.js           # Module content (lessons, quizzes, exercises)
├── interviews.js     # Interview walkthrough content
├── script.js         # Application logic and rendering
└── README.md         # Documentation
```

## Future Improvements

- Light/dark mode toggle
- Export progress as JSON
- Print-friendly lesson views
- Search across all module content
- Spaced repetition for quiz review
- Additional interview walkthroughs
- Community contributions for module content
- Keyboard shortcuts for navigation
- Table of contents sidebar for long lessons
- Estimated reading time per section

## Contributing

Contributions are welcome! Whether it's fixing a typo, improving lesson content, adding a new interview walkthrough, or enhancing the UI — PRs are appreciated.

## License

MIT — use this for learning, teaching, or building upon.
