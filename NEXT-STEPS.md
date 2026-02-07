# Next Steps - Life Story
Last Updated: February 6, 2026

## Immediate Tasks (Start Here)

### 1. Full Audit of Tailwind v4 Migration
**Priority**: HIGH — CSS cascade fix was applied but production behavior is unverified
**File(s)**: `src/index.css`, all component files
**What to do**:
- Hard refresh production site (Cmd+Shift+R) to bypass service worker cache
- Check EVERY page/component on production: landing page, all 3 themes (timeline, newspaper, casefile), all 4 tabs, heat map, theme switcher, font size controls
- For each: verify padding, fonts, colors, spacing, interactive elements
- If anything is broken: check Chrome DevTools computed styles to see if unlayered CSS is still winning over `@layer utilities`
- Compare production CSS (`dist/assets/index-*.css`) layer structure to verify `@layer base < @layer components < @layer utilities`
**Why**: CSS cascade layer fix was verified locally but user reported production still broken. Need to confirm whether it's a real issue or just service worker caching stale CSS.
**Estimated effort**: Medium (30-60 min thorough check)

### 2. Fix Theme Switcher Click Handling
**Priority**: HIGH — core functionality broken
**File(s)**: `src/components/ThemeSwitcher.jsx`
**What to do**:
- Open gear icon on production, try clicking each theme button
- Check if the issue is: (a) z-index/overlay blocking clicks, (b) event handler not firing, (c) navigate() failing, (d) stale service worker JS
- Investigate whether the desktop popover panel or the close button overlay is intercepting clicks
- Check if the `onClick={(e) => e.stopPropagation()}` on mobile bottom sheet is causing issues
- Test on multiple browsers (Chrome, Safari, Firefox)
**Why**: User explicitly confirmed buttons don't respond. Scripted `element.click()` works but real clicks don't — suggests a CSS/layout issue (invisible overlay, pointer-events, z-index).
**Estimated effort**: Medium

### 3. Fix Service Worker Stale Cache
**Priority**: HIGH — breaks site for all users on every deploy
**File(s)**: `vite.config.js` (PWA config), possibly `public/sw.js`
**What to do**:
- Consider `skipWaiting()` + `clients.claim()` to force immediate activation
- Or add a "new version available" toast that prompts reload
- Test: deploy a change, load in incognito, verify new content loads without hard refresh
**Why**: Every deploy breaks the site until users manually hard refresh. Old chunk filenames get deleted but service worker still references them.
**Estimated effort**: Medium

### 4. Landing Page Redesign
**Priority**: MEDIUM — blocked on design approval
**File(s)**: `src/components/DatePicker.jsx`
**What to do**: Use `/tg-themes` to present 4-6 design options BEFORE writing code. Get user approval on direction first.
**Why**: User unhappy with current design. Multiple blind fix attempts failed last 2 sessions.

### 5. Case File Theme Redesign (#66)
**Priority**: MEDIUM
**File(s)**: `src/components/themes/CaseFileTheme.jsx`

## Blockers

- Theme switcher and production CSS verification must happen before any new feature work
- Landing page redesign blocked on user design approval

## Next Session Starter Prompt

> "Continue working on life-story. Last session applied a CSS cascade layer fix for the Tailwind v4 migration (unlayered global styles were overriding all utilities). It works locally but production may still be broken — need to hard refresh and do a full audit. CRITICAL: theme switcher buttons don't respond to real user clicks on production. Also service worker serves stale assets after deploys. Start with a full audit of every page/component on production. Reference NEXT-STEPS.md for details."
