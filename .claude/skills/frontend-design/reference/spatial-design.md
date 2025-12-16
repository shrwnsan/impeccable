# Spatial Design

This reference guides the creation of spatial systems that balance mathematical precision with artistic composition, ensuring interfaces are both systematically organized and visually compelling.

The user provides a layout challenge: building spacing systems, establishing grids, improving visual hierarchy, fixing composition issues, or implementing responsive layouts. They may include design system constraints, aesthetic goals, or specific spatial problems to solve.

## Spatial Design Thinking

Before arranging elements, understand the compositional strategy:

- **Content Priority**: What's most important? What should users see first, second, third? Hierarchy starts here.
- **Visual Weight Distribution**: Where should the eye go? Balanced or intentionally unbalanced? Symmetrical or asymmetric?
- **Density vs Breathing Room**: Controlled density (information-rich) or generous space (editorial)? Match context and audience.
- **Reading Patterns**: Z-pattern (scanning), F-pattern (text-heavy), focal point (marketing), free-form (experimental)?

**CRITICAL**: Space is not empty - it's an active design element. Negative space gives positive elements room to breathe and meaning.

Then build layout systems that are:
- Systematically consistent with clear spacing rules
- Visually balanced with intentional hierarchy
- Responsive and adaptive across viewports
- Compositionally strong with clear focal points

## Spacing Systems

### Use 4pt Base, Not 8pt

8pt systems are too coarse. **4pt gives you the granularity you actually need:**

```css
:root {
  --space-1: 4px;    /* 0.25rem - tight */
  --space-2: 8px;    /* 0.5rem */
  --space-3: 12px;   /* 0.75rem */
  --space-4: 16px;   /* 1rem - base */
  --space-6: 24px;   /* 1.5rem */
  --space-8: 32px;   /* 2rem */
  --space-12: 48px;  /* 3rem */
  --space-16: 64px;  /* 4rem */
  --space-24: 96px;  /* 6rem - section gaps */
}
```

**The insight**: You'll frequently need 12px (between 8 and 16). An 8pt-only system forces awkward choices.

### Name Tokens by Relationship, Not Value

```css
/* Bad: tied to pixels */
--spacing-8: 8px;
--spacing-16: 16px;

/* Better: semantic */
--space-xs: 4px;   /* Tight inline gaps */
--space-sm: 8px;   /* Between related elements */
--space-md: 16px;  /* Component padding */
--space-lg: 24px;  /* Between components */
--space-xl: 48px;  /* Section padding */
--space-2xl: 96px; /* Section margins */
```

### Gap Over Margin

**Stop using margins for spacing between siblings.** Use `gap`:

```css
/* Old way: margins create double-spacing bugs */
.card { margin-bottom: 16px; }
.card:last-child { margin-bottom: 0; } /* Cleanup hack */

/* Modern way: gap just works */
.card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;  /* Automatic, no cleanup needed */
}
```

Gap works in Flexbox and Grid. It's cleaner, more intentional, and eliminates margin collapse headaches.

## Grid Systems

### The Self-Adjusting Grid

