<script setup lang="ts">
/**
 * focus layout — Emphasis/focus slide
 *
 * Full primary-color background, centered white text in 1.5em.
 * No navigation, no footer. Slide counter still increments.
 */
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

useTouyingConfig()
</script>

<template>
  <div class="slidev-layout focus" style="width:100%; height:100%;">
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Reset inline code styling — gray box looks bad on primary-colored background */
:deep(code) {
  background: rgba(255, 255, 255, 0.18);
  color: var(--slidev-theme-neutralLightest);
  border-radius: 3px;
}
</style>
