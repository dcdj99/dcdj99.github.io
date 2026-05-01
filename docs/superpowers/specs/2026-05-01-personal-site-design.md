# Personal Site Design — darrenchow.me

**Date**: 2026-05-01
**Owner**: Darren Chow (`dcdj99`)
**Status**: Spec — pending implementation plan

## Purpose

A personal website for Darren Chow that functions as:
1. **Portfolio (primary)** — showcase mixed projects (dev + other)
2. **Landing / business card (secondary)** — bio, links, point of contact

The site should feel **techy + humanistic**, leave an impression, and stand out from typical portfolio templates without sliding into gimmick.

## Success criteria

- Live at `https://darrenchow.me` (and `https://dcdj99.github.io` as the platform fallback)
- Adding a new project = editing one TypeScript object and pushing — no template editing
- Lighthouse ≥ 95 across Performance / Accessibility / Best Practices / SEO
- A first-time visitor can describe one specific memorable thing about the site afterwards (the "signature" gesture)
- Editable `Now` and `About` content without touching layout code

## Architecture

### Stack

- **Build**: Vite + React + TypeScript
- **Styling**: Tailwind CSS (utility-first; fast iteration on visual direction)
- **Routing**: React Router (client-side)
- **Hosting**: GitHub Pages, custom domain `darrenchow.me`
- **CI/CD**: GitHub Actions on push to `main` (build + deploy to `gh-pages`)
- **Repo**: rename folder/repo from `profile` to `dcdj99.github.io` (GitHub user-site convention)

### Why this stack (decision log)

- **React over Astro**: user explicitly chose React. Vite + React keeps it lightweight; Next.js would be overkill for a static portfolio.
- **Vite over Next.js**: no SSR or routing complexity needed; output is fully static.
- **TS data file over MDX**: simpler. Adding a project means adding an object to an array, not learning MDX/frontmatter. MDX can be added later if a project ever needs a long-form case study.
- **Tailwind over CSS Modules**: speeds up the styling iteration loop, which matters because the visual direction needs to be tuned live.
- **GitHub Pages over Vercel/Netlify**: zero-cost, no third-party service, custom domain works the same.

## Site structure

Four routes:

```
/                  Home — hero + signature interactive element + "Now" block + featured projects
/projects          All projects (filterable by tag)
/projects/[slug]   Individual project case study
/about             Bio + skills + résumé summary + PDF download + contact links
```

Merged sections (no separate routes):

- **Now** → block on Home
- **Resume** → section on About + a downloadable `resume.pdf`
- **Contact** → block at the bottom of About + global footer

Global elements:

- **Header**: name/logo on the left, nav (`Home · Projects · About`) on the right, dark-mode toggle
- **Footer**: copyright, socials, email, quiet
- **404 page**: with personality (placeholder copy in spec; final tone TBD during implementation)

## Visual direction

Combination of **"living notebook"** (warm, humanistic base) and **"interactive surface"** (one signature live element). The base is quiet; one bold gesture earns memorability.

### Palette

- Background: warm off-white (~`#f6f1e7`)
- Text: deep ink (near-black, never pure black, ~`#1a1614`)
- Accent: one saturated color — terracotta or ink-blue (final pick during live tuning)
- Dark mode: bone-on-graphite (warm dark, never pure black)

Final hex values will be confirmed live in the browser.

### Typography

- **Body / large headings**: serif (Iowan / EB Garamond / Newsreader — final pick live)
- **Metadata, dates, tags, code**: monospace (JetBrains Mono / IBM Plex Mono)
- Body content max-width ~720px for reading; project grid breaks the rule on the homepage

### Layout & feel

- Asymmetric, generous whitespace
- Subtle paper grain (low-opacity SVG noise overlay)
- Hand-drawn underlines for emphasis (SVG, not CSS)
- Restrained motion: fade/slide on scroll, hover micro-interactions on links and cards
- Custom cursor: small circle that grows on hover targets — toggleable

### Signature interactive element (homepage)

A small generative visual that responds to the cursor. Two prototypes to evaluate live:

