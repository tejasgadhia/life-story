# Life Story - Development Instructions

## Project Context
You are building a birthday analysis webapp that generates personalized historical/generational reports. The app combines data journalism with vintage magazine aesthetics (1950s-70s TIME magazine style).

## Critical Design Principles

### 1. Writing Style (MOST IMPORTANT)
**Always follow these rules when generating content**:

#### Prohibited Phrases
Never use these AI giveaways:
- "dive into" / "delve into"
- "unleash" / "unlock potential"  
- "let me" / "let's"
- "based on my research" / "according to my findings"
- "I found that" / "my search revealed"
- "it's worth noting"
- "at the end of the day"
- "game changer" / "robust" / "leverage"
- Any marketing or corporate jargon

#### Required Tone
- Direct, clear, slightly dry
- Strategic wit and sarcasm when appropriate
- Conversational but not overly casual
- Magazine journalism style, NOT research paper style
- Sound like a human having a conversation

#### Example - Good vs. Bad

**Good**:
> "Your generation graduated into the 2008 financial crisis, watched housing prices triple while wages stayed flat, and somehow got blamed for killing everything from chain restaurants to the concept of home ownership. You didn't invent avocado toast—you invented the phrase 'I can't afford a house' as a personality trait."

**Bad**:
> "This cohort experienced significant economic headwinds during their formative career years, facing challenges in the housing market and experiencing stagnant wage growth relative to previous generations. They demonstrated unique consumer preferences and delayed lifecycle transitions."

### 2. Visual Design Framework

#### UI Component Libraries
Use in this priority order:
1. **UIKit 3.x** - Base components, grid, navigation
2. **MDBootstrap** - Cards, modals, forms, buttons
3. **AyroUI** - Hero sections, feature blocks (reference only)
4. **Custom vintage CSS** - Overlays, textures, aged effects

#### Color Palette
```css
/* Primary */
--vintage-cream: #F5F0E8;
--aged-paper: #E8DCC4;
--sepia-brown: #8B7355;
--dark-brown: #3E2723;

/* Accents */
--muted-red: #A4493D;
--muted-blue: #4A6FA5;
--aged-black: #1A1A1A;

/* Neutrals */
--light-gray: #D3CABB;
--medium-gray: #8C8375;
```

#### Typography
```css
/* Headlines */
font-family: 'Playfair Display', Georgia, serif;
font-weight: 700;

/* Body */
font-family: 'Courier Prime', 'Courier New', monospace;

/* Accents */
font-family: 'Lora', Georgia, serif;
```

#### Texture Effects
- Aged paper background: subtle noise + slight yellow tint
- Distressed borders: rough edges, not perfect rectangles
- Print texture: faint halftone dots
- Shadow: soft, brown-tinted (not pure black)

### 3. Content Generation Strategy

#### When to Use Claude API
Generate new content ONLY when:
- Report doesn't exist in database (check first!)
- User enters a birthdate we haven't seen before

#### Prompt Structure for Each Section
```
You are a data journalist writing Section {X}: {Section Name} for a personalized birthday report.

BIRTHDATE: {YYYY-MM-DD}
GENERATION: {Gen Name}
BIRTHDAY RANK: {rank}/366

STATIC DATA PROVIDED:
{historical_events}
{tech_milestones}
{pop_culture_data}

INSTRUCTIONS:
- Write {word_count} words
- Tone: {tone_description}
- Use second person ("you")
- Magazine journalism style
- Include 2-3 specific details
- NO AI phrases (see prohibited list)
- NO corporate jargon
- Be witty where appropriate
- Be factual and specific

EXAMPLE OPENING:
"You were born the same year Prozac hit the market and The Simpsons premiered—two things that would define your generation's coping mechanisms for the next three decades."
```

#### Quality Checks Before Saving
Before caching a report, verify:
- [ ] No prohibited AI phrases present
- [ ] Tone is conversational and natural
- [ ] Facts are accurate (double-check dates)
- [ ] Word count targets met
- [ ] Humor lands appropriately
- [ ] Specific details included (not generic)

### 4. Data Handling

#### Birthday Ranking Logic
```javascript
// Process FiveThirtyEight data
// Calculate average births per date across all years
// Rank 1-366 (1 = most common)

function getBirthdayRank(month, day) {
    // Query birth data
    // Return rank, average births, percentile
}
```

#### Generation Assignment
```javascript
const GENERATIONS = {
    'Silent Generation': { start: 1928, end: 1945 },
    'Baby Boomers': { start: 1946, end: 1964 },
    'Generation X': { start: 1965, end: 1980 },
    'Millennials': { start: 1981, end: 1996 },
    'Generation Z': { start: 1997, end: 2012 },
    'Generation Alpha': { start: 2013, end: 2025 },
    'Generation Beta': { start: 2025, end: 2039 }
};

function getGeneration(year) {
    // Return generation name based on birth year
}
```

