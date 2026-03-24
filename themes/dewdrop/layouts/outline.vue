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
import Footer from '../components/Footer.vue'

withDefaults(defineProps<{
  /** If set, this section slide number is highlighted. Otherwise all are shown equally. */
  highlight?: number
  /** How many heading levels to show: 1 = sections only, 2 = sections + subsections (default). */
  depth?: number
}>(), { depth: 2 })
</script>

<template>
  <div class="slidev-layout outline" style="width:100%; height:100%; position:relative; overflow:hidden;">

    <div style="width:100%; height:100%; padding-bottom:2.5em; box-sizing:border-box;">
      <ProgressiveOutline
        :show-all="highlight == null"
        :active-section-no="highlight"
        :depth="depth"
      />
    </div>

    <Footer />
  </div>
</template>
