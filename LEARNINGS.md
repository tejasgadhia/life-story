# Learnings - Life Story
Last Updated: 2026-02-05

## What Worked Well

### Parallel Sub-Agents for Bulk File Edits
**Context**: Needed to rewrite 67 childhood_context sections across all year files
**What we did**: Split into 4 parallel sub-agents (one per generation: Boomers 1946-1964, Gen X 1965-1980, Millennials 1981-1996, Gen Z 1997-2012)
**Why it worked**: Each agent got ~16-19 files, ran simultaneously, completed in minutes instead of hours. Detailed prompt with tone guidelines, anti-patterns, and era-specific context produced consistent quality across all 4 agents.
**Reuse for**: Any bulk content editing across many files (celebrity curation next session, or any future content pass)

### Audit Script Before Manual Edits
**Context**: Needed to understand cross-section repetition before fixing it (#63)
**What we did**: Wrote a Node script that scanned all 67 year files, matched ~40 topic patterns across sections, and produced a per-year report of duplicated content
**Why it worked**: Turned a vague "there's repetition" into specific data: 785 instances, top offenders by topic (retirement/pensions in all 67 files, 2008 crisis in 64, etc.). Revealed that `life_roadmap` and `comparison` sections naturally reference other sections (not actually problematic).
**Reuse for**: Any content quality audit. Write a diagnostic script first, read its output, then decide what actually needs fixing.

### Dead Code Identification via Data Flow Analysis
**Context**: Generation files had 4 section keys that were always overwritten by year files
**What we did**: Traced the spread-merge pattern in assembleReport.js (`{...generationData.sections, ...yearData.sections}`) and realized year data always wins. Confirmed all 67 year files have all 11 section keys. Generation sections = dead code.
**Why it worked**: Simple code reading + data verification. Saved maintaining ~4,000 words of duplicate content across 4 files.
**Reuse for**: Before editing content, always check if it's actually used. Trace the data flow from file to render.

### Combining Issues Into a Single Pass
**Context**: User was frustrated about doing yet another pass through 67 year files after 3 prior passes
**What we did**: Combined #62 (childhood rewrite) and #63 (repetition fix) into a single pass, with the repetition audit run first as a read-only diagnostic
**Why it worked**: Reduced user fatigue, produced the same quality outcome, and the childhood rewrites naturally addressed the worst repetition by focusing content on domestic/family context rather than events that belong in other sections.
**Reuse for**: Always look for ways to batch related changes into a single pass, especially for large-scale content edits.

## What Didn't Work

### Generation-Level Content Sharing
**What we tried**: Original architecture had generation files provide shared sections (relationships, blind_spots, etc.) that year files could optionally override
**Why it failed**: Every year file ended up providing its own version of every section. The generation-level content was never displayed. It was dead code from the moment it was written.
**What we did instead**: Removed generation sections entirely, simplified the assembly pipeline
**Lesson**: Shared/inherited content patterns only work if there's actual variation — some files using the shared version, some overriding. If every file overrides, the shared layer is waste.

### Sensory-Overload Writing Pattern
**What we tried**: Original childhood sections opened with nostalgic sensory lists ("The smell of X. The feel of Y. The taste of Z.")
**Why it failed**: User feedback called it "saccharine and schlocky" — reads as AI-generated nostalgia bait. Product catalogs (listing 5+ brand names) aren't storytelling.
**What we did instead**: Documentary journalism — lead with era-defining context, focus on family dynamics and domestic atmosphere, max 2-3 specific cultural touchpoints
**Lesson**: Specificity comes from narrative context, not from listing period-appropriate nouns. "At seven, they watched men walk on the moon" is better than "The crinkle of Tang packets. The hiss of the TV warming up."

## Technical Patterns

### JSON Content Editing with StrReplace
**Implementation**: Match the `"childhood_context": {` opening through its closing `}` to replace entire section content within JSON files
**Use case**: Editing HTML content embedded in JSON data files
**Benefits**: Precise replacement without risking other parts of the file. The section key + opening brace is unique enough to match reliably.
**Gotcha**: The old_string must be unique within the file. For JSON sections, matching from the key through the first ~100 chars of content is usually sufficient.

### Placeholder System (No Placeholders in Childhood)
**Discovery**: The childhood_context sections use zero placeholders — they're entirely static HTML
**Why this matters**: Made bulk rewrites simpler (no placeholder preservation needed). Other sections use `{{AGE_AT_911}}`, `{{BIRTH_YEAR_COHORT}}`, etc.
**Lesson**: Before editing content, check what dynamic elements exist. It changes the complexity of the rewrite.

### assembleReport.js Simplification
**Before**: Load year data + generation data + birthday data in parallel, spread-merge generation sections under year sections
**After**: Load year data + birthday data in parallel, use year sections directly
**Benefit**: One fewer network request, simpler code, no dead code path. Generation files still exist for metadata reference but aren't loaded at runtime.

## Efficiency Improvements

### Better Questions to Ask Upfront
- "Is the generation-level content actually being displayed?" — would have caught the dead code earlier
- "What percentage of the flagged repetition is in summary sections (life_roadmap, comparison)?" — would have scoped the fix better from the start

### Workflow Optimizations
- Running a diagnostic script before manual edits saves massive time — turns gut feelings into actionable data
- Sub-agent parallelism for bulk edits: 4 agents x 17 files each = minutes instead of sequential hours
- Combining related issues into a single pass reduces both wall-clock time and user fatigue

## Dependencies & Tools

### Repetition Audit Script (deleted after use)
**What it did**: Scanned 67 year files for 40+ topic patterns, identified cross-section repetition
**Why we chose it**: Needed data before deciding how to fix repetition
**Gotchas**: Pattern matching isn't perfect — "internet" matches many contexts. Topic-level patterns (2008 crisis, 9/11) are more useful than phrase-level matching.
**Alternative**: Manual reading of all sections (impractical at 67 files x 11 sections)

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Design: 15%
- Implementation: 60%
- Debugging: 5%
- Testing/Verification: 10%
- Documentation: 10%

### Iteration Count
- Dead code cleanup (#63A): 1 iteration (clean, mechanical)
- Repetition audit script: 1 iteration (ran successfully first try)
- Childhood rewrites (67 files): 1 iteration (parallel sub-agents all succeeded)
- Total features: 3, all first-try

### Context Efficiency
- Times requirements were clarified: 1 (user asked about combining passes)
- Times we backtracked: 0
- Files read multiple times: ~6 (spot-checking samples across generations)

### Tool Usage
- Most used tools: StrReplace (73 file edits), Task/sub-agents (4 parallel batches), Shell (build/test/git)
- Tools that saved time: Parallel sub-agents (4x speedup on bulk edits), diagnostic script (scoped the repetition problem)
- Tools that slowed us down: None notable

### Next Session Improvement
> **Actionable insight**: For celebrity curation (#59), write the scoring/filtering script first and run it before any manual edits. The audit-then-edit pattern worked well this session and should be repeated. Consider using Wikipedia page view API data as an objective recognizability signal rather than subjective scoring.
