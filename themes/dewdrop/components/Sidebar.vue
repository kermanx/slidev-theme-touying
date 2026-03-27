<script setup lang="ts">
/**
 * TouSidebar
 *
 * Right-side progressive outline navigation (Dewdrop "sidebar" mode).
 * Current section title is highlighted in primary color; all others are faded.
 * Clicking a section/slide navigates to it.
 */
import TitleRenderer from '#slidev/title-renderer'
import { useNav } from '@slidev/client'
import { useNavigationCurrent } from '../../../composables/useNavigationTransition'
import { useCurrentSectionIndex, useSlideStructure } from '../../../composables/useSlideStructure'

const { go } = useNav()
const page = useNavigationCurrent()
const { sections } = useSlideStructure()
const currentSectionIndex = useCurrentSectionIndex()
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
        <TitleRenderer class="tou-title" :no="section.no" />
      </div>

      <!-- Sub-slides (shown only when this section is active, and only if they have titles) -->
      <template v-if="idx === currentSectionIndex">
        <div
          v-for="slideNo in section.slides"
          :key="slideNo"
          class="dew-sidebar-subsection"
          :class="slideNo === page ? 'active' : 'inactive'"
          @click="go(slideNo)"
        >
          <TitleRenderer class="tou-title" :no="slideNo" />
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
  width: var(--tou-sidebar-width);
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
  opacity: var(--tou-alpha);
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
  opacity: var(--tou-alpha);
}
</style>