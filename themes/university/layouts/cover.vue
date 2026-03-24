<script setup lang="ts">
/**
 * University cover slide.
 *
 * Typst reference: title-slide in university.typ
 * - Plain white background
 * - Logo placed top-right
 * - Centered: large bold title, subtitle, authors (grid of 3), institution, date
 */
import { useTouyingConfig } from '../../../composables/useTouyingConfig'

useTouyingConfig()
</script>

<template>
  <div class="slidev-layout cover uni-cover">
    <!-- Logo top-right -->
    <div v-if="$frontmatter.logo" class="uni-cover-logo">
      {{ $frontmatter.logo }}
    </div>

    <div class="uni-cover-inner">
      <!-- Title -->
      <div class="uni-cover-title">
        <slot name="title">{{ $slidev.configs.title }}</slot>
      </div>

      <!-- Subtitle -->
      <div v-if="$frontmatter.subtitle" class="uni-cover-subtitle">
        <slot name="subtitle">{{ $frontmatter.subtitle }}</slot>
      </div>

      <!-- Authors -->
      <div class="uni-cover-authors">
        <slot name="author">{{ $frontmatter.author ?? $slidev.configs.author }}</slot>
      </div>

      <!-- Institution -->
      <div v-if="$frontmatter.institution" class="uni-cover-institution">
        <slot name="institution">{{ $frontmatter.institution }}</slot>
      </div>

      <!-- Date -->
      <div v-if="$frontmatter.date" class="uni-cover-date">
        <slot name="date">{{ $frontmatter.date }}</slot>
      </div>
    </div>
  </div>
</template>
