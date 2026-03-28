<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useNavigationTransition } from '../../composables/useNavigationTransition'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

const { $nav } = useSlideContext()
const frontmatter = computed(() => $nav.value.currentSlideRoute.meta.slide.frontmatter)
const hideHeader = computed(() => frontmatter.value.header === false || ['cover', 'focus', 'section', 'end'].includes($nav.value.currentLayout))
const HeaderTransition = useNavigationTransition(hideHeader)
const hideFooter = computed(() => frontmatter.value.footer === false || ['cover', 'focus', 'end'].includes($nav.value.currentLayout))
const FooterTransition = useNavigationTransition(hideFooter)
</script>

<template>
  <div class="tou-layer">
    <HeaderTransition>
      <Header />
    </HeaderTransition>
    <FooterTransition>
      <Footer />
    </FooterTransition>
  </div>
</template>
