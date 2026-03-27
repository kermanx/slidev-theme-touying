import { configs, useSlideContext } from '@slidev/client'
import { computed, defineComponent, h, inject, InjectionKey, provide, Ref, ref, Transition, vShow, watch, withDirectives } from 'vue'

const NAVIGATION_HIDDEN_KEY = Symbol('navigation-hidden') as InjectionKey<Ref<boolean>>

export function useNavigationTransition(hidden: Ref<boolean>) {
  const { $nav } = useSlideContext()
  const name = computed(() => $nav.value.currentSlideRoute.meta.transition || configs.transition ? 'fade' : 'none')
  return defineComponent((_props, ctx) => {
    provide(NAVIGATION_HIDDEN_KEY, hidden)
    return () => withDirectives(h(Transition, { name: name.value }, ctx.slots.default), [[vShow, !hidden.value]])
  })
}

export function useNavigationCurrent() {
  const { $nav } = useSlideContext()
  const memorized = ref($nav.value.currentSlideNo)
  const hidden = inject(NAVIGATION_HIDDEN_KEY, null)
  if (!hidden) {
    return computed(() => $nav.value.currentSlideNo)
  }
  watch(() => $nav.value.currentSlideNo, async (no) => {
    if (!hidden.value)
      memorized.value = no
  })
  return memorized
}
