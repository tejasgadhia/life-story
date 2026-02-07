# Learnings - Life Story
Last Updated: February 6, 2026

## What Worked Well

### Plan Mode for Responsive Polish (Previous Session)
**Context**: Needed to make targeted mobile fixes across 5 files without breaking desktop
**What we did**: Used plan mode to identify exact class changes, line numbers, and verification steps before writing any code
**Why it worked**: Zero iteration — all 15 edits landed correctly on the first pass, build + tests passed immediately
**Reuse for**: Any cross-cutting CSS/class changes that touch multiple files

### Tailwind v4 Migration via Git Worktree (Previous Session)
**Context**: Dependabot PR #68 tried to auto-bump Tailwind v3→v4 + two other major versions
**What we did**: Closed the Dependabot PR, created a worktree, did a proper manual migration
**Why it worked**: Major version upgrades need manual migration, not auto-merge
**Reuse for**: Any Dependabot PR that bumps a major version

### @theme Block for Tailwind v4 Config
**Context**: Tailwind v4 replaces `tailwind.config.js` with CSS-first configuration
**What we did**: Moved all 18 colors, 7 font families, 2 breakpoints, and 2 animations into an `@theme` block in `src/index.css`
**Why it worked**: Everything in one file (CSS), no JS config to maintain
**Reuse for**: All future Tailwind v4 projects

### React Router Key Props for Theme Switching
**Context**: Theme switcher navigates between routes but React may reuse the same ThemeWrapper instance
**What we did**: Added `key="timeline"`, `key="newspaper"`, `key="casefile"` to ThemeWrapper in routes
**Why it worked**: Forces React to unmount/remount when switching themes, preventing stale state
**Reuse for**: Any React Router setup where the same component type is used across sibling routes

## What Didn't Work

### Following a Plan That Misidentified the Problem
**What we tried**: Plan said landing page "lost vintage styling" and needed dark-brown/cream restoration
**Why it failed**: The plan was WRONG. The light charcoal/amber design was intentional (commit `afa09f3`). The user's complaint was about the overall design quality, not the color scheme direction.
**What we did instead**: Made 3 increasingly bad attempts at dark-brown styling, then had to fully revert
**Lesson**: **ALWAYS check git history to see the actual before/after before accepting a plan's premise.** Don't trust a plan's root cause analysis without verifying it against the actual code history. The plan said "restore dark-brown" but the user actually wanted something better, not something older.

### Blind Color Swapping Without User Input
**What we tried**: Swapped charcoal colors → dark-brown → dark-brown with cream input → back to charcoal
**Why it failed**: Design is subjective. Multiple color iterations without user feedback = wasted time
**What we did instead**: Finally asked what the user actually wanted (they want a proper redesign)
**Lesson**: **For visual/design changes, get user approval on the direction BEFORE coding.** Use `/tg-themes` or show mockups. Never iterate on visual design in the dark.

### Chrome DevTools MCP Click Tool for Testing React
**What we tried**: Used MCP chrome-devtools click tool to test theme switcher buttons
**Why it failed**: The click tool doesn't fully propagate events through React's synthetic event system. Buttons appeared to not work, but `element.click()` via evaluate_script worked perfectly.
**What we did instead**: Used `evaluate_script` to dispatch full mousedown→mouseup→click sequences
**Lesson**: For testing React click handlers, use `evaluate_script` with `element.click()` or `dispatchEvent`, not the MCP click tool directly.

### Auto-Merging Major Version Bumps (Previous Session)
**What we tried**: Dependabot PR #68 tried to bump tailwindcss v3→v4 in one PR
**Why it failed**: Major versions have breaking changes
**What we did instead**: Closed PR, did manual migration
**Lesson**: Never auto-merge Dependabot PRs for major version bumps

## Technical Patterns

### Mobile Responsive Padding Pattern
**Implementation**: `p-3 sm:p-4 md:p-6` — three tiers instead of two
**Use case**: Any content container that needs to work at 320px
**Benefits**: Gains ~16px content width on smallest screens

### WCAG Touch Target Pattern
**Implementation**: `py-4 md:py-3` on tab buttons, `py-3 md:py-2` on list items
**Use case**: Any interactive element that needs 44px+ on mobile but tighter on desktop

### Justified Text Mobile Fix
**Implementation**: `text-left md:text-justify`
**Use case**: Any long-form justified text that looks bad on narrow screens

### Font Scale Cap with Media Query
**Implementation**:
```css
.content-scale-lg p, .content-scale-lg li { font-size: 1rem; line-height: 1.7; }
@media (min-width: 640px) {
  .content-scale-lg p, .content-scale-lg li { font-size: 1.125rem; }
}
```
**Use case**: User-controlled font size that could overflow on small screens

## Session Efficiency Metrics

### Time Distribution (Estimated) — This Session
- Planning/Design: 10% (read plan, read files)
- Implementation: 30% (3 attempts at DatePicker styling)
- Debugging: 40% (theme switcher testing, Chrome DevTools MCP issues)
- Testing: 10% (build verification, browser testing)
- Documentation: 10% (recap)

### Iteration Count
- Features implemented on first try: 0
- Features requiring iteration: 2 (landing page: 3 failed attempts + revert, theme switcher: couldn't reproduce)
- Average iterations per feature: 3+

### Context Efficiency
- Times requirements were clarified: 0 (should have been 1+ — should have asked user what design they wanted)
- Times we backtracked: 3 (dark-brown → dark-brown+cream-input → full revert)
- Files read: many, but the critical one (git history of the original design) was read too late

### Tool Usage
- Most used: Read, Edit, Bash, chrome-devtools MCP
- Saved time: `git show [commit]:file` — should have been the FIRST thing done
- Wasted time: Chrome DevTools MCP click tool — unreliable for React event testing
- Wasted time: Multiple blind color iterations without user feedback

### Next Session Improvement
> **Actionable insight**: For ANY visual/design change, do two things first: (1) `git show` the version the user liked to understand what they actually want, and (2) present design options to the user BEFORE writing code. This session wasted 80% of time on blind iterations that all got reverted. One upfront question — "what do you want it to look like?" — would have saved the entire session.
