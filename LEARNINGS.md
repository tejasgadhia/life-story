# Learnings - Life Story
Last Updated: February 5, 2026

## What Worked Well

### Unified FAB Pattern (Desktop + Mobile)
**Context**: Desktop had a persistent sidebar, mobile had a gear FAB
**What we did**: Replaced both with a single FAB component that shows a popover on desktop and bottom sheet on mobile, sharing the same panel content via a `panelContent` JSX variable
**Why it worked**: Less code (274 lines vs 281), consistent UX, zero content overlap
**Reuse for**: Any settings/controls panel that needs responsive behavior

### CSS-Based Responsive Branching
**Context**: Needed different panel presentations for desktop vs mobile from same component
**What we did**: Used `hidden md:block` and `md:hidden` CSS classes to show/hide desktop popover vs mobile bottom sheet, with a `getActivePanel()` helper to detect which is visible via `offsetParent`
**Why it worked**: No JS media query listeners, no re-renders on resize, simple and reliable
**Reuse for**: Any component needing different layouts per breakpoint without JS detection

## What Didn't Work

### Single Ref for Two Panels
**What we tried**: Using one `panelRef` for both desktop popover and mobile bottom sheet
**Why it failed**: Both panels render in the DOM simultaneously (CSS hides one), so the ref can only point to one element
**What we did instead**: Separate `desktopPanelRef` and `mobilePanelRef` with `getActivePanel()` to resolve the active one
**Lesson**: When using CSS display toggling, each variant needs its own ref

## Technical Patterns

### FAB Toggle with Visual State
**Implementation**: FAB button swaps icon (Settings/X) and inverts colors (`bg-vintage-cream text-dark-brown` vs `bg-dark-brown/95 text-vintage-cream`) based on `isMenuOpen` state
**Use case**: Any floating action button that toggles a panel
**Benefits**: Clear visual feedback about open/closed state, aria-expanded for accessibility

### Click-Outside Dismissal with Delayed Listener
**Implementation**: `setTimeout(() => document.addEventListener('mousedown', handler), 0)` in useEffect
**Use case**: Popovers that open on click — prevents the opening click from immediately triggering the close handler
**Benefits**: Avoids the common bug where click-to-open immediately fires click-outside-to-close

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 30%
- Implementation: 50%
- Testing: 15%
- Documentation: 5%

### Iteration Count
- Features implemented on first try: 1 (ThemeSwitcher rewrite)
- Features requiring iteration: 1 (ref split fix)
- Average iterations per feature: 1.5

### Context Efficiency
- Times requirements were clarified: 1 (discussed approach before implementing)
- Times we backtracked: 0
- Files read multiple times: 1 (ThemeSwitcher.jsx — read, then verified after edit)

### Tool Usage
- Most used: Read, StrReplace, Shell (build), Browser (testing)
- Saved time: Browser snapshot for visual verification without manual testing
- Slowed us down: Nothing notable

### Next Session Improvement
> **Actionable insight**: The approach discussion before implementation (sidebar vs FAB vs inline) was valuable and prevented wasted work. Continue doing design discussion before code for UI changes.
