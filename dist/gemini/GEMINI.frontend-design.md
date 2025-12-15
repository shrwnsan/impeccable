This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.



## Design Patterns Reference

This reference defines what TO do and what NOT to do when creating frontend interfaces. These patterns fight against model bias—the tendency of LLMs to converge on the same predictable choices.

### What TO Do (Patterns)

Focus on intentional, distinctive design choices:

**Typography**: Use a modular type scale with a distinctive display font paired with a refined body font. Establish clear hierarchy through weight, size, and spacing—not size alone.

**Color**: Build palettes from a dominant color with sharp accents. Use off-whites and near-blacks for sophistication. Always meet WCAG AA contrast requirements.

**Space**: Use a spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96). Create visual rhythm through varied spacing. Let content breathe. Break the grid intentionally.

**Motion**: Animate with purpose—guide attention and confirm actions. Use 150-300ms for micro-interactions. Prefer transform and opacity. Stagger reveals for orchestrated page loads.

**Interaction**: Design clear focus indicators. Make touch targets 44×44px minimum. Provide immediate feedback. Write specific, helpful error messages.

**Responsive**: Design mobile-first. Use fluid typography with clamp(). Ensure all functionality works across devices.

### What NOT to Do (Anti-Patterns)

These patterns create generic "AI slop" aesthetics:

**Generic Visuals**: Defaulting to Inter/Roboto/Arial, purple-to-blue gradients on white, wrapping everything in rounded cards, decorative shadows without purpose.

**Structural Issues**: Arbitrary spacing without a scale, hierarchy through size alone, equal spacing everywhere, cards nested inside cards.

**Interaction Failures**: Removing focus outlines without alternatives, placeholder text as labels, touch targets under 44×44px, generic "Something went wrong" errors.

**Accessibility Violations**: Color-only meaning, ignoring prefers-reduced-motion, failing WCAG contrast, creating keyboard traps.

These anti-patterns are baked into training data from countless generic templates. Without explicit guidance, AI reproduces them. This skill ensures your AI knows both what to do AND what to avoid.

---

## Domain Reference Files

For deeper expertise in specific design domains, consult these reference files:

### Typography
For type systems, font selection, readability, and typographic hierarchy.
**See**: [reference/typography.md](reference/typography.md)

### Color & Contrast
For color systems, palettes, accessibility, theming, and WCAG compliance.
**See**: [reference/color-and-contrast.md](reference/color-and-contrast.md)

### Spatial Design
For spacing systems, grids, visual hierarchy, and composition.
**See**: [reference/spatial-design.md](reference/spatial-design.md)

### Responsive Design
For mobile-first layouts, breakpoints, fluid design, and cross-device adaptation.
**See**: [reference/responsive-design.md](reference/responsive-design.md)

### Interaction Design
For forms, states, feedback patterns, keyboard navigation, and touch optimization.
**See**: [reference/interaction-design.md](reference/interaction-design.md)

### Motion Design
For animations, micro-interactions, transitions, and performance optimization.
**See**: [reference/motion-design.md](reference/motion-design.md)

### UX Writing
For interface copy, error messages, microcopy, and voice/tone guidelines.
**See**: [reference/ux-writing.md](reference/ux-writing.md)

---

## When to Use Reference Files

- **Quick builds**: Use this main skill file for most frontend work
- **Deep dives**: Consult specific reference files when facing complex challenges in that domain
- **Systematic work**: When building design systems or establishing patterns, reference multiple domain files
- **Troubleshooting**: When something feels "off", check the relevant domain reference for best practices

---

## Reference: ux-writing

# UX Writing

This reference guides the creation of interface copy that is clear, concise, helpful, and human - the words that make products understandable and usable.

The user provides a UX writing challenge: writing microcopy, improving error messages, crafting instructions, establishing voice and tone, or fixing unclear interface text. They may include brand guidelines, audience context, or specific copy problems to solve.

## UX Writing Thinking

Before writing, understand the context and user needs:

- **User Context**: What are users trying to accomplish? What's their emotional state? What do they already know?
- **Content Purpose**: Inform? Guide? Reassure? Warn? Celebrate? Different moments need different approaches.
- **Brand Voice**: Professional? Casual? Playful? Technical? Voice should match brand and audience.
- **Constraints**: Character limits, space limitations, translation considerations, accessibility requirements.

