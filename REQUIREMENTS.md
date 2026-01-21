# Life Story - Project Requirements

## Project Overview
A desktop-first webapp that generates personalized historical and generational analysis reports based on a user's birthdate. Combines entertaining presentation with research-backed insights in a vintage magazine aesthetic.

## Tech Stack

### Frontend
- React 18+
- Tailwind CSS (core framework)
- UIKit 3.x (component library for clean, modern base)
- MDBootstrap components (for additional UI elements)
- AyroUI patterns (for vintage-modern hybrid aesthetic)
- D3.js or Chart.js (data visualizations)

### Backend
- Node.js/Express OR Python/Flask
- PostgreSQL (report caching)
- Claude API (content generation)

### Development
- Vite (build tool)
- Local development at `/Users/tejasgadhia/Claude/life-story`
- Git for version control (push to GitHub later)

## Design Philosophy

### Visual Style
- **Base aesthetic**: Vintage 1950s-1970s TIME magazine
- **Modern touches**: Clean UIKit/MDBootstrap components with vintage overlays
- **Color palette**: Sepia tones, aged paper textures, muted reds/blues/blacks
- **Typography**: 
  - Headlines: Bold serif (Georgia, Playfair Display)
  - Body: Typewriter-style monospace or clean sans-serif
  - Accents: Vintage script fonts sparingly
- **Layout**: Magazine spread format, multi-column grid

### Component Style References
- UIKit: Clean cards, navigation, forms
- MDBootstrap: Modal dialogs, buttons, tooltips
- AyroUI: Hero sections, feature blocks, testimonials

### Key Visual Elements
1. Aged paper background textures
2. Vintage distressed borders
3. Heat map calendar (like FiveThirtyEight style)
4. Timeline graphics (horizontal, vintage newspaper style)
5. Sepia/B&W photo treatments
6. Pull quotes with vintage styling
7. Section dividers (ornamental, old-press style)

## Data Sources

### 1. Birthday Commonality Data
- **Source**: FiveThirtyEight GitHub repository
- **Dataset**: US births 1994-2014 (CDC/SSA)
- **Files**: 
  - `US_births_1994-2003_CDC_NCHS.csv`
  - `US_births_2000-2014_SSA.csv`
- **Use**: Rank all 366 possible birthdates, create heat map

### 2. Generational Definitions (Pew Research Standard)
```
Silent Generation: 1928-1945
Baby Boomers: 1946-1964
Generation X: 1965-1980
Millennials (Gen Y): 1981-1996
Generation Z: 1997-2012
Generation Alpha: 2013-2025
Generation Beta: 2025-2039
```

### 3. Historical Events Database
- Major world events by year
- Political milestones (elections, wars, treaties)
- Disasters and crises (9/11, COVID-19, 2008 crash)
- Cultural shifts (marriage equality, civil rights)

### 4. Technology Timeline
- Consumer tech launches (iPhone, Facebook, etc.)
- Internet milestones
- Social media platform dates
- Gaming console releases

### 5. Pop Culture Data
- Billboard charts (top songs by year)
- Box office data (top movies by year)
- TV shows by era
- Fashion trends and slang

### 6. Economic Data
- Recession/boom periods
- Housing market cycles
- Stock market crashes
- Unemployment rates by decade

## Content Sections (12 Total)

### A. Birthday Commonality
**Length**: 200-300 words + visualization
**Content**:
- Rank out of 366 dates
- Percentile comparison
- Heat map calendar visualization
- Conception date calculation (9 months prior)
- Celebrity birthday twins (3-5 names)
**Tone**: Fun, trivia-focused

### B. Childhood Context Analysis
**Length**: 400-500 words
**Content**:
- Major world events (ages 0-12)
- Technology landscape of childhood
- Economic conditions
- Educational environment
- Pop culture during formative years
**Tone**: Magazine feature, nostalgic

### C. Generational Identity
**Length**: 300-400 words
**Content**:
- Generation name and year span
- Core characteristics of cohort
- Defining historical moment
- Comparison with adjacent generations
- Shared values and worldview
**Tone**: Analytical but accessible

### D. Pop Culture Touchstones
**Length**: 400-500 words
**Content**:
- Top movies during ages 10-18
- Defining music of the era
- TV shows that shaped generation
- Video games, toys, trends
- Fashion and slang
**Tone**: Nostalgic, conversational, fun

### E. Technology Timeline
**Length**: 300-400 words
**Content**:
- "You were X years old when..." tech milestones
- First computer, internet, smartphone adoption
- Social media platform launches
- How this differs from other generations
**Tone**: Witty, observational

