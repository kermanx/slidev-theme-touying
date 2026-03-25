<script setup lang="ts">
/**
 * UniHeader — University theme header.
 *
 * Structure (matching Typst university.typ):
 *   [progress bar — 2pt full width]
 *   [slide title (h2)  ·····  section name (h1) + logo]
 *
 * Left:  current slide title (bold, primary, 1.2em)
 * Right: current section title (primary.lighten ~65%) + logo
 */
import { useNav, useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useCurrentSectionIndex, useSlideStructure } from '../../../composables/useSlideStructure'
import ProgressBar from './ProgressBar.vue'

const { slides } = useNav()
const { $page } = useSlideContext()
const { sections } = useSlideStructure()
const currentSectionIndex = useCurrentSectionIndex()

const slideTitle = computed(() => {
  const slide = slides.value?.find(s => s.no === $page.value)
  return slide?.meta?.slide?.frontmatter?.title ?? slide?.meta?.slide?.title ?? ''
})

const sectionTitle = computed(() =>
  sections.value[currentSectionIndex.value]?.title ?? '',
)

const logo = computed(() => {
  const first = slides.value?.[0]
  return first?.meta?.slide?.frontmatter?.logo ?? ''
})
</script>

<template>
  <header class="uni-header">
    <ProgressBar />
    <div class="uni-header-row">
      <span class="uni-header-left">{{ slideTitle }}</span>
      <span class="uni-header-right">
        <span v-if="sectionTitle" class="uni-header-section">{{ sectionTitle }}</span>
        <span v-if="logo" class="uni-header-logo">{{ logo }}</span>
      </span>
    </div>
  </header>
</template>

<style scoped>
.uni-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: var(--slidev-theme-neutralLightest);
}

.uni-header-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  padding: 0.35em 1.6em 0.3em;
  gap: 1em;
}

.uni-header-left {
  font-size: 2em;
  font-weight: 600;
  color: var(--slidev-theme-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uni-header-right {
  font-size: 1.2em;
  color: var(--slidev-theme-secondary);
  display: flex;
  align-items: end;
  gap: 0.4em;
  flex-shrink: 0;
}

.uni-header-section {
  opacity: 0.65;
}

.uni-header-logo {
  font-size: 1.2em;
}
</style>
