# Life Story - Claude Context

Quick reference for Claude to understand this project. Read this first.

## What This Is

Birthday analysis webapp. User enters birthdate → gets personalized ~5,000 word report about their generation, historical context, and cultural touchstones. Magazine aesthetic (TIME 1950s-70s style).

## Current State (v1.0.0)

- **Supports**: All birthdates from 1946-2012
- **Live URL**: https://tejasgadhia.github.io/life-story/
- **Local path**: `/Users/tejasgadhia/Claude/life-story`
- **Theme**: Timeline (single theme — clean, modern layout)
- **Tests**: 80 tests across 5 suites

## Navigation Structure

4 tabs:
1. **Overview** - Birthday, Generation, Comparison
2. **Formative Years** - Childhood, Pop Culture, Technology
3. **World Events** - History, Career, Financial
4. **Personal Insights** - Relationships, Blind Spots, Roadmap

## URL Format

```
/life-story/                              → Landing page (DatePicker)
/life-story/{YYYY-MM-DD}                  → Report view (Overview tab)
/life-story/{YYYY-MM-DD}/{tab}            → Report with specific tab

Examples:
/life-story/1988-06-09                    → Overview tab
/life-story/1965-03-15/world-events       → World Events tab
```

Tab slugs: `overview`, `formative-years`, `world-events`, `personal-insights`

**Shareable URLs**: Reports can be shared/bookmarked — the birthday is in the URL.

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Router and app shell |
| `src/components/themes/TimelineTheme.jsx` | Report theme component |
| `src/components/shared/BirthdayHeatMap.jsx` | 366-day interactive calendar grid |
| `src/components/shared/CelebrityList.jsx` | Celebrity birthday list |
| `src/components/layout/MainLayout.jsx` | Page layout wrapper |
| `src/components/ThemeWrapper.jsx` | Theme context/styling |
| `src/components/DatePicker.jsx` | Landing page date input |
| `src/pages/LandingPage.jsx` | Landing page |
| `src/routes/AppRoutes.jsx` | Route definitions |
| `src/config/tabs.js` | Centralized tab configuration |
| `src/hooks/useTabState.js` | Tab navigation state |
| `src/hooks/useMetaTags.js` | Document head management |
| `src/hooks/useScrollProgress.js` | Scroll position tracking |
| `src/hooks/useRouteChangeReset.js` | Reset UI on route change |
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

### Change tab structure
1. Update `TABS` array in `src/config/tabs.js` (centralized)
2. Update `TAB_SLUGS` in `App.jsx` for URL routing

### Add content for new year
1. Create `src/data/years/YYYY.json` following existing year file structure
2. Year data is dynamically imported based on birth year in `assembleReport.js`

## Design System

### Button Padding
- **Mobile buttons**: `py-4 px-4` (44px+ touch targets)
- **Tab buttons**: `py-3` with responsive horizontal padding

### Responsive Padding Pattern
- **Content areas**: `p-4 md:p-6` (standardized)

### Font Classes (Tailwind)
- `font-display`: Newsreader (headings)
- `font-sans`: Inter (body text)

### Color Tokens
- `primary-*`: Amber scale (50-950), CTA/accent color
- `secondary-*`: Charcoal scale (50-950), text/backgrounds
- `heritage-*`: cream, paper, sepia, ink — warm editorial tones
- Full reference: `.ui-design/design-system.md`

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
git tag -a vX.Y.Z -m "Release notes"
git push --tags
```
