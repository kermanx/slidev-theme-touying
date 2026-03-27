<script setup lang="ts">
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $frontmatter } = useSlideContext()

// Parse "Alpha and Bravo and Charlie" or "Alpha, Bravo, Charlie" into array
const authors = computed<string[]>(() => {
  const raw: string | string[] | undefined = $frontmatter.authors ?? $frontmatter.author
  if (!raw) return []
  if (Array.isArray(raw)) return raw
  if (/\band\b/i.test(raw)) return raw.split(/\s+and\s+/i).map(s => s.trim())
  if (/&/.test(raw)) return raw.split('&').map(s => s.trim())
  return raw.split(',').map(s => s.trim())
})
</script>

<template>
  <div class="slidev-layout cover">
    <div class="spl-cover-body">
      <!-- Free-form slot content (e.g. title written as # heading) -->
      <slot />

      <!-- Structured authors from frontmatter (rendered as a row) -->
      <div v-if="authors.length" class="spl-cover-authors">
        <span v-for="(a, i) in authors" :key="i" class="spl-cover-author">{{ a }}</span>
      </div>

      <!-- Date from frontmatter -->
      <div v-if="$frontmatter.date" class="spl-cover-date">{{ $frontmatter.date }}</div>
    </div>
  </div>
</template>

<style>
.tou-preset-simple .slidev-layout.cover {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  box-sizing: border-box;

  .spl-cover-body {
    text-align: center;
    width: 100%;
  }

  /* Override base.css: title-slide h1 is large and black, not primary */
  h1 {
    font-size: 2.5em !important;
    font-weight: 700 !important;
    color: var(--slidev-theme-neutralDarkest) !important;
    line-height: 1.15;
    margin: 0 0 1.5em !important;
  }

  p {
    color: var(--slidev-theme-neutralDarkest);
    margin: 0.4em 0;
  }

  .spl-cover-authors {
    display: flex;
    justify-content: center;
    gap: 2em;
    margin-top: 1.5em;
    color: var(--slidev-theme-neutralDarkest);
  }

  .spl-cover-date {
    margin-top: 0.6em;
    color: var(--slidev-theme-neutralDarkest);
  }
}
</style>
