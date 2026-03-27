<script setup lang="ts">
import TitleRenderer from '#slidev/title-renderer'
import { useCurrentSectionSlideNo } from '../../../composables/useSlideStructure'

const currentSectionSlideNo = useCurrentSectionSlideNo()
</script>

<template>
  <header class="spl-header">
    <span class="spl-header-left">
      <TitleRenderer class="tou-title" :no="currentSectionSlideNo" />
    </span>
  </header>
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
</style>
