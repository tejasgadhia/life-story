# Learnings - Life Story
Last Updated: February 6, 2026

## What Worked Well

### Plan Mode for Responsive Polish
**Context**: Needed to make targeted mobile fixes across 5 files without breaking desktop
**What we did**: Used plan mode to identify exact class changes, line numbers, and verification steps before writing any code
**Why it worked**: Zero iteration — all 15 edits landed correctly on the first pass, build + tests passed immediately
**Reuse for**: Any cross-cutting CSS/class changes that touch multiple files

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

### Mobile Responsive Padding Pattern
**Implementation**: `p-3 sm:p-4 md:p-6` — three tiers instead of two
**Use case**: Any content container that needs to work at 320px
**Benefits**: Gains ~16px content width on smallest screens without affecting tablet/desktop. The `p-4 md:p-6` two-tier pattern wastes space below 640px.

### WCAG Touch Target Pattern
**Implementation**: `py-4 md:py-3` on tab buttons, `py-3 md:py-2` on list items
**Use case**: Any interactive element that needs 44px+ on mobile but tighter on desktop
**Benefits**: Mobile gets comfortable tap targets, desktop stays compact. Always add the mobile-first value then restrict at `md:`.

### Justified Text Mobile Fix
**Implementation**: `text-left md:text-justify`
**Use case**: Any long-form justified text that looks bad on narrow screens
**Benefits**: Justified text causes uneven word spacing on narrow columns. Left-align below `md:` breakpoint.

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

### Font Scale Cap with Media Query
**Implementation**:
```css
.content-scale-lg p, .content-scale-lg li { font-size: 1rem; line-height: 1.7; }
@media (min-width: 640px) {
  .content-scale-lg p, .content-scale-lg li { font-size: 1.125rem; }
}
```
**Use case**: User-controlled font size that could overflow on small screens
**Benefits**: Large mode stays readable at 320px without horizontal scrolling

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 30% (plan mode for responsive audit)
- Implementation: 50% (all edits)
- Debugging: 0% (zero issues)
- Testing: 15% (build + tests)
- Documentation: 5% (recap)

### Iteration Count
- Features implemented on first try: 1 (mobile responsive polish — all 15 edits)
- Features requiring iteration: 0
- Average iterations per feature: 1

### Context Efficiency
- Times requirements were clarified: 0 (plan mode handled everything)
- Times we backtracked: 0
- Files read multiple times: 0

### Tool Usage
- Most used: Read (5 files), Edit (15 edits), Bash (build + test)
- Saved time: Plan mode — identified exact line numbers and class changes upfront, zero trial-and-error
- Saved time: Parallel edits — made independent file edits simultaneously

### Next Session Improvement
> **Actionable insight**: The plan-first approach continues to pay off. For the next feature (heat map visualization), research D3.js calendar heatmap examples first via geminicli, then plan mode to choose approach before coding.
