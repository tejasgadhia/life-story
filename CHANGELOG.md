# Changelog

All notable changes to Life Story will be documented in this file.

## [1.0.0] - 2026-02-07

### Added
- **Birthday Heatmap**: Interactive 366-day calendar grid showing birthday frequency across the year, with hover tooltips displaying rank and percentile
- **WCAG AA Compliance**: Full accessibility audit and fixes (#79-#84) — keyboard navigation, screen reader support, contrast ratios, ARIA labels
- **80 Tests**: 5 test suites covering DatePicker, BirthdayHeatMap, useTabState, useRouteChangeReset, and assembleReport

### Removed
- **Newspaper Theme**: Removed entirely (Timeline is the sole theme)
- **Case File Theme**: Removed entirely
- **ThemeSwitcher**: No longer needed with single theme
- **Font Size Controls**: Removed to simplify the interface

### Fixed
- Heatmap tooltip jitter on hover — three root causes fixed: conditional rendering, cell-level mouse events, and CSS transitions (#86)
- Mobile bottom sheet race condition — document mousedown listener firing before button click (#85)

### Changed
- **URL Structure**: Simplified from `/life-story/{YYYY-MM-DD}/{theme}/{tab}` to `/life-story/{YYYY-MM-DD}/{tab}` (no theme segment)
- **Architecture**: Cleaner component hierarchy with ThemeWrapper, MainLayout, and dedicated hooks

## [0.5.0] - 2026-02-04

### Changed
- **Content Quality Update (v2.0)**: All 66 year files (1946-2012) rewritten to professional magazine standard
  - ~4,850 words per year with vivid sensory details
  - Sharp, witty magazine journalism voice (TIME 1950s-70s style)
  - Specific cultural references and historical context
  - All template placeholders replaced with actual values
  - 11 sections per year: childhood, pop culture, technology, history, career, financial, comparison, generation, relationships, blind spots, roadmap

## [0.4.1] - 2026-02-03

### Added
- **Dynamic Social Sharing**: Personalized Open Graph and Twitter Card meta tags
  - Shared links now show "Born June 9, 1988 - A Millennial Story" instead of generic text
  - Description includes generation span and birthday ranking
  - Canonical URLs update per-page for SEO
- New `useMetaTags` hook for managing document head metadata
- New `metaTags.js` utility with helper functions

## [0.4.0] - 2026-02-03

### Added
- **Shareable URLs**: Birthday is now part of the URL (`/life-story/1988-06-09/timeline`)
- **Direct URL Access**: Navigate directly to any report by entering the URL
- **Session Caching**: Reports are cached in sessionStorage per birthday for faster navigation

### Changed
- **URL Structure**: Changed from `/life-story/{theme}/{tab}` to `/life-story/{YYYY-MM-DD}/{theme}/{tab}`
- **Landing Page**: DatePicker now navigates to URL with birthday instead of managing state internally
- **Theme/Tab Switching**: Preserves birthday in URL when changing themes or tabs

### Fixed
- Old-style URLs (without birthday) now redirect to landing page
- Invalid dates in URL redirect to landing page with proper validation

## [0.3.0] - 2025-01-21

### Added
- **URL Slugs**: Changed from numeric tabs (`/timeline/1`) to readable slugs (`/timeline/overview`, `/timeline/formative-years`, etc.)
- **GitHub Pages SPA Routing**: Added `404.html` redirect hack for proper refresh handling
- **Font Size Controls**: Left sidebar now has S/M/L font size buttons, persists to localStorage
- **Wikipedia Links**: All celebrity names link to Wikipedia, sorted by birth year (oldest first)

### Changed
- **Timeline Theme**:
  - Moved birthday date to header bar (was separate hero section)
  - Consolidated hero into 2-column: Generation + Rank/Percentile
  - Removed different font styling on first paragraph
  - Widened max-width from 6xl to 7xl

- **Newspaper Theme** (major redesign):
  - Changed background from brown to neutral gray
  - Paper color now cream/ivory instead of amber
  - Removed profile picture and historical scene placeholders
  - "By The Numbers" now has context/explanations
  - Generation box reformatted (Millennial → 1981-1996 → Born date)
  - Filled empty spaces with expanded content
  - Font size picker now works

- **Theme Switcher**:
  - Moved from top-right overlay to left sidebar
  - Vertical icon-only buttons with hover tooltips
  - Added font size controls below theme buttons

### Fixed
- Birthday date visibility on dark background (Timeline)
- Blank page on browser refresh (GitHub Pages routing)
- Font size picker not affecting Newspaper content

## [0.2.0] - 2025-01-21

### Added
- Unified 4-tab navigation across all themes
- Tab structure: Overview, Formative Years, World Events, Personal Insights
- Each tab contains 3 related sections

### Changed
- Timeline: Removed scroll-based left nav, added sticky tab header
- Newspaper: Restructured from 3 pages to 4 tabs
- Case File: Restructured from 12 tabs to 4 grouped tabs
- URL routing preserves tab state when switching themes

### Removed
- Scroll-based navigation (incompatible with multi-column layouts)
- Per-theme navigation patterns (now unified)

## [0.1.0] - 2025-01-21

### Added
- Three visual themes: Timeline, Newspaper, Case File
- Password gate (password: 1988)
- Loading screen with vintage aesthetic
- Error boundary with retry
- React Router for navigation
- Expanded celebrity birthday data with categories

### Changed
- Improved readability: left-aligned text, better spacing
- Throttled scroll handlers (50ms)

## [0.0.1] - Initial Development

### Added
- Basic React + Vite + Tailwind setup
- Single birthdate support (June 9, 1988)
- Year-based content caching strategy
- Static JSON data files for 1988
- GitHub Pages deployment via GitHub Actions
