<script setup lang="ts">
import { computed } from 'vue'
import { useTouyingConfig } from '../composables/useTouyingConfig'
import DewdropOutline from '../themes/dewdrop/layouts/outline.vue'

defineOptions({ inheritAttrs: false })
const config = useTouyingConfig()
// University has no dedicated outline layout; fall back to Dewdrop's.
const component = computed(() => DewdropOutline)
</script>

<template>
  <component :is="component" v-bind="$attrs">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </component>
</template>
