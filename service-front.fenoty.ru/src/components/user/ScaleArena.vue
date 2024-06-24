<template>
    <div class="scale">
        <div class="scale-info">
            <div class="score"><span ref="incrementAnimation">{{score}}</span>/{{level}}</div>
        </div>
        <div class="scale-line">
            <span :style="'left: -' + setPercent(score, level) + '%'"></span>
        </div>
    </div>
</template>

<script lang="ts">
import {incrementAnimation} from '@gsap/animation'

export default {
    name: "UserScaleArena",
    props: {
        score: {
            type: Number,
            required: true,
        },
        level: {
            type: Number,
            required: true,
        },
    },
    methods: {
        checkScoreColor(score: number, level: number){
            return score >= level
                ? 'rgba(255, 241, 0, 1)'
                : 'rgba(182, 182, 182, 1)'
        },
        setPercent(score: number, level: number){
            return score > level 
                ? 0
                : 100 - Math.trunc((score / level) * 100)
        },
    },
    data() {
        return {
            prevScore: 0,
        }
    },
    watch: {
        score(currNumber){
            this.prevScore = incrementAnimation(this.$refs.incrementAnimation, currNumber, this.prevScore, 0.5)
        }
    },
    mounted() {
        
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
.scale {
    display: flex;
    flex-direction: column;
    gap: 6px;
    &-info {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        align-items: flex-end;
        gap: 10px;
        .score {
            color: $white;
            font-family: $font-primary;
            font-size: 10px;
            font-weight: 400;
        }
        .star {
            width: fit-content;
            position: relative;
            width: 20px;
            height: 20px;

            display: flex;
            justify-content: center;
            align-items: flex-end;
            &.animate{
                @include keyframes(starMainScale) {
                    from {
                        scale: 1;
                    }
                    40% {
                        scale: 1.2;
                    }
                    60% {
                        scale: 0.8;
                    }
                    to{
                        scale: 1;
                    }
                }
                @include animate(starMainScale, 1s, ease-in-out, 1);
            }
            &-main {
                width: 15px;
                height: 15px;

                &.animate{

                    @include keyframes(starRotate) {
                        0% {
                            rotate: 0deg;
                        }
                        5%{
                            rotate: 10deg;
                        }
                        10%{
                            rotate: -10deg;
                        }
                        15%{
                            rotate: 10deg;
                        }
                        20%{
                            rotate: -5deg;
                        }
                        25%{
                            rotate: 3deg;
                        }
                        30%{
                            rotate: 0deg;
                        }       
                    }
                    @include animate(starRotate, 6s, ease-in-out, infinite);
                    animation-delay: 1000ms;
                }
            }
            &-left {
                position: absolute;
                top: 2px;
                left: 2px;
                width: 5px;
                height: 5px;

                &.animate{
                    @include keyframes(starLeft) {
                        5%{
                            top: 2px;
                            left: 2px;
                        }
                        15%{
                            rotate: 360deg;
                            top: 13px;
                            left: 10px;
                            scale: 0.5;
                        }
                        25%{
                            top: 2px;
                            left: 2px;
                            
                            rotate: 0deg;
                        }
                        27%{
                            scale: 1.4;
                        }
                        35%{
                            scale: 1;
                        }                  
                    }
                    @include animate(starLeft, 6s, ease-in-out, infinite);
                    animation-delay: 1500ms;
                }   
            }
            &-right {
                position: absolute;
                top: 2px;
                right: 2px;
                width: 4px;
                height: 4px;

                &.animate{
                    @include keyframes(starRight) {
                        5%{
                            top: 2px;
                            right: 2px;
                        }
                        15%{
                            rotate: -360deg;
                            top: 13px;
                            right: 10px;
                            scale: 0.5;
                        }
                        25%{
                            top: 0px;
                            right: 1px;
                            rotate: 0deg;
                        }
                        27%{
                            scale: 1.4;
                        }
                        32%{
                            top: 2px;
                            right: 2px;
                            scale: 1;
                        }
                    }
                    @include animate(starRight, 6s, ease-in-out, infinite);
                    animation-delay: 2000ms;
                }
            }
        }
    }
    &-line{
        width: 100%;
        height: 12px;
        background: $gray-dark;
        border-radius: 40px;
        overflow: hidden;
        position: relative;
        span{
            position: absolute;
            top: 0;
            left: 0%;
            height: 100%;
            width: 100%;

            background: $yellow;
            display: block;
            
            border-radius: inherit;
            transition: left .5s ease;
        }
    }
}
</style>
