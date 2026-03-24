<script setup lang="ts">
/**
 * TouSidebar
 *
 * Right-side progressive outline navigation (Dewdrop "sidebar" mode).
 * Current section title is highlighted in primary color; all others are faded.
 * Clicking a section/slide navigates to it.
 */
import { useNav } from '@slidev/client'
import { useSlideStructure } from '../../../composables/useSlideStructure'

const { slides, currentPage, go } = useNav()
const { sections, currentSectionIndex } = useSlideStructure()

function getSlideName(no: number): string {
  const slide = slides.value[no - 1] // slide numbers are 1-indexed
  // Try multiple paths: frontmatter title, parsed title, meta title
  return (
    slide?.meta?.slide?.frontmatter?.title
    ?? slide?.meta?.slide?.title
    ?? null
  )
}
</script>

<template>
  <nav class="tou-sidebar" aria-label="Slide navigation">
    <div
      v-for="(section, idx) in sections"
      :key="section.no"
      class="tou-sidebar-section"
    >
      <!-- Section title -->
      <div
        class="tou-sidebar-section-title"
        :class="idx === currentSectionIndex ? 'active' : 'inactive'"
        @click="go(section.no)"
      >
        {{ section.title }}
      </div>

      <!-- Sub-slides (shown only when this section is active, and only if they have titles) -->
      <template v-if="idx === currentSectionIndex">
        <div
          v-for="slideNo in section.slides"
          v-show="getSlideName(slideNo) !== null"
          :key="slideNo"
          class="tou-sidebar-subsection"
          :class="slideNo === currentPage ? 'active' : 'inactive'"
          @click="go(slideNo)"
        >
          {{ getSlideName(slideNo) }}
        </div>
      </template>
    </div>
  </nav>
</template>
