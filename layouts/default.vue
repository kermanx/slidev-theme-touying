<script setup lang="ts">
import { computed } from 'vue'
import { useTouyingConfig } from '../composables/useTouyingConfig'
import DewdropDefault from '../themes/dewdrop/layouts/default.vue'
import UniversityDefault from '../themes/university/layouts/default.vue'
import SimpleDefault from '../themes/simple/layouts/default.vue'

defineOptions({ inheritAttrs: false })
const config = useTouyingConfig()
const component = computed(() =>
  config.value.preset === 'university' ? UniversityDefault : config.value.preset === 'simple' ? SimpleDefault : DewdropDefault,
)
</script>

<template>
  <component :is="component" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
