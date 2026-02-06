# Learnings - Life Story
Last Updated: February 5, 2026

## What Worked Well

### Synchronous State for Loading Screen Visibility
**Context**: Loading screen wasn't appearing during SPA navigation because state was set inside an async function
**What we did**: Set `setShowLoading(!hasCachedData)` synchronously in `useEffect` before the async `loadReport()` call, ensuring React renders the loading screen immediately
**Why it worked**: React batches async state updates differently than synchronous ones — setting showLoading before any await guarantees it's in the first render pass
**Reuse for**: Any "show overlay before async work" pattern — always set UI state synchronously, then kick off async work

### useCallback for Stable Callback References
**Context**: `LoadingScreen` animation was restarting because `onComplete` changed on every `ThemeWrapper` render, causing the effect to re-run
**What we did**: Wrapped `handleLoadingComplete` in `useCallback(() => setShowLoading(false), [])` for a stable reference
**Why it worked**: Stable reference means `LoadingScreen`'s `useEffect` dependency array doesn't change, so timers don't restart
**Reuse for**: Any callback passed to a child component that uses it in a `useEffect` dependency array

### Cache-Based Loading Screen Gating
**Context**: Needed loading screen on first visit but not on theme/tab switches
**What we did**: Check `sessionStorage.getItem(cacheKey) !== null` to decide whether to show loading screen — if data is cached, skip the animation entirely
**Why it worked**: Clean separation between "first time seeing this birthday" and "just switching views" without refs or complex state tracking
**Reuse for**: Any feature that should only show once per data-loading lifecycle

### Unified FAB Pattern (Desktop + Mobile)
**Context**: Desktop had a persistent sidebar, mobile had a gear FAB
**What we did**: Replaced both with a single FAB component that shows a popover on desktop and bottom sheet on mobile, sharing the same panel content via a `panelContent` JSX variable
**Why it worked**: Less code (274 lines vs 281), consistent UX, zero content overlap
**Reuse for**: Any settings/controls panel that needs responsive behavior

## What Didn't Work

### Pre-Loading Data Before Navigation
**What we tried**: `LandingPage` called `assembleReport()` and cached the result in sessionStorage before `navigate()`, so ThemeWrapper would find it cached and skip loading
**Why it failed**: This meant the loading screen never showed — ThemeWrapper always found cached data on mount. The "fake" loading screen had no window to display.
**What we did instead**: LandingPage navigates immediately, ThemeWrapper owns both loading and loading-screen display
**Lesson**: The component that orchestrates data loading should also orchestrate the loading UX. Don't split these responsibilities across components.

### useRef for Cross-Navigation State
**What we tried**: `hasShownLoadingRef` to track whether loading screen was already shown
**Why it failed**: When navigating between different birth dates, React sometimes reuses the component instance, so the ref persisted `true` from the previous birthday and skipped the loading screen for the new one
**What we did instead**: Check sessionStorage cache presence (external state) rather than component-internal refs
**Lesson**: For state that should reset when URL params change, prefer external signals (URL, sessionStorage) over component-level refs

### Unstable Function References as Effect Dependencies
**What we tried**: Inline `handleLoadingComplete` function passed as `onComplete` prop to `LoadingScreen`
**Why it failed**: New function reference on every render → `LoadingScreen`'s `useEffect([onComplete])` re-runs → timers restart → animation takes 2x as long
**What we did instead**: `useCallback` with empty deps
**Lesson**: Any function passed as a prop that's used in a child's `useEffect` deps MUST be wrapped in `useCallback`

## Technical Patterns

### Loading Screen Orchestration (ThemeWrapper)
**Implementation**:
1. `useEffect` fires on `birthday` change
2. Synchronously: reset state, check sessionStorage, set `showLoading`
3. Async: load data (from cache or fresh), set `reportData`
4. Loading screen runs independently via `onComplete` callback
5. Report renders when both `!showLoading` and `reportData` are truthy
**Use case**: Any data-driven page that needs a polished loading experience
**Benefits**: Loading animation and data loading run in parallel — if data loads fast, animation still completes fully

### Click-Outside Dismissal with Delayed Listener
**Implementation**: `setTimeout(() => document.addEventListener('mousedown', handler), 0)` in useEffect
**Use case**: Popovers that open on click — prevents the opening click from immediately triggering the close handler
**Benefits**: Avoids the common bug where click-to-open immediately fires click-outside-to-close

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 10%
- Implementation: 35%
- Debugging: 40%
- Testing: 10%
- Documentation: 5%

### Iteration Count
- Features implemented on first try: 0
- Features requiring iteration: 1 (loading screen fix)
- Average iterations per feature: 4
- Root causes identified: 3 (pre-caching, ref persistence, unstable callbacks)

### Context Efficiency
- Times requirements were clarified: 0 (clear from start)
- Times we backtracked: 2 (ref-based approach, then async state timing)
- Files read multiple times: 3 (ThemeWrapper, LandingPage, LoadingScreen)

### Tool Usage
- Most used: Read, StrReplace, Shell (build), Browser (testing)
- Saved time: Browser automation for testing SPA navigation flows
- Slowed us down: React StrictMode double-mounting made debugging harder — temporarily disabled to isolate issues

### Next Session Improvement
> **Actionable insight**: When debugging React rendering issues, disable StrictMode early to eliminate double-mount noise, then re-enable after fixing. Also, when a loading overlay "isn't showing," check if it's rendering but completing too fast (animation restart) before assuming it's not rendering at all.
