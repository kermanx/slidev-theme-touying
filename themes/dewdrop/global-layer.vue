<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useNavigationTransition } from '../../composables/useNavigationTransition'
import { useTouyingConfig } from '../../composables/useTouyingConfig'
import Footer from './components/Footer.vue'
import MiniSlides from './components/MiniSlides.vue'
import Sidebar from './components/Sidebar.vue'

const config = useTouyingConfig()

const { $nav } = useSlideContext()
const frontmatter = computed(() => $nav.value.currentSlideRoute.meta.slide.frontmatter)
const hideNav = computed(() => frontmatter.value.navigation === false || ['cover', 'focus', 'outline', 'section'].includes($nav.value.currentLayout))
const NavTransition = useNavigationTransition(hideNav)
const hideFooter = computed(() => frontmatter.value.footer === false || ['cover', 'focus'].includes($nav.value.currentLayout))
const FooterTransition = useNavigationTransition(hideFooter)
</script>

<template>
  <div class="tou-layer">
    <NavTransition>
      <Sidebar v-if="config.navigation === 'sidebar'" />
      <MiniSlides v-else-if="config.navigation === 'mini-slides'" />
    </NavTransition>
    <FooterTransition>
      <Footer v-if="!hideFooter" />
    </FooterTransition>
  </div>
</template>
