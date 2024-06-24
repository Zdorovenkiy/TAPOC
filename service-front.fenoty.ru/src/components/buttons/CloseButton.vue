<template>
    <button class="close"></button>
</template>

<script lang="ts">
export default {
    name: "CloseButton",
    props: {
        padding: {
            type: String,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
.close {
    all: initial;
    display: block;
    cursor: pointer;
    z-index: 2;
    position: absolute;
    top: v-bind(padding);
    right: v-bind(padding);

    background-image: url("@images/icons/close.svg");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;

    width: 22px;
    height: 22px;
}


</style>
