# Learnings - Life Story
Last Updated: February 6, 2026

## What Worked Well

### Tailwind v4 Migration via Git Worktree
**Context**: Dependabot PR #68 tried to auto-bump Tailwind v3→v4 + two other major versions — would have broken the build
**What we did**: Closed the Dependabot PR, created a worktree, did a proper manual migration with the CSS-first config approach
**Why it worked**: Major version upgrades need manual migration, not auto-merge. Worktree kept main stable while we worked.
**Reuse for**: Any Dependabot PR that bumps a major version — always close and migrate manually

### @theme Block for Tailwind v4 Config
**Context**: Tailwind v4 replaces `tailwind.config.js` with CSS-first configuration
**What we did**: Moved all 18 colors, 7 font families, 2 breakpoints, and 2 animations into an `@theme` block in `src/index.css`
**Why it worked**: Everything in one file (CSS), no JS config to maintain, Vite plugin handles content detection automatically
**Reuse for**: All future Tailwind v4 projects — skip the JS config entirely

### Synchronous State for Loading Screen Visibility
**Context**: Loading screen wasn't appearing during SPA navigation because state was set inside an async function
**What we did**: Set `setShowLoading(!hasCachedData)` synchronously in `useEffect` before the async `loadReport()` call
**Why it worked**: React batches async state updates differently than synchronous ones
**Reuse for**: Any "show overlay before async work" pattern

### useCallback for Stable Callback References
**Context**: `LoadingScreen` animation was restarting because `onComplete` changed on every render
**What we did**: Wrapped `handleLoadingComplete` in `useCallback(() => setShowLoading(false), [])`
**Why it worked**: Stable reference means child's `useEffect` deps don't change
**Reuse for**: Any callback passed to a child that uses it in a `useEffect` dependency array

### Unified FAB Pattern (Desktop + Mobile)
**Context**: Desktop had a persistent sidebar, mobile had a gear FAB
**What we did**: Replaced both with a single FAB showing popover on desktop, bottom sheet on mobile
**Why it worked**: Less code, consistent UX, zero content overlap
**Reuse for**: Any settings/controls panel that needs responsive behavior

## What Didn't Work

### Auto-Merging Major Version Bumps
**What we tried**: Dependabot PR #68 tried to bump tailwindcss v3→v4, plugin-react v4→v5, vite v6→v7 in one PR
**Why it failed**: Major versions have breaking changes — Tailwind v4 completely changed how config works (JS → CSS), removed PostCSS requirement, changed directives
**What we did instead**: Closed PR, did manual migration with proper config conversion
**Lesson**: Never auto-merge Dependabot PRs for major version bumps. Always review and migrate manually.

### Pre-Loading Data Before Navigation
**What we tried**: `LandingPage` cached data before `navigate()` so ThemeWrapper would skip loading
**Why it failed**: Loading screen never showed — ThemeWrapper always found cached data
**What we did instead**: LandingPage navigates immediately, ThemeWrapper owns both loading and loading-screen
**Lesson**: The component that orchestrates data loading should also orchestrate the loading UX

## Technical Patterns

### Tailwind v4 CSS-First Config
**Implementation**:
```css
@import "tailwindcss";

@theme {
  --color-vintage-cream: #F5F0E8;
  --font-display: 'Playfair Display', Georgia, serif;
  --breakpoint-xs: 475px;
  --animate-slide-up: slide-up 0.3s ease-out;

  @keyframes slide-up {
    0% { transform: translateY(100%); }
    100% { transform: translateY(0); }
  }
}
```
**Use case**: All Tailwind v4 projects — replaces `tailwind.config.js`
**Benefits**: Single file, CSS-native, no JS build step for config, auto content detection via Vite plugin

### Tailwind v4 Vite Plugin Setup
**Implementation**:
```js
import tailwindcss from '@tailwindcss/vite'
// Add tailwindcss() BEFORE react() in plugins array
plugins: [tailwindcss(), react(), ...]
```
**Use case**: Any Vite + Tailwind v4 project
**Benefits**: Replaces PostCSS config entirely, faster builds, no autoprefixer needed

### Loading Screen Orchestration (ThemeWrapper)
**Implementation**: Check sessionStorage → set showLoading synchronously → async load data → animation runs independently via onComplete callback
**Use case**: Any data-driven page needing polished loading UX
**Benefits**: Loading animation and data loading run in parallel

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 15%
- Implementation: 55%
- Debugging: 5%
- Testing: 20%
- Documentation: 5%

### Iteration Count
- Features implemented on first try: 1 (Tailwind v4 migration)
- Features requiring iteration: 0
- Average iterations per feature: 1

### Context Efficiency
- Times requirements were clarified: 0 (clear plan from plan mode)
- Times we backtracked: 0
- Files read multiple times: 1 (index.css — read in main, then in worktree)

### Tool Usage
- Most used: Read, Write, Bash (npm install/build), Chrome DevTools (screenshot verification)
- Saved time: Chrome DevTools for visual verification of all 3 themes without manual browser switching
- Saved time: Plan mode — having a clear migration plan prevented any trial-and-error

### Next Session Improvement
> **Actionable insight**: For dependency migrations, always use plan mode first. This session had zero backtracking because the plan identified every file to change and every risk area to test. Apply this to mobile responsive polish next — plan which breakpoints/components to test before coding.
