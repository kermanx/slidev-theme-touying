<template>
  <div class="slidev-layout focus">
    <div>
      <slot />
    </div>
  </div>
</template>

<style>
.tou-preset-simple .slidev-layout.focus {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2em;
  box-sizing: border-box;
  text-align: center;
  background: var(--slidev-theme-primary) !important;
  font-size: calc(1.5 * 25px);
  color: var(--slidev-theme-neutralLightest) !important;

  & > p, & > h1 {
    width: 100%;
  }
}
</style>
