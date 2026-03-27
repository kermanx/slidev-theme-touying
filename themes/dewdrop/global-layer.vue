<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { useTouyingConfig } from '../../composables/useTouyingConfig'
import Sidebar from './components/Sidebar.vue'
import MiniSlides from './components/MiniSlides.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue'

const config = useTouyingConfig()

const { $nav, $frontmatter } = useSlideContext()
const hideNav = computed(() => $frontmatter.navigation === false || ['cover', 'focus', 'outline', 'section'].includes($nav.value.currentLayout))
const hideFooter = computed(() => $frontmatter.footer === false || ['cover', 'focus'].includes($nav.value.currentLayout))
</script>

<template>
  <div class="tou-layer">
    <Transition name="fade" v-show="!hideNav">
      <Sidebar v-if="config.navigation === 'sidebar'" />
      <MiniSlides v-else-if="config.navigation === 'mini-slides'" />
    </Transition>
    <Transition name="fade" v-show="!hideFooter">
      <Footer v-if="!hideFooter" />
    </Transition>
  </div>
</template>
