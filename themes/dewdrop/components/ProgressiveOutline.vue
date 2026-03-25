<script setup lang="ts">
import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import TitleRenderer from '#slidev/title-renderer'
import { useCurrentSectionIndex, useSlideStructure } from '../../../composables/useSlideStructure'
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

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

const { go } = useNav()
const { $page } = useSlideContext()
const { sections } = useSlideStructure()
const currentSectionIndex = useCurrentSectionIndex()
const touyingConfig = useTouyingConfig()

// Pack sections into columns: fill each column up to outlineRowsPerCol rows before starting the next.
// A section group occupies 1 row (the section) + its subsection rows (when depth >= 2).
const columns = computed(() => {
  type Entry = { section: (typeof sections.value)[number], idx: number }
  const cols: Entry[][] = []
  let currentCol: Entry[] = []
  let currentRows = 0
  const maxRows = touyingConfig.value.outlineRowsPerCol

  sections.value.forEach((section, idx) => {
    const rows = 1 + (props.depth >= 2 ? section.subsections.length : 0)
    if (currentRows + rows > maxRows && currentCol.length > 0) {
      cols.push(currentCol)
      currentCol = []
      currentRows = 0
    }
    currentCol.push({ section, idx })
    currentRows += rows
  })
  if (currentCol.length > 0)
    cols.push(currentCol)
  return cols
})

function numWidth(colIdx: number): string {
  const col = columns.value[colIdx]
  const maxNo = col[col.length - 1].idx + 1
  const digits = String(maxNo).length
  // digit em-width ≈ 0.55em each, plus "." and a small gap
  return `${digits * 0.55 + 0.18}em`
}

function subNumWidth(sectionIdx: number, subCount: number): string {
  const secDigits = String(sectionIdx + 1).length
  const subDigits = String(subCount).length
  // "X.Y." — two numbers, two dots, a gap
  return `${(secDigits + subDigits) * 0.55 + 0.16}em`
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
  <div class="dew-progressive-outline">
    <div class="dew-outline-label">{{ label }}</div>

    <div class="dew-outline-list">
      <div
        v-for="(col, colIdx) in columns"
        :key="colIdx"
        class="dew-outline-column"
      >
        <div
          v-for="({ section, idx }) in col"
          :key="section.no"
          class="dew-outline-section-group"
        >
          <!-- Section row -->
          <div
            class="dew-outline-item"
            :class="getItemState(idx)"
            @click="go(section.no)"
          >
            <span class="dew-outline-num" :style="{ width: numWidth(colIdx) }">{{ idx + 1 }}.</span>
            <span class="dew-outline-title">
              <TitleRenderer class="tou-title" :no="section.no" />
            </span>
            <span class="dew-outline-fill" aria-hidden="true" />
            <span class="dew-outline-page">{{ section.no }}</span>
          </div>

          <!-- Subsection rows (depth >= 2) -->
          <template v-if="depth >= 2">
            <div
              v-for="(sub, subIdx) in section.subsections"
              :key="sub.no"
              class="dew-outline-subitem"
              :class="[getItemState(idx), sub.no === $page ? 'dew-outline-subitem-current' : '']"
              @click="go(sub.no)"
            >
              <span class="dew-outline-num" :style="{ width: subNumWidth(idx, section.subsections.length) }">{{ idx + 1 }}.{{ subIdx + 1 }}</span>
              <span class="dew-outline-title">
                <TitleRenderer class="tou-title" :no="sub.no" />
              </span>
              <span class="dew-outline-fill" aria-hidden="true" />
              <span class="dew-outline-page">{{ sub.no }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.dew-progressive-outline {
  width: 100%;
  height: 100%;
  padding: 2em 3em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.dew-outline-label {
  font-size: 1.6em;
  font-weight: 700;
  color: var(--slidev-theme-primary);
}

.dew-outline-list {
  display: flex;
  gap: 2.5em;
  align-items: flex-start;
}

.dew-outline-column {
  flex: 1;
  min-width: 0;
}

.dew-outline-item {
  display: flex;
  align-items: baseline;
  gap: 0.35em;
  cursor: pointer;
  transition: opacity 0.3s ease, color 0.3s ease;
  line-height: 1.4;
  margin: 0.15em 0;
}

.dew-outline-subitem {
  display: flex;
  align-items: baseline;
  gap: 0.35em;
  cursor: pointer;
  transition: opacity 0.3s ease, color 0.3s ease;
  line-height: 1.4;
  margin-bottom: 0.2em;
  padding-left: 0.8em;
  font-size: 0.9em;
}

.dew-outline-subitem-current {
  color: var(--slidev-theme-primary);
  font-weight: 600;
}

.dew-outline-num {
  flex-shrink: 0;
}

.dew-outline-title {
  flex-shrink: 0;
  white-space: nowrap;
  display: inline-block;
}

/* Dot leaders — fade right edge to avoid half-dots */
.dew-outline-fill {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  margin: 0 0.04em;
  -webkit-mask-image: linear-gradient(to right, black calc(100% - 0.6em), transparent 100%);
  mask-image: linear-gradient(to right, black calc(100% - 0.6em), transparent 100%);
}

.dew-outline-fill::after {
  content: ' . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . . .';
}

.dew-outline-page {
  flex-shrink: 0;
}

/* Progressive mode: current section */
.dew-outline-item.active {
  color: var(--slidev-theme-primary);
  font-weight: 600;
}

/* Progressive mode: past / future */
.dew-outline-item.past,
.dew-outline-item.future,
.dew-outline-subitem.past,
.dew-outline-subitem.future {
  opacity: var(--tou-alpha);
  color: var(--slidev-theme-neutralDarkest);
}

/* Outline (showAll) mode */
.dew-outline-item.neutral {
  color: var(--slidev-theme-neutralDarkest);
}
</style>