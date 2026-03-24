<script setup lang="ts">
/**
 * UniFooter — University theme footer.
 *
 * Three colored cells (matching Typst university.typ):
 *   [primary: author] [secondary: title] [tertiary: date · page/total]
 *
 * Columns default to 25% / 1fr / 25%.
 */
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

const config = useTouyingConfig()
const { currentPage, slides } = useNav()

const first = computed(() => slides.value?.[0]?.meta?.slide?.frontmatter ?? {})
const author = computed(() => first.value.author ?? '')
const title = computed(() => first.value['short-title'] ?? first.value.title ?? '')
const date = computed(() => first.value.date ?? '')
const total = computed(() => slides.value?.length ?? 1)
</script>

<template>
  <footer class="uni-footer">
    <div class="uni-footer-a">{{ author }}</div>
    <div class="uni-footer-b">{{ title }}</div>
    <div class="uni-footer-c">
      <span v-if="date">{{ date }} · </span>{{ currentPage }} / {{ total }}
    </div>
  </footer>
</template>
