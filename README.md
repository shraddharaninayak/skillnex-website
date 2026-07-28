# Skillnex — Homepage (v1)

A fresh brand build for Skillnex: an education and career acceleration platform. Built with
React, Vite, Tailwind CSS, and Lucide React icons, structured as one component per homepage
section for independent editing.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
npm run preview
```

## Project structure

```
src/
  assets/
    skillnex-logo.jpeg      # Original logo, unmodified
  components/
    Navbar.jsx
    Hero.jsx
    Programs.jsx
    Solutions.jsx
    WhatWeDo.jsx
    Founder.jsx
    TrainingProcess.jsx
    WhatWeProvide.jsx
    Portfolio.jsx
    Reviews.jsx
    FAQ.jsx
    CTA.jsx
    Footer.jsx
  App.jsx                   # Imports all sections in homepage order
  main.jsx
  index.css                 # Design tokens & shared utility classes
tailwind.config.js           # Brand color tokens, fonts, shadows, radii
```

## Design system

- **Typography** — Manrope (display/headings) paired with Inter (body copy) and IBM Plex Mono
  for small uppercase labels ("eyebrows") and data.
- **Color** — White (`#FFFFFF`) and subtle gray (`#FAFAFA`) backgrounds, black text (`#111111`
  primary / `#6B7280` secondary), with Cyan (`#06B6D4`) reserved for primary actions, links, and
  active states, and Orange (`#F59E0B`) reserved for secondary actions, badges, and stats.
- **Shape language** — Rounded cards (`rounded-2xl`), thin `#E5E7EB` borders, soft layered
  shadows, and a recurring diagonal-clip motif on key visuals that echoes the angled cuts in the
  Skillnex wordmark itself.
- **Shared classes** — `.btn-primary`, `.btn-secondary`, `.btn-accent`, `.card`, `.card-hover`,
  `.eyebrow`, and `.section-pad` live in `src/index.css` so every new section stays visually
  consistent with zero repeated utility strings.

## Notes for the next iteration pass

- Placeholder imagery is sourced from Unsplash — swap for real Skillnex photography before launch.
- Copy throughout is production-style placeholder text, written to be replaced with real program,
  founder, and review details.
- Reuse `App.jsx`'s import pattern for future pages (e.g. `/programs/[slug]`, `/about`) to keep the
  same component-per-section architecture.
