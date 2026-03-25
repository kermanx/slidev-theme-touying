<script setup lang="ts">
/**
 * MiniSlides — Dewdrop top navigation bar.
 *
 * Each section is a column. Inside each column:
 *   - Section title (click → section slide)
 *   - Dots grouped by subsection (one row per subsection) if linebreaks is
 *     effectively true, otherwise all dots in a single row.
 *
 * miniSlides.linebreaks:
 *   true  — always one row per subsection
 *   false — always one row for all slides
 *   auto  — one row per subsection only if max subsections across all sections <= 3
 */
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useSlideStructure } from '../../../composables/useSlideStructure'
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

const { currentPage, go } = useNav()
const { sections, currentSectionIndex } = useSlideStructure()
const config = useTouyingConfig()

const useLinebreaks = computed(() => {
  const setting = config.value.miniSlides.linebreaks
  if (setting === true) return true
  if (setting === false) return false
  // auto: use linebreaks only if no section has more than 3 subsections
  return sections.value.every(s => s.subsections.length <= 3)
})
</script>

<template>
  <nav class="dew-mini-slides" aria-label="Section navigation">
    <div
      v-for="(section, idx) in sections"
      :key="section.no"
      class="dew-mini-slides-section"
      :class="{ inactive: idx !== currentSectionIndex }"
    >
      <!-- Section name -->
      <span class="dew-mini-slides-section-title" @click="go(section.no)">
        {{ section.title }}
      </span>

      <!-- One row of dots per subsection (linebreaks) or single row -->
      <template v-if="useLinebreaks && section.subsections.length">
        <div
          v-for="sub in section.subsections"
          :key="sub.no"
          class="dew-mini-slides-dots"
        >
          <span
            v-if="sub.no !== section.no"
            class="dew-mini-dot"
            :class="{ filled: sub.no === currentPage }"
            :title="`Slide ${sub.no}`"
            @click="go(sub.no)"
          />
          <span
            v-for="slideNo in sub.slides"
            :key="slideNo"
            class="dew-mini-dot"
            :class="{ filled: slideNo === currentPage }"
            :title="`Slide ${slideNo}`"
            @click="go(slideNo)"
          />
        </div>
      </template>
      <!-- Single row -->
      <div v-else class="dew-mini-slides-dots">
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
  padding: 0.6em calc(2em / 0.7) 0;
  gap: 0;
  font-size: 0.7em;
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
  opacity: var(--tou-alpha);
}

.dew-mini-slides-section-title {
  font-weight: 600;
  color: var(--slidev-theme-primary);
  line-height: 1.3;
  cursor: pointer;
}

.dew-mini-slides-section.inactive .dew-mini-slides-section-title {
  color: var(--slidev-theme-neutralDarkest);
}

.dew-mini-slides-dots {
  display: flex;
  flex-direction: row;
  gap: 0.25em;
  margin-top: 0.15em;
  margin-left: 2px;
  min-height: 9px; /* keep row visible even if no dots */
}

.dew-mini-dot {
  display: inline-block;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  border: 1.5px solid var(--slidev-theme-neutralDarkest);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
  flex-shrink: 0;
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
