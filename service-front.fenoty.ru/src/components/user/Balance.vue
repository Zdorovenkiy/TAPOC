<template>
    <div class="balance">
        <TapacCoin/>
        <span ref="incrementAnimation">{{score}}</span>
    </div>
</template>

<script lang="ts">
import TapacCoin from '@components/icons/iconTapac.vue'
import {incrementAnimation} from '@gsap/animation'

export default {
    name: "UserBalance",
    components: {
        TapacCoin,
    },
    props: {
        score: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            prevScore: 0,
        };
    },
    watch: {
        score(currNumber){
            this.prevScore = incrementAnimation(this.$refs.incrementAnimation, currNumber, this.prevScore, 1.5)
        }
    },
    mounted() {
        
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
        text-align: left;
    }
    svg{
        max-width:  33px;
        max-height: 33px;
        min-width:  33px;
        min-height: 33px;
    }
}
</style>
