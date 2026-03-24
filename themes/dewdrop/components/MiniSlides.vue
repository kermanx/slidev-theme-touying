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
  <nav class="tou-mini-slides" aria-label="Section navigation">
    <div
      v-for="(section, idx) in sections"
      :key="section.no"
      class="tou-mini-slides-section"
      :class="{ inactive: idx !== currentSectionIndex }"
    >
      <!-- Section name (click → go to section slide) -->
      <span
        class="tou-mini-slides-section-title"
        @click="go(section.no)"
        style="cursor: pointer"
      >
        {{ section.title }}
      </span>

      <!-- One dot per slide in this section, grouped below the title -->
      <div class="tou-mini-slides-dots">
        <span
          v-for="slideNo in section.slides"
          :key="slideNo"
          class="tou-mini-dot"
          :class="{ filled: slideNo === currentPage }"
          :title="`Slide ${slideNo}`"
          @click="go(slideNo)"
        />
      </div>
    </div>
  </nav>
</template>
