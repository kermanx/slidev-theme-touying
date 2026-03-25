<script setup lang="ts">
/**
 * TouFooter
 *
 * Bottom footer with left/right columns.
 * - Left: custom text (e.g. author name) via touying.footer
 * - Right: page counter (or custom text) via touying.footerRight
 */
import { useNav } from '@slidev/client'
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

const config = useTouyingConfig()
const { total } = useNav()
</script>

<template>
  <footer class="dew-footer">
    <span class="dew-footer-left">{{ config.footer }}</span>
    <span class="dew-footer-right">
      <template v-if="config.footerRight">{{ config.footerRight }}</template>
      <template v-else>{{ $page }} / {{ total }}</template>
    </span>
  </footer>
</template>

<style scoped>
.dew-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5em 1em;
  font-size: 0.8em;
  color: var(--slidev-theme-neutralDark);
  box-sizing: border-box;
}

.dew-footer-left {
  opacity: 0.7;
}

.dew-footer-right {
  opacity: 0.85;
}
</style>
