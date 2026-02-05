# Learnings - Life Story
Last Updated: 2026-02-05

## What Worked Well

### Hybrid Allow-List + Keyword Scoring for Data Curation
**Context**: Needed to filter ~10,000 celebrities down to max 10 recognizable names per day across 366 days
**What we did**: Built a two-layer scoring system — a ~900-name curated allow-list of household names (guaranteed high score) plus a multi-criteria keyword scoring engine that evaluated achievements, awards, roles, nationality, era, franchises, and description specificity
**Why it worked**: The allow-list handled the "obviously famous" cases (Einstein, Sinatra, etc.) while keyword scoring surfaced lesser-known-but-genuinely-notable figures (Nobel laureates, Hall of Famers, etc.). Neither approach alone would have worked — pure allow-list misses deserving people, pure keyword matching lets obscure figures with impressive descriptions slip through.
**Reuse for**: Any data curation task where you need to filter a large dataset by a subjective quality metric. Build a curated core + automated scoring for the long tail.

### Iterative Script Refinement (Run, Review, Refine)
**Context**: First pass of the curation script produced decent but imperfect results — some famous people cut, some obscure ones kept
**What we did**: Used `--report` and `--day` modes to inspect specific days, reviewed "KEPT" vs "CUT" lists, expanded the allow-list in batches, and refined scoring weights through ~5-6 iterations
**Why it worked**: Each iteration was fast (script runs in seconds), and reviewing specific days made quality issues immediately visible. Much more efficient than trying to get the scoring perfect on the first attempt.
**Reuse for**: Any automated content processing. Build in diagnostic/report modes from the start so you can inspect intermediate results.

### UI Simplification When Data Constraints Change
**Context**: CelebrityList.jsx had expand/collapse "Show all" functionality for lists of 30-50+ celebrities
**What we did**: After curating to max 10, removed the `useState`, `slice`, and conditional button rendering — the component became a simple map over the array
**Why it worked**: Changing data constraints upstream (max 10 per day) made downstream UI complexity unnecessary. The component went from ~100 lines with state management to ~60 lines of pure rendering.
**Reuse for**: When tightening data constraints, always check if downstream components can be simplified. Data guarantees often eliminate UI edge cases.

### Parallel Sub-Agents for Bulk File Edits
**Context**: Needed to rewrite 67 childhood_context sections across all year files (prior session)
**What we did**: Split into 4 parallel sub-agents (one per generation: Boomers 1946-1964, Gen X 1965-1980, Millennials 1981-1996, Gen Z 1997-2012)
**Why it worked**: Each agent got ~16-19 files, ran simultaneously, completed in minutes instead of hours. Detailed prompt with tone guidelines, anti-patterns, and era-specific context produced consistent quality across all 4 agents.
**Reuse for**: Any bulk content editing across many files

