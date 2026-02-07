# Learnings - Life Story
Last Updated: February 6, 2026

## What Worked Well

### Parallel Sub-Agent Strategy for Multi-Issue Sessions
**Context**: 7 open issues across 4 phases, needed to close them all in one session
**What we did**: Phase 1 done on main thread. Phase 2+ launched as parallel background sub-agents, each in its own git worktree.
**Why it worked**: Each issue was independent — separate worktrees prevented conflicts, background execution saved wall-clock time.
**Reuse for**: Any batch of independent bug fixes or features

### Aggressive Code Removal Over Incremental Fixes
**Context**: Mobile bottom sheet bug (#85) was hard to debug — multiple event handlers competing
**What we did**: Instead of fixing the ThemeSwitcher, user decided to remove it entirely along with both alternate themes
**Why it worked**: -1,402 lines = fewer bugs, smaller bundle, simpler codebase. The theme switcher was the source of the bug; removing it was the ultimate fix.
**Lesson**: When a feature is causing persistent problems, consider whether it's worth keeping at all

### Chrome DevTools MCP for Live Debugging
**Context**: Needed to verify deployed code behavior, check React props, simulate touch events
**What we did**: Used MCP tools to navigate production site, emulate mobile viewport, inspect DOM, check React fiber props, simulate mousedown+click sequences
**Why it worked**: Could verify the fix was deployed (via __reactProps inspection) and test event handling without manual browser work
**Limitation**: MCP click tool doesn't replicate real mobile touch event sequences — simulated mousedown+click worked fine but actual touch-to-mouse synthesis on real devices behaved differently

## What Didn't Work

### Assuming stopPropagation Fixes Event Bubbling
**What happened**: Original code had `onClick={closeMenu}` on wrapper + `stopPropagation()` on bottom sheet
**Why it didn't work**: On real mobile touch devices, the document `mousedown` listener (separate from React's onClick system) raced with button `click` events. `stopPropagation()` only stops React synthetic event bubbling, not native DOM event listeners.
**Lesson**: When debugging mobile touch issues, consider ALL event listeners (native + React), not just the React onClick chain

### Simulated Click Testing Doesn't Prove Real-World Behavior
**What happened**: Chrome DevTools MCP click, `element.click()`, and simulated mousedown+click all worked perfectly. User's actual phone still broken.
**Why**: Programmatic events bypass touch event synthesis, hit-testing, z-index layering, and real event timing
**Lesson**: If scripted clicks work but real clicks don't, the issue is in the event pipeline between touch and click — investigate native listeners, not React handlers

## Technical Patterns

### Mobile Bottom Sheet: Backdrop Click Pattern
```jsx
// WRONG: wrapper onClick catches everything, stopPropagation is fragile
<div className="fixed inset-0" onClick={closeMenu}>
  <div className="backdrop" />
  <div className="sheet" onClick={e => e.stopPropagation()}>{buttons}</div>
</div>

// RIGHT: only backdrop gets onClick, no stopPropagation needed
<div className="fixed inset-0">
  <div className="backdrop" onClick={closeMenu} />
  <div className="sheet">{buttons}</div>
</div>
```

### Desktop-Only Document Listeners
```javascript
// Skip mousedown listener on mobile — backdrop handles it
const handleClickOutside = (e) => {
  const desktopPanel = desktopPanelRef.current
  if (!desktopPanel || desktopPanel.offsetParent === null) return // mobile = no-op
  if (!desktopPanel.contains(e.target) && !triggerRef.current.contains(e.target)) {
    closeMenu()
  }
}
```

### PWA Runtime Caching for Data Chunks
```javascript
// vite.config.js - exclude from precache, cache on first access
globIgnores: ['assets/19*-*.js', 'assets/20*-*.js', 'assets/heatmap-*.js'],
runtimeCaching: [{
  urlPattern: /\/assets\/(19|20)\d{2}-.*\.js$/,
  handler: 'CacheFirst',
  options: { cacheName: 'year-data', expiration: { maxEntries: 70, maxAgeSeconds: 30 * 24 * 60 * 60 } }
}]
```

### CSS Cascade Layer Order (Tailwind v4)
```
@import "tailwindcss";          → creates @layer base, components, utilities
@layer base { body, h1-h6 }    → merges with Tailwind's base layer
@layer components { .card }     → merges with Tailwind's components layer
/* Tailwind utilities win because: base < components < utilities */
```
**Critical rule**: NEVER leave custom styles unlayered when using Tailwind v4.

## Session Efficiency Metrics

### Time Distribution (Estimated) — Theme Removal Session
- Bug investigation (#85): 40% (browser debugging, event tracing, two fix iterations)
- Theme removal: 35% (reading files, deleting, simplifying, updating tests)
- Verification: 15% (tests, build, deploy check, production verification)
- Documentation: 10% (recap)

### Iteration Count
- #85 bug fix: 3 iterations (wrapper onClick fix → mousedown no-op fix → theme removal)
- Theme removal: 1 iteration (clean sweep)

### Context Efficiency
- Chrome DevTools MCP saved time for production verification
- Spending time debugging #85 ultimately led to a better decision: remove the whole feature

### Next Session Improvement
> **Actionable insight**: For #74 landing page redesign, use `/tg-themes` IMMEDIATELY — present options, get approval, then code. Previous sessions wasted time coding before design was approved. No code until the user picks a direction.
