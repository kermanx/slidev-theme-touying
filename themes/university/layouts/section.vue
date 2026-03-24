<script setup lang="ts">
/**
 * University section slide.
 *
 * Typst reference: new-section-slide in university.typ
 * - Centered, 20% horizontal padding
 * - Bold primary section title (1.5em)
 * - Progress bar below the title (primary → tertiary)
 * - No outline (unlike Dewdrop)
 */
import { useTouyingConfig } from '../../../composables/useTouyingConfig'
import ProgressBar from '../components/ProgressBar.vue'
import Footer from '../components/Footer.vue'

useTouyingConfig()
</script>

<template>
  <div class="slidev-layout section uni-section">
    <div class="uni-section-inner">
      <div class="uni-section-title">
        <slot />
      </div>
      <div class="uni-section-bar">
        <ProgressBar />
      </div>
    </div>
    <Footer />
  </div>
</template>
