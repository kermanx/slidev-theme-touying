<script setup lang="ts">
import { computed } from 'vue'
import { useNav } from '@slidev/client'
import { useSlideStructure } from '../setup/useSlideStructure'

const props = withDefaults(defineProps<{
  activeSectionNo?: number
  showAll?: boolean
  label?: string
  depth?: number
}>(), {
  showAll: false,
  label: 'Outline',
  depth: 2,
})

const { go, currentPage } = useNav()
const { sections, currentSectionIndex } = useSlideStructure()

// Mirror adaptive-columns: count total rows (sections + subsections at depth>=2)
// Subsections are ~0.9em font so weight them slightly less
const columnCount = computed(() => {
  const totalRows = sections.value.reduce((acc, s) => {
    return acc + 1 + (props.depth >= 2 ? s.subsections.length * 0.9 : 0)
  }, 0)
  return Math.min(Math.ceil(totalRows / 9), 3)
})

const itemsPerCol = computed(() => Math.ceil(sections.value.length / columnCount.value))

function numWidth(idx: number): string {
  const n = sections.value.length
  const maxInCol = columnCount.value === 1
    ? n
    : Math.min((Math.floor(idx / itemsPerCol.value) + 1) * itemsPerCol.value, n)
  const digits = String(maxInCol).length
  // digit em-width ≈ 0.55em each, plus "." and a small gap
  return `${digits * 0.55 + 0.45}em`
}

function subNumWidth(sectionIdx: number, subCount: number): string {
  const secDigits = String(sectionIdx + 1).length
  const subDigits = String(subCount).length
  // "X.Y." — two numbers, two dots, a gap
  return `${(secDigits + subDigits) * 0.55 + 0.9}em`
}

function getItemState(idx: number): 'active' | 'past' | 'future' | 'neutral' {
  if (props.showAll) return 'neutral'

  const activeIdx = props.activeSectionNo != null
    ? sections.value.findIndex(s => s.no === props.activeSectionNo)
    : currentSectionIndex.value

  if (idx === activeIdx) return 'active'
  if (idx < activeIdx) return 'past'
  return 'future'
}
</script>

<template>
  <div class="tou-progressive-outline">
    <div class="tou-outline-label">{{ label }}</div>

    <div class="tou-outline-list" :style="{ columnCount }">
      <div
        v-for="(section, idx) in sections"
        :key="section.no"
        class="tou-outline-section-group"
      >
        <!-- Section row -->
        <div
          class="tou-outline-item"
          :class="getItemState(idx)"
          @click="go(section.no)"
        >
          <span class="tou-outline-num" :style="{ width: numWidth(idx) }">{{ idx + 1 }}.</span>
          <span class="tou-outline-title" :data-text="section.title">{{ section.title }}</span>
          <span class="tou-outline-fill" aria-hidden="true" />
          <span class="tou-outline-page">{{ section.no }}</span>
        </div>

        <!-- Subsection rows (depth >= 2) -->
        <template v-if="depth >= 2">
          <div
            v-for="(sub, subIdx) in section.subsections"
            :key="sub.no"
            class="tou-outline-subitem"
            :class="[getItemState(idx), sub.no === currentPage ? 'tou-outline-subitem-current' : '']"
            @click="go(sub.no)"
          >
            <span class="tou-outline-num" :style="{ width: subNumWidth(idx, section.subsections.length) }">{{ idx + 1 }}.{{ subIdx + 1 }}.</span>
            <span class="tou-outline-title" :data-text="sub.title">{{ sub.title }}</span>
            <span class="tou-outline-fill" aria-hidden="true" />
            <span class="tou-outline-page">{{ sub.no }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
