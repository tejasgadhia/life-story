# Changelog

All notable changes to Life Story will be documented in this file.

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
