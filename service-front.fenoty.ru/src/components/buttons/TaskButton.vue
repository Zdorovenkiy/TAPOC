<template>

    <a v-if="type === 'perform' && link" :href="link" class="btn perform">
        <span>{{ $t('tasks.missions.buttons.perform') }}</span>
    </a>
    <div v-else-if="type === 'perform'" class="btn perform">
        <span>{{ $t('tasks.missions.buttons.perform') }}</span>
    </div>

    <div v-if="type === 'done'" class="btn done">
        <span>{{ $t('tasks.missions.buttons.complete') }}</span>
    </div>

    <div v-if="type === 'entered'" class="btn entered">
        <span>{{ $t('tasks.missions.buttons.entered') }}</span>
    </div>

</template>

<script lang="ts">
export default {
    name: "TaskButton",
    props: {
        type: {
            type: String,
            required: true,
        },
        link: {
            type: String,
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
    max-width: 74px;
    transition: all .3s ease;

    border-radius: 40px;
    padding: 10px 5px;
    span{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;

        font-size: 8px;
        font-weight: 500;
        font-family: $font-primary;
        transition: all .3s ease;
        &::after{
            transition: all .3s ease;
        }
    }
    &.done, &.entered{
        background: $yellow;
        span {
            font-weight: 600;
            color: $black;
        }
    }
    &.perform{
        background: $white;
        span {
            color: $black;
            
        }
    }
    
}


</style>
