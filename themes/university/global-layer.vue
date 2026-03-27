<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useCurrentTransition } from '../../composables/useCurrentTransition'
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'

const { $nav } = useSlideContext()
const frontmatter = computed(() => $nav.value.currentSlideRoute.meta.slide.frontmatter)
const hideHeader = computed(() => frontmatter.value.header === false || ['cover', 'focus', 'section'].includes($nav.value.currentLayout))
const hideFooter = computed(() => frontmatter.value.footer === false || ['cover', 'focus'].includes($nav.value.currentLayout))
const transition = useCurrentTransition()
</script>

<template>
  <div class="tou-layer">
    <Transition :name="transition" v-show="!hideHeader">
      <Header />
    </Transition>
    <Transition :name="transition" v-show="!hideFooter">
      <Footer />
    </Transition>
  </div>
</template>
