# Learnings - Life Story

Last Updated: 2026-02-05

## What Worked Well

### Git Worktree for Phase Work
**Context**: Needed to fix 3 issues without affecting main branch
**What we did**: Created `feature/phase-1` worktree, made all changes there, fast-forward merged back
**Why it worked**: Clean isolation, single merge, easy cleanup
**Reuse for**: Any multi-issue phase work via /tg-bugfix

### Scroll Indicator Pattern with Gradient Fades
**Context**: Mobile tab navigation showed no affordance that more tabs existed
**What we did**: Added `onScroll` handler + `useState` to track scroll position, rendered absolute-positioned gradient divs on edges
**Why it worked**: Lightweight, no extra dependencies, theme-appropriate colors
**Example**:
```jsx
const updateScrollIndicators = useCallback(() => {
  const el = tabListRef.current
  if (!el) return
  setCanScrollLeft(el.scrollLeft > 0)
  setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
}, [])

// Gradient div
{canScrollRight && (
  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-aged-paper to-transparent pointer-events-none md:hidden" />
)}
```
**Reuse for**: Any horizontally scrollable container that needs scroll affordance

### Parallel Edits Across Theme Files
**Context**: Same pattern needed in 3 theme files (TimelineTheme, NewspaperTheme, CaseFileTheme)
**What we did**: Made parallel StrReplace calls to all 3 files simultaneously
**Why it worked**: Much faster than editing sequentially; each file is independent
**Reuse for**: Any cross-cutting change that touches multiple files with similar patterns

### Comprehensive Review Before Launch
**Context**: Needed to ensure app was truly launch-ready
**What we did**: Ran tg-review (4 subagents), squirrelscan audit, manual browser testing
**Why it worked**: Caught multiple polish items that individual checks missed
**Reuse for**: Any pre-launch quality gate

### Icon Component Pattern with Lucide
**Context**: Needed to replace emojis with icons while maintaining dynamic rendering
**What we did**: Stored icon components as references, rendered with JSX
**Why it worked**: Clean separation, consistent sizing, proper accessibility
**Example**:
```jsx
const SECTION_CONFIG = {
  birthday: { title: 'Birthday', Icon: Cake, key: null },
}
<config.Icon className="w-5 h-5" aria-hidden="true" />
```
**Reuse for**: Any icon system migration, dynamic icon rendering

## What Didn't Work

### squirrelscan on SPA
**What we tried**: Running squirrelscan on client-rendered React app
**Why it failed**: Crawlers see empty HTML, not rendered content
**What we did instead**: Documented as expected behavior, noted SSR as future option
**Lesson**: SEO audits on SPAs require different expectations or SSR

### GitHub Pages Security Headers
**What we tried**: Checking for security headers (HSTS, X-Frame-Options)
**Why it failed**: GitHub Pages doesn't support custom headers
**What we did instead**: Added CSP via meta tag (only header option)
**Lesson**: Platform limitations affect security posture; document tradeoffs

## Technical Patterns

### Mobile Overflow Fix Pattern
**Implementation**: Add `overflow-x-hidden` to outermost theme container
```jsx
<div className="min-h-screen bg-vintage-cream overflow-x-hidden">
```
**Use case**: Any theme/page where internal elements use negative margins or min-w-fit
**Benefits**: Prevents horizontal scroll on mobile without affecting normal content flow

### Tab Text Label Pattern for Mobile
**Implementation**: Always show first word, full title on desktop
```jsx
<span className="hidden md:inline">{tab.title}</span>
<span className="md:hidden">{tab.title.split(' ')[0]}</span>
```
**Use case**: Any horizontal tab navigation with long titles
**Benefits**: Users always see text, not just icons

### Skip Link Implementation
**Implementation**:
```html
<a href="#main-content" class="sr-only focus:not-sr-only focus:absolute ...">
  Skip to main content
</a>
```
**Use case**: Any multi-page app with navigation
**Benefits**: Keyboard users can skip to content immediately

### Form Error Association
**Implementation**:
```jsx
<input aria-describedby={error ? 'birthdate-error' : undefined} aria-invalid={error ? 'true' : undefined} />
{error && <p id="birthdate-error" role="alert">{error}</p>}
```
**Use case**: Any form with validation errors
**Benefits**: Screen readers announce errors in context

### Color Contrast Quick Fixes
**Pattern**: Replace opacity-based colors with solid colors
```diff
- text-sepia-brown/70
+ text-sepia-brown
```
**Use case**: Any WCAG AA contrast failure
**Benefits**: Maintains design aesthetic while meeting 4.5:1 ratio

## Efficiency Improvements

### Better Questions to Ask Upfront
- "What's the deployment platform?" (affects security header options)
- "Is this a SPA or SSR?" (affects SEO audit expectations)
- "What accessibility level is required?" (WCAG A, AA, AAA)
- "Should I fix all issues in one commit or one per issue?" (affects workflow)

### Workflow Optimizations
- Use worktrees for multi-issue phases (clean isolation)
- Run build + tests after all edits, not after each one
- Verify mobile viewport in browser before committing
- Use parallel tool calls for independent file edits

## Dependencies & Tools

### squirrelscan
**What it does**: Website SEO and technical audit
**Why we chose it**: Quick CLI-based audit with actionable scores
**Gotchas**: Doesn't render JavaScript; SPAs score low

### tg-bugfix Skill
**What it does**: Structured issue resolution with worktree isolation
**Why we chose it**: Systematic approach to multi-issue phases
**Gotchas**: Worktree needs npm install for build/test

### tg-issues Skill
**What it does**: Fetches GitHub issues and generates phased plan
**Why we chose it**: Automatic prioritization and grouping
**Gotchas**: ISSUE-PLAN.md may be in .gitignore -- use -f to add

## Retrospective

**What went well:**
- Phase 1 completed cleanly: 3 issues, 1 commit, all verified
- Browser testing at 375px caught nothing extra -- code was correct
- Parallel edits to 3 theme files saved significant time

**What could have been faster:**
- Worktree needed npm install separately (10s overhead)
- Could have skipped dev server verification since build already passed

**What to do differently next time:**
- Pre-install deps in worktree immediately after creation
- For content-heavy phases (Phase 2), consider editing JSON data files in parallel with subagents

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 20% (issue triage, phase planning, plan review)
- Implementation: 50% (3 issues across 3 theme files)
- Debugging: 5% (lints, build, tests -- all passed first try)
- Testing: 15% (browser verification at 375px viewport)
- Documentation: 10% (ISSUE-PLAN.md, recap)

### Iteration Count
- Issues fixed on first try: 3/3
- Issues requiring iteration: 0
- Average iterations per issue: 1.0

### Context Efficiency
- Times requirements were clarified: 1 (user added tab text label request)
- Times we backtracked: 0
- Files edited: 3 (all three theme files)

### Tool Usage
- Most used tools: StrReplace (12x), Read (8x), Shell (15x)
- Tools that saved time: Parallel StrReplace calls (3 files at once)
- Tools that saved time: Task/explore subagent for initial codebase analysis

### Next Session Improvement
> **Actionable insight**: Phase 2 (Content Tone Overhaul) involves editing JSON data files with HTML content -- consider using subagents to rewrite content for different year files in parallel, since each year file is independent. This could cut the estimated 10 hours significantly.
