# Typography

This reference guides the creation and refinement of typography systems that balance timeless principles with modern web capabilities.

The user provides a typography challenge: building a type system, improving readability, selecting fonts, fixing hierarchy, or implementing responsive typography. They may include context about the project's aesthetic direction, constraints, or specific problems to solve.

## Typography Thinking

Before implementing, understand the context and establish a clear typographic voice:

- **Purpose & Audience**: What is being communicated? Who is reading? Technical docs need different type than marketing pages.
- **Tone & Character**: What personality should the typography convey? Authoritative? Playful? Elegant? Minimal? The fonts and system should embody this.
- **Constraints**: Performance budgets, browser support, existing design system, accessibility requirements.
- **Reading Context**: Long-form reading vs scanning, dense information vs spacious editorial, desktop vs mobile primary usage.

**CRITICAL**: Typography is the voice of your interface. Invest time in getting it right - it impacts every single screen.

Then build or refine a typography system that is:
- Readable and accessible across devices and contexts
- Systematically coherent with clear hierarchy
- Performant and technically sound
- Aesthetically distinctive and appropriate for the brand

## Classic Typography Principles

### Vertical Rhythm

The non-obvious insight: your line-height should be the base unit for ALL vertical spacing in your design. If body text has `line-height: 1.5` on `16px` type (= 24px), then spacing values should be multiples of 24px: 24, 48, 72, etc.

This creates subconscious harmony. Text and space feel "right" together because they share a mathematical foundation.

```css
:root {
  --baseline: 1.5rem; /* 24px if root is 16px */
  --space-1: var(--baseline);      /* 24px */
  --space-2: calc(var(--baseline) * 2);  /* 48px */
  --space-half: calc(var(--baseline) / 2); /* 12px */
}
```

### Modular Scale & Hierarchy

The common mistake: too many font sizes that are too close together (14px, 15px, 16px, 18px...). This creates muddy hierarchy.

**Use fewer sizes with more contrast.** A 5-size system covers most needs:

| Role | Typical Ratio | Use Case |
|------|---------------|----------|
| xs | 0.75rem | Captions, legal |
| sm | 0.875rem | Secondary UI, metadata |
| base | 1rem | Body text |
| lg | 1.25-1.5rem | Subheadings, lead text |
| xl+ | 2-4rem | Headlines, hero text |

Popular ratios: 1.25 (major third), 1.333 (perfect fourth), 1.5 (perfect fifth). Pick one and commit.

### Readability & Measure

Line length (measure) guidelines are well-known (45-75 characters), but the implementation detail matters:

```css
/* Use ch units for true character-based measure */
.prose { max-width: 65ch; }

/* Line-height scales inversely with line length */
.narrow-column { max-width: 45ch; line-height: 1.4; }
.wide-column { max-width: 75ch; line-height: 1.6; }
```

**Non-obvious**: Increase line-height for light text on dark backgrounds. The perceived weight is lighter, so text needs more breathing room. Add 0.05-0.1 to your normal line-height.

## Font Selection & Pairing

### Choosing Distinctive Fonts

**Avoid the invisible defaults**: Inter, Roboto, Open Sans, Lato, Montserrat. These are everywhere, making your design feel generic. They're fine for documentation or tools where personality isn't the goal—but if you want distinctive design, look elsewhere.

**Better Google Fonts alternatives**:
- Instead of Inter → **Instrument Sans**, **Plus Jakarta Sans**, **Outfit**
- Instead of Roboto → **Onest**, **Figtree**, **Urbanist**
- Instead of Open Sans → **Source Sans 3**, **Nunito Sans**, **DM Sans**
- For editorial/premium feel → **Fraunces**, **Newsreader**, **Lora**

**System fonts are underrated**: `-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui` looks native, loads instantly, and is highly readable. Consider this for apps where performance > personality.

### Pairing Principles

**The non-obvious truth**: You often don't need a second font. One well-chosen font family in multiple weights creates cleaner hierarchy than two competing typefaces. Only add a second font when you need genuine contrast (e.g., display headlines + body serif).

