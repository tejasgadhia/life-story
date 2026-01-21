# Life Story - Claude Context

Quick reference for Claude to understand this project. Read this first.

## What This Is

Birthday analysis webapp. User enters birthdate → gets personalized ~5,000 word report about their generation, historical context, and cultural touchstones. Vintage magazine aesthetic (TIME 1950s-70s style).

## Current State (v0.3.0)

- **MVP**: Only supports June 9, 1988
- **Password**: `1988`
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
/life-story/{theme}/{tab-slug}
```

Tab slugs: `overview`, `formative-years`, `world-events`, `personal-insights`

## Key Files

| File | Purpose |
|------|---------|
| `src/App.jsx` | Router, theme switcher, font size context |
| `src/components/themes/*.jsx` | The three theme components |
| `src/data/1988.json` | Year-specific content (sections) |
| `src/data/birthdays.json` | Birthday rankings, celebrities |
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
2. Add routes in `App.jsx`
3. Add to theme switcher in `App.jsx`

### Change tab structure
1. Update `TABS` array in each theme file
2. Update `TAB_SLUGS` in `App.jsx`

### Add content for new year
1. Create `src/data/YYYY.json` following 1988.json structure
2. Update App.jsx to load correct year based on input

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

1. Support more birthdates (expand beyond June 9, 1988)
2. Mobile responsive
3. PDF export
4. Heat map visualization
