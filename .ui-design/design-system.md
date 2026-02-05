# Design System - Elevation Strategy

## Philosophy

Elevation in Life Story follows a dual approach:
- **Shadows** = floating/interactive elements (buttons, overlays, modals)
- **Borders** = structural/thematic elements (cards, sections, dividers)

This separation keeps the interface clean while allowing each theme to express its unique character.

## Shadow Usage (Sparse & Intentional)

Shadows are reserved for elements that "float" above the page or require interaction feedback.

| Context | Class | Rationale |
|---------|-------|-----------|
| Overlays/modals | `shadow-xl` | Clear depth separation from content |
| Sidebar (desktop) | `shadow-xl` | Navigation floats above content |
| CTA buttons | `shadow-lg` | Interaction affordance |
| Date picker | `shadow-lg` | Floating input component |
| Theme containers | `shadow-2xl` | Premium, magazine-like feel |

### When to Use Shadows
- Modal/overlay backgrounds
- Floating navigation elements
- Primary action buttons
- Dropdowns and popovers

### When NOT to Use Shadows
- Content cards (use borders instead)
- Section dividers
- Inline elements
- Decorative purposes

## Border Usage (Extensive & Thematic)

Borders provide structure and reinforce each theme's visual identity.

### Timeline Theme (Modern, Subtle)
| Element | Pattern | Rationale |
|---------|---------|-----------|
| Content cards | `border border-sepia-brown/10` | Subtle separation |
| Section dividers | `border-sepia-brown/20` | Light structural lines |
| Active states | `border-sepia-brown/30` | Slightly more prominent |

### Newspaper Theme (1880s Authenticity)
| Element | Pattern | Rationale |
|---------|---------|-----------|
| Article borders | `border-2 border-stone-700` | Heavy, vintage print feel |
| Column rules | `border-r border-stone-600` | Classic newspaper columns |
| Headlines | `border-b-2` | Traditional underlines |

### CaseFile Theme (Dossier Aesthetic)
| Element | Pattern | Rationale |
|---------|---------|-----------|
| Document sections | `border border-sepia-brown/20` | File folder compartments |
| Classification boxes | `border-2` | Official document styling |
| Redacted areas | `border border-sepia-brown/30` | Highlighted sections |

## Color Tokens for Elevation

```css
/* Sepia-brown scale (primary border color) */
--sepia-brown-10: rgba(139, 90, 43, 0.1);
--sepia-brown-20: rgba(139, 90, 43, 0.2);
--sepia-brown-30: rgba(139, 90, 43, 0.3);

/* Stone scale (Newspaper theme) */
--stone-600: #57534e;
--stone-700: #44403c;
```

## Implementation Guidelines

1. **New components**: Default to borders for structure
2. **Interactive elements**: Consider shadow for hover/active states
3. **Theme consistency**: Match existing patterns within each theme
4. **Accessibility**: Ensure sufficient contrast for border visibility
5. **Dark mode**: Border opacity may need adjustment for visibility

## Examples

### Card with Border (Preferred)
```jsx
<div className="border border-sepia-brown/20 rounded-lg p-4">
  Content here
</div>
```

### Floating Element with Shadow
```jsx
<div className="shadow-lg rounded-lg p-4 bg-white">
  Overlay content
</div>
```

### Combined (Rare, for emphasis)
```jsx
<div className="border border-sepia-brown/20 shadow-lg rounded-lg p-4">
  Premium featured content
</div>
```
