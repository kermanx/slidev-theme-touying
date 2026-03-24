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
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useSlideStructure } from '../../../composables/useSlideStructure'
import ProgressBar from './ProgressBar.vue'

const { slides, currentPage } = useNav()
const { sections, currentSectionIndex } = useSlideStructure()

const slideTitle = computed(() => {
  const slide = slides.value?.find(s => s.no === currentPage.value)
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
        <span v-if="sectionTitle">{{ sectionTitle }}</span>
        <span v-if="logo" class="uni-header-logo">{{ logo }}</span>
      </span>
    </div>
  </header>
</template>
