<template>
    <span>
        <div v-if="type === 'claim'" class="btn claim">
            <span>{{ $t('tasks.daily.buttons.claim') }}</span>
        </div>

        <div v-if="type === 'claimed'" class="btn claimed">
            <span>{{ $t('tasks.daily.buttons.claimed') }}</span>
        </div>

        <div v-if="type === 'not-claim'" class="btn not-claim">
            <span>{{ $t('tasks.daily.buttons.claim') }}</span>
        </div>
    </span>
</template>

<script lang="ts">
export default {
    name: "DailyButton",
    props: {
        type: {
            type: String,
            required: true,
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

    border-radius: 40px;
    padding: 10px 5px;
    span{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        font-family: $font-primary;
        font-size: 8px;
        font-weight: 500;
        transition: all .3s ease;
        &::after{
            transition: all .3s ease;
        }
    }
    &.claim{
        background: $yellow;
        span {
            color: $black;
            
        }
    }
    &.claimed{
        background: $yellow;
        span {
            color: $black;
        }
    }
    &.not-claim{
        background: $gray;
        span {
            color: $black;
        }
    }
    
}


</style>
