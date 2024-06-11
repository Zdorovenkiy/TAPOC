<template>
    <div class="balance">
        <span>{{score}}</span>
        <img :src="tapac" alt="Tapac coin">
    </div>
</template>

<script lang="ts">
import Tapac from '@images/icons/tapac.svg'

export default {
    name: "UserBalance",
    props: {
        score: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            tapac: Tapac as string,
        };
    },
};
</script>

<style lang="scss" scoped>
.balance {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 9px;
    span{
        color: $yellow;
        font-family: $font-primary;
        font-size: 44px;
        font-weight: 700;
    }
    img{
        max-width:  33px;
        max-height: 33px;
        min-width:  33px;
        min-height: 33px;
    }
}
</style>
