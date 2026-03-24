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
import { useNav } from '@slidev/client'

export interface SlideSubsection {
  no: number
  title: string
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
export function buildSectionStructure(slides: any[]): SlideSection[] {
  const sections: SlideSection[] = []
  let currentSection: SlideSection | null = null

  for (const slide of slides) {
    const layout = slide.meta?.layout ?? slide.frontmatter?.layout ?? ''

    if (layout === 'section') {
      currentSection = {
        no: slide.no,
        title:
          slide.meta?.slide?.frontmatter?.title
          ?? slide.meta?.slide?.title
          ?? `Section ${sections.length + 1}`,
        slides: [],
        subsections: [],
      }
      sections.push(currentSection)
    }
    else if (layout === 'cover' || layout === 'outline' || layout === 'focus') {
      // These special slides don't belong to any section
    }
    else if (currentSection) {
      currentSection.slides.push(slide.no)
      const title = slide.meta?.slide?.frontmatter?.title ?? slide.meta?.slide?.title
      if (title) {
        currentSection.subsections.push({ no: slide.no, title })
      }
    }
  }

  return sections
}

/**
 * Returns the reactive section structure and a helper to find which section
 * the current slide belongs to.
 */
export function useSlideStructure() {
  const { slides, currentPage } = useNav()

  const sections = computed<SlideSection[]>(() =>
    buildSectionStructure(slides.value ?? []),
  )

  /**
   * Index (0-based) of the section that contains the given slide number.
   * Returns -1 if the slide is not inside any section.
   */
  function getSectionIndex(slideNo: number): number {
    return sections.value.findIndex(
      sec => sec.no === slideNo || sec.slides.includes(slideNo),
    )
  }

  const currentSectionIndex = computed(() =>
    getSectionIndex(currentPage.value),
  )

  return {
    sections,
    currentSectionIndex,
    getSectionIndex,
  }
}