**CRITICAL**: Good UX writing is invisible - users understand immediately without noticing the words. Bad UX writing creates confusion and frustration.

Then write copy that is:
- Clear and immediately understandable
- Concise without sacrificing clarity
- Helpful and action-oriented
- Human and empathetic
- Consistent in terminology and tone

## Fundamental Principles

### Clarity Over Cleverness

[TO BE DEVELOPED: Plain language, avoid jargon, specific over vague, "Save changes" not "OK"]

### Concise But Complete

[TO BE DEVELOPED: Remove unnecessary words, but include essential information, balance brevity with clarity]

### Active Voice

[TO BE DEVELOPED: "We saved your changes" not "Your changes have been saved", action-oriented language]

### User-Focused Language

[TO BE DEVELOPED: "Your" not "The", focus on user benefits, user's mental model]

### Consistency

[TO BE DEVELOPED: Use same terms throughout, don't vary for variety, build terminology glossary]

## Voice & Tone

### Establishing Brand Voice

[TO BE DEVELOPED: Personality dimensions, voice guidelines, voice vs tone distinction]

### Adapting Tone to Context

[TO BE DEVELOPED: Success = celebratory, Error = empathetic, Loading = reassuring, matching emotional moment]

### Voice Across Cultures

[TO BE DEVELOPED: Cultural sensitivity, humor translation, formality levels, global considerations]

## Microcopy Excellence

### Button & CTA Copy

[TO BE DEVELOPED: Specific actions ("Create account" not "Submit"), verb + noun structure, outcome-oriented]

### Labels & Instructions

[TO BE DEVELOPED: Clear, specific labels, instructions before fields, showing format with examples]

### Placeholder Text

[TO BE DEVELOPED: When to use (rarely), never as labels, examples not instructions]

### Tooltips & Help Text

[TO BE DEVELOPED: Adding value beyond label, answering implicit questions, brevity with links to details]

## Error Messages & Validation

### Error Message Principles

[TO BE DEVELOPED: Explain what happened, suggest fix, don't blame user, provide examples, link to help]

### Validation Feedback

[TO BE DEVELOPED: Inline validation, timing (on blur vs on submit), success states, clear requirements]

### Error Message Patterns

[TO BE DEVELOPED: Format errors, permission errors, network errors, system errors, 404s]

## Forms & Inputs

### Form Labels

[TO BE DEVELOPED: Descriptive labels, required field indication, why you're asking (when not obvious)]

### Help Text

[TO BE DEVELOPED: Format guidance, why you need this information, examples, constraints]

### Confirmation Dialogs

[TO BE DEVELOPED: Specific about action, explain consequences, clear button labels, don't overuse]

## System Messages

### Success Messages

[TO BE DEVELOPED: Confirm what happened, what happens next, celebrate appropriately, be brief]

### Loading States

[TO BE DEVELOPED: What's happening, time expectations, progress indication, personality in waiting]

### Empty States

[TO BE DEVELOPED: Explain why empty, value of filling it, clear CTA, welcoming not dead-end]

## Navigation & Wayfinding

### Navigation Labels

[TO BE DEVELOPED: Specific and descriptive, user language not internal terms, clear information scent]

### Breadcrumbs & Headers

[TO BE DEVELOPED: Clear location indication, hierarchical clarity, shortened for mobile]

### Search & Filters

[TO BE DEVELOPED: Clear search placeholders, filter labels, no results messaging]

## Content Hierarchy & Structure

### Scannable Writing

[TO BE DEVELOPED: Short paragraphs, bullet points, clear headings, front-load important info]

### Progressive Disclosure

[TO BE DEVELOPED: Essential info first, details on demand, expandable sections, learn more links]

## Writing for Accessibility

### Screen Reader Considerations

[TO BE DEVELOPED: ARIA labels, alt text writing, link text clarity, button labels]

### Plain Language

[TO BE DEVELOPED: Reading level considerations, avoid jargon, explain technical terms]

### Text Alternatives

[TO BE DEVELOPED: Transcripts for audio/video, alt text for images, descriptions for complex UI]

## Internationalization (i18n)

### Writing for Translation

[TO BE DEVELOPED: Avoid idioms, complete sentences, context for translators, text expansion space]

### Cultural Adaptation

[TO BE DEVELOPED: Cultural sensitivity, date/time formats, address formats, name formats]

## Content Patterns by Type

### Onboarding Copy

[TO BE DEVELOPED: Welcome messages, getting started, first-time guidance, value proposition]

### Settings & Preferences

[TO BE DEVELOPED: Clear option descriptions, impact explanation, defaults indication]

### Notifications

[TO BE DEVELOPED: Scannable, actionable, appropriate urgency, notification fatigue prevention]

---

**IMPORTANT**: Read your copy out loud. If it sounds awkward or robotic, rewrite until it sounds human.

**NEVER**:
- Use jargon without explanation
- Blame users ("You made an error" → "This field is required")
- Be vague ("Something went wrong" - explain what!)
- Use passive voice unnecessarily
- Vary terminology for variety (consistency matters)
- Write overly long explanations (be concise)
- Use humor for errors (be empathetic)
- Assume technical knowledge
- Use all caps (except acronyms)
- End questions with periods (use question marks)

Remember: You're a clarity expert and empathetic communicator. Write like you're helping a friend who's smart but unfamiliar with your product. Be clear, be helpful, be human.


---

## Reference: spatial-design

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

## Classic Composition Principles

### Visual Hierarchy Fundamentals

[TO BE DEVELOPED: Size, weight, color, position, contrast as hierarchy tools, Gestalt principles (proximity, similarity, closure)]

### Balance & Symmetry

[TO BE DEVELOPED: Symmetrical vs asymmetrical balance, visual weight calculation, creating tension and resolution]

### The Rule of Thirds & Golden Ratio

[TO BE DEVELOPED: Classic composition grids, golden ratio applications, when to follow vs break rules]

### Focal Points & Eye Movement

[TO BE DEVELOPED: Creating focal points, directing eye flow, Z/F/circular patterns, intentional disruption]

## Spacing Systems

### Spacing Scales

[TO BE DEVELOPED: 4pt/8pt systems, modular scales, mathematical progressions (linear, exponential, Fibonacci)]

### Vertical Rhythm

[TO BE DEVELOPED: Baseline grids, consistent vertical spacing, spacing ratios, rhythm across components]

### Micro vs Macro Space

[TO BE DEVELOPED: Component-internal spacing, between-component spacing, section spacing, page-level breathing room]

### Spacing Token Architecture

[TO BE DEVELOPED: Primitive spacing tokens, semantic spacing (component gaps, section padding), contextual spacing]

## Grid Systems & Layout Patterns

### Grid Fundamentals

[TO BE DEVELOPED: Column grids, modular grids, baseline grids, grid anatomy (columns, gutters, margins)]

### Classic Layout Patterns

[TO BE DEVELOPED: Sidebar layouts, holy grail, card grids, masonry, magazine layouts, asymmetric layouts]

### Modern CSS Layout

[TO BE DEVELOPED: CSS Grid (explicit placement, auto-placement, grid areas), Flexbox (direction, alignment, distribution), Container Queries]

## Creating Visual Hierarchy

### Hierarchy Through Scale

[TO BE DEVELOPED: Size relationships, proportional scaling, meaningful jumps vs gradual progression]

### Hierarchy Through Weight & Color

[TO BE DEVELOPED: Visual weight calculation, using color for emphasis, combining multiple hierarchy tools]

### Hierarchy Through Position

[TO BE DEVELOPED: Placement importance, reading order, visual flow direction, breaking the grid for emphasis]

## Responsive Spatial Design

### Breakpoint Strategy

[TO BE DEVELOPED: Mobile-first vs desktop-first, breakpoint values, in-between states, content-driven breakpoints]

### Layout Adaptation

[TO BE DEVELOPED: Reflow patterns, navigation transformation, content prioritization, progressive disclosure]

### Fluid Spacing & Layout

[TO BE DEVELOPED: clamp() for spacing, viewport units, fluid grids, container-relative spacing]

## Depth & Layering

### Creating Depth

[TO BE DEVELOPED: Layering, shadows, elevation systems, z-index scales, parallax effects]

### Overlap & Intersection

[TO BE DEVELOPED: Intentional overlap, breaking containers, elements that cross boundaries]

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


---

## Reference: motion-design

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

## Classic Animation Principles

### Disney's 12 Principles (Web Context)

[TO BE DEVELOPED: Squash and stretch, anticipation, staging, follow-through, ease-in/ease-out, arcs, secondary action, timing, exaggeration, solid drawing, appeal - adapted for UI]

### Timing & Duration

[TO BE DEVELOPED: Micro-interactions (100-300ms), transitions (300-500ms), complex animations (500-1000ms), duration by distance, perceived speed]

### Easing & Curves

[TO BE DEVELOPED: Linear vs eased, ease-out (enter), ease-in (exit), ease-in-out (full cycle), custom cubic-bezier, spring physics]

## Types of UI Animation

### Micro-interactions

[TO BE DEVELOPED: Button feedback, hover states, toggle switches, like buttons, form validation feedback, loading indicators]

### Page Transitions

[TO BE DEVELOPED: Route transitions, modal entry/exit, drawer animations, cross-fade, slide, zoom patterns]

### State Transitions

[TO BE DEVELOPED: Loading → success → error flows, expand/collapse, show/hide, enable/disable state changes]

### Scrolling & Parallax

[TO BE DEVELOPED: Scroll-triggered animations, reveal on scroll, parallax layers, scroll-linked effects, intersection observer]

## Choreography & Sequencing

### Staggered Animations

[TO BE DEVELOPED: animation-delay patterns, sequential reveals, cascade effects, list item staggering]

### Orchestrated Page Loads

[TO BE DEVELOPED: Entry choreography, hero → content → details, creating narrative through sequence, attention management]

### Exit Choreography

[TO BE DEVELOPED: Reverse sequences, intentional exit timing, maintaining spatial relationships during exit]

## Technical Implementation

### CSS-Only Animation

[TO BE DEVELOPED: @keyframes, animation properties, transitions, transform, pseudo-element animations, hardware acceleration]

### JavaScript Animation

[TO BE DEVELOPED: Web Animations API, requestAnimationFrame, animation libraries (GSAP, Framer Motion, Motion One)]

### Performance Optimization

[TO BE DEVELOPED: GPU acceleration (transform, opacity only), will-change, avoiding layout thrashing, reducing paint, FPS monitoring]

## Motion Design Systems

### Motion Tokens

[TO BE DEVELOPED: Duration scales, easing tokens, named animations, consistent motion vocabulary]

### Reduced Motion

[TO BE DEVELOPED: prefers-reduced-motion, graceful degradation, essential vs decorative animation, crossfade alternatives]

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


---

## Reference: typography

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

### Vertical Rhythm & Baseline Grids

[TO BE DEVELOPED: Baseline grids, consistent vertical spacing, maintaining rhythm across components]

### Modular Scale & Hierarchy

[TO BE DEVELOPED: Scale ratios, establishing hierarchy through size/weight/spacing, visual balance]

### Readability & Measure

[TO BE DEVELOPED: Line length (45-75 CPL), line height ratios, paragraph spacing, optimal reading conditions]

## Font Selection & Pairing

### Choosing Distinctive Fonts

[TO BE DEVELOPED: Avoiding generic choices, character in typefaces, matching tone to content, Google Fonts alternatives]

### Pairing Principles

[TO BE DEVELOPED: Contrast-based pairing, display + body, serif + sans, mono + geometric, variable fonts]

### Web Font Loading

[TO BE DEVELOPED: FOUT/FOIT strategies, font-display, subsetting, variable fonts, preloading]

## Modern Web Typography

### Fluid & Responsive Type

[TO BE DEVELOPED: clamp(), viewport units, container query typography, breakpoint-based scales]

### Advanced Features

[TO BE DEVELOPED: OpenType features, ligatures, font-feature-settings, kerning, number styles]

### Performance Optimization

[TO BE DEVELOPED: Font loading strategies, subsetting, variable fonts vs static, hosting decisions]

## Typography System Architecture

### Token Structure

[TO BE DEVELOPED: Font stacks, size scales, weight scales, line heights, letter spacing]

### Implementation

[TO BE DEVELOPED: CSS custom properties, utility classes, semantic vs primitive tokens]

## Accessibility Considerations

[TO BE DEVELOPED: Text scaling, contrast ratios, font sizes, dyslexia-friendly choices]

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


---

## Reference: interaction-design

# Interaction Design

This reference guides the creation of interaction patterns that are intuitive, accessible, and delightful - the conversation between user and interface.

The user provides an interaction challenge: designing forms, improving button states, fixing navigation patterns, optimizing input UX, implementing keyboard navigation, or creating feedback mechanisms. They may include accessibility requirements, device constraints, or specific interaction problems to solve.

## Interaction Design Thinking

Before designing interactions, understand the user's mental model and context:

- **User Context**: What are users trying to accomplish? What's their experience level? What's their emotional state (stressed during checkout vs relaxed browsing)?
- **Device & Input**: Touch vs pointer? Keyboard navigation? Voice input? Gamepad? Different inputs need different affordances.
- **Error Tolerance**: High-stakes actions (delete, purchase) vs low-stakes (filter, sort)? Design appropriate safeguards.
- **Speed vs Accuracy**: Quick scanning vs careful reading? Simple taps vs precise manipulation?

**CRITICAL**: Good interaction design is invisible. Users should complete tasks without thinking about the interface.

Then implement interactions that are:
- Intuitive with clear affordances and feedback
- Accessible to all users and input methods
- Forgiving with error prevention and recovery
- Responsive with immediate feedback and state changes

## Interaction States

### Core States

[TO BE DEVELOPED: Default, hover, focus, active, disabled, loading, error, success - visual treatment for each]

### State Transitions

[TO BE DEVELOPED: Smooth state changes, animation between states, maintaining context, preserving user intent]

### Loading & Progress States

[TO BE DEVELOPED: Skeleton screens, spinners, progress bars, optimistic updates, what to show while waiting]

## Affordances & Feedback

### Visual Affordances

[TO BE DEVELOPED: Signaling interactivity, button appearance, link styling, cursor changes, touch target highlighting]

### Immediate Feedback

[TO BE DEVELOPED: Click/tap acknowledgment, hover feedback, focus indication, "something is happening" signals]

### Haptic & Sound Feedback

[TO BE DEVELOPED: Vibration patterns, sound cues, cross-modal feedback, when to use non-visual feedback]

## Form Design & Input Patterns

### Form Layout & Structure

[TO BE DEVELOPED: Single column vs multi-column, label placement, field grouping, visual hierarchy in forms]

### Input Field Design

[TO BE DEVELOPED: Field sizing, placeholder usage (anti-pattern), helper text, character limits, input masking]

### Validation Patterns

[TO BE DEVELOPED: Inline vs on-submit, real-time validation, error message writing, success confirmation, required field indication]

### Complex Input Types

[TO BE DEVELOPED: File upload UX, date pickers, time selection, rich text editing, multi-select, autocomplete, search]

### Progressive Disclosure in Forms

[TO BE DEVELOPED: Conditional fields, wizards/multi-step forms, accordions, showing complexity gradually]

### Form Error Handling

[TO BE DEVELOPED: Error prevention (constraints, masks), clear error messages, error recovery, field-level vs form-level errors]

## Touch & Pointer Interactions

### Touch Targets

[TO BE DEVELOPED: 44x44px minimum, spacing between targets, thumb zones, edge reach areas on mobile]

### Touch vs Pointer Patterns

[TO BE DEVELOPED: Hover states on touch (problems), tap feedback, long press, swipe gestures, pinch-to-zoom]

### Gesture Design

[TO BE DEVELOPED: Swipe to delete, pull to refresh, drag to reorder, custom gestures, gesture discoverability]

## Keyboard Navigation

### Focus Management

[TO BE DEVELOPED: Focus rings (never remove without replacement), logical tab order, skip links, focus trapping in modals]

### Keyboard Shortcuts

[TO BE DEVELOPED: Common shortcuts, discoverability, avoiding conflicts, command palettes, keyboard-first workflows]

### Accessible Interaction Patterns

[TO BE DEVELOPED: ARIA roles for custom controls, managing focus in dynamic content, screen reader announcements]

## Navigation Patterns

### Menu & Navigation Design

[TO BE DEVELOPED: Mega menus, hamburger menus, breadcrumbs, tabs, pagination, infinite scroll vs load more]

### Modal & Dialog Patterns

[TO BE DEVELOPED: Modal entry/exit, focus management, escape to close, backdrop click behavior, sheet patterns]

### Command & Context Menus

[TO BE DEVELOPED: Right-click menus, command palettes, dropdown menus, action sheets]

## Error Prevention & Recovery

### Constraints & Guards

[TO BE DEVELOPED: Input constraints, disabled states, confirmation dialogs for destructive actions, undo mechanisms]

### Error Messages

[TO BE DEVELOPED: Clear language, actionable guidance, positive framing, where to show errors, when to show errors]

### Undo & Redo

[TO BE DEVELOPED: Undo patterns, toast notifications with undo, versioning, draft auto-save]

---

**IMPORTANT**: Test interactions with actual users and diverse input methods. What works with a mouse might fail with touch or keyboard.

**NEVER**:
- Remove focus indicators without providing visible alternatives (accessibility violation)
- Use placeholder text as labels (disappears on input, hard to remember)
- Make touch targets smaller than 44x44px
- Validate in real-time for long inputs (wait for blur)
- Show generic error messages ("Error occurred") - be specific and helpful
- Block user interaction without clear loading states
- Design only for mouse/pointer (test with keyboard and touch)
- Use custom controls without proper ARIA and keyboard support

Remember: Interaction design is where users actually experience your interface. Get this right, and everything else falls into place.


---

## Reference: color-and-contrast

# Color & Contrast

This reference guides the creation of color systems that are both beautiful and functional, balancing creative expression with accessibility and systematic coherence.

The user provides a color challenge: building a color palette, implementing theming, fixing contrast issues, establishing brand colors, or creating dark mode variants. They may include brand guidelines, accessibility requirements, or existing design constraints.

## Color System Thinking

Before choosing colors, understand the strategic requirements:

- **Brand & Emotion**: What feelings should the colors evoke? Trust (blues)? Energy (reds/oranges)? Growth (greens)? Luxury (purples/golds)? Colors are never neutral.
- **Functional Requirements**: How many semantic states needed? Success, error, warning, info? How many UI layers? Background, surface, border, text?
- **Context**: Industry conventions (avoid red for finance), cultural considerations, competitor differentiation.
- **Accessibility Goals**: WCAG level (A/AA/AAA), audience considerations (aging users need higher contrast).

**CRITICAL**: Color is both an art and a science. Aesthetics matter, but accessibility is non-negotiable.

Then build a color system that is:
- Accessible and WCAG compliant
- Systematically organized with clear roles
- Flexible enough for theming and variations
- Aesthetically cohesive and on-brand

## Color Theory Fundamentals

### Color Harmony & Relationships

[TO BE DEVELOPED: Complementary, analogous, triadic, split-complementary, monochromatic schemes, color wheel navigation]

### Color Psychology & Meaning

[TO BE DEVELOPED: Emotional associations, cultural considerations, industry conventions, semantic color choices]

### Color Properties

[TO BE DEVELOPED: Hue, saturation, lightness/brightness, HSL vs RGB vs LCH, perceptual uniformity]

## Building Functional Palettes

### Palette Structure

[TO BE DEVELOPED: Primary/secondary/tertiary, neutral scales (9-11 steps), semantic colors, state colors]

### Generating Color Scales

[TO BE DEVELOPED: Lightness curves, saturation shifts, hue rotation, perceptual uniformity, algorithmic generation]

### The Dominant Color Principle

[TO BE DEVELOPED: 60-30-10 rule, accent color strategy, visual weight distribution, avoiding rainbow vomit]

## Contrast & Accessibility

### WCAG Compliance

[TO BE DEVELOPED: AA vs AAA standards, text contrast ratios (4.5:1 / 7:1), UI component contrast (3:1), large text exceptions]

### Testing & Tools

[TO BE DEVELOPED: Contrast checkers, automated testing, color blindness simulation, tools for verification]

### Accessible Color Combinations

[TO BE DEVELOPED: Which combinations work, which don't, safe pairings, dangerous pairings, contrast matrices]

## Theming Architecture

### Light & Dark Mode

[TO BE DEVELOPED: Independent palettes vs inverted, neutral strategies, shadows in dark mode, image handling]

### CSS Custom Properties

[TO BE DEVELOPED: Token hierarchy (primitive → semantic → component), naming conventions, theme switching]

### Multi-Theme Systems

[TO BE DEVELOPED: Brand themes, user preference themes, contextual themes, theme inheritance]

## Advanced Color Techniques

### Gradients & Effects

[TO BE DEVELOPED: Mesh gradients, color stops, blend modes, gradient generation, overlay techniques]

### Transparency & Alpha

[TO BE DEVELOPED: Alpha channels, overlay strategies, transparency scales, backdrop effects]

### Dynamic Color

[TO BE DEVELOPED: State-based color changes, hover darkening/lightening, interactive color feedback]

---

**IMPORTANT**: Test color combinations in context, not in isolation. Colors behave differently on different backgrounds and at different sizes.

**NEVER**:
- Rely on color alone to convey information
- Use color combinations that fail WCAG contrast requirements
- Create palettes with arbitrary color choices (every color needs a purpose)
- Ignore color blindness (8% of men, 0.5% of women)
- Use pure black (#000) or pure white (#fff) for large areas
- Create theme systems without testing all combinations

Remember: Color is powerful. Use it deliberately, systematically, and inclusively.


---

## Reference: responsive-design

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

## Mobile-First Methodology

### Why Mobile-First

[TO BE DEVELOPED: Progressive enhancement, performance benefits, forces priority decisions, mobile usage dominance]

### Mobile-First Implementation

[TO BE DEVELOPED: Start with mobile styles, add complexity with min-width media queries, content-first approach]

## Breakpoint Strategies

### Choosing Breakpoints

[TO BE DEVELOPED: Content-driven vs device-driven, common breakpoint values, in-between states, avoiding too many breakpoints]

### Breakpoint Architecture

[TO BE DEVELOPED: Named breakpoints, breakpoint tokens, consistent usage across codebase]

## Fluid & Adaptive Design

### Fluid Typography

[TO BE DEVELOPED: clamp(), viewport units, fluid type scales, maintaining readability]

### Fluid Spacing

[TO BE DEVELOPED: Responsive spacing scales, container-relative spacing, clamp() for margins/padding]

### Fluid Layouts

[TO BE DEVELOPED: CSS Grid auto-fit/auto-fill, flexible columns, aspect-ratio, fluid containers]

### Container Queries

[TO BE DEVELOPED: Component-level responsiveness, when to use vs media queries, polyfills]

## Layout Adaptation Patterns

### Navigation Patterns

[TO BE DEVELOPED: Mobile hamburger/drawer, tablet side panel, desktop persistent nav, bottom nav bars]

### Content Reflow

[TO BE DEVELOPED: Single column → multi-column, stacking orders, priority content first]

### Component Adaptation

[TO BE DEVELOPED: Tabs → accordion, horizontal → vertical, show/hide patterns, progressive disclosure]

## Touch vs Pointer Optimization

### Touch Target Sizing

[TO BE DEVELOPED: 44x44px minimum, spacing between targets, thumb zones, edge cases]

### Touch-Specific Interactions

[TO BE DEVELOPED: Swipe gestures, pull-to-refresh, long press, avoiding hover-dependent patterns]

### Hybrid Devices

[TO BE DEVELOPED: Supporting both touch and pointer, feature detection, adaptive interfaces]

## Viewport & Screen Considerations

### Viewport Meta Tag

[TO BE DEVELOPED: Proper viewport configuration, zoom control, initial scale]

### Safe Areas

[TO BE DEVELOPED: iPhone notch, rounded corners, system UI insets, padding for safe areas]

### Orientation Handling

[TO BE DEVELOPED: Portrait vs landscape, orientation-specific layouts, testing both orientations]

### High-DPI Screens

[TO BE DEVELOPED: Retina images, 2x/3x assets, SVG for icons, responsive images]

## Responsive Images & Media

### Responsive Images

[TO BE DEVELOPED: srcset, sizes, picture element, art direction, lazy loading]

### Video Adaptation

[TO BE DEVELOPED: Responsive video embeds, bandwidth considerations, poster images]

## Performance on Mobile

### Mobile Performance Budget

[TO BE DEVELOPED: Constrained CPU/memory, slow connections, battery concerns]

### Loading Strategies

[TO BE DEVELOPED: Critical path optimization, lazy loading, code splitting for mobile]

## Testing Strategies

### Device Testing

[TO BE DEVELOPED: Real device testing, browser DevTools, emulators, viewport testing]

### Testing Checklist

[TO BE DEVELOPED: Different viewports, orientations, input methods, connection speeds]

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
