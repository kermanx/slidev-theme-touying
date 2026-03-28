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

const columns = computed(() => {
  type Item = { type: 'section' | 'sub', idx: number, subIdx?: number }
  const items: Item[] = []

  sections.value.forEach((sec, idx) => {
    items.push({ type: 'section', idx })
    if (props.depth >= 2) {
      sec.subsections.forEach((_, subIdx) => {
        items.push({ type: 'sub', idx, subIdx })
      })
    }
  })

  const cols: Item[][] = []
  const maxRows = touyingConfig.value.outlineRowsPerCol
  for (let i = 0; i < items.length; i += maxRows) {
    cols.push(items.slice(i, i + maxRows))
  }
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
      <div v-for="(col, colIdx) in columns" :key="colIdx" class="dew-outline-column">
        <template v-for="item in col" :key="`${item.idx}-${item.subIdx ?? 's'}`">
          <div
            v-if="item.type === 'section'"
            class="dew-outline-item"
            :class="getItemState(item.idx)"
            @click="go(sections[item.idx].no)"
          >
            <span class="dew-outline-num" :style="{ width: numWidth(colIdx) }">{{ item.idx + 1 }}.</span>
            <span class="dew-outline-title">
              <TitleRenderer class="tou-title" :no="sections[item.idx].no" />
            </span>
            <span class="dew-outline-fill" aria-hidden="true" />
            <span class="dew-outline-page">{{ sections[item.idx].no }}</span>
          </div>

          <div
            v-else
            class="dew-outline-subitem"
            :class="[getItemState(item.idx), sections[item.idx].subsections[item.subIdx!].no === $page ? 'dew-outline-subitem-current' : '']"
            @click="go(sections[item.idx].subsections[item.subIdx!].no)"
          >
            <span class="dew-outline-num" :style="{ width: subNumWidth(item.idx, sections[item.idx].subsections.length) }">{{ item.idx + 1 }}.{{ item.subIdx! + 1 }}</span>
            <span class="dew-outline-title">
              <TitleRenderer class="tou-title" :no="sections[item.idx].subsections[item.subIdx!].no" />
            </span>
            <span class="dew-outline-fill" aria-hidden="true" />
            <span class="dew-outline-page">{{ sections[item.idx].subsections[item.subIdx!].no }}</span>
          </div>
        </template>
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