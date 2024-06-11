<script lang="ts">
declare const defaultColors: any

export default {
  props: {
    color: '',
  },
  data() {
    return {
      color: defaultColors[this.color],
    };
  }
}
</script>

<template>
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 16C6 11.286 6 8.92893 7.46447 7.46447C8.92893 6 11.286 6 16 6C20.714 6 23.0711 6 24.5355 7.46447C26 8.92893 26 11.286 26 16C26 20.714 26 23.0711 24.5355 24.5355C23.0711 26 20.714 26 16 26C11.286 26 8.92893 26 7.46447 24.5355C6 23.0711 6 20.714 6 16Z"
      :stroke="color"
      stroke-width="1.5"
    />
    <path
      d="M10 19.8L11.1429 21L14 18"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 12.8L11.1429 14L14 11"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17 13L22 13"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      d="M17 20H22"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
