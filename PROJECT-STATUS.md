# Project Status - Life Story
Last Updated: February 6, 2026

## Current State

**What's Working (verified on production):**
- CSS cascade layer fix — Tailwind v4 utilities override base styles correctly (verified via computed styles on production)
- All 3 themes render with proper padding, fonts, spacing (Timeline, Newspaper, Case File)
- Landing page (DatePicker) has correct Fraunces heading, padded input/button/cards
- WCAG AA contrast ratios passing: sepia-brown 5.73:1 on cream, amber-text 4.95:1 on white
- Heading hierarchy correct (h1 → h2, no skips)
- `<main>` landmark present for screen readers
- Theme switcher FAB has pointer cursor and is clickable (z-index verified via elementFromPoint)
- 67 year files (1946-2012) with curated content
- Birthday popularity heat map visualization
- URL-based routing with shareable report URLs
- Font size controls, tab navigation, celebrity lists
- Loading screen with staged animation
- GitHub Pages auto-deploy via Actions
- PWA service worker config has skipWaiting + clientsClaim (was already correct)
- Lighthouse: Performance 88-91, Accessibility 90-98, Best Practices 96-100, SEO 100
- Tests: 33/33 passing
- Build: clean, no warnings

**Needs Design Review:**
- Landing page — user unhappy with current design, needs proper restyle with input
- Case file theme redesign (#66)

## Recent Changes

### February 6, 2026 Session (Comprehensive Audit + Fixes)
- **Full 4-phase audit**: Production verification, local build analysis, Lighthouse audits, visual regression across all themes/viewports
- **Contrast fixes** (`9cfc396`): Darkened sepia-brown #8B7355 → #705A42 (5.73:1 on cream). Added amber-text #8A6C1F for text-on-white (4.95:1).
- **Heading order fix**: h3 → h2 in DatePicker section cards
- **Main landmark**: `<div>` → `<main>` in MainLayout.jsx, removed nested `<main>` from TimelineTheme
- **FAB cursor**: Added `cursor-pointer` to ThemeSwitcher button
- **Meta tag**: Replaced deprecated `apple-mobile-web-app-capable` with `mobile-web-app-capable`
- **Cleanup**: Removed unused `--font-accent` (Lora) variable
- **Verified on production**: CSS cascade fix, theme switcher clickability, contrast ratios, fonts

### Previous Sessions
- `dd23ab2`: Session recap — CSS cascade layer fix, theme switcher investigation
- `646bc3b`: CSS cascade layer fix (Tailwind v4 `@layer` conflict)
- `64ac830`: Case File icon swap (FolderOpen → FileText)
- `a29eb98`: Birthday popularity heat map

## Architecture

**Tech Stack:** React 19 + React Router 7 + Vite 7 + Tailwind CSS 4

**Key Files:**
- `src/index.css` — Tailwind v4 `@theme` config + `@layer base/components` custom styles
- `src/App.jsx` — Router, theme switching
- `src/components/ThemeSwitcher.jsx` — FAB with popover/bottom-sheet
- `src/components/layout/MainLayout.jsx` — `<main>` landmark wrapper with progress bar
- `src/components/themes/*.jsx` — Three theme components
- `src/data/` — Year, generation, and birthday JSON data

## Known Issues

- Bundle at 74.42KB brotli (99.2% of 75KB budget) — next feature may exceed
- PWA precache has 102 entries / 3.4MB — year data chunks should be excluded
- SPA redirect on GitHub Pages causes extra hop + console 404 (GH Pages limitation)
- CSP allows `unsafe-inline` for scripts (needed for GH Pages SPA redirect script)
- Lighthouse report page shows "errors-in-console" due to SPA redirect 404

## Next Priorities

1. Landing page redesign (with user input first)
2. Case file theme redesign (#66)
3. Reduce PWA precache size (exclude year data from service worker)
4. Test coverage for ThemeSwitcher, DatePicker, ThemeWrapper, ErrorBoundary
5. Bundle size optimization if approaching limit
