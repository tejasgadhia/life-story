# Learnings - Life Story
Last Updated: 2026-02-05

## What Worked Well

### Parallel Subagents for Independent File Changes
**Context**: Phase 4 had 4 issues touching 4 different files with no dependencies between them.
**What we did**: Launched 3 parallel subagents — one for TimelineTheme (#67 + #55), one for CaseFile + Newspaper (#55 + #65), one for ThemeSwitcher (#54).
**Why it worked**: Each agent had clear, isolated scope. No merge conflicts. All 4 issues completed in a single round-trip.
**Reuse for**: Any batch of issues where changes don't overlap in the same file.

### Reusing Existing Fonts Instead of Adding New Ones
**Context**: Issue #67 asked to switch Timeline body from monospace to sans-serif.
**What we did**: Used DM Sans (`font-sans`) which was already loaded for the landing page, rather than adding a new font like Inter or Source Sans.
**Why it worked**: Zero added font weight, already cached from landing page visit, already configured in tailwind.config.js.
**Reuse for**: Always check existing font stack before adding new dependencies.

### CSS Hyphens as Standard Fix for Justified Text
**Context**: Newspaper theme had awkward word spacing in narrow justified columns.
**What we did**: Added `hyphens: auto` + `WebkitHyphens: auto` via inline styles.
**Why it worked**: This is the standard typographic solution. Browser handles word breaking intelligently at syllable boundaries. Much cleaner than reducing font size or changing column width.
**Reuse for**: Any justified text in narrow columns.

## What Didn't Work

### Browser Testing Viewport Limitations
**What we tried**: Resized Cursor browser to 1400px to test desktop sidebar visibility.
**Why it failed**: Cursor's embedded browser seems to cap at a certain viewport width, making it hard to verify desktop-only UI (hidden md:block).
**What we did instead**: Verified the code was correct via file reads and snapshot DOM inspection.
**Lesson**: For desktop-specific UI verification, rely on code review + DOM snapshots rather than screenshots when the browser viewport is limited.

## Technical Patterns

### Inline Styles for CSS Properties Not in Tailwind
**Implementation**: `style={{ hyphens: 'auto', WebkitHyphens: 'auto' }}` on JSX elements.
**Use case**: When Tailwind doesn't have a utility class for a CSS property (or the version in use doesn't include it).
**Benefits**: No need to add custom CSS utilities, keeps the style co-located with the component.

### max-w-prose for Readability
**Implementation**: Add `max-w-prose` to content wrapper divs (constrains to 65ch).
**Use case**: Long-form text content on wide screens. Not needed when layout already constrains width (columns, grids with narrow cells).
**Benefits**: Research-backed 45-75 character optimal line length without breaking grid layouts.

### ThemeSwitcher as Shared Control Surface
**Implementation**: Added "New Report" navigation to ThemeSwitcher rather than each theme's header.
**Use case**: Any cross-cutting UI feature needed on all report pages.
**Benefits**: Single file change instead of modifying 3 theme files. Desktop sidebar + mobile bottom sheet both get the feature.

## Efficiency Improvements

### Better Questions to Ask Upfront
- Check which fonts are already loaded before proposing new ones
- Verify Tailwind version for utility class availability

### Workflow Optimizations
- Batching related issues that touch the same file into one agent (e.g., #67 + #55 both in TimelineTheme)
- Running parallel agents for independent file changes

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 15%
- Implementation: 50%
- Debugging: 5%
- Testing/Verification: 20%
- Documentation: 10%

### Iteration Count
- Features implemented on first try: 4/4
- Features requiring iteration: 0
- Average iterations per feature: 1.0

### Context Efficiency
- Times requirements were clarified: 0
- Times we backtracked: 0
- Files read multiple times: 4 (all theme files — read for planning, verified after changes)

### Tool Usage
- Most used tools: Subagents (3 parallel), Read (file verification), Browser (visual testing)
- Tools that saved time: Parallel subagents cut implementation from sequential ~30 min to ~5 min
- Tools that slowed us down: Browser viewport limitations for desktop sidebar testing

### Next Session Improvement
> **Actionable insight**: This session was extremely efficient — 4 issues in one parallel round. For future sessions with independent file changes, always use parallel subagents. For UI verification on desktop breakpoints, test via code review rather than browser screenshots.
