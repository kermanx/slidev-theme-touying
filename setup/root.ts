import { defineRootSetup } from '@slidev/types'
import { useTouyingConfig } from '../composables/useTouyingConfig'

export default defineRootSetup(() => {
  useTouyingConfig()
})
