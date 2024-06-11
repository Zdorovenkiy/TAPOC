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
    <circle cx="15" cy="10" r="4" :stroke="color" stroke-width="1.5" />
    <path
      d="M7 21.5C7 23.9853 7 26 15 26C20.6874 26 22.3315 24.9817 22.8068 23.5C22.8068 23.5 23 22.5 23 21.5C23 18.3 17.6667 17.1667 15 17C10.5817 17 7 19.0147 7 21.5Z"
      :stroke="color"
      stroke-width="1.5"
    />
    <circle
      cx="21.5"
      cy="17.5"
      r="3.5"
      fill="#272727"
      :stroke="color"
      stroke-width="1.5"
    />
    <path
      d="M21.5 16.5V18.5"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M20.5 17.5L22.5 17.5"
      :stroke="color"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
