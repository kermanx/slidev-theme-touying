<script setup lang="ts">
/**
 * University focus slide.
 *
 * Typst reference: focus-slide in university.typ
 * - Primary background, white bold text (2em), centered
 */
</script>

<template>
  <div class="slidev-layout focus">
    <slot />
  </div>
</template>

<style>
.slidev-layout.focus {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--slidev-theme-primary);
  font-size: 3em;
  font-weight: 600;
  padding: 1em;
  box-sizing: border-box;

  &, & p, & h1 {
    color: var(--slidev-theme-neutralLightest) !important;
  }

  & > p, & > h1 {
    width: 100%;
  }
}
</style>
