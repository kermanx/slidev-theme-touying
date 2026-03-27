<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { computed } from 'vue'

const { $nav, $frontmatter } = useSlideContext()
const hideHeader = computed(() => $frontmatter.header === false || ['cover', 'focus', 'section'].includes($nav.value.currentLayout))
const hideFooter = computed(() => $frontmatter.footer === false || ['cover', 'focus'].includes($nav.value.currentLayout))
</script>

<template>
  <div class="tou-layer">
    <Transition name="fade" v-show="!hideHeader">
      <Header />
    </Transition>
    <Transition name="fade" v-show="!hideFooter">
      <Footer />
    </Transition>
  </div>
</template>
