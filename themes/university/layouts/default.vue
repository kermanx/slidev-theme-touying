<script setup lang="ts">
/**
 * University default slide.
 *
 * Typst reference: slide() in university.typ
 * - Header: progress bar + slide title (left) + section + logo (right)
 * - Content: padded area between header and footer
 * - Footer: three colored bands
 */
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="slidev-layout default">
    <Header />
    <div class="uni-content">
      <slot />
    </div>
    <Footer />
  </div>
</template>

<style>
.slidev-layout.default {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  .uni-content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    /* top padding: progress bar (2px) + header row (~2.2em) */
    padding: 3.6em 2em 3em;
    box-sizing: border-box;
    overflow: hidden;

    h1 {
      display: none;
    }
  }
}
</style>