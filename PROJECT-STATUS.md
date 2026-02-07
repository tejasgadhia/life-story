# Project Status - Life Story
Last Updated: February 6, 2026

## Current State

**What's Working:**
- All 3 themes (Timeline, Newspaper, Case File) rendering correctly
- 67 year files (1946-2012) with curated content
- Birthday popularity heat map visualization (new — commit `a29eb98`)
- Unified FAB theme switcher (desktop popover + mobile bottom sheet)
- URL-based routing with shareable report URLs
- Font size controls, tab navigation, celebrity lists
- Loading screen with ~4.3s staged animation on new report generation
- Session caching — loading screen skipped on theme/tab switches
- PWA with offline support
- GitHub Pages auto-deploy via Actions
- Tailwind CSS v4 with CSS-first config (`@theme` block in index.css)
- Mobile responsive polish — WCAG touch targets, tighter 320px padding, text fixes

**Needs Fixing (HIGH PRIORITY):**
- Landing page design is broken — user explicitly unhappy with current charcoal/amber light palette. Needs a proper design review and restyle. Current state: light gradient background (`charcoal-50` to `charcoal-100`) with white cards and amber accents. User says it looks ugly and needs a complete redesign.
- Theme switcher may have issues — added `key` props to routes but couldn't reproduce the switching bug in testing. Needs real-browser verification.

**Not Started:**
- Case file theme redesign (#66)

## Recent Changes

### February 6, 2026 Session (UI Fix Attempt — Mostly Failed)
- Added `key` props to ThemeWrapper routes in `AppRoutes.jsx` (KEPT — defensive fix)
- Attempted to restyle DatePicker to dark-brown vintage palette (REVERTED — plan was wrong)
- Attempted dark-on-dark contrast fix (REVERTED — made it worse)
- Restored DatePicker to pre-session state (commit `bcfebd6`)
- **Net result: only `src/routes/AppRoutes.jsx` actually changed (key props)**
- User is NOT happy — landing page needs a real design overhaul next session

### February 6, 2026 Session (Heat Map)
- Birthday popularity heat map visualization (commit `a29eb98`)

### February 6, 2026 Session (Mobile Responsive Polish)
- WCAG touch targets, tighter 320px padding, text fixes across all themes

## Architecture

**Tech Stack:**
- React 19 + React Router 7
- Vite 7 build tooling
- Tailwind CSS 4 (CSS-first config via @tailwindcss/vite)
- GitHub Pages deployment

**Key Files:**
- `src/components/DatePicker.jsx` — Landing page (current: charcoal/amber light palette — NEEDS REDESIGN)
- `src/pages/LandingPage.jsx` — DatePicker wrapper, navigates to report URL
- `src/components/ThemeWrapper.jsx` — Report loading, caching, loading screen orchestration
- `src/components/ThemeSwitcher.jsx` — Unified FAB with popover/bottom-sheet
- `src/routes/AppRoutes.jsx` — React Router routes with lazy-loaded themes + key props
- `src/components/themes/*.jsx` — Three theme components
- `src/data/` — Year, generation, and birthday JSON data
- `src/index.css` — Tailwind v4 `@theme` config + custom CSS classes

## Known Issues

- Landing page design is ugly (user's words) — needs complete restyle
- Theme switcher switching may not work in all browsers
- Case file theme feels cheesy (#66)
- PWA service worker can serve stale content on deploys

## Next Priorities

1. **Fix landing page design** — proper design review with user input, not guessing
2. **Verify theme switcher** — test in real browser after deploy
3. Case file theme redesign (#66)
