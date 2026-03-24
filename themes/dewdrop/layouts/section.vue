<script setup lang="ts">
/**
 * section layout — Chapter/section divider slide
 *
 * Shows the progressive outline:
 * - Left: "Contents" label in primary color
 * - Right: All section titles with current one highlighted, others faded
 *
 * No sidebar / mini-slides navigation (outline IS the navigation here).
 * Footer is shown.
 *
 * The "active" section is auto-detected as the section whose slide number
 * matches the current slide (this slide).
 */
import { useNav } from '@slidev/client'
import ProgressiveOutline from '../components/ProgressiveOutline.vue'
import Footer from '../components/Footer.vue'

const { currentPage } = useNav()

const props = withDefaults(defineProps<{
  /** How many heading levels to show: 1 = sections only, 2 = sections + subsections (default). */
  depth?: number
}>(), { depth: 2 })
</script>

<template>
  <div class="slidev-layout section" style="width:100%; height:100%; position:relative; overflow:hidden;">

    <!-- Progressive outline fills the whole slide (minus footer) -->
    <div style="width:100%; height:100%; padding-bottom:2.5em; box-sizing:border-box;">
      <ProgressiveOutline :active-section-no="currentPage" :depth="props.depth" />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>
