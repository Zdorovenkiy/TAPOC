<script lang="ts">
declare const defaultColors: any;

export default {
  name: "NavElem",
  props: {
    type: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  methods: {
    setColor() {
      let color = defaultColors[this.color];
      return color;
    },
  },
  // computed: {
  //   setColor() {
  //     return defaultColors[props.setColor()]
  //   }
  // },
};
</script>

<template>
  <div class="nav-elem">
    <svg
      v-if="type == 'General'"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 16.2039C6 13.9155 6 12.7713 6.5192 11.8227C7.0384 10.8742 7.98695 10.2855 9.88403 9.10813L11.884 7.86687C13.8894 6.62229 14.8921 6 16 6C17.1079 6 18.1106 6.62229 20.116 7.86687L22.116 9.10812C24.0131 10.2855 24.9616 10.8742 25.4808 11.8227C26 12.7713 26 13.9155 26 16.2039V17.725C26 21.6258 26 23.5763 24.8284 24.7881C23.6569 26 21.7712 26 18 26H14C10.2288 26 8.34315 26 7.17157 24.7881C6 23.5763 6 21.6258 6 17.725V16.2039Z"
        :stroke="setColor()"
        stroke-width="1.5"
      />
      <path
        d="M13 20C13.8504 20.6303 14.8846 21 16 21C17.1154 21 18.1496 20.6303 19 20"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-if="type == 'Arena'"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.165 9.27922L14.6669 9.63443C15.0567 9.91029 15.5225 10.0584 16 10.0584C16.4776 10.0584 16.9434 9.91029 17.3332 9.63441L17.8351 9.27922C18.5514 8.77225 19.4074 8.5 20.2849 8.5H20.8974C21.3016 8.5 21.7099 8.52549 22.0908 8.66059C24.4735 9.50566 26.1125 12.595 25.994 19.6026C25.9701 21.0145 25.6397 22.575 24.3658 23.1842C23.9688 23.3741 23.5033 23.5 22.9733 23.5C22.3373 23.5 21.8322 23.3187 21.4424 23.0632C20.5285 22.4642 19.8588 21.4639 18.8888 20.9609C18.3048 20.6581 17.6566 20.5 16.9989 20.5H15.0011C14.3434 20.5 13.6952 20.6581 13.1112 20.9609C12.1412 21.4639 11.4715 22.4642 10.5576 23.0632C10.1678 23.3187 9.66273 23.5 9.02671 23.5C8.49667 23.5 8.03121 23.3741 7.63423 23.1842C6.3603 22.575 6.02992 21.0145 6.00604 19.6026C5.88749 12.595 7.52645 9.50566 9.90915 8.66059C10.2901 8.52549 10.6984 8.5 11.1026 8.5H11.715C12.5926 8.5 13.4486 8.77225 14.165 9.27922Z"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M11.5 13.5V16.5M10 15L13 15"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M23 14.75C23 15.1642 22.6642 15.5 22.25 15.5C21.8358 15.5 21.5 15.1642 21.5 14.75C21.5 14.3358 21.8358 14 22.25 14C22.6642 14 23 14.3358 23 14.75Z"
        :fill="setColor()"
      />
      <path
        d="M20 14.75C20 15.1642 19.6642 15.5 19.25 15.5C18.8358 15.5 18.5 15.1642 18.5 14.75C18.5 14.3358 18.8358 14 19.25 14C19.6642 14 20 14.3358 20 14.75Z"
        :fill="setColor()"
      />
      <path
        d="M20.75 12.5C21.1642 12.5 21.5 12.8358 21.5 13.25C21.5 13.6642 21.1642 14 20.75 14C20.3358 14 20 13.6642 20 13.25C20 12.8358 20.3358 12.5 20.75 12.5Z"
        :fill="setColor()"
      />
      <path
        d="M20.75 15.5C21.1642 15.5 21.5 15.8358 21.5 16.25C21.5 16.6642 21.1642 17 20.75 17C20.3358 17 20 16.6642 20 16.25C20 15.8358 20.3358 15.5 20.75 15.5Z"
        :fill="setColor()"
      />
    </svg>

    <svg
      v-if="type == 'Tasks'"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 16C6 11.286 6 8.92893 7.46447 7.46447C8.92893 6 11.286 6 16 6C20.714 6 23.0711 6 24.5355 7.46447C26 8.92893 26 11.286 26 16C26 20.714 26 23.0711 24.5355 24.5355C23.0711 26 20.714 26 16 26C11.286 26 8.92893 26 7.46447 24.5355C6 23.0711 6 20.714 6 16Z"
        :stroke="setColor()"
        stroke-width="1.5"
      />
      <path
        d="M10 19.8L11.1429 21L14 18"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 12.8L11.1429 14L14 11"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 13L22 13"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M17 20H22"
        :stroke="setColor()"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>

    <svg
      v-if="type == 'Friends'"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="15" cy="10" r="4" :stroke="setColor()" stroke-width="1.5" />
      <path
        d="M7 21.5C7 23.9853 7 26 15 26C20.6874 26 22.3315 24.9817 22.8068 23.5C22.8068 23.5 23 22.5 23 21.5C23 18.3 17.6667 17.1667 15 17C10.5817 17 7 19.0147 7 21.5Z"
        :stroke="setColor()"
        stroke-width="1.5"
      />
      <circle
        cx="21.5"
        cy="17.5"
        r="3.5"
        fill="#272727"
        :stroke="setColor()"
        stroke-width="1.5"
      />
      <path
        d="M21.5 16.5V18.5"
        :stroke="setColor()"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.5 17.5L22.5 17.5"
        :stroke="setColor()"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <span :style="'color:'+setColor()">{{ text }}</span>
  </div>
</template>

<style lang="scss">
.nav-elem {
  display: inherit;
  flex-direction: inherit;
  align-items: inherit;
  justify-content: inherit;

  span{
    font-family: $font-primary;
    font-size: 8px;
    font-weight: 500;
  }
  
  
}
</style>
