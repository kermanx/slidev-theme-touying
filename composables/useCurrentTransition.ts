import { configs, useSlideContext } from '@slidev/client'
import { computed, watchEffect } from 'vue'

export function useCurrentTransition() {
  const { $nav } = useSlideContext()
  watchEffect(() => {
    console.log('Current transition:', $nav.value.currentSlideRoute.meta.transition,configs.transition)
  })
  return computed(() => $nav.value.currentSlideRoute.meta.transition || configs.transition ? 'fade' : 'none')
}
