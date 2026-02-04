# Issue Plan - Life Story

**Generated**: 2026-02-04
**Source**: Comprehensive Code Review
**Total Issues**: 20 new issues (#22-41)

---

## Overview

This plan addresses findings from a multi-dimensional code review covering:
- Code Quality & Architecture
- Security & Performance
- Testing & Documentation
- Best Practices & CI/CD

**Estimated Total Effort**: 25-35 hours across 4 phases

---

## Phase 1: Critical Fixes (P0)
> **Do immediately** - blocks everything else

| Issue | Title | Effort | Dependencies |
|-------|-------|--------|--------------|
| #22 | Fix version mismatch (package.json 0.3.0 vs CHANGELOG 0.4.1) | 15 min | None |
| #23 | Update README with v0.4.x changes | 30 min | #22 |
| #24 | Fix esbuild security vulnerabilities | 15 min | None |

**Total Phase 1**: ~1 hour

### Execution Order
```
#22 (version) ──┬──> #23 (README)
                │
#24 (security) ─┘
```

### Commands
```bash
# Issue #22: Version mismatch
npm version 0.4.1 --no-git-tag-version
git add package.json package-lock.json
git commit -m "chore: Update version to 0.4.1"
git tag -a v0.4.1 -m "Release v0.4.1"

# Issue #24: Security audit
npm audit fix
```

---

## Phase 2: Performance & Architecture (P1)
> **This week** - highest impact improvements

| Issue | Title | Effort | Dependencies |
|-------|-------|--------|--------------|
| #27 | Add React.memo to theme components | 30 min | None |
| #28 | Add npm audit to CI pipeline | 15 min | None |
| #25 | Split birthdays.json into monthly files | 3-4 hrs | None |
| #26 | Extract shared theme logic (reduce 60% duplication) | 4-6 hrs | #27 |

**Total Phase 2**: 8-11 hours

### Execution Order
```
#27 (React.memo) ───────────────────┐
                                    │
#28 (CI audit) ─────────────────────┤
                                    ├──> #26 (extract theme logic)
#25 (birthdays split) ──────────────┘
```

### Rationale
- #27 and #28 are quick wins (45 min total)
- #25 is independent, can run in parallel
- #26 depends on #27 being done (don't want to extract logic then add memo)

---

## Phase 3: Quality & Polish (P2)
> **Next 2 weeks** - medium priority improvements

| Issue | Title | Effort | Dependencies |
|-------|-------|--------|--------------|
| #30 | Fix CLAUDE.md file path errors | 30 min | Phase 1 |
| #31 | Add Content Security Policy headers | 15 min | None |
| #34 | Standardize theme prop naming | 1 hr | #26 |
| #32 | Fix LoadingScreen stale closure | 1 hr | None |
| #33 | Lazy load theme components | 1 hr | #26 |
| #29 | Set up automated testing infrastructure | 8-12 hrs | Phase 2 |

**Total Phase 3**: 12-16 hours

### Execution Order
```
Phase 2 complete
       │
       ├──> #30 (CLAUDE.md) ─────────────────────┐
       │                                          │
       ├──> #31 (CSP) ───────────────────────────┤
       │                                          │
       ├──> #34 (prop naming) ───┬───> #33 (lazy load)
       │                         │                │
       ├──> #32 (LoadingScreen) ─┘                │
       │                                          │
       └──> #29 (testing) ────────────────────────┘
```

### Testing Priority Order
When implementing #29, test these files first:
1. `src/utils/generations.js` - simplest, builds confidence
2. `src/utils/placeholders.js` - pure functions with calculations
3. `src/utils/assembleReport.js` - data assembly logic
4. `src/App.jsx` - URL parsing functions

---

## Phase 4: Nice-to-Have (P3)
> **Backlog** - when time permits

| Issue | Title | Effort | Dependencies |
|-------|-------|--------|--------------|
| #35 | Add deployment documentation | 1 hr | Phase 1 |
| #40 | Enable Dependabot | 15 min | None |
| #41 | Add bundle size tracking | 1-2 hrs | None |
| #36 | Split App.jsx into modules | 2-3 hrs | #26 |
| #37 | Add focus trap to mobile menu | 1-2 hrs | None |
| #38 | Add service worker for offline | 4-6 hrs | Phase 2 |
| #39 | Optimize font loading | 3-4 hrs | None |

**Total Phase 4**: 13-19 hours

### Recommended Order
```
#40 (Dependabot) ──> Quick win, set and forget
#35 (deploy docs) ──> Documentation while fresh
#41 (bundle size) ──> Enables tracking before more changes
#36 (split App.jsx) ──> Needs #26 first
#37 (focus trap) ──> Accessibility improvement
#39 (fonts) ──> Nice optimization
#38 (service worker) ──> Biggest effort, do last
```

---

## Issue Quick Reference

### By Priority
| Priority | Issues | Count |
|----------|--------|-------|
| P0 Critical | #22, #23, #24 | 3 |
| P1 High | #25, #26, #27, #28 | 4 |
| P2 Medium | #29, #30, #31, #32, #33, #34 | 6 |
| P3 Low | #35, #36, #37, #38, #39, #40, #41 | 7 |

### By Type
| Type | Issues |
|------|--------|
| Performance | #25, #27, #33, #38, #39, #41 |
| Refactor | #26, #34, #36 |
| Documentation | #23, #30, #35 |
| Testing | #29 |
| Security | #24, #28, #31 |
| CI/CD | #28, #40 |
| Accessibility | #37 |
| Chore | #22 |

### Dependency Graph
```
                    ┌─────────────────────────────────────┐
                    │                                     │
#22 (version) ──────┼──> #23 (README)                     │
                    │                                     │
#24 (security) ─────┘                                     │
                                                          │
#27 (memo) ─────────┬──> #26 (extract) ──┬──> #34 (props)│
                    │                    │               │
#28 (CI audit)──────┤                    ├──> #33 (lazy) │
                    │                    │               │
#25 (birthdays) ────┘                    │               │
                                         │               │
#32 (closure) ──────────────────────────┘               │
                                                          │
#29 (testing) ────────────────────────────────────────────┤
                                                          │
#30 (CLAUDE.md) ──────────────────────────────────────────┤
                                                          │
#31 (CSP) ────────────────────────────────────────────────┘

Phase 4 (independent):
#35 (deploy docs)
#36 (split App) ──> needs #26
#37 (focus trap)
#38 (service worker) ──> needs Phase 2
#39 (fonts)
#40 (Dependabot)
#41 (bundle size)
```

---

## Session Planning

### Session 1: Critical Fixes (~1 hour)
- [ ] #22 - Version mismatch
- [ ] #24 - Security vulnerabilities
- [ ] #23 - README update
- [ ] Push and verify deployment

### Session 2: Quick Performance Wins (~1 hour)
- [ ] #27 - React.memo
- [ ] #28 - npm audit in CI
- [ ] #31 - CSP headers
- [ ] Push and verify

### Session 3: Birthday Data Split (~4 hours)
- [ ] #25 - Split birthdays.json
- [ ] Test all 12 months work
- [ ] Verify mobile performance improvement

### Session 4: Theme Refactoring (~6 hours)
- [ ] #26 - Extract shared theme logic
- [ ] #34 - Standardize prop naming
- [ ] #33 - Lazy load themes
- [ ] Test all themes still work

### Session 5: Testing Infrastructure (~4 hours)
- [ ] #29 - Set up Vitest
- [ ] Write tests for generations.js
- [ ] Write tests for placeholders.js
- [ ] Add test script to CI

### Session 6: Documentation & Cleanup (~2 hours)
- [ ] #30 - Fix CLAUDE.md paths
- [ ] #35 - Add deployment docs
- [ ] #40 - Enable Dependabot

### Session 7+: Remaining P3 Items
- As time permits

---

## Success Criteria

### Phase 1 Complete When:
- [ ] `npm version` shows 0.4.1
- [ ] Git tag v0.4.1 exists
- [ ] `npm audit` shows 0 high/critical vulnerabilities
- [ ] README has no password gate mentions
- [ ] All README URLs include birthday parameter

### Phase 2 Complete When:
- [ ] Mobile 3G load time < 3 seconds (from 10-15s)
- [ ] Theme components wrapped in React.memo
- [ ] CI fails on security vulnerabilities
- [ ] Theme duplication reduced to <20%

### Phase 3 Complete When:
- [ ] Test coverage > 50% for utilities
- [ ] All documentation paths accurate
- [ ] CSP headers active
- [ ] Themes lazy loaded

### Phase 4 Complete When:
- [ ] Dependabot creating weekly PRs
- [ ] Service worker enabling offline use
- [ ] Bundle size tracked in CI
- [ ] App.jsx < 150 lines

---

## Commands Reference

```bash
# View all issues
gh issue list

# View specific issue
gh issue view 22

# Start work on issue
git worktree add ../life-story-issue-22 main
cd ../life-story-issue-22
git checkout -b fix/issue-22-version-mismatch

# Close issue when done
gh issue close 22 --comment "Fixed in commit abc123"
```

---

*Last updated: 2026-02-04*
*Run `/tg-issues` to see current issue status*
