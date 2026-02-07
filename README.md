# Life Story

> A birthday analysis webapp that generates personalized historical and generational reports.

**[Live Demo](https://tejasgadhia.github.io/life-story/)** | **[Changelog](CHANGELOG.md)**

## What It Does

Enter a birthdate and get a ~5,000 word magazine-style report about your generation, cultural touchstones, and historical context. The report covers everything from how common your birthday is to what technology shaped your childhood to what historical events defined your formative years.

Supports all birthdates from **1946 to 2012** (67 years of data spanning Boomers through Gen Z).

## Features

- **12-Section Report**: Birthday analysis, generational identity, childhood context, pop culture, technology timeline, historical milestones, career patterns, financial psychology, relationships, blind spots, and life roadmap
- **Birthday Heatmap**: Interactive 366-day calendar grid showing birthday frequency across the year, with hover tooltips showing rank and percentile
- **4-Tab Navigation**: Overview, Formative Years, World Events, Personal Insights
- **Birthday Ranking**: How common is your birthday? (1-366 with percentile)
- **Celebrity Birthdays**: Wikipedia-linked, sorted by birth year
- **Shareable URLs**: Bookmarkable reports with birthday in URL
- **Accessibility**: WCAG AA compliant, keyboard navigable, screen reader support
- **Offline Support**: Works offline after first visit (via service worker)
- **80 Tests**: 5 test suites covering components, hooks, and utilities

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7 (client-side routing)
- Vitest + Testing Library
- vite-plugin-pwa (offline caching)
- GitHub Pages (static hosting)
- GitHub Actions (auto-deploy on push)

## Data Sources

- **Birthday frequency**: FiveThirtyEight (CDC/SSA 1994-2014)
- **Generational definitions**: Pew Research Center
- **Historical events, tech timeline, pop culture**: Curated JSON datasets

## Project Structure

```
src/
├── components/
│   ├── themes/
│   │   └── TimelineTheme.jsx    # Report theme
│   ├── shared/
│   │   ├── BirthdayHeatMap.jsx  # 366-day calendar grid
│   │   └── CelebrityList.jsx    # Celebrity birthday list
│   ├── layout/
│   │   └── MainLayout.jsx       # Page layout wrapper
│   ├── DatePicker.jsx           # Landing page date input
│   ├── ThemeWrapper.jsx         # Theme context/styling
│   ├── LoadingScreen.jsx        # Skeleton loading UI
│   └── ErrorBoundary.jsx        # Error handling
├── hooks/
│   ├── useTabState.js           # Tab navigation state
│   ├── useMetaTags.js           # Document head management
│   ├── useScrollProgress.js     # Scroll position tracking
│   └── useRouteChangeReset.js   # Reset UI on route change
├── config/
│   ├── tabs.js                  # Tab configuration
│   └── constants.js             # App-wide constants
├── pages/
│   └── LandingPage.jsx          # Date picker page
├── routes/
│   └── AppRoutes.jsx            # Route definitions
├── data/
│   ├── years/                   # 67 year files (1946-2012)
│   ├── generations/             # 4 generation definitions
│   └── birthdays/               # 12 monthly celebrity files
├── utils/
│   ├── assembleReport.js        # Report data assembly
│   ├── dateUrl.js               # URL date encoding
│   ├── generations.js           # Generation lookups
│   ├── metaTags.js              # SEO meta tag generation
│   ├── loadFonts.js             # Font loading
│   └── placeholders.js          # Loading/error placeholders
├── App.jsx                      # Router and app shell
└── main.jsx                     # Entry point
```

## License

This project is licensed under the [O'Saasy License Agreement](https://osaasy.dev/).

**TL;DR**: You can use, modify, and distribute this project freely. You can self-host it for personal or commercial use. However, you cannot offer it as a competing hosted/managed SaaS product.

See [LICENSE.md](LICENSE.md) for full details.
