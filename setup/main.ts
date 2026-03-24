import { defineAppSetup } from '@slidev/types'
import { useTouyingConfig } from '../composables/useTouyingConfig'

export default defineAppSetup(() => {
  useTouyingConfig()
})
