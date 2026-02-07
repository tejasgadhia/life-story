# Learnings - Life Story
Last Updated: February 6, 2026

## What Worked Well

### CSS Cascade Layer Diagnosis
**Context**: Every Tailwind utility class was being overridden — zero padding, wrong fonts, wrong colors across the entire app
**What we did**: Identified that Tailwind v4's `@import "tailwindcss"` wraps utilities in `@layer utilities`, but our global CSS was unlayered. Per CSS spec, unlayered always beats layered.
**Why it worked**: Correct root cause. Wrapping globals in `@layer base` / `@layer components` restored the cascade: `base < components < utilities`.
**Reuse for**: Any Tailwind v4 migration where utilities stop working

### Chrome DevTools Computed Style Verification
**Context**: Needed to prove the cascade conflict theory
**What we did**: Used `getComputedStyle()` to check h1 fontFamily, button padding, input padding on the live site
**Why it worked**: Concrete evidence — showed Fraunces vs Playfair, 16px vs 0px padding
**Reuse for**: Any CSS specificity/cascade debugging

### Plan Mode for Responsive Polish (Previous Session)
**Context**: Needed to make targeted mobile fixes across 5 files without breaking desktop
**What we did**: Used plan mode to identify exact class changes before coding
**Why it worked**: Zero iteration — all 15 edits landed correctly first pass

## What Didn't Work

### Trusting Local Verification Without Production Check
**What we tried**: Verified CSS fix on local dev server, assumed production would match
**Why it failed**: Production has a service worker that caches old CSS/JS chunks. New deploys break until hard refresh. User saw broken site while we celebrated a "working" fix.
**Lesson**: **Always verify fixes on the actual production URL with a hard refresh.** Local dev ≠ production, especially with PWA service workers.

### Dismissing User's Bug Report Because Scripted Clicks Worked
**What we tried**: User said theme switcher doesn't work. MCP `click` tool failed, but `evaluate_script` with `element.click()` succeeded. Concluded "it works."
**Why it failed**: `element.click()` bypasses layout/rendering — it fires the handler directly. But real user clicks go through hit testing, z-index, pointer-events, overlays. If something is visually covering the button, real clicks fail but scripted clicks succeed.
**Lesson**: **If the user says it doesn't work, it doesn't work.** Scripted clicks proving functionality means nothing — the bug is likely in the click target area (z-index, overlays, pointer-events), not the handler.

### Following a Plan That Misidentified the Problem (Previous Session)
**What we tried**: Plan said landing page "lost vintage styling" — needed dark-brown restoration
**Why it failed**: Plan was wrong. Light charcoal/amber was intentional.
**Lesson**: Always `git show [commit]:file` to verify what the user actually had.

### Chrome DevTools MCP Click Tool for React
**What we tried**: Used MCP click tool to test React buttons
**Why it failed**: Doesn't reliably trigger React synthetic events or full browser hit-testing
**Lesson**: Use `evaluate_script` with `element.click()` for handler testing, but remember this doesn't test real click targeting

## Technical Patterns

### CSS Cascade Layer Order (Tailwind v4)
```
@import "tailwindcss";          → creates @layer base, components, utilities
@layer base { body, h1-h6 }    → merges with Tailwind's base layer
@layer components { .card }     → merges with Tailwind's components layer
/* Tailwind utilities win because: base < components < utilities */
```
**Critical rule**: NEVER leave custom styles unlayered when using Tailwind v4. Unlayered CSS always beats `@layer` CSS.

### Service Worker Cache Busting
**Problem**: Vite produces hashed filenames. New deploy = new hashes = old SW references dead files.
**Fix needed**: `skipWaiting()` + `clients.claim()` or a "new version available" prompt.

### Mobile Responsive Padding Pattern
`p-3 sm:p-4 md:p-6` — three tiers for 320px → tablet → desktop

### WCAG Touch Target Pattern
`py-4 md:py-3` — 44px+ on mobile, tighter on desktop

## Session Efficiency Metrics

### Time Distribution (Estimated) — This Session
- Planning/Design: 15% (plan mode, file reading)
- Implementation: 25% (CSS layer fix, icon swap)
- Debugging: 35% (production verification, theme switcher investigation)
- Testing: 15% (local dev, Chrome DevTools, production checks)
- Documentation: 10% (recap)

### Iteration Count
- CSS cascade fix: implemented correctly on first try
- Icon swap: implemented correctly on first try
- Theme switcher diagnosis: unresolved — couldn't reproduce real user's click failure
- Production verification: failed — fix works locally but production unverified

### Next Session Improvement
> **Actionable insight**: After pushing a fix, immediately verify on the PRODUCTION URL with a hard refresh — not just local dev. Also: when a user reports a click doesn't work, investigate the layout/z-index/overlay situation, don't just prove the handler fires via scripted clicks. The handler working is not the same as the button being clickable.
