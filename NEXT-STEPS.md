# Next Steps - Life Story
Last Updated: February 6, 2026

## Immediate Tasks (Start Here)

### 1. Fix Landing Page Design
**Priority**: HIGH — User is unhappy, this is the first thing visitors see
**File(s)**: `src/components/DatePicker.jsx`, possibly `src/index.css`
**What to do**:
- Do NOT guess at colors. Use `/tg-themes` or a proper design review first.
- The current charcoal/amber light palette was an intentional redesign (commit `afa09f3`) but user doesn't like it
- The original dark-brown/cream vintage palette (before `afa09f3`) was also not liked when restored
- Need to design something NEW that works — get user approval on a design direction BEFORE coding
- Key elements: background, input field, CTA button, section preview cards, typography, spacing
- Consider the transition from landing page → report themes (currently jarring)
**Why**: User explicitly said it looks ugly. Multiple fix attempts this session all failed.
**Estimated effort**: Medium (once design direction is agreed on)

### 2. Verify Theme Switcher Works
**Priority**: HIGH
**File(s)**: `src/components/ThemeSwitcher.jsx`, `src/routes/AppRoutes.jsx`
**What to do**:
- Test on live site (https://tejasgadhia.github.io/life-story/) in a real browser
- Open a report → click gear → try switching between all 3 themes
- If it doesn't work: the `key` prop fix in AppRoutes may not be sufficient, debug further
- If it works: close this item
**Why**: Bug was reported but couldn't be reproduced in automated testing. `key` props were added as a defensive fix.
**Estimated effort**: Quick (just testing)

### 3. Case File Theme Redesign
**Priority**: MEDIUM
**File(s)**: `src/components/themes/CaseFileTheme.jsx`
**What to do**: Redesign or rethink the case file theme — currently feels cheesy (#66)
**Why**: Open issue #66
**Estimated effort**: Substantial

## Future Enhancements

- Additional themes
- Social sharing (Open Graph meta tags per report)

## Questions to Resolve

- What design direction does user want for landing page? (vintage magazine? modern minimal? something else?)
- Should landing page match a specific theme or be theme-neutral?
- Is the charcoal color scale worth keeping in the design system or should it be removed?

## Blockers

- Landing page fix blocked on user design approval — don't start coding until direction is agreed on

## Next Session Starter Prompt

> "Continue working on life-story. Last session was a mess — tried to fix the landing page design based on a bad plan, made it worse, had to revert everything. The landing page (DatePicker.jsx) needs a proper redesign — current charcoal/amber look is not what I want. Let's start fresh: show me design options before writing any code. Also verify theme switching works on the live site. Reference NEXT-STEPS.md for details."
