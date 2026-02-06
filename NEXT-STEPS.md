# Next Steps - Life Story
Last Updated: February 6, 2026

## Immediate Tasks (Start Here)

### 1. Share/Copy URL Button
**Priority**: HIGH
**File(s)**: Theme components or new shared component
**What to do**: Add a button that copies the current report URL to clipboard. URLs are already shareable via routing, just need a UI affordance. Could live in the FAB popover or as a standalone button in the header.
**Why**: Open issue #57, low-hanging fruit
**Estimated effort**: Quick

### 2. PDF Export
**Priority**: MEDIUM
**File(s)**: New utility + UI trigger
**What to do**: Generate a PDF of the current report. Consider client-side options (html2pdf.js, jsPDF, @react-pdf/renderer) vs server-side. Client-side preferred since we're on GitHub Pages.
**Why**: Listed as priority #2 in CLAUDE.md
**Estimated effort**: Substantial

### 3. Heat Map Visualization
**Priority**: MEDIUM
**File(s)**: New component, likely using D3.js or Chart.js
**What to do**: Visualize birthday popularity data as a calendar heat map (365 days, colored by frequency)
**Why**: Listed as priority #3 in CLAUDE.md
**Estimated effort**: Substantial

## Future Enhancements

- Case file theme redesign (#66)
- Additional themes
- Social sharing (Open Graph meta tags per report)

## Questions to Resolve

- Should the FAB be hidden on the landing page? (Currently shows but has no birthday context)
- PDF export: html2pdf.js (screenshot approach) vs @react-pdf/renderer (layout approach)?
- Heat map: D3.js calendar heatmap vs custom SVG?

## Blockers

- None

## Next Session Starter Prompt

> "Continue working on life-story. Last session: completed mobile responsive polish (WCAG touch targets, 320px padding, Newspaper text alignment, font scale cap). All 3 themes polished, 20/20 tests pass, deployed to GitHub Pages. Next: share/copy URL button (#57) — quick win. Then PDF export. Reference NEXT-STEPS.md for details."
