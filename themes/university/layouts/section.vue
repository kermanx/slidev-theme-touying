<script setup lang="ts">
/**
 * University section slide.
 *
 * Typst reference: new-section-slide in university.typ
 * - Centered vertically and horizontally, 20% horizontal padding
 * - Bold primary section title (1.5em)
 * - Progress bar below the title
 * - No outline (unlike Dewdrop)
 */
import TitleRenderer from '#slidev/title-renderer'
import Footer from '../components/Footer.vue'
import ProgressBar from '../components/ProgressBar.vue'

</script>

<template>
  <div class="slidev-layout section uni-section">
    <div class="uni-section-inner">
      <div class="uni-section-title">
        <TitleRenderer class="tou-title" :no="$page" />
      </div>
      <div class="uni-section-bar">
        <ProgressBar />
      </div>
      <div class="uni-section-content">
        <slot />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
.tou-preset-university  .slidev-layout.section.uni-section {
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--slidev-theme-neutralLightest);
  overflow: hidden;
  padding: 0;

  .uni-section-inner {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 1.8em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 20%;
    gap: 0.65em;
  }

  .uni-section-title {
    font-size: 2em;
    font-weight: 600;
    color: var(--slidev-theme-primary);
    line-height: 1.3;
    width: 100%;
  }

  .uni-section-bar {
    width: 100%;
  }

  .uni-section-content {
    width: 100%;

    h1 {
      display: none;
    }
  }
}
</style>