1. **"Ink bleed"** — canvas where the cursor leaves spreading ink stains that slowly fade
2. **"Constellation"** — field of dots; lines appear connecting nearby dots to the cursor

Final choice made after seeing both running.

### Accessibility constraints on visual direction

- `prefers-reduced-motion`: disables the interactive hero, replaces with a static visual
- `prefers-color-scheme`: drives default theme; user toggle overrides
- All interactive elements have visible focus states
- The custom cursor never replaces the OS cursor entirely — it augments

## Content model

```
src/
  data/
    projects.ts         ← array of project objects (title, date, tags, cover, github, demo, summary, body, featured)
    site.ts             ← name, tagline, socials, email, location
    about.ts            ← bio + skills (structured data)
    now.ts              ← single editable block
  components/           ← Header, Footer, ProjectCard, ProjectGrid, InteractiveHero, NowBlock, etc.
  pages/                ← Home, Projects, ProjectDetail, About, NotFound
  styles/               ← Tailwind config + global CSS
public/
  resume.pdf
  favicon.svg
```

### Adding content

- **New project**: add an object to `src/data/projects.ts`, push.
- **Edit bio / now / socials**: edit the relevant `data/*.ts` file, push.
- **New résumé**: replace `public/resume.pdf`, push.

### Project data shape (illustrative)

```ts
type Project = {
  slug: string;
  title: string;
  date: string;          // ISO
  tags: string[];        // for filtering
  cover?: string;        // path to image in /public
  github?: string;
  demo?: string;
  summary: string;       // short — shown on cards
  body?: string | JSX;   // optional longer case study for /projects/[slug]
  featured?: boolean;    // surfaces on home
};
```

### Media handling

Deferred. Start with images in repo (`/public`). Decide on Cloudinary / GitHub Releases / other CDN when actual media volume forces the choice.

## Deployment

- GitHub Actions workflow (`.github/workflows/deploy.yml`) on push to `main`:
  1. Install dependencies
  2. Run typecheck + tests
  3. Build (`npm run build`)
  4. Publish `dist/` to `gh-pages` branch
- GitHub Pages serves `gh-pages` branch
- Custom domain configured in repo settings + `CNAME` file in `/public` containing `darrenchow.me`
- DNS: user adds `A` records (or `CNAME` for `www.`) pointing to GitHub Pages IPs (instructions in implementation plan)

## Error handling

- No backend — no runtime errors beyond client-side routing
- Unknown route → `/404` with personality
- Image load failure → CSS-only fallback (alt text + neutral background)
- The interactive hero canvas is wrapped in a no-op fallback if WebGL/canvas2D fails

## Testing

Lightweight, scoped to v1:

- **Vitest + React Testing Library**: smoke tests for each route rendering, project list picking up `projects.ts`, dark-mode toggle, reduced-motion respected
- **No e2e for v1** — the site is small enough to eyeball; adding Playwright is premature
- **Lighthouse CI** in the deploy workflow as a quality gate (warn-only initially)

## Performance budget

- Lighthouse ≥ 95 in all categories
- Initial JS bundle target ≤ 100 KB gzipped (excluding the optional canvas hero, which lazy-loads)
- LCP < 1.5s on a fast connection
- No layout shift on font load (use `font-display: swap` with sized fallbacks)

## Out of scope for v1

- Blog / writing section (user explicitly skipped — can add later)
- Contact form (email + socials only — less spam, less infra)
- CMS or admin UI (content lives in code)
- Analytics (decide later — likely Plausible or none)
- i18n
- Comments

## Open questions to resolve during implementation

These do not block the design but need answers during/after build:

1. Final accent color (live A/B in browser)
2. Final body serif font (live A/B)
3. Which signature interactive element — ink bleed vs constellation (build both, pick one)
4. Email address for contact section (defer — system context shows `hello@matchwise-sg.com` but unconfirmed for personal use)
5. Socials to surface (LinkedIn? Twitter/X? Bluesky? GitHub is given)
6. Initial set of featured projects on the homepage
