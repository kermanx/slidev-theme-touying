<script setup lang="ts">
import { computed } from 'vue'
import { useTouyingConfig } from '../composables/useTouyingConfig'
import DewdropFocus from '../themes/dewdrop/layouts/focus.vue'
import UniversityFocus from '../themes/university/layouts/focus.vue'

defineOptions({ inheritAttrs: false })
const config = useTouyingConfig()
const component = computed(() =>
  config.value.preset === 'university' ? UniversityFocus : DewdropFocus,
)
</script>

<template>
  <component :is="component" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
