import { computed, watchEffect } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useNav } from '@slidev/client'
import { deepMerge } from '@antfu/utils'

// ---- Types ----------------------------------------------------------------

/** Non-CSS configuration read from frontmatter `touying:` */
export interface TouyingConfig {
  preset: string
  navigation: 'sidebar' | 'mini-slides' | 'none'
  footer: string
  footerRight: string
  outlineRowsPerCol: number
  alpha: number
  miniSlides: {
    height: string,
    /** true: always one row per subsection; false: all dots in one row; auto (default): one row per subsection only if max subsections per section <= 3 */
    linebreaks: true | false | 'auto'
    /** Whether to show slide dots at all (default: true) */
    subsection: boolean
  },
  sidebar: {
    width: string
  }
}

// ---- Defaults & maps -------------------------------------------------------

const DEFAULTS: TouyingConfig = {
  preset: 'dewdrop',
  navigation: 'mini-slides',
  footer: '',
  footerRight: '',
  outlineRowsPerCol: 14,
  alpha: 0.3,
  miniSlides: {
    height: '2em',
    linebreaks: 'auto',
    subsection: true,
  },
  sidebar: {
    width: '10em',
  },
}

// ---- Shared composable -----------------------------------------------------

export const useTouyingConfig = createSharedComposable(() => {
  const { slides } = useNav()

  /** Non-CSS config from headmatter `touying:` */
  const config = computed<TouyingConfig>(() => {
    const first = slides.value?.[0]
    const touying = first.meta.slide.frontmatter.touying ?? {}
    return deepMerge(DEFAULTS, touying) as TouyingConfig
  })

  watchEffect((onCleanup) => {
    const className = `tou-preset-${config.value.preset}`
    document.documentElement.classList.add(className)
    onCleanup(() => document.documentElement.classList.remove(className))
  })

  watchEffect((onCleanup) => {
    const className = `tou-nav-${config.value.navigation}`
    document.documentElement.classList.add(className)
    onCleanup(() => document.documentElement.classList.remove(className))
  })

  watchEffect(() => {
    document.documentElement.style.setProperty('--tou-alpha', String(config.value.alpha))
    document.documentElement.style.setProperty('--tou-mini-slides-height', config.value.miniSlides.height)
    document.documentElement.style.setProperty('--tou-sidebar-width', config.value.sidebar.width)
  })

  return config
})
