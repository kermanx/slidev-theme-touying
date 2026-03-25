---
theme: ../
title: slidev-theme-touying
subtitle: University
author: Author A and Author B
logo: https://sli.dev/logo.svg
routerMode: hash

touying:
  preset: university
---

# slidev-theme-touying

Adapted from typst-touying

2026

---
layout: section
---

# Theme-Specific Features

---

# Origin

The **University** preset is a port of the [typst-touying university theme](https://github.com/touying-typ/touying), originally contributed by Pol Dellaiera.

It features a structured academic style: a bold header bar with progress indicator, a three-band colored footer, and a clean section slide with a progress bar.

---

# Configuration

```yaml
touying:
  preset: university
logo: /logo.svg
```

---

# Layouts

| Layout | Purpose |
|--------|---------|
| `cover` | Title slide — centered, large title, logo top-right |
| `default` | Content slide — header + progress bar + three-band footer |
| `section` | Section divider — centered title + progress bar |
| `focus` | Full-screen primary-color accent slide |

---

# Header

Every default slide has a **header** with:

- A 2px progress bar spanning the full width
- Left: current slide title (bold, primary color)
- Right: current section name + logo

The progress bar fills from left to right as the presentation advances.

---

# Footer

The footer is divided into **three colored bands**:

<div class="grid grid-cols-3 gap-4 mt-4">
<div style="background: var(--slidev-theme-primary); color: white; padding: 0.5em 1em; border-radius: 0.2em; text-align: center; font-size: 0.85em;">
primary<br><small>author</small>
</div>
<div style="background: var(--slidev-theme-secondary); color: white; padding: 0.5em 1em; border-radius: 0.2em; text-align: center; font-size: 0.85em;">
secondary<br><small>title</small>
</div>
<div style="background: var(--slidev-theme-tertiary); color: white; padding: 0.5em 1em; border-radius: 0.2em; text-align: center; font-size: 0.85em;">
tertiary<br><small>date · page</small>
</div>
</div>

---
layout: section
---

# Markdown Features

---

# Typography

## Level 2 Heading

Body text uses Libertinus Serif. **Bold** is rendered in the primary color. *Italic*, `inline code`, and ~~strikethrough~~ are all supported.

> Blockquotes have a left border in the primary color.

---

# Lists & Links

- Square bullets by default
- Nested items are supported
  - Second level
  - Second level

1. First item
2. Second item
3. Third item

[Links are colored](https://github.com/touying-typ/touying) and underlined.

---

# Code Blocks

```python
from dataclasses import dataclass

@dataclass
class Slide:
    title: str
    layout: str = "default"

    def render(self) -> str:
        return f"[{self.layout}] {self.title}"
```

```ts
const sum = (a: number, b: number): number => a + b
```

---

# Tables

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `primary` | color | `#04364A` | Header, section, footer-a |
| `secondary` | color | `#176B87` | Footer-b |
| `tertiary` | color | `#448C95` | Footer-c, progress bg |
| `logo` | string | — | Image source shown in header & cover |

---

# Animations

Click to reveal:

- Always visible

<v-click>

- Appears on first click

</v-click>

<v-click>

- Appears on second click <span v-mark.underline.orange>highlighted</span>

</v-click>

---

# Two-Column Layout

<div class="grid grid-cols-2 gap-8">
<div>

**Left column**

Use a CSS grid for side-by-side content. Works well for comparisons or code + explanation.

- Item A
- Item B
- Item C

</div>
<div>

**Right column**

```python
def fib(n: int) -> int:
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(10))  # 55
```

</div>
</div>

---
layout: focus
---

Use `layout: focus` for key takeaways
