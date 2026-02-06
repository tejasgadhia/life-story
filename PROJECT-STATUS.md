# Project Status - Life Story
Last Updated: February 5, 2026

## Current State

**What's Working:**
- All 3 themes (Timeline, Newspaper, Case File) rendering correctly
- 67 year files (1946-2012) with curated content
- Unified FAB theme switcher (desktop popover + mobile bottom sheet)
- URL-based routing with shareable report URLs
- Font size controls, tab navigation, celebrity lists
- Loading screen with progress indicator
- PWA with offline support
- GitHub Pages auto-deploy via Actions

**In Progress:**
- Nothing actively in progress

**Not Started:**
- Mobile responsive polish (CLAUDE.md priority #1)
- PDF export (CLAUDE.md priority #2)
- Heat map visualization (CLAUDE.md priority #3)
- Share/copy URL button (#57)

## Recent Changes

### February 5, 2026 Session
- Replaced intrusive desktop sidebar theme switcher with unified FAB + popover (#69)
- FAB in bottom-right corner on all screen sizes
- Desktop: compact popover above FAB; Mobile: bottom sheet (unchanged)
- Added `fade-up` animation for desktop popover
- Refactored ThemeWrapper loading flow for better state management
- Simplified LandingPage to delegate loading to ThemeWrapper

## Architecture

**Tech Stack:**
- React 18 + React Router
- Vite 7 build tooling
- Tailwind CSS 3
- GitHub Pages deployment

**Key Files:**
- `src/components/ThemeSwitcher.jsx` — Unified FAB with popover/bottom-sheet
- `src/components/ThemeWrapper.jsx` — Report loading and caching
- `src/components/themes/*.jsx` — Three theme components
- `src/data/` — Year, generation, and birthday JSON data
- `src/utils/assembleReport.js` — Report data assembly

## Known Issues
- Case file theme feels cheesy (#66)
- No share button for report URLs (#57)

## Next Priorities
1. Mobile responsive polish
2. PDF export
3. Heat map visualization
