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

<style scoped>
.uni-progress-bar {
  width: 100%;
  height: 2px;
  background: var(--slidev-theme-tertiary);
  position: relative;
  flex-shrink: 0;
}

.uni-progress-fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  background: var(--slidev-theme-primary);
  transition: width 0.3s ease;
}
</style>
