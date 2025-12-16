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

## The Eight Interactive States

Every interactive element needs these states designed:

| State | When | Visual Treatment |
|-------|------|------------------|
| **Default** | At rest | Base styling |
| **Hover** | Pointer over (not touch) | Subtle lift, color shift |
| **Focus** | Keyboard/programmatic focus | Visible ring (see below) |
| **Active** | Being pressed | Pressed in, darker |
| **Disabled** | Not interactive | Reduced opacity, no pointer |
| **Loading** | Processing | Spinner, skeleton |
| **Error** | Invalid state | Red border, icon, message |
| **Success** | Completed | Green check, confirmation |

**The common miss**: Designing hover without focus, or vice versa. They're different. Keyboard users never see hover states.

## Focus Rings: Do Them Right

**Never `outline: none` without replacement.** It's an accessibility violation. Instead, use `:focus-visible` to show focus only for keyboard users:

```css
/* Hide focus ring for mouse/touch */
button:focus {
  outline: none;
}

/* Show focus ring for keyboard */
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Focus ring design**:
- High contrast (3:1 minimum against adjacent colors)
- 2-3px thick
- Offset from element (not inside it)
- Consistent across all interactive elements

## Form Design: The Non-Obvious

### Don't Use Placeholders as Labels

Placeholders disappear when you type. Users forget what the field was for. Screen readers may not announce them.

```html
<!-- Bad -->
<input placeholder="Email address">

<!-- Good -->
<label for="email">Email address</label>
<input id="email" type="email" placeholder="name@example.com">
```

Use placeholders only for examples or format hints, never as the primary label.

### Validate on Blur, Not on Input

Real-time validation (validating every keystroke) is annoying. Users can't finish typing before seeing errors.

```javascript
// Bad: fires on every keystroke
input.addEventListener('input', validate);

// Good: fires when user leaves field
input.addEventListener('blur', validate);

// Exception: password strength (show progress while typing)
passwordInput.addEventListener('input', showStrength);
```

### Error Message Placement

Place errors **below** the field (users scan top-down), not above. Keep messages close to the field—not in a summary at the top unless also repeated inline.

```html
<label for="email">Email</label>
<input id="email" type="email" aria-describedby="email-error">
<span id="email-error" class="error">Please enter a valid email</span>
```

The `aria-describedby` connects the error to the input for screen readers.

## Loading States: Optimistic Updates

**Show success immediately, handle failure gracefully.** Users perceive the app as faster.

```javascript
// Optimistic update pattern
async function toggleLike() {
  // 1. Update UI immediately
  setLiked(true);

  try {
    // 2. Send request
    await api.like(postId);
  } catch {
    // 3. Rollback on failure
    setLiked(false);
    showToast('Like failed. Please try again.');
  }
}
```

**When to use**: Low-stakes actions (likes, follows, small edits). **Not for**: Payments, destructive actions, critical data changes.

### Skeleton Screens > Spinners

Spinners say "something is happening" but give no sense of what or how long. Skeletons preview the content shape:

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--gray-200) 25%,
    var(--gray-100) 50%,
    var(--gray-200) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

## Modals: The Inert Approach

Focus trapping in modals used to require complex JavaScript. Now use the `inert` attribute:

```html
<!-- When modal is open -->
<main inert>
  <!-- Content behind modal can't be focused or clicked -->
</main>
<dialog open>
  <h2>Modal Title</h2>
  <!-- Focus stays inside modal -->
</dialog>
```

Or use the native `<dialog>` element:

```javascript
const dialog = document.querySelector('dialog');
dialog.showModal();  // Opens with focus trap, closes on Escape
```

## The Popover API

For tooltips, dropdowns, and non-modal overlays, use native popovers:

```html
<button popovertarget="menu">Open menu</button>
<div id="menu" popover>
  <button>Option 1</button>
  <button>Option 2</button>
</div>
```

**Benefits**: Light-dismiss (click outside closes), proper stacking, no z-index wars, accessible by default.

## Destructive Actions: Undo > Confirm

Confirmation dialogs are friction. Users click through them mindlessly. **Undo is better**:

```javascript
async function deleteItem(id) {
  // 1. Remove from UI immediately
  hideItem(id);

  // 2. Show undo toast
  const toast = showToast('Item deleted', {
    action: { label: 'Undo', onClick: () => restoreItem(id) },
    duration: 5000
  });

  // 3. Actually delete after toast expires
  toast.onClose(() => api.delete(id));
}
```

**When to still use confirmation**: Irreversible actions (account deletion), high-cost actions (large purchases), batch operations on many items.

## Keyboard Navigation Patterns

### Roving Tabindex

For component groups (tabs, menu items, radio groups), one item is tabbable; arrow keys move within:

```html
<div role="tablist">
  <button role="tab" tabindex="0">Tab 1</button>
  <button role="tab" tabindex="-1">Tab 2</button>
  <button role="tab" tabindex="-1">Tab 3</button>
</div>
```

Arrow keys move `tabindex="0"` between items. Tab moves to the next component entirely.

### Skip Links

For keyboard users, provide a skip link to jump past navigation:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
<nav>...</nav>
<main id="main-content">...</main>
```

```css
.skip-link {
  position: absolute;
  left: -9999px;
}
.skip-link:focus {
  left: 0;
  z-index: 9999;
  /* Visible styling */
}
```

## Gesture Discoverability

Swipe-to-delete and similar gestures are invisible. Hint at their existence:

- **Partially reveal**: Show delete button peeking from edge
- **Onboarding**: Coach marks on first use
- **Alternative**: Always provide a visible fallback (menu with "Delete")

Don't rely on gestures as the only way to perform actions.

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
