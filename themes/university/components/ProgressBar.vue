<script setup lang="ts">
/**
 * UniProgressBar — thin linear progress bar used in the University theme.
 * Fills from left proportional to currentPage / totalSlides.
 * Left segment: primary color; right remainder: tertiary color (lighter).
 */
import { computed } from 'vue'
import { useNav } from '@slidev/client'

const { currentPage, slides } = useNav()

const pct = computed(() => {
  const total = slides.value?.length ?? 1
  return Math.min((currentPage.value / total) * 100, 100)
})
</script>

<template>
  <div class="uni-progress-bar">
    <div class="uni-progress-fill" :style="{ width: pct + '%' }" />
  </div>
</template>
