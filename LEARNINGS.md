# Learnings - Life Story

Last Updated: 2026-02-05

## What Worked Well

### Parallel sub-agent architecture for bulk content rewrites
**Context**: Needed to rewrite 67 year files with consistent voice/tone changes
**What we did**: Wrote 4 generation files first as "golden examples," then dispatched year files in batches of 5 across 4 parallel fast-model sub-agents
**Why it worked**: Each agent had a small, focused scope (5 files) with clear rules and examples. Parallel execution meant 20 files processed simultaneously.
**Reuse for**: Any bulk content transformation across many similar files

### Generation files as golden examples before year files
**Context**: Voice/tone consistency across 67 year files was the biggest risk
**What we did**: Rewrote the 4 generation files first (current model, not fast), then extracted key phrases/patterns as reference examples for sub-agent prompts
**Why it worked**: Sub-agents had concrete examples of target voice, not just abstract rules. Consistency was much better than if all files were rewritten independently.
**Reuse for**: Any project where many files need consistent style -- establish the template first, then batch-process

### Automated QA pipeline after each batch
**Context**: With 71 files being rewritten by sub-agents, quality drift was a real risk
**What we did**: Built a Node.js QA script checking: JSON validity, you/your regex scan, placeholder count, banned phrase scan, heading consistency
**Why it worked**: Caught 89 prose leaks, 34 banned phrases, and 77 non-standard headings that sub-agents missed. Two QA passes got everything to zero.
**Reuse for**: Any bulk content operation -- always build automated verification

## What Didn't Work

### Sub-agents not changing h2 headings
**What we tried**: Initial batches (1-8) received voice/tone rules but not heading change instructions
**Why it failed**: The instruction set was incomplete -- we forgot to specify that "Your Generation: ..." headings needed updating too
**What we did instead**: Added heading instructions to later batches, then wrote a script to fix all headings across files that were already done
**Lesson**: Include ALL formatting changes in the initial prompt, not just prose content changes. Headings, section titles, and structural elements need explicit instructions.

### First QA pass acceptable-context list was too narrow
**What we tried**: Regex scan for you/your with a short list of acceptable contexts (song titles, etc.)
**Why it failed**: Missed many legitimate uses: Ferris Bueller quotes, passed notes, branded phrases, dialogue
**What we did instead**: Built a comprehensive acceptable-contexts list (30+ entries) covering song titles, movie quotes, historical quotes, dialogue, brand names, and idiomatic expressions
**Lesson**: When doing regex-based content audits, the exception list needs to be extensive. Build it iteratively based on false positives.

### Some sub-agents didn't fully apply fixes in second pass
**What we tried**: Dispatched fix agents for specific prose leaks identified in QA
**Why it failed**: 2007.json and 2008.json still had leaks after the fix agent reported them as fixed
**What we did instead**: Manual targeted fixes for the ~5 remaining leaks
**Lesson**: Always re-verify after fix agents complete. Trust but verify.

## Technical Patterns

### Batched JSON content rewriting with quality gates
**Implementation**: Read file -> rewrite section HTML -> preserve non-HTML fields -> write file -> run QA script
**Use case**: Any project with many JSON data files containing prose content
**Benefits**: Catches corruption early, prevents placeholder loss, ensures consistency

### Comprehensive regex scan for voice consistency
**Implementation**:
```javascript
const regex = /\b[Yy]ou(?:['r ]|rself|'ve|'ll|'d)/g;
// Plus acceptable-context filtering for song titles, quotes, etc.
```
**Use case**: Any voice/person conversion across many files
**Benefits**: Catches subtle leaks like "yourself" and "you'd" that simple "you " searches miss

## Efficiency Improvements

### Better Questions to Ask Upfront
- "Should h2 headings also change, or just prose content?" -- would have saved the heading fix pass
- "What quoted phrases should be preserved in original voice?" -- would have made the first QA scan more accurate

### Workflow Optimizations
- Dispatching 4 sub-agents in parallel cuts wall-clock time by ~75% vs sequential
- Building the QA script once and running it repeatedly is far more reliable than manual spot-checking
- Writing golden examples first (generation files) then referencing them in sub-agent prompts produces much more consistent output than rules alone

## Session Efficiency Metrics

### Time Distribution (Estimated)
- Planning/Setup: 5%
- Implementation (generation files, current model): 10%
- Implementation (year files, sub-agents): 50%
- QA & Fix passes: 25%
- Documentation & Commit: 10%

### Iteration Count
- Generation files: 1 pass (written correctly first time)
- Year files: 1 main rewrite + 1 fix pass for leaks/banned phrases + 1 heading fix
- Total: 3 iterations to get all 71 files clean

### Context Efficiency
- Requirements were clear from the plan file -- zero clarifications needed
- Backtracking: heading instructions missing from initial batches (recovered with script)
- Files read: 6 sample files to understand structure before starting

### Tool Usage
- Most used: Task (sub-agents), Shell (QA scripts), Write (generation files)
- Tools that saved time: Task with fast model -- 14 batches of content rewrites completed in minutes vs hours
- Regex-based QA scripts caught issues no human spot-check would find at this scale

### Next Session Improvement
> **Actionable insight**: When dispatching sub-agents for content rewrites, include ALL formatting requirements (headings, structure, metadata) in the FIRST prompt, not just prose rules. The heading fix pass added unnecessary iteration. Also build the QA acceptable-exceptions list upfront by scanning a few sample files first.
