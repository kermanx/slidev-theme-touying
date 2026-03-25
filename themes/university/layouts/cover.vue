<script setup lang="ts">
/**
 * University cover slide.
 *
 * logo: if value.length <= 3 → emoji/text, rendered inline
 *       if value.length > 3  → treated as image URL, rendered as <img>
 *
 * author: single string, split by " and ", " & ", or ", "
 *         (if "and" present, never split by comma)
 */
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev, $frontmatter } = useSlideContext()

const props = defineProps<{ logo?: string }>()

const logoIsImage = computed(() => {
  const logo = ($frontmatter as any)?.logo ?? props.logo ?? ''
  return logo.length > 3
})

function parseAuthors(raw: string | undefined): string[][] {
  if (!raw) return []
  let parts: string[]
  if (/\band\b/i.test(raw))
    parts = raw.split(/\s+and\s+/i).map(s => s.trim())
  else if (/&/.test(raw))
    parts = raw.split('&').map(s => s.trim())
  else
    parts = raw.split(',').map(s => s.trim())

  // chunk into rows of 3
  const chunks: string[][] = []
  for (let i = 0; i < parts.length; i += 3)
    chunks.push(parts.slice(i, i + 3))
  return chunks
}

const authorChunks = computed(() =>
  parseAuthors(($frontmatter as any)?.author ?? ($slidev as any)?.configs?.author),
)
</script>

<template>
  <div class="slidev-layout cover">
    <!-- Logo top-right -->
    <template v-if="$frontmatter.logo">
      <img v-if="logoIsImage" :src="$frontmatter.logo" class="uni-cover-logo uni-cover-logo-img" />
      <div v-else class="uni-cover-logo uni-cover-logo-text">{{ $frontmatter.logo }}</div>
    </template>

    <div class="uni-cover-inner">
      <!-- Title -->
      <div class="uni-cover-title">
        <slot name="title">{{ $slidev.configs.title }}</slot>
      </div>

      <!-- Subtitle -->
      <div v-if="$frontmatter.subtitle" class="uni-cover-subtitle">
        <slot name="subtitle">{{ $frontmatter.subtitle }}</slot>
      </div>

      <!-- Authors -->
      <div v-if="authorChunks.length" class="uni-cover-authors">
        <div
          v-for="(chunk, ci) in authorChunks"
          :key="ci"
          class="uni-cover-author-row"
          :style="{ gridTemplateColumns: `repeat(${chunk.length}, 1fr)` }"
        >
          <span v-for="(a, ai) in chunk" :key="ai">{{ a }}</span>
        </div>
      </div>

      <!-- Institution -->
      <div v-if="$frontmatter.institution" class="uni-cover-institution">
        {{ $frontmatter.institution }}
      </div>

      <!-- Date -->
      <div v-if="$frontmatter.date" class="uni-cover-date">
        {{ $frontmatter.date }}
      </div>

      <!-- Extra default slot content -->
      <div v-if="$slots.default" class="uni-cover-extra">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
/* ---- University cover ---- */
.tou-preset-university .slidev-layout.cover {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--slidev-theme-neutralLightest);
  width: 100%;
  height: 100%;
  padding: 0;

  .uni-cover-logo {
    position: absolute;
    top: 1em;
    right: 1.5em;
    line-height: 1;
  }

  .uni-cover-logo-text {
    font-size: 2em;
  }

  .uni-cover-logo-img {
    height: 2.5em;
    width: auto;
    object-fit: contain;
  }

  .uni-cover-inner {
    text-align: center;
    width: 100%;
    padding: 0 10%;
    box-sizing: border-box;
  }

  .uni-cover-title {
    font-size: 2.5em;
    font-weight: 600;
    color: var(--slidev-theme-primary);
    line-height: 1.2;
    margin-bottom: 1em;
  }

  .uni-cover-subtitle {
    font-size: 1.2em;
    color: var(--slidev-theme-primary);
    margin-bottom: 1.2em;
  }

  .uni-cover-authors {
    font-size: 0.8em;
    margin-top: 0.5em;
    color: var(--slidev-theme-neutralDarkest);
  }

  .uni-cover-author-row {
    display: grid;
    column-gap: 2em;
    justify-items: center;
    margin-bottom: 0.4em;
  }

  .uni-cover-institution {
    font-size: 0.9em;
    margin-top: 1em;
    color: var(--slidev-theme-neutralDarkest);
    font-weight: 600;
  }

  .uni-cover-date {
    font-size: 0.8em;
    margin-top: 0.3em;
    color: var(--slidev-theme-neutralDark);
  }

  .uni-cover-extra {
    margin-top: 0.8em;
    font-size: 0.8em;

    h1 {
      display: none;
    }
  }
}
</style>
