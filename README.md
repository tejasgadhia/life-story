# Life Story

A birthday analysis webapp that generates personalized historical and generational reports. Enter a birthdate, get a ~5,000 word magazine-style report about your generation, cultural touchstones, and historical context.

## Live Demo

https://tejasgadhia.github.io/life-story/

**Password**: `1988` (MVP is limited to June 9, 1988)

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
- **Stateful URLs**: Bookmarkable tabs (e.g., `/timeline/formative-years`)

## URL Structure

```
/life-story/                          → Timeline, Overview tab
/life-story/timeline/overview         → Timeline, Overview tab
/life-story/timeline/formative-years  → Timeline, Formative Years tab
/life-story/newspaper/world-events    → Newspaper, World Events tab
/life-story/casefile/personal-insights → Case File, Personal Insights tab
```

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- React Router v7 (client-side routing)
- GitHub Pages (static hosting)
- GitHub Actions (auto-deploy on push)

## Data Sources

- Birthday frequency: FiveThirtyEight (CDC/SSA 1994-2014)
- Generational definitions: Pew Research Center
- Historical events, tech timeline, pop culture: Curated JSON datasets

## Project Structure

```
src/
├── components/
│   ├── themes/
│   │   ├── TimelineTheme.jsx
│   │   ├── NewspaperTheme.jsx
│   │   └── CaseFileTheme.jsx
│   ├── PasswordGate.jsx
│   ├── LoadingScreen.jsx
│   └── ErrorBoundary.jsx
├── data/
│   ├── 1988.json          # Year-specific content
│   └── birthdays.json     # Birthday rankings & celebrities
├── App.jsx                # Router, theme switching, font size
└── main.jsx
```

## Local Development

```bash
npm install
npm run dev      # Start dev server at localhost:5173
npm run build    # Build for production
npm run preview  # Preview production build
```

## Current Limitations (MVP)

- Only supports one birthdate: June 9, 1988
- US-centric content and data
- Desktop-first (not optimized for mobile)
- Password-protected (for controlled testing)

## Roadmap

- [ ] Support full date range (1960-2007)
- [ ] Mobile responsive design
- [ ] PDF export
- [ ] Birthday heat map visualization
- [ ] Remove password gate for public launch

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.


## License

This project is licensed under the [O'Saasy License Agreement](https://osaasy.dev/).

**TL;DR**: You can use, modify, and distribute this project freely. You can self-host it for personal or commercial use. However, you cannot offer it as a competing hosted/managed SaaS product.

See [LICENSE.md](LICENSE.md) for full details.
