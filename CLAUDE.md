# Life Story - Claude Context

Quick reference for Claude to understand this project. Read this first.

## What This Is

Birthday analysis webapp. User enters birthdate → gets personalized ~5,000 word report about their generation, historical context, and cultural touchstones. Vintage magazine aesthetic (TIME 1950s-70s style).

## Current State (v0.4.0)

- **Supports**: All birthdates from 1946-2012
- **Live URL**: https://tejasgadhia.github.io/life-story/
- **Local path**: `/Users/tejasgadhia/Claude/life-story`

## Three Themes

| Theme | File | Style |
|-------|------|-------|
| Timeline | `TimelineTheme.jsx` | Modern, clean, default |
| Newspaper | `NewspaperTheme.jsx` | 1880s newspaper |
| Case File | `CaseFileTheme.jsx` | FBI dossier |

## Navigation Structure

4 tabs across all themes:
1. **Overview** - Birthday, Generation, Comparison
2. **Formative Years** - Childhood, Pop Culture, Technology
3. **World Events** - History, Career, Financial
4. **Personal Insights** - Relationships, Blind Spots, Roadmap

## URL Format

```
/life-story/                              → Landing page (DatePicker)
/life-story/{YYYY-MM-DD}/{theme}          → Report view (default: overview tab)
/life-story/{YYYY-MM-DD}/{theme}/{tab}    → Report view with specific tab

Examples:
/life-story/1988-06-09/timeline           → Timeline theme, Overview tab
/life-story/1988-06-09/newspaper/world-events
/life-story/1965-03-15/casefile/personal-insights
```

Tab slugs: `overview`, `formative-years`, `world-events`, `personal-insights`

**Shareable URLs**: Reports can now be shared/bookmarked - the birthday is in the URL.

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Entry point - font size provider, router setup |
| `src/routes/AppRoutes.jsx` | All route definitions |
| `src/context/FontSizeContext.js` | Font size context + useFontSize hook |
| `src/config/constants.js` | MIN_YEAR, MAX_YEAR, TAB_SLUGS |
| `src/config/themeSwitcher.js` | Theme and font size config arrays |
| `src/components/ThemeSwitcher.jsx` | Desktop sidebar + mobile FAB |
| `src/components/ThemeWrapper.jsx` | Data loading, tab state, theme rendering |
| `src/components/LandingPage.jsx` | DatePicker with pre-loading |
| `src/components/layout/MainLayout.jsx` | Layout wrapper with ThemeSwitcher |
| `src/components/themes/*.jsx` | The three theme components |
| `src/config/tabs.js` | Centralized tab configuration |
| `src/utils/birthdayUtils.js` | URL parsing/formatting for birthdays |
| `src/data/years/*.json` | Year-specific content (67 files: 1946-2012) |
| `src/data/generations/*.json` | Generation definitions (boomer, genx, millennial, genz) |
| `src/data/birthdays/*.json` | Birthday rankings, celebrities (12 monthly files) |
| `src/utils/assembleReport.js` | Assembles report data from year/generation/birthday data |
| `public/404.html` | GitHub Pages SPA routing fix |
| `CHANGELOG.md` | Version history |

## Data Structure

```javascript
// reportData shape (assembled in App.jsx)
{
  birthDate: 'June 9, 1988',
  birthYear: 1988,
  generation: 'Millennial',
  generationSpan: '1981-1996',
  birthdayRank: 177,
  birthdayPercentile: 52,
  celebrities: [{ name, year, description }], // sorted oldest first
  sections: { /* 12 sections with html content */ },
  yearEvents: ['Prozac hit the market', ...]
}
```

## Deployment

- GitHub Pages via GitHub Actions
- Auto-deploys on push to `main`
- Build output: `dist/`

## Common Tasks

### Add a new theme
1. Create `src/components/themes/NewTheme.jsx`
2. Add routes in `src/routes/AppRoutes.jsx`
3. Add to `themes` array in `src/config/themeSwitcher.js`

### Change tab structure
1. Update `TABS` array in `src/config/tabs.js` (centralized)
2. Update `TAB_SLUGS` in `src/config/constants.js` for URL routing

### Add content for new year
1. Create `src/data/years/YYYY.json` following existing year file structure
2. Year data is dynamically imported based on birth year in `assembleReport.js`

## Design System

### Button Padding
- **Desktop theme/controls**: `px-3 py-2` (sidebar buttons)
- **Desktop font size buttons**: `px-3 py-1.5` (smaller)
- **Mobile buttons**: `py-4 px-4` (44px+ touch targets)
- **Tab buttons**: `py-3` with responsive horizontal padding

### Responsive Padding Pattern
- **Content areas**: `p-4 md:p-6` (standardized across themes)

### Font Size Scaling (TimelineTheme)
Font size controls scale all text elements:
```jsx
{
  sm: '[&_p]:text-sm [&_h2]:text-lg [&_h3]:text-base [&_strong]:text-sm',
  base: '[&_p]:text-base [&_h2]:text-xl [&_h3]:text-lg [&_strong]:text-base',
  lg: '[&_p]:text-lg [&_h2]:text-2xl [&_h3]:text-xl [&_strong]:text-lg',
}
```

### Font Classes (Tailwind)
- `font-display`: Playfair Display (headings)
- `font-body`: Courier Prime (body text)
- `font-blackletter`: UnifrakturMaguntia (Newspaper masthead)
- `font-typewriter`: Special Elite (CaseFile theme)

## Writing Style Rules

**NEVER use these AI phrases**:
- "dive into" / "delve into"
- "unleash" / "unlock potential"
- "it's worth noting"
- "at the end of the day"
- "game changer" / "robust" / "leverage"

**DO**: Write like a witty magazine journalist. Direct, clear, slightly dry humor.

## Git Workflow

```bash
# After changes
npm run build
git add -A
git commit -m "Description"
git push

# For releases
git tag -a v0.X.0 -m "Release notes"
git push --tags
```

## Next Priorities

1. Mobile responsive
2. PDF export
3. Heat map visualization
