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
  <nav class="dew-sidebar" aria-label="Slide navigation">
    <div
      v-for="(section, idx) in sections"
      :key="section.no"
      class="dew-sidebar-section"
    >
      <!-- Section title -->
      <div
        class="dew-sidebar-section-title"
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
          class="dew-sidebar-subsection"
          :class="slideNo === currentPage ? 'active' : 'inactive'"
          @click="go(slideNo)"
        >
          {{ getSlideName(slideNo) }}
        </div>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.dew-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: var(--slidev-theme-sidebarWidth);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2em 0.2em;
  box-sizing: border-box;
  font-size: 0.9em;
  overflow: hidden;
}

.dew-sidebar-section {
  margin-bottom: 0.4em;
  transition: opacity 0.3s ease;
}

.dew-sidebar-section-title {
  font-weight: 600;
  line-height: 1.3;
  cursor: pointer;
}

.dew-sidebar-section-title.active {
  color: var(--slidev-theme-primary);
}

.dew-sidebar-section-title.inactive {
  color: var(--slidev-theme-neutralDarkest);
  opacity: var(--slidev-theme-alpha);
}

.dew-sidebar-subsection {
  padding-left: var(--slidev-theme-sidebar-indent);
  font-size: 0.9em;
  margin-top: 0.15em;
  line-height: 1.3;
  cursor: pointer;
}

.dew-sidebar-subsection.active {
  color: var(--slidev-theme-primary);
  font-weight: 500;
}

.dew-sidebar-subsection.inactive {
  color: var(--slidev-theme-neutralDarkest);
  opacity: var(--slidev-theme-alpha);
}
</style>