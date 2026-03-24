<script setup lang="ts">
import { computed } from 'vue'
import { useTouyingConfig } from '../composables/useTouyingConfig'
import DewdropCover from '../themes/dewdrop/layouts/cover.vue'
import UniversityCover from '../themes/university/layouts/cover.vue'

defineOptions({ inheritAttrs: false })
const config = useTouyingConfig()
const component = computed(() =>
  config.value.preset === 'university' ? UniversityCover : DewdropCover,
)
</script>

<template>
  <component :is="component" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