This pattern creates responsive grids without breakpoints:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-lg);
}
```

**How it works**: Columns are at least 280px. As many as fit per row. Leftovers stretch. No media queries needed.

**Variation for exact counts:**
```css
/* Always 3 columns on desktop, stack on mobile */
.grid-3 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(280px, 100%), 1fr));
  gap: var(--space-lg);
}
```

### Grid Area Naming

For complex layouts, named areas are clearer than line numbers:

```css
.page {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 280px 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.footer { grid-area: footer; }
```

At mobile breakpoints, redefine the areas:
```css
@media (max-width: 768px) {
  .page {
    grid-template-areas:
      "header"
      "main"
      "sidebar"
      "footer";
    grid-template-columns: 1fr;
  }
}
```

## Visual Hierarchy

### The Squint Test

Blur your eyes (or screenshot and blur). Can you still identify:
- The most important element?
- The second most important?
- Clear groupings?

If everything looks the same weight blurred, you have a hierarchy problem.

### Hierarchy Through Multiple Dimensions

Don't rely on size alone. Combine:

| Tool | Strong Hierarchy | Weak Hierarchy |
|------|------------------|----------------|
| **Size** | 3:1 ratio or more | <2:1 ratio |
| **Weight** | Bold vs Regular | Medium vs Regular |
| **Color** | High contrast | Similar tones |
| **Position** | Top/left (primary) | Bottom/right |
| **Space** | Surrounded by white space | Crowded |

**The best hierarchy uses 2-3 dimensions at once**: A heading that's larger, bolder, AND has more space above it.

### Cards Are Not Required

Cards (bordered/shadowed containers) are overused. You don't need a card to create visual grouping—spacing and alignment do this naturally.

**Use cards when**:
- Content is truly distinct and actionable (a product, a post, a task)
- Items need to be visually comparable in a grid
- Content needs clear boundaries for interaction (hover, click)

**Don't use cards for**:
- General layout structure (use spacing instead)
- Single items (a lone card looks arbitrary)
- Nesting—**never put cards inside cards**. If you need hierarchy within a card, use spacing, typography, and subtle dividers instead

```css
/* Bad: card in a card */
.outer-card > .inner-card { /* Noisy and confusing */ }

/* Good: hierarchy without nesting */
.card > .card-section { border-top: 1px solid var(--border); }
```

## Container Queries

Viewport queries are for page layouts. **Container queries are for components**:

```css
.card-container {
  container-type: inline-size;
}

.card {
  display: grid;
  gap: var(--space-md);
}

/* Card layout changes based on its container, not viewport */
@container (min-width: 400px) {
  .card {
    grid-template-columns: 120px 1fr;
  }
}
```

**Why this matters**: A card in a narrow sidebar stays compact, while the same card in a main content area expands—automatically, without viewport hacks.

## Optical Adjustments

### Text Doesn't Align

A paragraph set to `margin-left: 0` looks indented because letterforms have internal whitespace. Fix with negative margin or padding:

```css
.heading {
  margin-left: -0.05em;  /* Pull left to optically align */
}
```

### Icons Need Optical Centering

A geometrically centered icon often looks off-center. Play icons need to shift right, left-arrows need to shift left:

```css
.play-button svg {
  transform: translateX(2px);  /* Optical center */
}
```

### Touch Targets vs Visual Size

Buttons can look small but need large touch targets (44px minimum). Use padding or pseudo-elements:

```css
.icon-button {
  width: 24px;  /* Visual size */
  height: 24px;
  position: relative;
}

.icon-button::before {
  content: '';
  position: absolute;
  inset: -10px;  /* Expand tap target to 44px */
}
```

## Depth & Elevation

### Semantic Z-Index

Don't use arbitrary numbers. Create a scale:

```css
:root {
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-modal-backdrop: 300;
  --z-modal: 400;
  --z-toast: 500;
  --z-tooltip: 600;
}
```

### Shadow Scale for Elevation

Shadows indicate elevation. Create a consistent scale:

```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);         /* Subtle lift */
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);         /* Cards */
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);        /* Dropdowns */
  --shadow-xl: 0 20px 25px rgba(0,0,0,0.15);       /* Modals */
}
```

**Key insight**: Shadows should be subtle. If you can clearly see the shadow, it's probably too strong.

---

**IMPORTANT**: Systematic spacing doesn't mean boring. Use the system as a foundation, then break it intentionally for impact.

**NEVER**:
- Use arbitrary spacing values outside your scale (unless intentionally breaking the system)
- Create layouts that ignore natural reading patterns without good reason
- Forget that white space is a design element, not wasted space
- Make all spacing equal (variety creates hierarchy)
- Build responsive layouts that only work at breakpoint edges
- Create hierarchy through size alone (combine multiple tools)

Remember: Composition is the invisible structure that makes everything else work. Master the fundamentals, then break rules intentionally.
