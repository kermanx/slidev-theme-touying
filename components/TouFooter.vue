<script setup lang="ts">
/**
 * TouFooter
 *
 * Bottom footer with left/right columns.
 * - Left: custom text (e.g. author name) via touying.footer
 * - Right: page counter (or custom text) via touying.footerRight
 */
import { useNav } from '@slidev/client'
import { useTouyingConfig } from '../setup/context'

const { currentPage, total } = useNav()
const config = useTouyingConfig()
</script>

<template>
  <footer class="tou-footer">
    <span class="tou-footer-left">{{ config.footer }}</span>
    <span class="tou-footer-right">
      <template v-if="config.footerRight">{{ config.footerRight }}</template>
      <template v-else>{{ currentPage }} / {{ total }}</template>
    </span>
  </footer>
</template>
