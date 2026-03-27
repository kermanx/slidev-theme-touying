<script setup lang="ts">
import { useSlideContext } from '@slidev/client'
import TitleRenderer from '#slidev/title-renderer'
import { useTouyingConfig } from '../../composables/useTouyingConfig'
import { computed } from 'vue'
import { useCurrentSectionSlideNo } from '../../composables/useSlideStructure'

const config = useTouyingConfig()
const { $nav, $frontmatter } = useSlideContext()
const { $page } = useSlideContext()
const currentSectionSlideNo = useCurrentSectionSlideNo()

const total = computed(() => $nav.value?.slides.length ?? 1)
const hideHeader = computed(() => ['none', false].includes($frontmatter.header) || ['cover', 'focus', 'section'].includes($nav.value.currentLayout))
const hideFooter = computed(() => ['none', false].includes($frontmatter.footer) || ['cover', 'focus', 'section'].includes($nav.value.currentLayout))
</script>

<template>
  <div class="tou-layer">
    <Transition name="fade" v-show="!hideHeader">
      <header class="spl-header">
        <span class="spl-header-left">
          <TitleRenderer class="tou-title" :no="currentSectionSlideNo" />
        </span>
      </header>
    </Transition>
    <Transition name="fade" v-show="!hideFooter">
      <footer class="spl-footer">
        <span class="spl-footer-left">{{ config.footer }}</span>
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
