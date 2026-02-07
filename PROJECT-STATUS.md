# Project Status - Life Story
Last Updated: February 6, 2026

## Current State

**What's Working (verified on production):**
- Timeline theme — the only theme, clean and focused
- CSS cascade layer fix — Tailwind v4 utilities override base styles correctly
- Landing page (DatePicker) with Fraunces heading, padded input/button/cards
- WCAG AA contrast ratios passing: sepia-brown 5.73:1, amber-text 4.95:1
- 67 year files (1946-2012) with curated content
- Birthday popularity heat map visualization
- URL-based routing with shareable report URLs (`/life-story/{date}/timeline/{tab}`)
- Tab navigation, celebrity lists
- Focus/scroll reset on route navigation (useRouteChangeReset hook)
- Non-render-blocking Google Fonts (preload + external JS swap)
- CSP hardened: no `unsafe-inline` for scripts, all inline scripts externalized
- SPA redirect uses sessionStorage (no URL flash, no extra 404 hop)
- GitHub Pages auto-deploy via Actions
- PWA: 18 entries / 428KB precache, data chunks runtime-cached
- Bundle: main JS 261KB (83KB gzip), CSS 42KB (8KB gzip)
- Lighthouse: Performance 88-91, Accessibility 90-98, Best Practices 96-100, SEO 100
- Tests: 80 passing across 5 test files
- Build: clean, no warnings

**Removed This Session:**
- Newspaper theme, Case File theme, ThemeSwitcher FAB, font size controls, FontSizeContext
- Saved 1,402 lines of code, CSS -28%, precache -11%

**Needs Design Review:**
- Landing page — user unhappy with current design, needs proper restyle with input (#74)

## Recent Changes

### February 6, 2026 Session 3 (Theme Removal + Bug Fix)

**#85 Bug Fix: Mobile bottom sheet buttons not working**
- `f18a01e` — Moved `onClick={closeMenu}` from outer wrapper to backdrop div
- `0fee15a` — Disabled `mousedown` document listener on mobile (was racing with button clicks)
- Root cause: two competing close mechanisms — wrapper onClick intercepted button clicks, and mousedown document listener raced with click events on real mobile touch devices

**Theme Removal: Simplified to Timeline only**
- `79f64ea` — Deleted NewspaperTheme, CaseFileTheme, ThemeSwitcher, FontSizeContext
- Simplified: App.jsx, AppRoutes, MainLayout, ThemeWrapper, CelebrityList, BirthdayHeatMap, loadFonts, CSS
- Legacy theme URLs (`/newspaper/*`, `/casefile/*`) redirect to landing page
- 16 files changed, -1,402 lines

### Previous Sessions
- Session 2: 7-issue sweep — bundle, PWA, CSP, tests, SPA redirect, fonts, scroll reset
- Session 1: Comprehensive audit — contrast, headings, landmarks, cursor, meta tags

## Architecture

**Tech Stack:** React 19 + React Router 7 + Vite 7 + Tailwind CSS 4

**Key Files:**
- `src/App.jsx` — Bare BrowserRouter wrapper (no more FontSizeContext)
- `src/routes/AppRoutes.jsx` — Timeline routes + legacy redirects
- `src/components/ThemeWrapper.jsx` — Data loading, tab routing, hardcoded timeline path
- `src/components/themes/TimelineTheme.jsx` — The one theme
- `src/components/layout/MainLayout.jsx` — `<main>` landmark, progress bar, route change reset
- `src/hooks/useRouteChangeReset.js` — Focus/scroll management on navigation
- `src/utils/loadFonts.js` — Non-blocking font loading (report fonts only, no theme fonts)
- `vite.config.js` — Build config, PWA precache + runtime caching

## Known Issues

- #74: Landing page redesign — needs design input before implementation

## Next Priorities

1. Landing page redesign — present design options with `/tg-themes` first (#74)