### F. Historical Milestone Timeline
**Length**: 500-600 words
**Content**:
- "You were X years old when..." major events
- Political events (elections, inaugurations)
- Wars and conflicts
- Disasters and crises
- Economic shifts
**Tone**: Factual but engaging, chronological

### G. Career & Professional Alignment
**Length**: 400-500 words
**Content**:
- Economic conditions when entering workforce
- Industries shaped by your generation
- Work style and collaboration preferences
- Career trajectory patterns
**Tone**: Professional but relatable

### H. Relationship & Communication Patterns
**Length**: 300-400 words
**Content**:
- Communication preferences (calls vs. texts)
- Dating norms of your era
- Relationship expectations
- Conflict resolution styles
**Tone**: Conversational, some humor

### I. Financial Psychology
**Length**: 400-500 words
**Content**:
- Economic events that shaped money beliefs
- Spending vs. saving tendencies
- Investment attitudes
- Debt and housing market experience
**Tone**: Practical, slightly sardonic

### J. Psychological Blind Spots
**Length**: 300-400 words
**Content**:
- Common generational weaknesses
- Root causes (formative experiences)
- Self-awareness prompts
- Growth strategies
**Tone**: Direct, constructive, honest

### K. Life Phase Roadmap
**Length**: 500-600 words
**Content**:
- Breakdown by decade (20s, 30s, 40s, etc.)
- What to expect in each phase
- Generational differences in lifecycle timing
- Key decision points ahead
**Tone**: Forward-looking, advisory

### L. Generational Comparison
**Length**: 300-400 words
**Content**:
- Population size of birth year
- Life expectancy projections
- How you differ from ±5/10 year cohorts
- Demographic statistics
**Tone**: Data-driven, comparative

**Total Report Length**: ~4,500-5,500 words

## Content Generation Strategy

### Approach
**Hybrid Model**: Pre-computed data + LLM-generated narrative

#### Pre-Computed (Static Data)
- Birthday rankings (366 dates)
- Generational boundaries
- Historical event timelines
- Tech milestone dates
- Pop culture charts
- Economic cycle data

#### LLM-Generated (Claude API)
- Section narratives (A-L)
- Synthesized analysis
- Personalized insights
- Cohort comparisons

### Caching Logic
1. User enters birthdate (MM/DD/YYYY)
2. Check database for existing report
3. If exists → return cached report (instant)
4. If not exists → generate via Claude API
5. Store complete report in PostgreSQL
6. Return report to user

**Cache Key**: `YYYY-MM-DD` format (e.g., `1988-06-09`)

**Estimated Cache Size**: 
- ~100 birth years (1920-2020) × 365 dates = ~36,500 unique reports
- Average report: ~50KB JSON
- Total storage: ~1.8GB (very manageable)

### LLM Prompt Structure
```
System: You are a data journalist writing a personalized historical/generational analysis report.

Context:
- Birthdate: {YYYY-MM-DD}
- Generation: {generation_name}
- Birthday Rank: {rank} out of 366
- Static data: {historical_events}, {tech_milestones}, {pop_culture}

Task: Generate Section {X}: {section_name}
Word count: {target_words}
Tone: {tone_description}
Style: Magazine journalism, conversational, some humor, no corporate speak

Requirements:
- Use provided static data as factual foundation
- Add narrative synthesis and insights
- Avoid generic AI phrases ("delve into", "leverage", etc.)
- Be specific and concrete
- Include 2-3 memorable details or anecdotes
```

## Writing Style Guidelines

### Voice & Tone
- Natural magazine journalism style
- Direct, clear, slightly dry with strategic wit
- Self-aware about generational stereotypes
- No corporate jargon or marketing speak
- Second person ("you") for personalized sections
- Third person for factual/historical sections

### Prohibited Phrases
**Never use**:
- "dive into" / "delve into"
- "unleash" / "unlock potential"
- "let me" / "let's"
- "it's worth noting"
- "at the end of the day"
- "game changer" / "robust" / "leverage"
- Any phrase that screams AI or marketing copy

### Good Example
> "Your generation invented the word 'adulting' because you were the first to collectively realize that being a grown-up is basically a scam nobody warned you about. You graduated into the worst job market since the Great Depression, watched housing prices double while wages stayed flat, and somehow got blamed for killing everything from napkins to department stores."

### Bad Example
> "This cohort demonstrated delayed lifecycle transitions compared to previous generations, experiencing unique economic headwinds that shaped their financial decision-making paradigms and consumer behavior patterns."

