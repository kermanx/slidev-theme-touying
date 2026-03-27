<script setup lang="ts">
import { computed } from 'vue'
import { useTouyingConfig } from './composables/useTouyingConfig'
import DewdropLayer from './themes/dewdrop/global-layer.vue'
import SimpleLayer from './themes/simple/global-layer.vue'
import UniversityLayer from './themes/university/global-layer.vue'
defineOptions({ inheritAttrs: false })
const config = useTouyingConfig()
const component = computed(() => {
  if (config.value.preset === 'dewdrop') return DewdropLayer
  if (config.value.preset === 'simple') return SimpleLayer
  if (config.value.preset === 'university') return UniversityLayer
  throw new Error(`Unknown preset: ${config.value.preset}`)
})
</script>

<template>
  <component :is="component" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
