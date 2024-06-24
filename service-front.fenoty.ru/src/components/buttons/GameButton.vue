<template>
    <div>
        <div v-if="type === 'claim'" class="btn claim">
            <span>{{ $t('arena.buttons.claim') }}</span>
            <span class="score" v-if="score">{{score}}</span>
        </div>

        <div v-if="type === 'running'" class="btn running">
            <span>{{ $t('arena.buttons.running') }}</span>
        </div>

        <div v-if="type === 'defeat'" class="btn defeat">
            <span>{{ $t('arena.buttons.defeat') }}</span>
        </div>

        <div v-if="type === 'claimed'" class="btn claimed">
            <span>{{ $t('arena.buttons.claimed') }}</span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: "GameButton",
    props: {
        type: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: false,
        },
    },
};
</script>


<style lang="scss" scoped>
.btn{
    cursor: pointer;
    display: block;
    width: 100%;
    max-width: 100%;
    transition: all .3s ease;

    border-radius: 58px;
    padding: 10px 5px;
    span{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        transition: all .3s ease;
        &::after{
            transition: all .3s ease;
        }
    }
    &.claim{
        background: $yellow;

        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 4px;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 10px;
            font-weight: 500;
            width: fit-content;
            &.score{
                font-weight: 600;
            }
        }
    }
    &.running{
        background: $gray;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 10px;
            font-weight: 500;
        }
    }
    &.defeat{
        background: $black;
        span {
            color: $white;
            font-family: $font-primary;
            font-size: 10px;
            font-weight: 500;
        }
    }
    &.claimed{
        background: $gray-light;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 10px;
            font-weight: 500;
        }
    }
}


</style>
