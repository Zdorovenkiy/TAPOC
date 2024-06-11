<template>
    <div class="scale">
        <div class="scale-info">
            <div class="score">{{score}}/{{level}}</div>
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
            <!-- <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M8.4002 6.58224C9.29741 4.97272 9.74601 4.16797 10.4167 4.16797C11.0874 4.16797 11.536 4.97272 12.4332 6.58223L12.6653 6.99863C12.9203 7.45601 13.0478 7.68469 13.2465 7.83558C13.4453 7.98647 13.6929 8.04248 14.188 8.1545L14.6387 8.25649C16.381 8.6507 17.2521 8.8478 17.4594 9.51428C17.6666 10.1808 17.0727 10.8752 15.885 12.2642L15.5777 12.6235C15.2402 13.0182 15.0714 13.2155 14.9955 13.4597C14.9196 13.7038 14.9451 13.9671 14.9961 14.4937L15.0426 14.9732C15.2221 16.8263 15.3119 17.7529 14.7693 18.1648C14.2267 18.5767 13.4111 18.2011 11.7798 17.45L11.3577 17.2557C10.8942 17.0423 10.6624 16.9356 10.4167 16.9356C10.171 16.9356 9.93924 17.0423 9.47568 17.2557L9.05364 17.45C7.42235 18.2011 6.60671 18.5767 6.0641 18.1648C5.5215 17.7529 5.61129 16.8263 5.79086 14.9732L5.83732 14.4937C5.88835 13.9671 5.91387 13.7038 5.83794 13.4597C5.76202 13.2155 5.59326 13.0182 5.25573 12.6235L4.94844 12.2642C3.76068 10.8752 3.16679 10.1808 3.37405 9.51428C3.5813 8.8478 4.45244 8.6507 6.19471 8.25649L6.64546 8.1545C7.14056 8.04248 7.38811 7.98647 7.58688 7.83558C7.78564 7.68469 7.91312 7.45601 8.16808 6.99863L8.4002 6.58224Z"
                    fill="#B6B6B6"
                />
                <path
                    d="M4.49155 2C4.49155 2 4.7315 3.21476 5.25757 3.73729C5.78364 4.25982 7 4.49156 7 4.49156C7 4.49156 5.78524 4.7315 5.26271 5.25757C4.74018 5.78364 4.50845 7 4.50845 7C4.50845 7 4.2685 5.78524 3.74243 5.26271C3.21636 4.74018 2 4.50845 2 4.50845C2 4.50845 3.21476 4.2685 3.73729 3.74243C4.25982 3.21636 4.49155 2 4.49155 2Z"
                    fill="#B6B6B6"
                />
                <path
                    d="M15 4.16536H16.6667M15.8333 4.9987L15.8333 3.33203"
                    stroke="#B6B6B6"
                    stroke-width="1.5"
                    stroke-linecap="round"
                />
            </svg> -->
        </div>
        <div class="scale-line">
            <span :style="'left: -' + setPercent(score, level) + '%'"></span>
        </div>
    </div>
</template>

<script lang="ts">
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