#### Caching Strategy
```javascript
// ALWAYS check cache first
async function getReport(birthDate) {
    // 1. Check database for existing report
    const cached = await db.query(
        'SELECT * FROM reports WHERE birth_date = $1',
        [birthDate]
    );
    
    if (cached.rows.length > 0) {
        return cached.rows[0]; // Return immediately
    }
    
    // 2. Generate new report if not found
    const report = await generateReport(birthDate);
    
    // 3. Cache in database
    await db.query(
        'INSERT INTO reports (birth_date, content) VALUES ($1, $2)',
        [birthDate, JSON.stringify(report)]
    );
    
    return report;
}
```

### 5. Component Architecture

#### Landing Page Component
```jsx
import { useState } from 'react';
import { Card, Form } from 'uikit';
import DatePicker from './DatePicker';

function LandingPage() {
    const [birthDate, setBirthDate] = useState(null);
    
    return (
        <div className="vintage-container">
            <header className="vintage-masthead">
                <h1>Life Story</h1>
                <p className="tagline">
                    How common is your birthday? What shaped your generation?
                </p>
            </header>
            
            <Card className="vintage-card">
                <DatePicker 
                    onChange={setBirthDate}
                    onSubmit={handleGenerate}
                />
            </Card>
        </div>
    );
}
```

#### Report Component Structure
```jsx
function Report({ data }) {
    return (
        <div className="report-container">
            <StickyNav sections={SECTIONS} />
            
            <HeroSection 
                birthDate={data.birth_date}
                rank={data.birthday_rank}
            />
            
            <HeatMapSection data={data.heat_map} />
            
            {/* 12 content sections */}
            <Section id="childhood" html={data.sections.childhood} />
            <Section id="generational" html={data.sections.generational} />
            {/* ... etc */}
            
            <Footer>
                <DownloadPDF report={data} />
                <Disclaimer />
            </Footer>
        </div>
    );
}
```

### 6. Development Workflow

#### Starting the Project
```bash
cd /Users/tejasgadhia/Claude/life-story

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys

# Start database
psql -U postgres
CREATE DATABASE lifestory;

# Run migrations
npm run migrate

# Seed initial data
npm run seed

# Start dev server
npm run dev
```

#### File Organization
Always maintain this structure:
```
/src
  /components
    /landing      - Landing page, date picker
    /report       - Report sections, layout
    /visualizations - Heat map, timelines
    /layout       - Header, footer, nav
  
  /styles
    vintage.css   - All vintage aesthetic styles
    global.css    - Base styles, resets
  
  /utils
    dateUtils.js      - Date calculations
    generationUtils.js - Generation assignment
    api.js           - API client
  
  /data
    birthData.json        - Processed FiveThirtyEight data
    generations.json      - Generation definitions
    historicalEvents.json - Events timeline
    techTimeline.json     - Tech milestones
```

### 7. API Integration

#### Claude API Setup
```javascript
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

async function generateSection(sectionName, context) {
    const prompt = buildPrompt(sectionName, context);
    
    const response = await anthropic.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        messages: [{
            role: 'user',
            content: prompt
        }]
    });
    
    return response.content[0].text;
}
```

#### Rate Limiting
```javascript
// Implement rate limiting for API calls
const rateLimiter = {
    requestsPerMinute: 10,
    queue: []
};

// Queue requests to avoid hitting limits
async function queuedGenerate(birthDate) {
    // Add to queue, process with delay
}
```

### 8. PDF Generation

#### Using html2pdf.js
```javascript
import html2pdf from 'html2pdf.js';

function downloadPDF(reportElement) {
    const options = {
        margin: 0.5,
        filename: `life-story-${birthDate}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { 
            unit: 'in', 
            format: 'letter', 
            orientation: 'portrait' 
        }
    };
    
    html2pdf()
        .set(options)
        .from(reportElement)
        .save();
}
```

#### Print Styles
```css
@media print {
    .no-print { display: none; }
    
    body {
        background: white;
        color: black;
    }
    
    .page-break {
        page-break-before: always;
    }
}
```

### 9. Data Processing Scripts

#### Process Birth Data (Run Once)
```bash
npm run process-birth-data
```

This script should:
1. Download FiveThirtyEight CSVs
2. Calculate average births per date
3. Rank all 366 dates
4. Generate heat map data
5. Save to `/src/data/birthData.json`

#### Seed Database (Run Once)
```bash
npm run seed
```

This script should:
1. Create tables
2. Load historical events
3. Load tech timeline
4. Load pop culture data
5. Verify data integrity

### 10. Testing Strategy

#### Content Quality Tests
```javascript
// Test for prohibited phrases
function checkProhibitedPhrases(text) {
    const prohibited = [
        'delve into', 'dive into', 'unleash',
        'it\'s worth noting', 'leverage'
    ];
    
    for (const phrase of prohibited) {
        if (text.toLowerCase().includes(phrase)) {
            throw new Error(`Prohibited phrase found: ${phrase}`);
        }
    }
}

