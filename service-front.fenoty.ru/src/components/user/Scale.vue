<template>
    <div class="scale">
        <div class="scale-info">
            <div class="score"><span ref="incrementAnimation">{{score}}</span>/{{level}}</div>
            <div class="star" :class="score >= level && 'animate'">
                <svg
                    class="star-main"
                    :class="score >= level && 'animate'"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M5.4002 2.58224C6.29741 0.972724 6.74601 0.167969 7.41671 0.167969C8.0874 0.167969 8.53601 0.972724 9.43322 2.58223L9.66534 2.99863C9.92029 3.45601 10.0478 3.68469 10.2465 3.83558C10.4453 3.98647 10.6929 4.04248 11.188 4.1545L11.6387 4.25649C13.381 4.6507 14.2521 4.8478 14.4594 5.51428C14.6666 6.18076 14.0727 6.87523 12.885 8.26416L12.5777 8.6235C12.2402 9.01819 12.0714 9.21554 11.9955 9.45968C11.9196 9.70383 11.9451 9.96713 11.9961 10.4937L12.0426 10.9732C12.2221 12.8263 12.3119 13.7529 11.7693 14.1648C11.2267 14.5767 10.4111 14.2011 8.77977 13.45L8.35774 13.2557C7.89418 13.0423 7.6624 12.9356 7.41671 12.9356C7.17102 12.9356 6.93924 13.0423 6.47568 13.2557L6.05364 13.45C4.42235 14.2011 3.60671 14.5767 3.0641 14.1648C2.5215 13.7529 2.61129 12.8263 2.79086 10.9732L2.83732 10.4937C2.88835 9.96713 2.91387 9.70383 2.83794 9.45968C2.76202 9.21554 2.59326 9.01819 2.25573 8.6235L1.94844 8.26417C0.760675 6.87523 0.166791 6.18076 0.374047 5.51428C0.581303 4.8478 1.45244 4.6507 3.19471 4.25649L3.64546 4.1545C4.14056 4.04248 4.38811 3.98647 4.58688 3.83558C4.78564 3.68469 4.91312 3.45601 5.16808 2.99863L5.4002 2.58224Z"
                        :fill="checkScoreColor(score, level)"
                    />
                </svg>

                <svg
                    class="star-left"
                    :class="score >= level && 'animate'"
                    viewBox="0 0 5 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.49155 0C2.49155 0 2.7315 1.21476 3.25757 1.73729C3.78364 2.25982 5 2.49156 5 2.49156C5 2.49156 3.78524 2.7315 3.26271 3.25757C2.74018 3.78364 2.50845 5 2.50845 5C2.50845 5 2.2685 3.78524 1.74243 3.26271C1.21636 2.74018 0 2.50845 0 2.50845C0 2.50845 1.21476 2.2685 1.73729 1.74243C2.25982 1.21636 2.49155 0 2.49155 0Z"
                        :fill="checkScoreColor(score, level)"
                    />
                </svg>

                <svg
                    class="star-right"
                    :class="score >= level && 'animate'"
                    viewBox="0 0 4 4"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M1 2.16536H2.66667M1.83333 2.9987L1.83333 1.33203"
                        :stroke="checkScoreColor(score, level)"
                        stroke-width="1.5"
                        stroke-linecap="round"
                    />
                </svg>
            </div>
        </div>
        <div class="scale-line">
            <span :style="'left: -' + setPercent(score, level) + '%'"></span>
        </div>
    </div>
</template>

<script lang="ts">
import {incrementAnimation} from '@gsap/animation'

export default {
    name: "UserScale",
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
        justify-content: space-between;
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
