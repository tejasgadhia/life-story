# Section Ownership Guide

Reference guide for eliminating within-report repetition. Each section has ONE job - a distinct topic focus AND a distinct emotional/intellectual destination.

---

## Section Ownership Table

| Section | JSON Key | Owns These Topics | Emotional Destination | DOES NOT Cover |
|---------|----------|-------------------|----------------------|----------------|
| **Childhood** | `childhood_context` | Toys, TV shows, school supplies, sensory memories (smells, sounds, textures), food/snacks, stores | Nostalgia, lost innocence | Economics, career, historical events, technology transitions |
| **Gen Identity** | `generational_identity` | Who your generation IS, your defining moment (9/11, JFK, Challenger, etc.), generational size/stats, the "generational label" discourse | Identity, belonging, "this is us" | Detailed historical timeline, wealth stats (that's Comparison's), career struggles |
| **Pop Culture** | `pop_culture` | Movies, music, TV shows at each life stage, cultural phenomena (boy bands, emo, disco), celebrities as cultural figures | Joy, shared cultural memory, "remember this?" | Technology platforms, economic context, historical events |
| **Technology** | `technology` | Devices, platforms, digital transition, communication tools (AIM, MySpace, texting), the "before/after" of smartphones | Wonder at change, "we're the bridge generation" | Entertainment content, economics, career |
| **Historical** | `historical_milestones` | Wars, disasters, political events, assassinations, major news events EXCEPT the generation's defining moment | Context, perspective, "the world shaped you" | 9/11 for Millennials (that's Gen Identity's), JFK for Boomers, Challenger for Gen X, COVID for Gen Z |
| **Career** | `career` | Work culture, job search, workplace toxicity, hustle culture, gig economy, the rigged game | Anger at exploitation → "It's not your fault" (ONLY HERE) | Personal finances, generational wealth stats |
| **Financial** | `financial` | Personal money psychology, debt, savings anxiety, housing costs, student loans, the math that doesn't work | Anxiety → acceptance → "the math doesn't add up" | Generational wealth comparisons (21% vs 7%), career struggles |
| **Relationships** | `relationships` | Dating evolution, friendship maintenance, communication styles, marriage/family delays, long-distance relationships | Connection, adaptation, "love finds a way" | Economic reasons for delays (mention briefly, don't dwell), career |
| **Blind Spots** | `blind_spots` | Self-awareness deficits, patterns to break, coping mechanisms that became invisible, generational weaknesses | Honest self-reflection, growth opportunity | "Not your fault" narrative (that's Career's finale), economic stats |
| **Roadmap** | `life_roadmap` | Future decades, what's ahead by life stage, predictions, how to navigate | Hope, preparation, "here's what's coming" | Past trauma (already covered), detailed stats |
| **Comparison** | `comparison` | Generational stats, how you differ from X/Boomer/Z, wealth gap numbers, life expectancy, "your place in history" | Understanding your place, validation | Personal finance advice, career guidance |

---

## Statistic Ownership (Each Appears ONCE)

| Statistic | HOME Section | REMOVE From | Notes |
|-----------|--------------|-------------|-------|
| 21% vs 7% wealth gap | `comparison` | Financial, Career | THE wealth stat - only in Comparison |
| 6x housing cost ratio | `financial` | Comparison, Career, Relationships | Personal finance context - only in Financial |
| 2x/3x salary for house (past) | `comparison` | Financial | Historical comparison - only in Comparison |
| $30K average wedding | `relationships` | Financial, Comparison | Relationship milestone cost - only in Relationships |
| $30K student debt | `financial` | Career, Comparison | Personal debt burden - only in Financial |
| 72 million Millennials | `generational_identity` | Comparison | Generational size belongs in identity |
| Life expectancy / "deaths of despair" | `comparison` | Everywhere else | Comparative stat - only in Comparison |
| Median home price vs income | `financial` | Comparison | Use in Financial for personal math |
| Generational size (millions) | `generational_identity` | Comparison | Identity stat |

---

## Emotional Conclusion Ownership (Each Catharsis ONCE)

| Emotional Beat | HOME Section | REMOVE From | What To Write Instead |
|----------------|--------------|-------------|----------------------|
| "The system is rigged / not your fault" | `career` (finale) | Blind Spots, Financial | In Blind Spots: focus on personal patterns, not systemic excuses |
| "You've normalized dysfunction" | `blind_spots` | Career, Financial | In Career: focus on what was done TO you, not what you've accepted |
| "The math doesn't work" | `financial` | Relationships, Roadmap | In Relationships: focus on how love adapts, not economics |
| "Your parents had X, you don't" | `comparison` (PRIMARY) | Career, Financial, Roadmap | Other sections can note differences briefly, but detailed contrast lives in Comparison |
| "You made the world more inclusive" | `comparison` (finale) | Gen Identity, Roadmap | This is the uplifting conclusion to the stats |
| "You're the bridge generation" | `technology` | Gen Identity | Tech section owns the analog→digital narrative |

---

## Cross-Reference Rules

### Allowed Brief Mentions (Not Deep Dives)

- **Childhood** CAN mention: "And then 9/11 changed everything" (as a childhood-ender, not the event itself)
- **Career** CAN mention: "The math didn't work" (as context, but Financial owns the detailed breakdown)
- **Relationships** CAN mention: "Economic pressure" (but not stats or detailed analysis)
- **Financial** CAN mention: "Career instability" (but not workplace culture details)

### FORBIDDEN Overlaps

- **DO NOT** describe 9/11 in detail in both Gen Identity AND Historical (pick one based on generation)
- **DO NOT** use "21% vs 7%" in both Financial AND Comparison
- **DO NOT** conclude with "not your fault" in both Career AND Blind Spots
- **DO NOT** list the same movies/shows in both Pop Culture AND Childhood (split by age/context)

---

## Generation-Specific Notes

### Millennials (1981-1996)
- **Defining moment**: 9/11 (goes in Gen Identity, NOT Historical)
- **Economic crises**: 2008 (Career/Financial), COVID (can be in multiple)
- **Tech transition**: Analog→Digital (Technology section)

### Gen X (1965-1980)
- **Defining moment**: Challenger disaster OR fall of Berlin Wall (Gen Identity)
- **MTV generation**: Pop Culture
- **Latchkey kids**: Childhood

### Boomers (1946-1964)
- **Defining moment**: JFK assassination OR Moon landing (Gen Identity)
- **Vietnam/Civil Rights**: Historical (but briefly in Gen Identity for context)
- **Economic prosperity**: Comparison (contrast with later generations)

### Gen Z (1997-2012)
- **Defining moment**: COVID pandemic OR school shootings (Gen Identity)
- **Climate anxiety**: Can appear in multiple but detailed in Gen Identity or Roadmap
- **Digital natives**: Technology (no "before" to remember)

---

## Examples: Good vs Bad

### BAD: Repetitive Content in 1988.json (Current State)

**Financial section says:**
> "When Boomers were your age, they controlled 21% of the nation's wealth. You control 7%."

**Comparison section says:**
> "When Boomers were your age, they controlled 21% of national wealth. You control 7%."

**Problem**: Exact same stat, almost same wording.

### GOOD: Fixed Content

**Financial section should say:**
> "A median home now costs six times the median income. You graduated with an average of $30,000 in student debt. The math is simple: your parents' generation could buy a house on a middle-class salary. You cannot."

(Focus on PERSONAL financial math - what YOU face)

**Comparison section should say:**
> "When Boomers were your age, they controlled 21% of national wealth. You control 7%. A house in 1975 cost about two years of median income. Now it's six. They lecture you about fiscal responsibility from houses that appreciated 400% while they slept."

(Focus on GENERATIONAL comparison - YOUR generation vs THEIR generation)

---

### BAD: Same Emotional Conclusion Twice

**Career section ends with:**
> "You didn't fail to buy a house. The housing market failed you. You're not broken. The world you inherited is."

**Blind Spots section says:**
> "You've internalized the failure narrative so thoroughly that you forget the system was designed this way... The self-improvement industry exists because it's easier to sell you a fix than to fix the system. You're not broken."

**Problem**: Same "not your fault / you're not broken" catharsis in two places.

### GOOD: Fixed Content

**Career section ends with:**
> "The cruelest trick was making you believe it was your fault. The truth is the game was rigged before you sat down to play. Wages decoupled from productivity in 1973. The social contract was shredded before you entered the workforce. You're not broken. The world you inherited is."

(This is THE "not your fault" moment - Career OWNS it)

**Blind Spots section should end with:**
> "And maybe the deepest blind spot: you've become so good at adapting that you've forgotten adaptation shouldn't be required for survival. The question isn't how to cope better with a broken system—it's whether you have the energy left to demand a better one."

(Focus on self-awareness and growth, not absolution)

---

## Checklist for Editing Each File

Before saving any year file, verify:

- [ ] "21% vs 7%" appears ONLY in `comparison` section
- [ ] "6x housing" or similar housing cost ratio appears ONLY in `financial` section
- [ ] "Not your fault" / "you're not broken" conclusion appears ONLY in `career` section
- [ ] Defining generational moment (9/11, Challenger, etc.) detailed description ONLY in `generational_identity`
- [ ] No paragraph could be copy-pasted to another section without editing
- [ ] Each section ends at a DIFFERENT emotional destination
- [ ] Statistics are not duplicated across sections
- [ ] Pop Culture and Childhood don't list the same shows/movies (split by age context)

---

## Subagent Instructions

When editing a batch of year files:

1. **Read the full file** before making any changes
2. **Identify violations** using the checklist above
3. **Apply fixes**:
   - Move stat to its home section OR delete if home section already has it
   - Rewrite conclusions to be section-specific
   - Ensure distinct emotional endpoints
4. **Preserve tone**: Keep the witty magazine journalist voice
5. **Don't add content**: Only edit to remove repetition, don't expand sections
6. **Verify before saving**: Run through checklist

---

## Notes on Tone

Per CLAUDE.md, NEVER use these AI phrases:
- "dive into" / "delve into"
- "unleash" / "unlock potential"
- "it's worth noting"
- "at the end of the day"
- "game changer" / "robust" / "leverage"

Write like a witty magazine journalist: direct, clear, slightly dry humor.
