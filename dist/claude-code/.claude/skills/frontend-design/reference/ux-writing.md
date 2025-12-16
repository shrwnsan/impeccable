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

## The Button Label Problem

**Never use "OK", "Submit", or "Yes/No".** These are lazy and ambiguous. Use specific verb + object patterns:

| Bad | Good | Why |
|-----|------|-----|
| OK | Save changes | Says what will happen |
| Submit | Create account | Outcome-focused |
| Yes | Delete message | Confirms the action |
| Cancel | Keep editing | Clarifies what "cancel" means |
| Click here | Download PDF | Describes the destination |

**For destructive actions**, name the destruction:
- "Delete" not "Remove" (delete is permanent, remove implies recoverable)
- "Delete 5 items" not "Delete selected" (show the count)

## Error Messages: The Formula

Every error message should answer three questions:

1. **What happened?** (Clearly state the problem)
2. **Why?** (If not obvious)
3. **How to fix it?** (Specific action)

```
Bad:  "Invalid input"

Good: "Email address isn't valid. Please include an @ symbol."

Bad:  "Request failed"

Good: "We couldn't save your changes. Check your internet connection and try again."
```

### Error Message Templates

| Situation | Template |
|-----------|----------|
| **Format error** | "[Field] needs to be [format]. Example: [example]" |
| **Missing required** | "Please enter [what's missing]" |
| **Permission denied** | "You don't have access to [thing]. [What to do instead]" |
| **Network error** | "We couldn't reach [thing]. Check your connection and [action]." |
| **Server error** | "Something went wrong on our end. We're looking into it. [Alternative action]" |

### Don't Blame the User

```
Bad:  "You entered an invalid date"
Good: "Please enter a date in MM/DD/YYYY format"

Bad:  "Your password is too weak"
Good: "Add at least one number or symbol to strengthen your password"
```

## Empty States Are Opportunities

An empty list isn't a dead end—it's an onboarding moment.

```
Bad:  "No items"

Good: "No projects yet
       Projects help you organize your work. Create your first one to get started.
       [+ Create project]"
```

**Empty state formula**:
1. Acknowledge the emptiness (briefly)
2. Explain the value of filling it
3. Provide a clear action

## Voice vs Tone

**Voice** is your brand's personality—consistent everywhere.
**Tone** adapts to the moment.

| Moment | Tone Shift |
|--------|------------|
| Success | Celebratory, brief: "Done! Your changes are live." |
| Error | Empathetic, helpful: "That didn't work. Here's what to try..." |
| Loading | Reassuring: "Saving your work..." |
| Destructive confirm | Serious, clear: "Delete this project? This can't be undone." |

**Never use humor for errors.** Users are already frustrated. Be helpful, not cute.

## Writing for Accessibility

### Link Text

Screen readers can navigate by links. Vague links fail:

```html
<!-- Bad: meaningless without context -->
<a href="...">Click here</a>
<a href="...">Learn more</a>

<!-- Good: standalone meaning -->
<a href="...">View pricing plans</a>
<a href="...">Learn more about data export</a>
```

### Alt Text

Describe the **information**, not the image:

```html
<!-- Bad: describes image -->
<img alt="Chart" src="revenue.png">

<!-- Good: describes information -->
<img alt="Revenue increased 40% in Q4" src="revenue.png">

<!-- Decorative images get empty alt -->
<img alt="" src="decorative-wave.png">
```

### Button Context

Buttons need context, especially icons:

```html
<!-- Bad: no context -->
<button>×</button>

<!-- Good: screen reader context -->
<button aria-label="Close dialog">×</button>
```

## Writing for Translation

### Plan for Expansion

German text is ~30% longer than English. Allocate space:

| Language | Expansion |
|----------|-----------|
| German | +30% |
| French | +20% |
| Finnish | +30-40% |
| Chinese | -30% (fewer chars, but same width) |

### Translation-Friendly Patterns

```
Bad:  "You have 3 new messages"  (number inside sentence)
Good: "New messages: 3"          (number separate)

Bad:  "Welcome back, {name}!"    (word order varies by language)
Good: "{greeting_message}"       (full sentence as one string)

Bad:  "5 mins ago"               (abbrev doesn't translate)
Good: "5 minutes ago"            (full word)
```

### Give Translators Context

```json
{
  "delete_confirm": {
    "message": "Delete {item}?",
    "context": "Confirmation dialog when deleting a file or folder. {item} is the name of the item being deleted."
  }
}
```

## Consistency: The Terminology Problem

Pick one term and stick with it:

| Inconsistent | Consistent |
|--------------|------------|
| Delete / Remove / Trash | Delete |
| Settings / Preferences / Options | Settings |
| Sign in / Log in / Enter | Sign in |
| Create / Add / New | Create |

Build a terminology glossary and enforce it. Variety creates confusion.

## Avoid Redundant Copy

Saying the same thing twice wastes space and dilutes impact.

**Common redundancies**:
- Section header + intro paragraph saying the same thing
- Page title + section title with same/similar text
- CTA button + surrounding text repeating the action
- Outro that restates the intro

```
Bad:  "Settings"
      "Here you can adjust your settings and preferences."
      [Settings form]
      "Save your settings to apply changes."

Good: "Settings"
      [Settings form]
      [Save]
```

**The rule**: If the heading explains it, the intro is redundant. If the button is clear, don't explain it again. Say it once, say it well.

## Loading States

Tell users what's happening:

```
Bad:  "Loading..."
Good: "Saving your draft..."

Bad:  [spinner]
Good: "Searching 1,247 documents..."

Bad:  "Please wait"
Good: "Preparing your download... This usually takes 30 seconds."
```

For long waits, show progress or set expectations.

## Confirmation Dialogs: Use Sparingly

**Most confirmation dialogs are design failures.** If an action is dangerous enough to confirm, consider:
- Undo instead of confirm
- Making the action less destructive
- Showing consequences before the action

When you must confirm:

```
Bad:  "Are you sure?"
      [Yes] [No]

Good: "Delete 'Project Alpha'?
       This will permanently delete the project and all its files.
       [Delete project] [Keep project]"
```

Name the action, explain consequences, use specific button labels.

## Form Instructions

### Format Hints

Show don't tell:

```
Bad:  "Enter date in MMDDYYYY format"
Good: "Date of birth" + placeholder="04/15/1990"
```

### Why Are You Asking?

For non-obvious fields, explain:

```html
<label>Phone number (optional)</label>
<span class="help">We'll only use this to contact you about your order.</span>
```

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
