/**
 * useSlideStructure
 *
 * Parses the Slidev slide list into a hierarchical structure of sections,
 * each containing its member slides. Slides with `layout: section` are
 * treated as section boundaries.
 *
 * The result is used by TouSidebar, TouMiniSlides, and TouProgressiveOutline.
 */

import { computed } from 'vue'
import { useNav, useSlideContext } from '@slidev/client'
import type { SlideRoute } from '@slidev/types'
import { createSharedComposable } from '@vueuse/core'

export interface SlideSubsection {
  no: number
  title: string
  /** Slide numbers belonging to this subsection (excluding the subsection slide itself) */
  slides: number[]
}

export interface SlideSection {
  /** Section slide number (1-indexed) */
  no: number
  /** Section title (from slide title or frontmatter.title) */
  title: string
  /** Slide numbers that belong to this section (excluding the section slide itself) */
  slides: number[]
  /** Member slides that have a title (shown as subsections at depth >= 2) */
  subsections: SlideSubsection[]
}

/**
 * Builds the section structure from the full slides list.
 */
export function buildSectionStructure(slides: SlideRoute[]): SlideSection[] {
  const sections: SlideSection[] = []
  let currentSection: SlideSection | null = null
  let currentSubsection: SlideSubsection | null = null

  for (const slide of slides) {
    const layout = slide.meta.layout

    if (layout === 'section') {
      currentSection = {
        no: slide.no,
        title: slide.meta.slide.title ?? `Section ${sections.length + 1}`,
        slides: [],
        subsections: [],
      }
      currentSubsection = null
      sections.push(currentSection)
    }
    else if (layout === 'cover' || layout === 'outline' || layout === 'focus') {
      // These special slides don't belong to any section
    }
    else if (currentSection) {
      currentSection.slides.push(slide.no)
      const title = slide.meta.slide.title
      const level = slide.meta.slide.level || 0

      if (title && level <= 2) {
        // This slide starts a new subsection
        currentSubsection = { no: slide.no, title, slides: [] }
        currentSection.subsections.push(currentSubsection)
      }
      else if (currentSubsection) {
        // Regular slide inside current subsection
        currentSubsection.slides.push(slide.no)
      }
      else {
        // Regular slide before any subsection — attach to a synthetic "pre" subsection
        if (!currentSection.subsections.length || currentSection.subsections[0].no !== currentSection.no) {
          const pre: SlideSubsection = { no: currentSection.no, title: '', slides: [] }
          currentSection.subsections.unshift(pre)
          currentSubsection = pre
        }
        currentSection.subsections[0].slides.push(slide.no)
      }
    }
  }

  return sections
}

/**
 * Returns the reactive section structure and a helper to find which section
 * the current slide belongs to.
 */
export const useSlideStructure = createSharedComposable(() => {
  const { slides } = useNav()

  const sections = computed<SlideSection[]>(() =>
    buildSectionStructure(slides.value ?? []),
  )

  return {
    sections,
  }
})

export function useCurrentSectionIndex() {
  const { $page } = useSlideContext()
  const { sections } = useSlideStructure()
  return computed(() => sections.value.findIndex(
    sec => sec.no === $page.value || sec.slides.includes($page.value),
  ))
}

export function useCurrentSectionTitle() {
  const { $page, $nav } = useSlideContext()
  const { sections } = useSlideStructure()
  const sectionIndex = useCurrentSectionIndex()
  return computed(() => {
    if ($page.value < sections.value[0]?.no) {
      return $nav.value.slides[0].meta.slide.title
    } else {
      return sections.value[sectionIndex.value]?.title ?? ''
    }
  })
}
