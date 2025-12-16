# Motion Design

This reference guides the creation of motion design that enhances usability, provides feedback, and creates delight - without sacrificing performance or accessibility.

The user provides a motion challenge: adding animations to components, improving interaction feedback, building page transitions, creating micro-interactions, or establishing motion design systems. They may include performance constraints, aesthetic goals, or specific interaction problems to solve.

## Motion Design Thinking

Before animating anything, understand the purpose and context:

- **Purpose**: Why animate? Feedback? Delight? Guidance? Branding? Every animation needs a reason beyond "it looks cool."
- **Personality**: What character should motion convey? Snappy and energetic? Smooth and luxurious? Playful and bouncy? Subtle and refined?
- **Performance Budget**: Mobile devices? Complex pages? Can we afford GPU-intensive animations?
- **Accessibility**: Motion sensitivity, vestibular disorders, reduced motion preferences - some users need minimal animation.

**CRITICAL**: Animation should enhance understanding and usability, not obscure it. When in doubt, be subtle. Users notice janky animation more than no animation.

Then implement motion that is:
- Purposeful with clear functional or emotional goals
- Performant with smooth 60fps execution
- Accessible with reduced motion alternatives
- Choreographed with thoughtful timing and sequencing

## Duration: The 100/300/500 Rule

Timing matters more than easing. These durations feel right for most UI:

| Duration | Use Case | Examples |
|----------|----------|----------|
| **100-150ms** | Instant feedback | Button press, toggle, color change |
| **200-300ms** | State changes | Menu open, tooltip, hover states |
| **300-500ms** | Layout changes | Accordion, modal, drawer |
| **500-800ms** | Entrance animations | Page load, hero reveals |

**Exit animations are faster than entrances.** Users want to see what's leaving—quickly. Use ~75% of the enter duration:
```css
.modal {
  --enter: 400ms;
  --exit: 300ms;
}
```

## Easing: Pick the Right Curve

**Don't use `ease`.** It's a compromise that's rarely optimal. Instead:

| Curve | Use For | CSS |
|-------|---------|-----|
| **ease-out** | Elements entering | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **ease-in** | Elements leaving | `cubic-bezier(0.7, 0, 0.84, 0)` |
| **ease-in-out** | State toggles (there → back) | `cubic-bezier(0.65, 0, 0.35, 1)` |

**For micro-interactions, use exponential curves**—they feel natural because they mimic real physics (friction, deceleration):

```css
/* Quart out - smooth, refined (recommended default) */
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);

/* Quint out - slightly more dramatic */
--ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);

/* Expo out - snappy, confident */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
```

**Avoid bounce and elastic curves.** They were trendy in 2015 but now feel tacky and amateurish. Real objects don't bounce when they stop—they decelerate smoothly. Overshoot effects draw attention to the animation itself rather than the content.

## The Only Two Properties You Should Animate

**transform** and **opacity**. That's it. Everything else causes layout recalculation or repaints:

```css
/* Good: GPU-accelerated, smooth */
.slide-in {
  transform: translateX(0);
  opacity: 1;
  transition: transform 300ms ease-out, opacity 300ms ease-out;
}
.slide-in.hidden {
  transform: translateX(20px);
  opacity: 0;
}

/* Bad: triggers layout, janky */
.slide-in {
  left: 0;  /* Layout thrashing */
  height: 100%;  /* Expensive */
}
```

**Exceptions**: Sometimes you must animate `height` for accordions. Use `max-height` with a value larger than content, or better yet, use CSS Grid's `grid-template-rows: 0fr → 1fr` trick.

## Staggered Animations

Staggering creates rhythm and direction. The formula:

```css
.list-item {
  animation: fade-in 400ms ease-out both;
}

/* Stagger each item by 50ms */
.list-item:nth-child(1) { animation-delay: 0ms; }
.list-item:nth-child(2) { animation-delay: 50ms; }
.list-item:nth-child(3) { animation-delay: 100ms; }
/* ... */
```

**Better approach with CSS custom property:**

```css
.list-item {
  animation: fade-in 400ms ease-out both;
  animation-delay: calc(var(--i, 0) * 50ms);
}
```
```html
<li class="list-item" style="--i: 0">First</li>
<li class="list-item" style="--i: 1">Second</li>
<li class="list-item" style="--i: 2">Third</li>
```

**Key insight**: Cap the total stagger time. 10 items at 50ms = 500ms before the last item appears. If you have 50 items, reduce to 20ms per item or cap at ~10 staggered items.

## Reduced Motion

This is not optional. Vestibular disorders affect ~35% of adults over 40.

```css
/* Define animations normally */
.card {
  animation: slide-up 500ms ease-out;
}

/* Provide alternative for reduced motion */
@media (prefers-reduced-motion: reduce) {
  .card {
    animation: fade-in 200ms ease-out;  /* Crossfade instead of motion */
  }
}

/* Or disable entirely */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**What to preserve**: Functional animations like progress bars, loading spinners (slowed down), and focus indicators should still work—just without spatial movement.

## Performance: Avoid These Mistakes

### Don't Use will-change Preemptively

```css
/* Bad: wastes GPU memory */
.card { will-change: transform; }

/* Good: only when animation is imminent */
.card:hover { will-change: transform; }
.card.animating { will-change: transform; }
```

`will-change` forces the browser to create a compositing layer. Used everywhere = memory bloat.

### Don't Animate During Scroll

Scroll-linked animations (parallax, reveal) are expensive. If you must:

```javascript
// Use Intersection Observer, not scroll events
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Animate once, then stop observing
    }
  });
}, { threshold: 0.2 });
```

### Don't Fight the Main Thread

Heavy JavaScript animations block rendering. For complex choreography, use the Web Animations API or a library like Motion One that schedules efficiently.

## Motion Tokens

Create a system for consistency:

```css
:root {
  /* Durations */
  --duration-instant: 100ms;
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;

  /* Easings */
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in: cubic-bezier(0.7, 0, 0.84, 0);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* Common patterns */
  --transition-fade: opacity var(--duration-fast) var(--ease-out);
  --transition-slide: transform var(--duration-normal) var(--ease-out);
  --transition-all: var(--duration-normal) var(--ease-out);
}
```

---

**IMPORTANT**: One well-orchestrated page load with staggered reveals creates more delight than scattered micro-interactions everywhere. Focus on high-impact moments.

**NEVER**:
- Animate everything (animation fatigue is real)
- Use long durations (>500ms) for UI feedback (users will perceive lag)
- Animate layout properties (width, height, top, left) - use transform instead
- Ignore prefers-reduced-motion (accessibility requirement)
- Use animation to hide slow loading (fix the loading time)
- Animate without purpose (every animation should answer "why?")
- Create animations that obscure content or block interaction

Remember: Motion is powerful - it can guide attention, provide feedback, and create emotional connection. Use it thoughtfully, not reflexively.
