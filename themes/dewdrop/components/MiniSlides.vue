<script setup lang="ts">
/**
 * TouMiniSlides
 *
 * Top navigation bar (Dewdrop "mini-slides" mode).
 * Shows section names with a row of small dots for each slide in that section.
 * The current slide's dot is filled; others are hollow.
 * Non-current sections are faded.
 */
import { useNav } from '@slidev/client'
import { useSlideStructure } from '../../../composables/useSlideStructure'

const { currentPage, go } = useNav()
const { sections, currentSectionIndex } = useSlideStructure()
</script>

<template>
  <nav class="dew-mini-slides" aria-label="Section navigation">
    <div
      v-for="(section, idx) in sections"
      :key="section.no"
      class="dew-mini-slides-section"
      :class="{ inactive: idx !== currentSectionIndex }"
    >
      <!-- Section name (click → go to section slide) -->
      <span
        class="dew-mini-slides-section-title"
        @click="go(section.no)"
        style="cursor: pointer"
      >
        {{ section.title }}
      </span>

      <!-- One dot per slide in this section, grouped below the title -->
      <div class="dew-mini-slides-dots">
        <span
          v-for="slideNo in section.slides"
          :key="slideNo"
          class="dew-mini-dot"
          :class="{ filled: slideNo === currentPage }"
          :title="`Slide ${slideNo}`"
          @click="go(slideNo)"
        />
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dew-mini-slides {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.6em calc(2.4em / 0.7) 0;
  gap: 0;
  font-size: 0.7em;
  background: var(--slidev-theme-neutralLightest);
  box-sizing: border-box;
  overflow: hidden;
}

.dew-mini-slides-section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0 0 auto;
  transition: opacity 0.3s ease;
  white-space: nowrap;
}

.dew-mini-slides-section.inactive {
  opacity: var(--slidev-theme-alpha);
}

.dew-mini-slides-section-title {
  font-weight: 600;
  color: var(--slidev-theme-primary);
  line-height: 1.3;
}

.dew-mini-slides-section.inactive .dew-mini-slides-section-title {
  color: var(--slidev-theme-neutralDarkest);
}

.dew-mini-slides-dots {
  display: flex;
  flex-direction: row;
  gap: 0.25em;
  margin-top: 0.2em;
  margin-left: 2px;
}

.dew-mini-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid var(--slidev-theme-neutralDarkest);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.dew-mini-dot.filled {
  background: var(--slidev-theme-primary);
  border-color: var(--slidev-theme-primary);
}

.dew-mini-slides-section.inactive .dew-mini-dot {
  border-color: var(--slidev-theme-neutralDarkest);
}

.dew-mini-slides-section.inactive .dew-mini-dot.filled {
  background: var(--slidev-theme-neutralDarkest);
  border-color: var(--slidev-theme-neutralDarkest);
}

</style>