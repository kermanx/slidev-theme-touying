---
theme: ../
routerMode: hash
authors: Alpha and Bravo and Charlie
date: July 23

touying:
  preset: simple
  footer: Simple slides
---

# Keep it simple!

---

# Origin

The **Simple** preset is a port of the [typst-touying simple theme](https://github.com/touying-typ/touying), itself adapted from [Polylux](https://github.com/andreasKroepelin/polylux) by Andreas Kröpelin.

It offers a minimal look: a small section-title header and a page counter footer.

---
layout: section
---

# Theme-Specific Features

---

# Configuration

```yaml
touying:
  preset: simple
  footer: 'Author · Conference'   # left footer text

themeConfig:
  primary: '#3b82f6' # Overrides the default primary color
```

---

# Layouts

| Layout | Description |
|--------|-------------|
| `cover` | Centered title, subtitle, author, date |
| `default` | Section header · page counter footer |
| `section` | Centered bold section title |
| `focus` | Full-screen primary-color accent |

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
```

```ts
const sum = (a: number, b: number): number => a + b
```

---

# Tables

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `--slidev-theme-primary` | color | `#007a7a` | Accent color |
| `footer` | string | `''` | Left footer text |
| `logo` | string | — | Header right text/emoji |

---

# Animations

- Always visible

<v-click>

- Appears on first click

</v-click>

<v-click>

- Appears on second click <span v-mark.underline.orange>highlighted</span>

</v-click>

---
layout: focus
---

_Focus!_

This is very important.
