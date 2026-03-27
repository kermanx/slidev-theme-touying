<script setup lang="ts">
import { useSlideContext } from '@slidev/client'

const { $route } = useSlideContext()
</script>

<template>
  <div class="slidev-layout section">
    <div class="spl-section-title">{{ $route?.meta.slide.title }}</div>
  </div>
</template>

<style>
.tou-preset-simple .slidev-layout.section {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
