# slidev-theme-touying

A [Slidev](https://sli.dev/) theme ported from [typst-touying](https://github.com/touying-typ/touying) — a popular presentation framework for [Typst](https://typst.app/).

## Presets

Currently, 2 out of [7 Touying themes](https://touying-typ.github.io/themes) (aka. presets) are available:

| Preset | Preview |
|--------|---------|
| `dewdrop` | [Live demo](https://kermanx.com/slidev-theme-touying/dewdrop/) |
| `university` | [Live demo](https://kermanx.com/slidev-theme-touying/university/) |

## Installation

```bash
npm i slidev-theme-touying
```

Then, set the theme in the headmatter:

```yaml
---
theme: touying
---
```

## Basic Usage

Set the preset in the headmatter:

```yaml
---
theme: touying
touying:
  preset: dewdrop   # or: university
---
```

## Layouts

| Name | Description |
|------|-------------|
| `default` | Normal content slide |
| `cover` | Title / cover slide |
| `section` | Section divider |
| `outline` | Auto-generated outline |
| `focus` | Full-screen emphasis slide |

## Configuration

All options go under the `touying:` key in the **root** frontmatter.

### Common options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `preset` | `'dewdrop' \| 'university'` | `'dewdrop'` | Theme preset |
| `navigation` | `'mini-slides' \| 'sidebar' \| 'none'` | `'mini-slides'` | Slide navigation style |
| `footer` | `string` | `''` | Footer left text |
| `footerRight` | `string` | `''` | Footer right text |
| `outlineRowsPerCol` | `number` | `12` | Max rows per column in the outline |
| `alpha` | `number` | `0.3` | Opacity of inactive sections in navigation |
| `miniSlides.height` | `string` | `'2em'` | Height of the mini-slides bar |
| `miniSlides.linebreaks` | `true \| false \| 'auto'` | `'auto'` | Dot grouping in mini-slides mode (see below) |
| `sidebar.width` | `string` | `'10em'` | Width of the sidebar (also used as symmetric horizontal margin) |

### Dewdrop-specific

The Dewdrop preset uses a serif dark-green palette with a progressive outline sidebar or mini-slides navigation.

```yaml
touying:
  preset: dewdrop
  navigation: mini-slides   # sidebar | mini-slides | none
  footer: My Presentation
  footerRight: ''
  outlineRowsPerCol: 12
  alpha: 0.3
  miniSlides:
    height: '2em'
    linebreaks: auto        # true | false | auto
  sidebar:
    width: '10em'
```

`miniSlides.linebreaks` controls dot grouping in mini-slides mode:

| Value | Behaviour |
|-------|-----------|
| `true` | One row of dots per subsection (h2 slide) |
| `false` | All dots in a single row |
| `auto` | Like `true`, unless any section has more than 3 subsections |

### University-specific

The University preset features a header bar with a section/slide title, a tri-color footer, and a configurable logo.

```yaml
touying:
  preset: university
logo: 🏫   # emoji or image path shown in the header
```

## License

[MIT](./LICENSE)
