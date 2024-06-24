<template>
    <RouterLink v-if="link" :to="link" class="btn">
        <span><slot></slot></span>
    </RouterLink>

    <button v-else class="btn">
        <span><slot></slot></span>
        <span class="score" v-if="score">{{score}}</span>
    </button>
</template>

<script lang="ts">
export default {
    name: "DefaultButton",
    props: {
        link: {
            type: String,
            required: false,
        },
        score: {
            type: Number,
            required: false,
        },
        width: {
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
    max-width: 100%;
    transition: all .3s ease;
    border: none;
    z-index: 2;
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
    &.start{
        background: $yellow;
        border-radius: 50px;
        padding: 14px 5px;
        max-width: 207px;
        z-index: 5;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
        }
    }
    &.one_more{
        background: $yellow;
        border-radius: 50px;
        padding: 14px 5px;
        max-width: 242px;
        z-index: 5;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
        }
    }
    &.start_earn{
        background: $yellow;
        border-radius: 50px;
        padding: 14px 5px;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
            &::after {
                content: "";
                display: block;
    
                background-image: url("@images/icons/wallet.svg");
                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
    
                width: 24px;
                height: 24px;
            }
        }
        &.tiny{
            padding: 10px 5px;
            span{
                gap: 6px;
                font-size: 12px;
                &::after {
                    width: 18px;
                    height: 18px;
                }
            }
        }
        &.small{
            padding: 10px 5px;
            span{
                gap: 8px;
                font-size: 10px;
                &::after {
                    width: 18px;
                    height: 18px;
                }
            }
        }
    }
    &.level_up{
        background: $gray-dark;
        border-radius: 50px;
        padding: 14px 5px;
        span {
            color: $white;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
            &::after {
                content: "";
                display: block;

                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
    
                width: 24px;
                height: 24px;
            }
            
            
        }
        &.tiny{
            padding: 10px 5px;
            span{
                gap: 6px;
                font-size: 12px;
                &::after {
                    width: 18px;
                    height: 18px;
                }
            }
        }
        &.active{
            background: $yellow;
            span{
                color: $black;
                &::after{
                    background-image: url("@images/icons/black-level_up.svg");
                }
            }
        }
        &.disabled{
            span{
                &::after{
                    background-image: url("@images/icons/white-level_up.svg");
                }
            }        
        }
        &.small{
            padding: 10px 5px;
            span{
                gap: 8px;
                font-size: 10px;
                &::after {
                    width: 18px;
                    height: 18px;
                }
                
            }
        }
    }
    &.start_game{
        background: $gray-dark;
        border-radius: 50px;
        padding: 14px 5px;
        span {
            color: $white;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
            &::after {
                content: "";
                display: block;

                background-position: center;
                background-repeat: no-repeat;
                background-size: contain;
    
                width: 24px;
                height: 24px;
            }
            
            
        }
        &.active{
            background: $yellow;
            span{
                color: $black;
                &::after{
                    background-image: url("@images/icons/black-gamepad.svg");
                }
            }
        }
        &.disabled{
            span{
                &::after{
                    background-image: url("@images/icons/white-gamepad.svg");
                }
            }        
        }
        &.small{
            padding: 10px 5px;
            span{
                gap: 8px;
                font-size: 10px;
                &::after {
                    width: 18px;
                    height: 18px;
                }
                
            }
        }
    }
    &.claim{
        background: $gray;
        border-radius: 50px;
        padding: 10px 5px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 8px;
        max-width: fit-content;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
            width: fit-content;   
            &.score{
                font-weight: 600;
            }    
        }
        &.active{
            background: $yellow;
            span{
                color: $black;
            }
        }
        &.disabled{
            background: $gray;
            span{
                color: $black;
            }
        }
        &.small{
            padding: 10px 16px;
            span{
                font-size: 10px;     
            }
        }
    }
    &.default {
        background: $yellow;
        border-radius: 50px;
        padding: 18px 5px;
        max-height: 52px;
        span {
            color: $black;
            font-family: $font-primary;
            font-size: 14px;
            font-weight: 500;
        }
        &.tiny{
            padding: 10px 5px;
            span{
                gap: 6px;
                font-size: 12px;
            }
        }
        &.small{
            padding: 10px 5px;
            span{
                font-size: 10px;     
            }
        }
        &.max-width{
            max-width: v-bind(width);
        }
    }
}


</style>