### Audit Script Before Manual Edits
**Context**: Needed to understand cross-section repetition before fixing it (#63, prior session)
**What we did**: Wrote a Node script that scanned all 67 year files, matched ~40 topic patterns across sections, and produced a per-year report of duplicated content
**Why it worked**: Turned a vague "there's repetition" into specific data: 785 instances, top offenders by topic. Revealed that some sections naturally reference other sections (not actually problematic).
**Reuse for**: Any content quality audit. Write a diagnostic script first, read its output, then decide what actually needs fixing.

### Dead Code Identification via Data Flow Analysis
**Context**: Generation files had 4 section keys that were always overwritten by year files (prior session)
**What we did**: Traced the spread-merge pattern in assembleReport.js and confirmed all 67 year files have all 11 section keys. Generation sections = dead code.
**Why it worked**: Simple code reading + data verification. Saved maintaining ~4,000 words of duplicate content across 4 files.
**Reuse for**: Before editing content, always check if it's actually used. Trace the data flow from file to render.

## What Didn't Work

### Pure Keyword Scoring (Without Allow-List)
**What we tried**: Initial version of the curation script relied only on keyword matching — awards, roles, achievement phrases
**Why it failed**: Many genuinely famous people have short, generic descriptions ("American actor and singer") that don't trigger keyword bonuses. Meanwhile, some obscure figures have impressive-sounding descriptions ("recipient of the Presidential Medal of Freedom") that inflate their scores.
**What we did instead**: Added the curated allow-list as a primary signal, with keyword scoring as secondary
**Lesson**: For subjective quality judgments, you need human-curated anchors. Automated heuristics are good for the middle of the distribution, not the extremes.

### Sensory-Overload Writing Pattern (Prior Session)
**What we tried**: Original childhood sections opened with nostalgic sensory lists
**Why it failed**: User feedback called it "saccharine and schlocky" — reads as AI-generated nostalgia bait
**What we did instead**: Documentary journalism — lead with era-defining context, focus on family dynamics
**Lesson**: Specificity comes from narrative context, not from listing period-appropriate nouns.

### Generation-Level Content Sharing (Prior Session)
**What we tried**: Original architecture had generation files provide shared sections that year files could override
**Why it failed**: Every year file provided its own version of every section. The shared layer was never used.
**What we did instead**: Removed generation sections entirely, simplified the assembly pipeline
**Lesson**: Shared/inherited content patterns only work if there's actual variation.

## Technical Patterns

### Fame Scoring Heuristics
**Implementation**: Multi-criteria scoring in `scripts/curate-celebrities.mjs`:
- Curated allow-list: +100 points (household names)
- Achievement keywords: +15-30 (Nobel, Oscar, Grammy, Pulitzer, etc.)
- Role bonuses: +5-15 (President, astronaut, Supreme Court, etc.)
- Franchise mentions: +10 (James Bond, Disney, Star Wars, etc.)
- Nationality weighting: US-audience recognizability
- Era weighting: slight recency bonus
- Obscurity penalties: -10 to -30 (foreign politicians, niche sports, etc.)
**Use case**: Any dataset needing subjective quality filtering
**Benefits**: Transparent, tunable, reproducible (vs. opaque ML/LLM scoring)

### Data Structure Simplification
**Before**: `celebrities_categorized: { entertainers: [...], athletes: [...], ... }` — nested by profession
**After**: `celebrities: [{ name, year, description }, ...]` — flat array, sorted oldest-first
**Benefit**: Simpler data format, simpler consuming code, no consumers actually used the categorization

### JSON Content Editing with StrReplace
**Implementation**: Match the section key + opening brace to replace entire section content within JSON files
**Use case**: Editing HTML content embedded in JSON data files
**Gotcha**: The old_string must be unique within the file. Match from key through first ~100 chars of content.

## Efficiency Improvements

### Better Questions to Ask Upfront
- "Do any themes actually use the categorized celebrity structure?" — would have confirmed flat array was safe from the start
- "What's the distribution of celebrities per day?" — knowing it was 28-50+ per day with most days having 30+ shaped the max-10 target

### Workflow Optimizations
- Build diagnostic/report modes into curation scripts from the start — saves massive debugging time
- The `--day MM-DD` flag for spot-checking specific days was the most useful diagnostic
- Reviewing 5-6 representative days (mix of months) catches most scoring edge cases
- When data constraints change, immediately audit downstream consumers for simplification opportunities

## Dependencies & Tools

### Celebrity Curation Script (`scripts/curate-celebrities.mjs`)
**What it does**: Scores and filters all celebrity birthday data to max 10 per day
**Modes**: `--report` (full day-by-day report), `--stats` (summary statistics), `--day MM-DD` (single day)
**Gotchas**: Allow-list needs periodic updates as new data is added. Keyword scoring weights may need tuning for edge cases.
**Why we kept it**: Not a one-time script — useful for re-curation if birthday data changes or new years are added

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 10%
- Implementation: 50% (script development + iterative refinement)
- Debugging/Refinement: 20% (reviewing curation quality, expanding allow-list)
- Testing/Verification: 10% (tests, build, browser verification across 3 themes)
- Documentation: 10%

### Iteration Count
- Curation script: ~6 iterations (initial build + 5 refinement passes)
- Data transformation: 1 iteration (script handles all 12 files)
- assembleReport.js update: 1 iteration
- CelebrityList.jsx simplification: 1 iteration
- Average iterations: 2.25

### Context Efficiency
- Times requirements were clarified: 0 (clear issue description)
- Times we backtracked: 0
- Files read multiple times: ~8 (sample birthday files for quality review)

### Tool Usage
- Most used tools: Shell (script execution, test/build), StrReplace (script refinement, code edits), Read (data review)
- Tools that saved time: `--report` and `--day` script modes (instant quality feedback loop)
- Tools that slowed us down: None notable

### Next Session Improvement
> **Actionable insight**: The iterative script refinement pattern (run -> review specific days -> refine scoring -> repeat) was highly effective. For Phase 4 theme work, a similar "change -> verify in browser -> refine" loop with the dev server should keep momentum high. Start each issue by loading the relevant theme in the browser first.
