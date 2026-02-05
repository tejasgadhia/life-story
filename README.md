# Life Story

> A birthday analysis webapp that generates personalized historical and generational reports.

**[Live Demo](https://tejasgadhia.github.io/life-story/)** | **[Changelog](CHANGELOG.md)**

## What It Does

Enter a birthdate and get a ~5,000 word magazine-style report about your generation, cultural touchstones, and historical context. The report covers everything from how common your birthday is to what technology shaped your childhood to what historical events defined your formative years.

## Features

- **12-Section Report**: Birthday analysis, generational identity, childhood context, pop culture, technology timeline, historical milestones, career patterns, financial psychology, relationships, blind spots, and life roadmap
- **Three Visual Themes**:
  - Timeline (default) - Modern, clean layout
  - Newspaper - Vintage 1880s newspaper aesthetic
  - Case File - FBI dossier style
- **4-Tab Navigation**: Overview, Formative Years, World Events, Personal Insights
- **Birthday Ranking**: How common is your birthday? (1-366)
- **Celebrity Birthdays**: Wikipedia-linked, sorted by birth year
- **Font Size Controls**: Small, Medium, Large
- **Shareable URLs**: Bookmarkable reports with birthday in URL
- **Offline Support**: Works offline after first visit (via service worker)

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router v7 (client-side routing)
- vite-plugin-pwa (offline caching)
- GitHub Pages (static hosting)
- GitHub Actions (auto-deploy on push)

## URL Structure

```
/life-story/                              → Landing page (DatePicker)
/life-story/{YYYY-MM-DD}/{theme}          → Report view
/life-story/{YYYY-MM-DD}/{theme}/{tab}    → Report with specific tab

Examples:
/life-story/1988-06-09/timeline           → Timeline, Overview tab
/life-story/1965-03-15/newspaper/world-events
/life-story/2000-01-01/casefile/personal-insights
```

## Local Development

```bash
npm install
npm run dev      # Start dev server at localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
```

## Deployment

### GitHub Pages Setup

1. Enable GitHub Pages in repo settings
2. Set source to "GitHub Actions"

### How It Works

- Vite builds to `dist/` with `base: '/life-story/'`
- GitHub Actions auto-deploys on push to main
- SPA routing uses 404.html redirect hack (GitHub Pages limitation)

### Verifying Deployment

1. Push changes to main
2. Wait for Actions workflow to complete (~1-2 min)
3. Visit https://tejasgadhia.github.io/life-story/
4. Test a deep link: `/life-story/1988-06-09/timeline`

## Data Sources

- **Birthday frequency**: FiveThirtyEight (CDC/SSA 1994-2014)
- **Generational definitions**: Pew Research Center
- **Historical events, tech timeline, pop culture**: Curated JSON datasets

## Project Structure

```
src/
├── components/
│   ├── themes/
│   │   ├── TimelineTheme.jsx
│   │   ├── NewspaperTheme.jsx
│   │   └── CaseFileTheme.jsx
│   ├── shared/
│   │   └── CelebrityList.jsx
│   ├── DatePicker.jsx
│   ├── LoadingScreen.jsx
│   └── ErrorBoundary.jsx
├── config/
│   └── tabs.js              # Centralized tab configuration
├── hooks/
│   └── useTabState.js       # Shared tab state management
├── data/
│   ├── years/               # 67 year files (1946-2012)
│   ├── generations/         # 4 generation definitions
│   └── birthdays/           # 12 monthly celebrity files
├── utils/
│   └── assembleReport.js    # Report data assembly
├── App.jsx                  # Router, theme switching, font size
└── main.jsx
```

## Current Limitations

- Supports birthdates from 1946-2012 only
- US-centric content and data
- Desktop-optimized (mobile responsive but not mobile-first)

## Roadmap

- [ ] PDF export
- [ ] Birthday heat map visualization
- [ ] Additional storytelling improvements
- [ ] Bundle size optimization

## License

This project is licensed under the [O'Saasy License Agreement](https://osaasy.dev/).

**TL;DR**: You can use, modify, and distribute this project freely. You can self-host it for personal or commercial use. However, you cannot offer it as a competing hosted/managed SaaS product.

See [LICENSE.md](LICENSE.md) for full details.
