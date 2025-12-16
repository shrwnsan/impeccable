# Responsive Design

This reference guides the creation of responsive interfaces that adapt beautifully across devices, screen sizes, input methods, and usage contexts.

The user provides a responsive design challenge: building mobile-first layouts, defining breakpoint strategies, optimizing for touch vs pointer, creating fluid designs, or solving specific cross-device problems. They may include device requirements, constraints, or specific adaptation challenges.

## Responsive Design Thinking

Before implementing, understand the multi-device context:

- **Device Landscape**: Which devices matter? (Mobile, tablet, desktop, TV, watch?) What's the primary device?
- **Usage Context**: How do usage patterns differ by device? (On-the-go mobile vs focused desktop work)
- **Input Methods**: Touch, pointer, keyboard, voice, gamepad - what input methods need support?
- **Network Conditions**: Fast wifi vs slow 3G - how does this impact design decisions?
- **Content Priority**: What's essential on all devices vs optional on larger screens?

**CRITICAL**: Responsive design is not just about scaling - it's about adapting the experience appropriately for each context.

Then build responsive systems that are:
- Mobile-first with progressive enhancement
- Fluid and adaptable across viewport sizes
- Optimized for different input methods
- Performant on constrained devices
- Contextually appropriate

## Mobile-First: Write It Right

Start with base styles for mobile, then layer complexity:

```css
/* Base: mobile */
.nav {
  display: flex;
  flex-direction: column;
}

/* Enhancement: tablet and up */
@media (min-width: 768px) {
  .nav {
    flex-direction: row;
  }
}
```

**The mistake**: Writing desktop-first (max-width queries) means mobile loads desktop styles first, then overrides. Wasteful and error-prone.

## Breakpoints: Content-Driven, Not Device-Driven

**Don't chase device sizes.** iPhones change, Android varies wildly, tablets overlap with laptops. Instead, let content tell you where to break:

1. Start narrow
2. Stretch the viewport until the design breaks
3. Add a breakpoint there

Common content-driven breakpoints (as starting points):

```css
:root {
  --bp-sm: 640px;   /* Larger phones, small content changes */
  --bp-md: 768px;   /* Tablets, significant reflow */
  --bp-lg: 1024px;  /* Laptops, multi-column */
  --bp-xl: 1280px;  /* Desktops, max content width */
}
```

**Three breakpoints usually suffice.** If you have more than five, you're probably over-engineering.

## Fluid Design: The Clamp Formula

`clamp(min, preferred, max)` creates fluid values without media queries.

### The Formula

```css
/* Font size: 16px min, scales with viewport, 24px max */
font-size: clamp(1rem, 0.5rem + 2vw, 1.5rem);
```

**How to calculate the preferred value**: The middle value determines the scaling rate. Higher vw coefficient = faster scaling:

- `1vw` = gentle scaling
- `2-3vw` = moderate scaling
- `4vw+` = aggressive scaling

Add a rem offset to shift the baseline: `0.5rem + 2vw` ensures it doesn't collapse to 0 on small screens.

### Fluid Spacing

```css
:root {
  --space-lg: clamp(2rem, 1rem + 3vw, 4rem);
  --container-padding: clamp(1rem, 5vw, 4rem);
}
```

This creates breathing room that naturally expands on larger screens.

## Detect Input Method, Not Just Screen Size

**Screen size doesn't tell you input method.** A laptop with touchscreen, a tablet with keyboard—use pointer and hover queries:

```css
/* Fine pointer (mouse, trackpad) */
@media (pointer: fine) {
  .button { padding: 8px 16px; }
}

/* Coarse pointer (touch, stylus) */
@media (pointer: coarse) {
  .button { padding: 12px 20px; }  /* Larger touch target */
}

/* Device supports hover */
@media (hover: hover) {
  .card:hover { transform: translateY(-2px); }
}

/* Device doesn't support hover (touch) */
@media (hover: none) {
  .card { /* No hover state - use active instead */ }
}
```

**Critical**: Don't rely on hover for functionality. Touch users can't hover.

## Safe Areas: Handle the Notch

Modern phones have notches, rounded corners, and home indicators. Use `env()`:

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* With fallback */
.footer {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

**Enable viewport-fit** in your meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## Responsive Images: Get It Right

### srcset with Width Descriptors

```html
<img
  src="hero-800.jpg"
  srcset="
    hero-400.jpg 400w,
    hero-800.jpg 800w,
    hero-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero image"
>
```

**How it works**:
- `srcset` lists available images with their actual widths (`w` descriptors)
- `sizes` tells the browser how wide the image will display
- Browser picks the best file based on viewport width AND device pixel ratio

### Picture Element for Art Direction

When you need different crops/compositions (not just resolutions):

```html
<picture>
  <source media="(min-width: 768px)" srcset="wide.jpg">
  <source media="(max-width: 767px)" srcset="tall.jpg">
  <img src="fallback.jpg" alt="...">
</picture>
```

## Layout Adaptation Patterns

### Navigation: The Three-Stage Pattern

```css
/* Mobile: hamburger icon + drawer */
.nav-menu { display: none; }
.nav-toggle { display: block; }

/* Tablet: horizontal but compact */
@media (min-width: 768px) {
  .nav-menu { display: flex; }
  .nav-toggle { display: none; }
}

/* Desktop: full navigation with labels */
@media (min-width: 1024px) {
  .nav-item-label { display: inline; }
}
```

### Table to Cards

Tables work on desktop, fail on mobile. Transform:

```css
@media (max-width: 768px) {
  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead { display: none; }  /* Hide headers */

  tr {
    margin-bottom: 1rem;
    border: 1px solid var(--border);
    padding: 1rem;
  }

  td::before {
    content: attr(data-label);  /* Add labels via data attribute */
    font-weight: 600;
    display: block;
  }
}
```

### Progressive Disclosure

Not everything needs to show on mobile:

```css
/* Show summary on mobile */
.details-content { display: none; }

@media (min-width: 768px) {
  /* Expand on desktop */
  .details-content { display: block; }
}
```

Combine with `<details>/<summary>` for interactive expansion on mobile.

## Testing: Don't Trust DevTools Alone

DevTools device emulation is useful for layout but misses:

- Actual touch interactions
- Real CPU/memory constraints
- Network latency patterns
- Font rendering differences
- Browser chrome/keyboard appearances

**Test on at least**: One real iPhone, one real Android, a tablet if relevant. Cheap Android phones reveal performance issues you'll never see on simulators.

---

**IMPORTANT**: Test on real devices, not just DevTools. Device emulation is useful but misses real-world constraints.

**NEVER**:
- Design desktop-first and try to cram into mobile
- Hide critical functionality on mobile
- Use device detection instead of feature detection
- Create separate mobile/desktop codebases (maintain one responsive codebase)
- Ignore landscape orientation
- Use fixed pixel values without considering smaller/larger screens
- Forget about tablet (it's not just big phone or small desktop)
- Assume all mobile devices are powerful (many users have older devices)

Remember: Responsive design is about creating experiences that work everywhere while feeling native nowhere. Adapt intelligently for context while maintaining consistency.
