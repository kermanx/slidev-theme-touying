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
