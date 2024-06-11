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
      d="M6 16.2039C6 13.9155 6 12.7713 6.5192 11.8227C7.0384 10.8742 7.98695 10.2855 9.88403 9.10813L11.884 7.86687C13.8894 6.62229 14.8921 6 16 6C17.1079 6 18.1106 6.62229 20.116 7.86687L22.116 9.10812C24.0131 10.2855 24.9616 10.8742 25.4808 11.8227C26 12.7713 26 13.9155 26 16.2039V17.725C26 21.6258 26 23.5763 24.8284 24.7881C23.6569 26 21.7712 26 18 26H14C10.2288 26 8.34315 26 7.17157 24.7881C6 23.5763 6 21.6258 6 17.725V16.2039Z"
      :stroke="color"
      stroke-width="1.5"
    />
    <path
      d="M13 20C13.8504 20.6303 14.8846 21 16 21C17.1154 21 18.1496 20.6303 19 20"
      :stroke="color"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
</template>
