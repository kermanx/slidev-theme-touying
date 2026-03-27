<script setup lang="ts">
import TitleRenderer from '#slidev/title-renderer'
import { useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useCurrentTransition } from '../../composables/useCurrentTransition'
import { useCurrentSectionSlideNo } from '../../composables/useSlideStructure'
import { useTouyingConfig } from '../../composables/useTouyingConfig'

const config = useTouyingConfig()
const { $nav } = useSlideContext()
const { $page } = useSlideContext()
const currentSectionSlideNo = useCurrentSectionSlideNo()

const total = computed(() => $nav.value?.slides.length ?? 1)
const frontmatter = computed(() => $nav.value.currentSlideRoute.meta.slide.frontmatter)
const hideHeader = computed(() => frontmatter.value.header === false || ['cover', 'focus', 'section'].includes($nav.value.currentLayout))
const hideFooter = computed(() => frontmatter.value.footer === false || ['cover', 'focus', 'section'].includes($nav.value.currentLayout))
const transition = useCurrentTransition()
</script>

<template>
  <div class="tou-layer">
    <Transition :name="transition" v-show="!hideHeader">
      <header class="spl-header">
        <span class="spl-header-left">
          <TitleRenderer class="tou-title" :no="currentSectionSlideNo" />
        </span>
      </header>
    </Transition>
    <Transition :name="transition" v-show="!hideFooter">
      <footer class="spl-footer">
        <span class="spl-footer-left">{{ frontmatter.value.footer || config.footer }}</span>
        <span class="spl-footer-right">{{ $page }} / {{ total }}</span>
      </footer>
    </Transition>
  </div>
</template>

<style scoped>
.spl-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 1em 64px 0;
  font-size: 0.75em;
  color: var(--spl-deco);

  .spl-header-left {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

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