When pairing, contrast on multiple axes:
- Serif + Sans (structure contrast)
- Geometric + Humanist (personality contrast)
- Condensed display + Wide body (proportion contrast)

**Never pair fonts that are similar but not identical** (e.g., two geometric sans-serifs). They create visual tension without clear hierarchy.

### Web Font Loading

The layout shift problem: fonts load late, text reflows, and users see content jump. Here's the fix:

```css
/* 1. Use font-display: swap for visibility */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap;
}

/* 2. Match fallback metrics to minimize shift */
@font-face {
  font-family: 'CustomFont-Fallback';
  src: local('Arial');
  size-adjust: 105%;        /* Scale to match x-height */
  ascent-override: 90%;     /* Match ascender height */
  descent-override: 20%;    /* Match descender depth */
  line-gap-override: 10%;   /* Match line spacing */
}

body {
  font-family: 'CustomFont', 'CustomFont-Fallback', sans-serif;
}
```

Tools like [Fontaine](https://github.com/unjs/fontaine) calculate these overrides automatically.

## Modern Web Typography

### Fluid Type

Fluid typography eliminates breakpoint jumps. The formula:

```css
/* font-size: clamp(min, preferred, max) */
h1 { font-size: clamp(2rem, 5vw + 1rem, 4rem); }
```

The `5vw + 1rem` creates smooth scaling. Adjust the vw coefficient for faster/slower scaling.

**When NOT to use fluid type**:
- Button text, labels, UI elements (should be consistent, not fluid)
- Very short text (scaling makes less sense)
- When you need precise control at specific breakpoints

### OpenType Features

Most developers don't know these exist. Use them for polish:

```css
/* Tabular numbers for data alignment */
.data-table { font-variant-numeric: tabular-nums; }

/* Proper fractions */
.recipe-amount { font-variant-numeric: diagonal-fractions; }

/* Small caps for abbreviations */
abbr { font-variant-caps: all-small-caps; }

/* Disable ligatures in code */
code { font-variant-ligatures: none; }

/* Enable kerning (usually on by default, but be explicit) */
body { font-kerning: normal; }
```

Check what features your font supports at [Wakamai Fondue](https://wakamaifondue.com/).

## Typography System Architecture

### Token Structure

**Name tokens semantically, not by value**:

```css
/* Bad: tied to implementation */
--font-size-16: 1rem;
--font-size-24: 1.5rem;

/* Good: tied to purpose */
--font-size-body: 1rem;
--font-size-heading: 1.5rem;
```

A complete token set:

```css
:root {
  /* Font stacks */
  --font-sans: 'CustomSans', system-ui, sans-serif;
  --font-serif: 'CustomSerif', Georgia, serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Size scale (semantic) */
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.5rem;
  --text-2xl: 2rem;
  --text-3xl: 3rem;

  /* Weight */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;

  /* Line height */
  --leading-tight: 1.25;
  --leading-normal: 1.5;
  --leading-relaxed: 1.75;

  /* Letter spacing */
  --tracking-tight: -0.02em;
  --tracking-normal: 0;
  --tracking-wide: 0.05em;
}
```

## Accessibility Considerations

Beyond contrast ratios (which are well-documented), consider:

- **Never disable zoom**: `user-scalable=no` breaks accessibility. If your layout breaks at 200% zoom, fix the layout.
- **Use rem/em for font sizes**: This respects user browser settings. Never `px` for body text.
- **Minimum 16px body text**: Smaller than this strains eyes and fails WCAG on mobile.
- **Adequate touch targets**: Text links need padding or line-height that creates 44px+ tap targets.

---

**IMPORTANT**: Balance trendy font choices with timeless readability principles. A distinctive font is worthless if users can't comfortably read it.

**NEVER**:
- Use more than 2-3 font families in a single project
- Sacrifice readability for aesthetic novelty
- Ignore font loading performance
- Skip fallback font definitions
- Use decorative fonts for body text
- Implement arbitrary font sizes without a systematic scale

Remember: Typography is 95% of design. Master it, and everything else becomes easier.
