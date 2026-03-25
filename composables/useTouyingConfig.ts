import { computed, watch, watchEffect } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useNav } from '@slidev/client'

// ---- Types ----------------------------------------------------------------

/** Non-CSS configuration read from frontmatter `touying:` */
export interface TouyingConfig {
  preset: string
  navigation: 'sidebar' | 'mini-slides' | 'none'
  footer: string
  footerRight: string
  outlineRowsPerCol: number
}

// ---- Defaults & maps -------------------------------------------------------

const DEFAULTS: TouyingConfig = {
  preset: 'dewdrop',
  navigation: 'mini-slides',
  footer: '',
  footerRight: '',
  outlineRowsPerCol: 12,
}

// ---- Shared composable -----------------------------------------------------

export const useTouyingConfig = createSharedComposable(() => {
  const { slides } = useNav()

  /** Non-CSS config from headmatter `touying:` */
  const config = computed<TouyingConfig>(() => {
    const first = slides.value?.[0]
    const touying = first?.meta?.slide?.frontmatter?.touying ?? {}
    return { ...DEFAULTS, ...touying }
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

  return config
})