### Formatting
- Short paragraphs (3-5 sentences max)
- Varied sentence structure
- Occasional sentence fragments for emphasis
- Lists when appropriate (not overused)
- Pull quotes for key insights

## User Flow

### 1. Landing Page
**Layout**:
- Hero section with vintage newspaper masthead
- Tagline: "How common is your birthday? What shaped your generation?"
- Single date input form (large, vintage-styled)
- CTA button: "Generate My Report"
- Brief explanation (2-3 sentences)

**Design Elements**:
- Aged paper background
- Vintage typography
- Subtle animations on hover

### 2. Loading State
**Display**:
- "Generating your personalized report..."
- Vintage printing press animation OR typewriter effect
- Progress hints: "Analyzing historical events...", "Calculating birthday rank...", etc.
- Duration: 0-3 seconds (cached) or 15-30 seconds (new generation)

### 3. Report Display
**Layout**:
- Sticky header with birthdate and navigation
- Hero section: Birthday ranking + heat map
- 12 content sections (A-L)
- Magazine-style multi-column layout
- Vintage section dividers
- Pull quotes and callout boxes

**Navigation**:
- Sticky sidebar or top nav
- Jump-to-section links
- Smooth scroll behavior
- Progress indicator (current section highlighted)

### 4. Footer Actions
**Options**:
- Download PDF button (primary CTA)
- Social share buttons (secondary, optional)
- "Generate Another Report" button
- Brief disclaimer text

## Features

### MVP (Phase 1)
✅ Date input form
✅ All 12 content sections
✅ Vintage magazine design
✅ Birthday heat map visualization
✅ Technology timeline graphics
✅ Historical events timeline
✅ Report caching system
✅ PDF export functionality
✅ Responsive desktop layout (1024px+)

### Post-MVP (Future Phases)
❌ User accounts / login
❌ Mobile responsive design
❌ Social sharing integration
❌ Commenting system
❌ Report customization options
❌ Multiple language support
❌ Embeddable widget

## Technical Requirements

### Database Schema

#### Table: `reports`
```sql
CREATE TABLE reports (
    id SERIAL PRIMARY KEY,
    birth_date DATE NOT NULL UNIQUE,
    generation VARCHAR(50) NOT NULL,
    birthday_rank INTEGER NOT NULL,
    content JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_birth_date ON reports(birth_date);
```

#### Content JSONB Structure
```json
{
    "sections": {
        "birthday_commonality": { "html": "...", "data": {...} },
        "childhood_context": { "html": "..." },
        "generational_identity": { "html": "..." },
        "pop_culture": { "html": "..." },
        "technology": { "html": "..." },
        "historical_milestones": { "html": "..." },
        "career": { "html": "..." },
        "relationships": { "html": "..." },
        "financial": { "html": "..." },
        "blind_spots": { "html": "..." },
        "life_roadmap": { "html": "..." },
        "comparison": { "html": "..." }
    },
    "metadata": {
        "celebrity_birthdays": ["Name 1", "Name 2"],
        "conception_date": "YYYY-MM-DD"
    }
}
```

### API Endpoints

#### `POST /api/generate`
Request:
```json
{
    "birth_date": "1988-06-09"
}
```

Response:
```json
{
    "success": true,
    "cached": false,
    "report": {
        "birth_date": "1988-06-09",
        "generation": "Millennial",
        "birthday_rank": 252,
        "sections": { ... }
    }
}
```

#### `GET /api/report/:date`
Returns cached report if exists, 404 if not.

### Performance Targets
- **Initial load**: < 2 seconds
- **Cached report**: < 1 second
- **New generation**: < 30 seconds
- **PDF generation**: < 5 seconds

## Development Phases

### Phase 1: Data Setup (Week 1)
- [ ] Download FiveThirtyEight birth data
- [ ] Process and rank all 366 dates
- [ ] Create historical events database
- [ ] Compile tech milestone timeline
- [ ] Gather pop culture data (movies, music)
- [ ] Set up PostgreSQL database

### Phase 2: Backend (Week 1-2)
- [ ] Set up Node.js/Express or Python/Flask
- [ ] Implement database models
- [ ] Create Claude API integration
- [ ] Build prompt templates for each section
- [ ] Implement caching logic
- [ ] Test content generation quality

### Phase 3: Frontend Foundation (Week 2)
- [ ] Set up React + Vite
- [ ] Install Tailwind, UIKit, MDBootstrap
- [ ] Create component library
- [ ] Build landing page
- [ ] Create date input form
- [ ] Design loading states

