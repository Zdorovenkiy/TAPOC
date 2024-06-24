<template>
    <RouterLink :to="link" class="return" />
</template>

<script lang="ts">
export default {
    name: "ReturnButton",
    props: {
        link: {
            type: String,
            required: true,
        },
        padding: {
            type: String,
            required: true,
        },
    },
};
</script>


<style lang="scss" scoped>
.return {
    all: initial;
    display: block;
    cursor: pointer;
    z-index: 2;
    position: absolute;
    top: v-bind(padding);
    left: v-bind(padding);

    display: flex;
    justify-content: center;
    align-items: center;

    background: $black;
    max-width:  32px;
    max-height: 32px;
    min-width:  32px;
    min-height: 32px;
    border-radius: 5px;
    transition: background 0.2s ease;
    &.black{
        background: $black;
    }
    &.gray{
        background: $gray-dark;
    }
    &:active{
        opacity: 0.7;
    }
    &::before{
        content: '';
        display: block;

        background-image: url("@images/icons/return.svg");
        background-position: 45% 50%;
        background-repeat: no-repeat;
        background-size: 30%;
    
        max-width:  inherit;
        max-height: inherit;
        min-width:  inherit;
        min-height: inherit;
    }
}


</style>