// Test word count
function checkWordCount(text, min, max) {
    const words = text.split(/\s+/).length;
    if (words < min || words > max) {
        throw new Error(`Word count ${words} outside range ${min}-${max}`);
    }
}
```

#### Visual Regression Tests
```javascript
// Use Percy or similar for visual testing
// Capture screenshots of report sections
// Compare against baseline
```

### 11. Performance Optimization

#### Critical Optimizations
1. **Database indexing**: Index on `birth_date` column
2. **API response caching**: Cache all generated reports
3. **Lazy loading**: Load sections as user scrolls
4. **Image optimization**: Compress all textures/backgrounds
5. **Code splitting**: Separate bundles for landing/report pages

#### Monitoring
```javascript
// Track generation times
console.time('generate-report');
const report = await generateReport(birthDate);
console.timeEnd('generate-report');

// Log cache hit rates
const cacheHitRate = cachedReports / totalRequests;
console.log(`Cache hit rate: ${cacheHitRate}%`);
```

### 12. Common Issues & Solutions

#### Issue: Generated content sounds too AI-ish
**Solution**: 
- Review prohibited phrases list
- Add more specific examples to prompts
- Regenerate with stronger tone instructions
- Manually edit if necessary

#### Issue: Slow report generation
**Solution**:
- Check if caching is working
- Reduce word count targets if needed
- Generate sections in parallel
- Use faster Claude model for drafts

#### Issue: Heat map visualization not rendering
**Solution**:
- Check D3.js data format
- Verify birth data loaded correctly
- Inspect console for errors
- Test with sample data first

#### Issue: PDF export looks bad
**Solution**:
- Add print-specific styles
- Adjust margins and page breaks
- Use higher quality images
- Test with different browsers

### 13. Git Workflow

#### Initial Setup
```bash
cd /Users/tejasgadhia/Claude/life-story
git init
git add .
git commit -m "Initial commit"
```

#### Before Pushing to GitHub
```bash
# Create .gitignore
cat > .gitignore << EOF
node_modules/
.env
.env.local
dist/
.DS_Store
*.log
EOF

# Create remote repo on GitHub first, then:
git remote add origin https://github.com/yourusername/life-story.git
git push -u origin main
```

### 14. Deployment Checklist

Before deploying:
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Birth data seeded
- [ ] SSL certificate installed
- [ ] Domain DNS configured
- [ ] Cache warming script run (generate common birthdays)
- [ ] Error monitoring enabled
- [ ] Analytics tracking added
- [ ] Backup strategy implemented

### 15. Quick Reference Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Database
npm run migrate         # Run migrations
npm run seed            # Seed database
npm run db:reset        # Reset database

# Data Processing
npm run process-birth   # Process FiveThirtyEight data
npm run generate-heat   # Generate heat map data

# Testing
npm run test            # Run tests
npm run lint            # Lint code
npm run format          # Format code
```

### 16. Resources

#### Data Sources
- FiveThirtyEight births: https://github.com/fivethirtyeight/data/tree/master/births
- Pew Research generations: https://www.pewresearch.org/topic/generations-age/
- Historical events: Wikipedia, various news archives

#### Design References
- UIKit: https://getuikit.com
- MDBootstrap: https://mdbootstrap.com
- AyroUI: https://ayroui.com
- Vintage typography: Google Fonts (Playfair Display, Courier Prime, Lora)

#### Documentation
- React: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Claude API: https://docs.anthropic.com
- PostgreSQL: https://www.postgresql.org/docs/

## Emergency Contacts

If you get stuck:
1. Check REQUIREMENTS.md for detailed specs
2. Review example prompts in `/server/prompts`
3. Test with sample data first
4. Check console for errors
5. Verify API keys and environment variables

## Remember

**The goal is to create reports that feel like they were written by a witty, knowledgeable journalist who happens to know a lot about your generation—not a corporate AI trying to sound human.**

Make it vintage. Make it fun. Make it insightful. Make it shareable.
