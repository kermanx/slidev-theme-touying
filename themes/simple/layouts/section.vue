<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useSlideStructure } from '../../../composables/useSlideStructure'

const { currentPage } = useNav()
const { sections } = useSlideStructure()

const sectionTitle = computed(() =>
  sections.value.find(s => s.no === currentPage.value)?.title ?? '',
)
</script>

<template>
  <div class="slidev-layout section">
    <div class="spl-section-title">{{ sectionTitle }}</div>
  </div>
</template>

<style>
.tou-preset-simple .slidev-layout.section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--slidev-theme-neutralLightest);
  padding: 2em;
  box-sizing: border-box;

  .spl-section-title {
    font-size: 1.2em;
    font-weight: 600;
    color: var(--slidev-theme-neutralDarkest);
    text-align: center;
    line-height: 1.3;
    letter-spacing: 0.02em;
  }
}
</style>
