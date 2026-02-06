# Project Status - Life Story
Last Updated: February 6, 2026

## Current State

**What's Working:**
- All 3 themes (Timeline, Newspaper, Case File) rendering correctly
- 67 year files (1946-2012) with curated content
- Unified FAB theme switcher (desktop popover + mobile bottom sheet)
- URL-based routing with shareable report URLs
- Font size controls, tab navigation, celebrity lists
- Loading screen with ~4.3s staged animation on new report generation
- Session caching — loading screen skipped on theme/tab switches
- PWA with offline support
- GitHub Pages auto-deploy via Actions
- **Tailwind CSS v4** with CSS-first config (`@theme` block in index.css)
- **Vite Plugin React v5** (drop-in upgrade from v4)

**In Progress:**
- Nothing actively in progress

**Not Started:**
- Mobile responsive polish (CLAUDE.md priority #1)
- PDF export (CLAUDE.md priority #2)
- Heat map visualization (CLAUDE.md priority #3)
- Share/copy URL button (#57)

## Recent Changes

### February 6, 2026 Session (Tailwind v4 Migration)
- Migrated from Tailwind CSS v3 (PostCSS) to v4 (Vite plugin + CSS-first config)
- Upgraded `@vitejs/plugin-react` from v4 to v5
- Replaced `tailwind.config.js` with `@theme` block in `src/index.css`
- Added `@tailwindcss/vite` plugin to `vite.config.js`
- Removed `postcss.config.js`, `autoprefixer`, `postcss` dependencies
- Cleaned up unused `src/App.css` (Vite starter boilerplate)
- Closed Dependabot PR #68, created and merged PR #70
- Bumped CSS size limit from 10KB to 12KB (TW v4 includes more base styles)

### February 5, 2026 Session (Loading Screen Fix)
- Fixed loading screen never appearing (was pre-cached before navigation)
- Moved report loading from `LandingPage.jsx` to `ThemeWrapper.jsx`
- Loading screen now shows synchronously for uncached birthdays

### February 5, 2026 Session (FAB + Popover)
- Replaced intrusive desktop sidebar theme switcher with unified FAB + popover (#69)
- FAB in bottom-right corner on all screen sizes

## Architecture

**Tech Stack:**
- React 19 + React Router 7
- Vite 7 build tooling
- Tailwind CSS 4 (CSS-first config via @tailwindcss/vite)
- GitHub Pages deployment

**Key Files:**
- `src/pages/LandingPage.jsx` — DatePicker, navigates immediately to report URL
- `src/components/ThemeWrapper.jsx` — Report loading, caching, loading screen orchestration
- `src/components/LoadingScreen.jsx` — 7-stage animated loading screen
- `src/components/ThemeSwitcher.jsx` — Unified FAB with popover/bottom-sheet
- `src/components/themes/*.jsx` — Three theme components
- `src/data/` — Year, generation, and birthday JSON data
- `src/utils/assembleReport.js` — Report data assembly
- `src/index.css` — Tailwind v4 `@theme` config + custom CSS classes

**Deleted in Migration:**
- `tailwind.config.js` — Theme config moved to `@theme` block in `src/index.css`
- `postcss.config.js` — Replaced by `@tailwindcss/vite` plugin
- `src/App.css` — Unused Vite starter CSS

## Known Issues
- Case file theme feels cheesy (#66)
- No share button for report URLs (#57)

## Next Priorities
1. Mobile responsive polish
2. PDF export
3. Heat map visualization
