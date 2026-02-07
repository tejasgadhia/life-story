# Learnings - Life Story
Last Updated: February 6, 2026

## What Worked Well

### Parallel Sub-Agent Audit Strategy
**Context**: Comprehensive site audit across 4 phases (production, build, Lighthouse, visual regression)
**What we did**: Ran Phase B (local build) and Phase C (Lighthouse) as parallel background sub-agents while Phase A (production) ran on main thread via Chrome DevTools MCP
**Why it worked**: Independent tasks with no shared state — saved significant wall-clock time
**Reuse for**: Any audit or analysis with independent workstreams

### elementFromPoint() for Click Target Debugging
**Context**: Theme switcher FAB reported as "not clickable"
**What we did**: Used `document.elementFromPoint(x, y)` at FAB center coordinates to check if anything was covering it
**Why it worked**: Definitively proved FAB was the top element at its coordinates. The "broken" click was actually a missing `cursor: pointer` (Tailwind v4 resets cursor to default on buttons).
**Reuse for**: Any "button doesn't work" report — always check hit-testing first

### Manual Contrast Ratio Calculation via evaluate_script
**Context**: Needed WCAG AA contrast audit but CSP blocked axe-core CDN injection
**What we did**: Implemented relative luminance formula directly in evaluate_script, computed contrast ratios for all color pairs
**Why it worked**: No external dependencies, works under any CSP policy
**Reuse for**: Accessibility audits on sites with strict CSP

### CSS Cascade Layer Diagnosis (Previous Session)
**Context**: Every Tailwind utility class was being overridden
**What we did**: Identified that Tailwind v4's `@import "tailwindcss"` wraps utilities in `@layer utilities`, but our global CSS was unlayered
**Why it worked**: Correct root cause. Wrapping globals in `@layer base` / `@layer components` restored the cascade
**Reuse for**: Any Tailwind v4 migration where utilities stop working

## What Didn't Work

### Assuming "Missing cursor" Means "Not Clickable"
**What we tried**: Initially investigated z-index stacking, invisible overlays, pointer-events
**Why it failed**: Over-complicated the diagnosis. The actual issue was just Tailwind v4's base reset setting `cursor: default` on buttons
**What we did instead**: Added `cursor-pointer` class — 1 word fix
**Lesson**: Start with the simplest explanation. Check computed styles before investigating layout.

### Trying to Change Core Color Variable for Text Contrast
**What we tried**: Changed `--color-amber` from #D99E46 to #8A6C1F to fix text-on-white contrast
**Why it failed**: `--color-amber` is used for `bg-amber` on the CTA button — making it dark olive-brown broke the button design
**What we did instead**: Created a new `--color-amber-text: #8A6C1F` variable, used only for text
**Lesson**: When fixing contrast, check ALL usages of a color variable before changing it. Create separate text variants if needed.

### Injecting CDN Scripts Under Strict CSP
**What we tried**: Injected axe-core from cdnjs.cloudflare.com via evaluate_script
**Why it failed**: CSP `script-src 'self' 'unsafe-inline'` blocks external script sources
**What we did instead**: Wrote manual contrast calculation using relative luminance formula
**Lesson**: Always check CSP before attempting CDN injection. Have fallback manual calculations ready.

### Trusting Local Verification Without Production Check (Previous Session)
**What we tried**: Verified CSS fix on local dev server, assumed production would match
**Why it failed**: Production has a service worker that caches old CSS/JS chunks
**Lesson**: **Always verify fixes on the actual production URL with a hard refresh.**

### Dismissing User's Bug Report Because Scripted Clicks Worked (Previous Session)
**What we tried**: Used `element.click()` to prove theme switcher "works"
**Why it failed**: Scripted clicks bypass hit-testing. Real clicks respect z-index, overlays, pointer-events.
**Lesson**: **If the user says it doesn't work, it doesn't work.**

## Technical Patterns

### CSS Cascade Layer Order (Tailwind v4)
```
@import "tailwindcss";          → creates @layer base, components, utilities
@layer base { body, h1-h6 }    → merges with Tailwind's base layer
@layer components { .card }     → merges with Tailwind's components layer
/* Tailwind utilities win because: base < components < utilities */
```
**Critical rule**: NEVER leave custom styles unlayered when using Tailwind v4.

### Tailwind v4 Button Cursor Reset
Tailwind v4 base styles set `cursor: default` on `<button>` elements. Always add `cursor-pointer` explicitly.

### Separate Color Variables for Text vs Background
When a color is used for both `bg-*` and `text-*`, create separate variables:
- `--color-amber: #D99E46` for backgrounds (high visibility)
- `--color-amber-text: #8A6C1F` for text (4.5:1 contrast on white)

### WCAG AA Contrast Thresholds
- Normal text: 4.5:1 minimum
- Large text (18px+ or 14px+ bold): 3.0:1 minimum
- UI components: 3.0:1 minimum
- Relative luminance formula: `L = 0.2126*R + 0.7152*G + 0.0722*B` (linearized sRGB)

### Nested Main Elements
Only one `<main>` landmark per page. If a layout wrapper uses `<main>`, child components must use `<div>` or `<section>`.

### Mobile Responsive Padding Pattern
`p-3 sm:p-4 md:p-6` — three tiers for 320px → tablet → desktop

### WCAG Touch Target Pattern
`py-4 md:py-3` — 44px+ on mobile, tighter on desktop

## Session Efficiency Metrics

### Time Distribution (Estimated) — Audit Session
- Planning/Design: 10% (plan already provided, agent parallelization strategy)
- Auditing/Investigation: 40% (production verification, Lighthouse, visual regression)
- Implementation: 25% (7 fixes across 6 files)
- Testing/Verification: 15% (local build, preview screenshots, computed style checks)
- Documentation: 10% (recap, MEMORY.md update)

### Iteration Count
- Contrast fix (sepia-brown): 1 iteration (replace_all for dual definition)
- Contrast fix (amber): 2 iterations (first attempt broke bg-amber, reverted, created amber-text)
- MainLayout main landmark: 2 iterations (forgot closing tag, then nested main issue)
- Other fixes: all first try
- Average iterations per fix: 1.3

### Context Efficiency
- Times requirements were clarified: 0 (plan was comprehensive)
- Times we backtracked: 1 (amber color change → revert → create separate variable)
- Files read multiple times: 4 (index.css, ThemeSwitcher.jsx, MainLayout.jsx, TimelineTheme.jsx)

### Tool Usage
- Most used tools: Chrome DevTools MCP (evaluate_script, take_screenshot, emulate), Edit, Read, Task (sub-agents)
- Tools that saved time: Parallel sub-agents for build analysis + Lighthouse audits
- Tools that slowed us down: CDN script injection (blocked by CSP, needed manual fallback)

### Next Session Improvement
> **Actionable insight**: The audit plan was excellent — detailed and parallelized. For future audits, always have a manual fallback for axe-core (contrast formula, DOM queries) since CSP blocks CDN injection. Also check ALL usages of a CSS variable before modifying it to avoid cascading visual breaks.
