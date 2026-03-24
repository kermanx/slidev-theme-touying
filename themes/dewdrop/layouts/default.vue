<script setup lang="ts">
/**
 * default layout — Standard content slide
 *
 * Features:
 * - Shows TouSidebar (sidebar mode) or TouMiniSlides (mini-slides mode) based on touying.navigation
 * - Content area padded to avoid overlap with nav
 * - Optional slide title preamble (from frontmatter.title) shown in primary color
 * - TouFooter at the bottom
 */
import { useTouyingConfig } from '../../../composables/useTouyingConfig'
import Sidebar from '../components/Sidebar.vue'
import MiniSlides from '../components/MiniSlides.vue'
import Footer from '../components/Footer.vue'

const config = useTouyingConfig()
</script>

<template>
  <div class="slidev-layout default" style="width:100%; height:100%; position:relative; overflow:hidden;">

    <!-- Navigation -->
    <Sidebar v-if="config.navigation === 'sidebar'" />
    <MiniSlides v-else-if="config.navigation === 'mini-slides'" />

    <!-- Content area -->
    <div class="default-content">
      <slot />
    </div>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<style>
.slidev-layout.default {
  background: var(--slidev-theme-neutralLightest);

  .default-content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }

  :root.tou-nav-sidebar & .default-content {
    padding: 1.2em var(--slidev-theme-sidebarWidth) 2em var(--slidev-theme-sidebarWidth);
  }

  :root.tou-nav-mini-slides & .default-content {
    padding-top: calc(var(--slidev-theme-miniSlidesHeight) + 1em);
    padding-bottom: 2.5em;
    padding-left: 2.4em;
    padding-right: 2.4em;
  }

  :root.tou-nav-none & .default-content {
    padding: 2em 2.4em 2.5em 2.4em;
  }
}
</style>
