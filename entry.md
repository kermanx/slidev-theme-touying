---
theme: .
layout: default
routerMode: hash
---

# slidev-theme-touying

This is a Slidev theme inspired by the style of [Touying](https://touying-typ.github.io/).

Currently we've implemented two [themes of Touying](https://touying-typ.github.io/themes):

- <a :href="getUrl('university')" class="text-primary">University</a>
- <a :href="getUrl('dewdrop')" class="text-primary">Dewdrop</a>

<script setup>
function getUrl(preset) {
  return `${import.meta.env.BASE_URL}${preset}/`
}
</script>
