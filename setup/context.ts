import { computed, watchEffect } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { useNav } from '@slidev/client'

// ---- Types ----------------------------------------------------------------

/** Non-CSS configuration read from frontmatter `touying:` */
export interface TouConfig {
  preset: string
  navigation: 'sidebar' | 'mini-slides' | 'none'
  footer: string
  footerRight: string
}

// ---- Defaults & maps -------------------------------------------------------

const DEFAULTS: TouConfig = {
  preset: 'dewdrop',
  navigation: 'sidebar',
  footer: '',
  footerRight: '',
}

// ---- Shared composable -----------------------------------------------------

export const useTouyingConfig = createSharedComposable(() => {
  const { slides } = useNav()

  /** Non-CSS config from headmatter `touying:` */
  const config = computed<TouConfig>(() => {
    const first = slides.value?.[0]
    const touying = first?.meta?.slide?.frontmatter?.touying ?? {}
    return { ...DEFAULTS, ...touying }
  })

  watchEffect(() => {
    const nav = config.value.navigation
    document.documentElement.classList.toggle('tou-nav-sidebar', nav === 'sidebar')
    document.documentElement.classList.toggle('tou-nav-mini-slides', nav === 'mini-slides')
    document.documentElement.classList.toggle('tou-nav-none', nav === 'none')
  })

  return config
})
