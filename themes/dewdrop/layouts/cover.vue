<script setup lang="ts">
/**
 * cover layout — Title slide
 *
 * Matches Dewdrop's title-slide:
 * - Centered content, no margins
 * - Rounded neutralLight box containing title + subtitle in primary color
 * - Author, date, institution displayed below in smaller text
 * - No navigation, no footer
 */
import { useSlideContext } from '@slidev/client'

const { $slidev, $frontmatter } = useSlideContext()
</script>

<template>
  <div class="slidev-layout cover">
    <div class="cover-inner">
      <!-- Title box -->
      <div class="cover-title-box">
        <div class="cover-title">
          <slot name="title">
            {{ $slidev.configs.title }}
          </slot>
        </div>
        <div v-if="$frontmatter.subtitle" class="cover-subtitle">
          <slot name="subtitle">{{ $frontmatter.subtitle }}</slot>
        </div>
      </div>

      <!-- Meta info -->
      <div class="cover-meta">
        <div v-if="$frontmatter.author || $slidev.configs.author" class="cover-author">
          <slot name="author">{{ $frontmatter.author ?? $slidev.configs.author }}</slot>
        </div>
      </div>

      <!-- Extra content slot -->
      <div v-if="$slots.default" class="cover-extra">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
.slidev-layout.cover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 0;
  background: var(--slidev-theme-neutralLightest);

  .cover-inner {
    width: 100%;
    max-width: 100%;
    padding: 0em 4em;
    text-align: center;
    box-sizing: border-box;
  }

  .cover-title-box {
    background: var(--slidev-theme-neutralLight);
    border-radius: 0.2em;
    padding: 16px;
    margin-bottom: 1.5em;
  }

  .cover-title {
    font-size: 1.6em;
    font-weight: 500;
    color: var(--slidev-theme-primary);
    line-height: 1.3;
  }

  .cover-subtitle {
    font-size: 1em;
    color: var(--slidev-theme-primary);
    margin-top: 4px;
  }

  .cover-meta {
    font-size: 0.8em;
    color: var(--slidev-theme-neutralDarkest);
    display: flex;
    flex-direction: column;
    gap: 0.5em;
    align-items: center;
  }

  .cover-author {
    font-size: 1.2em;
    line-height: 1.4;
  }

  .cover-extra {
    margin-top: 1em;
    font-size: 0.8em;

    h1 {
      display: none;
    }
  }
}
</style>
