<script setup lang="ts">
/**
 * University default slide.
 *
 * Typst reference: slide() in university.typ
 * - Header: progress bar + slide title (left) + section + logo (right)
 * - Content: padded area between header and footer
 * - Footer: three colored bands
 */
import { useTouyingConfig } from '../../../composables/useTouyingConfig'
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'

useTouyingConfig()
</script>

<template>
  <div class="slidev-layout default uni-default">
    <Header />
    <div class="uni-content">
      <slot />
    </div>
    <Footer />
  </div>
</template>
