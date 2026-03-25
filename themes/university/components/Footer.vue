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
import { useNav, useSlideContext } from '@slidev/client'

const { slides } = useNav()
const { $page } = useSlideContext()

const first = computed(() => slides.value[0].meta.slide.frontmatter ?? {})
const author = computed(() => first.value.author ?? '')
const title = computed(() => first.value.title ?? '')
const date = computed(() => first.value.date ?? '')
const total = computed(() => slides.value?.length ?? 1)
</script>

<template>
  <footer class="uni-footer">
    <div class="uni-footer-a">{{ author }}</div>
    <div class="uni-footer-b">{{ title }}</div>
    <div class="uni-footer-c">
      <span v-if="date">{{ date }} · </span>{{ $page }} / {{ total }}
    </div>
  </footer>
</template>

<style scoped>
.uni-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: grid;
  grid-template-columns: 25% 1fr 25%;
  height: 1.8em;
  font-size: 0.55em;
  z-index: 10;
}

.uni-footer-a,
.uni-footer-b,
.uni-footer-c {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 0.8em;
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uni-footer-a { background: var(--slidev-theme-primary); }
.uni-footer-b { background: var(--slidev-theme-secondary); }
.uni-footer-c { background: var(--slidev-theme-tertiary); }
</style>
