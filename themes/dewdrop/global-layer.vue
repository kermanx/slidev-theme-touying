<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useCurrentTransition } from '../../composables/useCurrentTransition'
import { useTouyingConfig } from '../../composables/useTouyingConfig'
import Footer from './components/Footer.vue'
import MiniSlides from './components/MiniSlides.vue'
import Sidebar from './components/Sidebar.vue'

const config = useTouyingConfig()

const { $nav } = useSlideContext()
const frontmatter = computed(() => $nav.value.currentSlideRoute.meta.slide.frontmatter)
const hideNav = computed(() => frontmatter.value.navigation === false || ['cover', 'focus', 'outline', 'section'].includes($nav.value.currentLayout))
const hideFooter = computed(() => frontmatter.value.footer === false || ['cover', 'focus'].includes($nav.value.currentLayout))
const transition = useCurrentTransition()
</script>

<template>
  <div class="tou-layer">
    <Transition :name="transition" v-show="!hideNav">
      <Sidebar v-if="config.navigation === 'sidebar'" />
      <MiniSlides v-else-if="config.navigation === 'mini-slides'" />
    </Transition>
    <Transition :name="transition" v-show="!hideFooter">
      <Footer v-if="!hideFooter" />
    </Transition>
  </div>
</template>
