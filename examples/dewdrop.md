---
theme: ../
title: slidev-theme-touying
subtitle: Dewdrop
author: Kerman
routerMode: hash

touying:
  preset: dewdrop
  navigation: mini-slides # sidebar | mini-slides | none
  footer: slidev-theme-touying · Dewdrop
  footerRight: ''
---

# slidev-theme-touying

2026

Adapted from typst-touying

---
layout: outline
---

---
layout: section
---

# Theme-Specific Features

---

# Origin

This theme is a faithful port of the **Dewdrop** sub-theme from [typst-touying](https://github.com/touying-typ/touying), a presentation framework for Typst.

The original Dewdrop features a clean serif style, progressive outline navigation, and a muted dark-green palette — all replicated here for Slidev.

---

# Configuration

All theme options are set in the first slide's frontmatter.

**`touying:`** — non-CSS options

```yaml
touying:
  navigation: sidebar      # sidebar | mini-slides | none
  footer: 'Author · Org'
```

**`themeConfig:`** — CSS variables (injected automatically by Slidev)

```yaml
themeConfig:
  primary: '#0c4842'
  alpha: 0.4               # inactive section opacity
  sidebarWidth: '10em'
  miniSlidesHeight: '2em'
```

---

# Navigation: Sidebar

The current mode is **sidebar** — a fixed panel on the right listing all sections. The active section is highlighted in the primary color; others are dimmed by `alpha`.

Change to mini-slides:

```yaml
touying:
  navigation: mini-slides
```

Or disable entirely:

```yaml
touying:
  navigation: none
```

---

# Layouts

| Layout | Purpose |
|--------|---------|
| `cover` | Title slide — centered box, author/date/institution |
| `default` | Content slide with navigation + footer |
| `section` | Section divider with progressive outline |
| `outline` | Standalone full outline |
| `focus` | Full-screen accent slide |

---
layout: section
---

# Markdown Features

---

# Typography

Headings are numbered automatically and continue across slides.

## Level 2

Body text uses Libertinus Serif. **Bold** text is rendered in the primary color. *Italic* is also supported, as is `inline code` and ~~strikethrough~~.

> Blockquotes are styled with a left border in the primary color.

---

# Lists & Links

Unordered list:

- Square bullets by default
- Nested items work as expected
  - Second level
  - Second level

Ordered list:

1. First
2. Second
3. Third

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
| `primary` | color | `#0c4842` | Accent color |
| `alpha` | number | `0.4` | Inactive opacity |
| `navigation` | string | `sidebar` | Nav mode |
| `sidebarWidth` | length | `10em` | Sidebar width |

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

Use a CSS grid for two-column layouts. Works well for code + explanation, or comparing two approaches.

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

---
layout: section
---

# Extensibility

---

# Future Sub-themes

The architecture is designed to support additional sub-themes. Each preset only overrides CSS variables — component logic is shared.

```yaml
touying:
  preset: metropolis    # dewdrop | metropolis | aqua | stargazer | …
themeConfig:
  primary: '#eb811b'
  neutralDark: '#23373b'
```

Planned presets follow the same conventions as typst-touying.
