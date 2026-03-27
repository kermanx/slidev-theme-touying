<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useNavigationCurrent } from '../../../composables/useNavigationTransition'
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

const config = useTouyingConfig()
const { $nav } = useSlideContext()
const page = useNavigationCurrent()
const total = computed(() => $nav.value?.slides.length ?? 1)
const frontmatter = computed(() => $nav.value.currentSlideRoute.meta.slide.frontmatter)
</script>

<template>
  <footer class="spl-footer">
    <span class="spl-footer-left">{{ frontmatter.footer || config.footer }}</span>
    <span class="spl-footer-right">{{ page }} / {{ total }}</span>
  </footer>
</template>

<style scoped>
.spl-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 0 64px 0.8em;
  font-size: 0.6em;
  color: var(--spl-deco);
}
</style>
