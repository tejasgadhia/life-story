# Project Status - Life Story
Last Updated: February 6, 2026

## Current State

**What's Working (locally verified):**
- CSS cascade layer fix — Tailwind v4 utilities now override base styles correctly
- All 3 themes render with proper padding, fonts, spacing (Timeline, Newspaper, Case File)
- Landing page (DatePicker) has correct Fraunces heading, padded input/button/cards
- 67 year files (1946-2012) with curated content
- Birthday popularity heat map visualization
- URL-based routing with shareable report URLs
- Font size controls, tab navigation, celebrity lists
- Loading screen with staged animation
- GitHub Pages auto-deploy via Actions

**BROKEN on Production (needs next session audit):**
- **Theme switcher buttons don't respond to clicks** — user confirmed, could not switch themes after opening the gear icon. MCP scripted clicks worked but real user clicks do not.
- **PWA service worker serves stale assets** — new deploys cause "Failed to fetch dynamically imported module" errors until hard refresh (Cmd+Shift+R). Users see broken site until they manually clear cache.
- **CSS fix unverified on production** — cascade layer fix works locally but user's browser still showed broken formatting. May be SW cache issue or production-specific CSS behavior.

**Needs Design Review:**
- Landing page — user unhappy with current design, needs proper restyle with input

## Recent Changes

### February 6, 2026 Session (CSS Cascade Fix)
- **CSS cascade layer fix** (`646bc3b`): Removed redundant `* { margin: 0; padding: 0 }` reset. Wrapped base styles in `@layer base`, component styles in `@layer components`. Root cause: Tailwind v4's `@import "tailwindcss"` puts utilities in `@layer utilities`, but unlayered global CSS always wins per CSS spec.
- **Icon swap** (`64ac830`): Changed Case File icon from `FolderOpen` to `FileText` for visual weight parity.
- **Theme switcher broken** — user reports buttons don't respond to real clicks. Needs investigation next session.

### Previous Sessions
- `78cc843`: Reverted failed landing page restyle
- `a29eb98`: Birthday popularity heat map
- `7c4819f`: Mobile responsive polish

## Architecture

**Tech Stack:** React 19 + React Router 7 + Vite 7 + Tailwind CSS 4

**Key Files:**
- `src/index.css` — Tailwind v4 `@theme` config + `@layer base/components` custom styles
- `src/App.jsx` — Router, theme switching
- `src/components/ThemeSwitcher.jsx` — FAB with popover/bottom-sheet
- `src/components/themes/*.jsx` — Three theme components
- `src/data/` — Year, generation, and birthday JSON data

## Next Priorities

1. **FULL AUDIT of Tailwind v4 migration** — verify every component works on production
2. **Fix theme switcher** — buttons not responding to real user clicks
3. **Fix service worker caching** — stale assets break site after deploys
4. Landing page redesign (with user input first)
5. Case file theme redesign (#66)
