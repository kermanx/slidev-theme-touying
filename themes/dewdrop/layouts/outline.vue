<script setup lang="ts">
/**
 * outline layout — Full Table of Contents slide
 *
 * Similar to section.vue but shows all sections at full opacity
 * (no progressive fade effect). Useful for an initial or final TOC overview.
 *
 * Pass `highlight` prop to optionally highlight a specific section.
 */
import ProgressiveOutline from '../components/ProgressiveOutline.vue'

withDefaults(defineProps<{
  /** If set, this section slide number is highlighted. Otherwise all are shown equally. */
  highlight?: number
  /** How many heading levels to show: 1 = sections only, 2 = sections + subsections (default). */
  depth?: number
}>(), { depth: 2 })
</script>

<template>
  <div class="slidev-layout outline">
    <ProgressiveOutline
      :show-all="highlight == null"
      :active-section-no="highlight"
      :depth="depth"
    />
  </div>
</template>

<style>
.tou-preset-dewdrop .slidev-layout.outline {
  padding: 0;
  outline-style: unset;
  --uno: w-full h-full;
}
</style>
