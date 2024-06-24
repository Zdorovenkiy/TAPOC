<template>

    <div 
        class="bubble" 
        :class="`size-${size}`"
        :style="top != -1 && left != -1
        ? {
            'position': 'absolute',
            'top': top+'px',
            'left': left+'px',
        }
        : {}
        "
    >
        <span>{{value}}</span>
    </div>

</template>

<script lang="ts">
export default {
    name: "Bubble",
    props: {
        value: {
            required: true,
        },
        size: {
            type: Number,
            required: true,
        },
        top: {
            type: Number,
            required: false,
        },
        left: {
            type: Number,
            required: false,
        },
    },

};
</script>


<style lang="scss" scoped>

@mixin animate($animation, $duration, $method, $times) {
    animation: $animation $duration $method $times;
}
@mixin keyframes($name) {
    @keyframes #{$name} {
        @content;
    }
}

.bubble{
    background: $gray-dark;
    border-radius: 50%;
    border: 1.5px solid $yellow;
    box-shadow: inset 0px 0px 10px 3px rgba(255, 241, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;

    span{
        font-family: $font-primary;
        
        font-weight: 600;
        color: $yellow;
    }

    &.size-26{
        height: 26px;
        width: 26px;
        box-shadow: inset 0px 0px 3px 1px rgba(255, 241, 0, 0.2);
        border: 1.5px solid $yellow;
        span{
            font-size: 10px;
        }
    }
    &.size-50{
        height: 50px;
        width:  50px;
        box-shadow: inset 0px 0px 3px 1px rgba(255, 241, 0, 0.2);
        border: 1.5px solid $yellow;
        span{
            font-size: 16px;
        }
    }
    &.size-66{
        height: 66px;
        width:  66px;
        box-shadow: inset 0px 0px 7px 1px rgba(255, 241, 0, 0.2);
        border: 1.5px solid $yellow;
        span{
            font-size: 22px;
        }
    }
    &.size-82{
        height: 82px;
        width:  82px;
        box-shadow: inset 0px 0px 8px 3px rgba(255, 241, 0, 0.2);
        border: 1.5px solid $yellow;
        span{
            font-size: 32px;
        }
    }
    &.size-106{
        height: 106px;
        width:  106px;
        box-shadow: inset 0px 0px 10px 3px rgba(255, 241, 0, 0.2);
        border: 2px solid $yellow;
        span{
            font-size: 42px;
        }
    }

    
}

</style>
