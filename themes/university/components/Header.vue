<script setup lang="ts">
/**
 * UniHeader — University theme header.
 *
 * Structure (matching Typst university.typ):
 *   [progress bar — 2pt full width]
 *   [slide title (h2)  ·····  section name (h1) + logo]
 *
 * Left:  current slide title (bold, primary, 1.2em)
 * Right: current section title (primary.lighten ~65%) + logo
 */
import { useNav, useSlideContext } from '@slidev/client'
import TitleRenderer from '#slidev/title-renderer'
import { computed } from 'vue'
import { useCurrentSectionSlideNo } from '../../../composables/useSlideStructure'
import ProgressBar from './ProgressBar.vue'

const { slides } = useNav()
const { $page } = useSlideContext()
const currentSectionSlideNo = useCurrentSectionSlideNo()

const logo = computed(() => slides.value[0].meta.slide.frontmatter.logo ?? '')
</script>

<template>
  <header class="uni-header">
    <ProgressBar />
    <div class="uni-header-row">
      <span class="uni-header-left">
        <TitleRenderer class="tou-title" :no="$page" />
      </span>
      <span class="uni-header-right">
        <span class="uni-header-section">
          <TitleRenderer class="tou-title" :no="currentSectionSlideNo" />
        </span>
        <img v-if="logo" :src="logo" class="uni-header-logo" />
      </span>
    </div>
  </header>
</template>

<style scoped>
.uni-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  z-index: 10;
  background: var(--slidev-theme-neutralLightest);

  .uni-header-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    padding: 0.35em 1.6em 0.3em;
    gap: 1em;
  }

  .uni-header-left {
    font-size: 2em;
    font-weight: 600;
    color: var(--slidev-theme-primary);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .uni-header-right {
    font-size: 1.2em;
    color: var(--slidev-theme-secondary);
    display: flex;
    align-items: center;
    gap: 0.4em;
    flex-shrink: 0;
  }

  .uni-header-section {
    opacity: 0.65;
  }

  .uni-header-logo {
    height: 1.2em;
    width: auto;
    object-fit: contain;
  }
}
</style>
