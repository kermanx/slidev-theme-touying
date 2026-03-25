<script setup lang="ts">
/**
 * Simple default slide.
 *
 * Header: current heading (section or slide title)
 * Footer: left text, page/total right — 0.6em, gray
 */
import TitleRenderer from '#slidev/title-renderer'
import { useNav, useSlideContext } from '@slidev/client'
import { computed } from 'vue'
import { useCurrentSectionSlideNo } from '../../../composables/useSlideStructure'
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

const config = useTouyingConfig()
const { slides } = useNav()
const { $page } = useSlideContext()
const currentSectionSlideNo = useCurrentSectionSlideNo()

const total = computed(() => slides.value?.length ?? 1)
</script>

<template>
  <div class="slidev-layout default">
    <header class="spl-header">
      <span class="spl-header-left">
        <TitleRenderer class="tou-title" :no="currentSectionSlideNo" />
      </span>
    </header>
    <div class="spl-content">
      <slot />
    </div>
    <footer class="spl-footer">
      <span class="spl-footer-left">{{ config.footer }}</span>
      <span class="spl-footer-right">{{ $page }} / {{ total }}</span>
    </footer>
  </div>
</template>

<style>
.tou-preset-simple .slidev-layout.default {
  width: 100%;
  height: 100%;
  position: relative;
  background: var(--slidev-theme-neutralLightest);
  overflow: hidden;

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

  .spl-content {
    position: absolute;
    inset: 0;
    padding: 48px 64px;
    box-sizing: border-box;
    overflow: hidden;
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
}
</style>