### Phase 4: Report Display (Week 3)
- [ ] Build report layout components
- [ ] Implement heat map visualization
- [ ] Create timeline graphics
- [ ] Design section templates
- [ ] Add navigation/scroll behavior
- [ ] Style with vintage aesthetic

### Phase 5: Polish & Export (Week 3-4)
- [ ] Implement PDF generation
- [ ] Add print styles
- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Content quality review
- [ ] Add disclaimers

### Phase 6: Deploy (Week 4)
- [ ] Set up hosting
- [ ] Configure environment variables
- [ ] Database migrations
- [ ] SSL certificate
- [ ] Domain setup
- [ ] Launch!

## Quality Checklist

### Content Quality
- [ ] Reports read naturally (not obviously AI)
- [ ] Facts are accurate and verifiable
- [ ] Tone is consistent across sections
- [ ] No prohibited AI phrases
- [ ] Humor lands appropriately
- [ ] Insights are specific, not generic

### Design Quality
- [ ] Vintage aesthetic is cohesive
- [ ] Typography is readable
- [ ] Colors evoke aged paper/newsprint
- [ ] Visualizations are clear
- [ ] Layout doesn't feel cluttered
- [ ] Component styles harmonize

### Technical Quality
- [ ] Fast load times (< 3s)
- [ ] No console errors
- [ ] Database queries optimized
- [ ] API responses cached
- [ ] PDF export works reliably
- [ ] Cross-browser compatible (Chrome, Firefox, Safari)

### User Experience
- [ ] Clear value proposition
- [ ] Easy to navigate
- [ ] Engaging enough to read multiple sections
- [ ] Shareable/screenshot-worthy
- [ ] Informative and entertaining balance
- [ ] No confusing UI elements

## Disclaimers

### Required Disclaimers (Footer)
```
This report analyzes US cultural and historical context. Generational 
characteristics are research-based generalizations and may not apply to 
everyone. Birthday data sourced from FiveThirtyEight (CDC/SSA 1994-2014). 
Generational definitions from Pew Research Center. This is for entertainment 
and educational purposes.
```

### Tone
- Conversational, not legalese
- Brief and unobtrusive
- Placed at bottom of report
- Small font, muted color

## Success Metrics

### Launch Goals
- Generate 100 unique reports in first week
- Average time on page: 5+ minutes
- PDF downloads: 20%+ of visitors
- Low bounce rate (< 40%)
- Social shares: 10%+ of visitors

### Long-term Goals
- 10,000+ cached reports
- SEO ranking for "birthday analysis" terms
- Organic traffic growth
- Potential monetization via ads or premium features

## File Structure
```
/Users/tejasgadhia/Claude/life-story/
├── README.md
├── REQUIREMENTS.md (this file)
├── INSTRUCTIONS.md
├── package.json
├── vite.config.js
├── tailwind.config.js
├── .env.example
├── .gitignore
│
├── /public
│   ├── /fonts
│   └── /images
│
├── /src
│   ├── /components
│   │   ├── /landing
│   │   ├── /report
│   │   ├── /visualizations
│   │   └── /layout
│   │
│   ├── /styles
│   │   ├── vintage.css
│   │   └── global.css
│   │
│   ├── /utils
│   │   ├── dateUtils.js
│   │   ├── generationUtils.js
│   │   └── api.js
│   │
│   ├── /data
│   │   ├── birthData.json
│   │   ├── generations.json
│   │   ├── historicalEvents.json
│   │   └── techTimeline.json
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── /server
│   ├── /routes
│   ├── /controllers
│   ├── /models
│   ├── /prompts
│   └── server.js
│
└── /scripts
    ├── processBirthData.js
    └── seedDatabase.js
```

## Dependencies

### Frontend
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "tailwindcss": "^3.4.0",
  "uikit": "^3.17.0",
  "mdb-react-ui-kit": "^7.0.0",
  "d3": "^7.8.0",
  "html2pdf.js": "^0.10.1"
}
```

### Backend
```json
{
  "express": "^4.18.0",
  "pg": "^8.11.0",
  "dotenv": "^16.0.0",
  "@anthropic-ai/sdk": "^0.27.0",
  "cors": "^2.8.5"
}
```

## Environment Variables
```bash
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/lifestory

# API Keys
ANTHROPIC_API_KEY=sk-ant-xxxxx

# App Config
PORT=3000
NODE_ENV=development
```

## Notes
- All dates in YYYY-MM-DD format
- US-centric content and data
- Desktop-first (mobile later)
- Focus on 1920-2020 birth years initially
- Vintage aesthetic is key differentiator
- Content quality > quantity
- Caching is critical for scale
