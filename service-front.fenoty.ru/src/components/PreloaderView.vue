<template>
    
    <div id="first-screen">
        <div class="container">
            <div class="logo">
                <img src="@images/icons/logo.svg" alt="Logo">
            </div>
            <div class="preview">
                <div class="orange-gamepad">
                    <img
                        src="@images/game/orange-gamepad.png"
                        alt="Orange gamepad"
                    />
                </div>
                <div class="purple-gamepad">
                    <img
                        src="@images/game/purple-gamepad.png"
                        alt="Purple gamepad"
                    />
                </div>
                <Bubble
                    class="circle circle-90"
                    value="90"
                    :size="26"
                />
                <Bubble
                    class="circle circle-60"
                    value="60"
                    :size="82"
                />
                <Bubble
                    class="circle circle-50"
                    value="50"
                    :size="106"
                />
                <Bubble
                    class="circle circle-100"
                    value="100"
                    :size="26"
                />
                <Bubble
                    class="circle circle-80"
                    value="80"
                    :size="26"
                />
                <Bubble
                    class="circle circle-x2"
                    value="x2"
                    :size="50"
                />
            </div>
        </div>
    </div>
    

 
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { telegramUserStore, userStore } from "@stores/user";
import { authStore } from "@stores/auth";
import router from "@/router";

import Loader from "@components/loader/Loader.vue";
import { loaderStore } from '@stores/loader'
import Bubble from "@components/game/Bubble.vue";
import { state } from "@stores/wss";


export default {
    name: "AppRoute",
    components: {
        Loader,
        Bubble
    },
    setup() {},
    async created() {

    },
    computed: {

    },
    methods: {
        
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
#first-screen{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: $black;
    z-index: 99999;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    .logo{
        max-width: 100%;
        width: 100%;
        img{
            width: 100%;
            object-fit: contain;
        }
    }
    .preview {
        position: relative;
        min-height: 320px;
        width: 100%;
        .orange-gamepad {
            z-index: 3;
            position: absolute;
            bottom: 0px;
            left: 0;
            max-width: 200px;
            max-height: 200px;
            min-width: 200px;
            min-height: 200px;
            img {
                max-width: 200px;
                max-height: 200px;
                min-width: 200px;
                min-height: 200px;
                object-fit: contain;
            }
            @include keyframes(orangeGamepad) {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.2);
                    rotate: -20deg;
                }
                100% {
                    transform: scale(1);
                }
            }
            @include animate(orangeGamepad, 7s, ease-in-out, infinite);
        }
        .purple-gamepad {
            z-index: 2;
            position: absolute;
            top: 40px;
            right: 0;

            max-width: 200px;
            max-height: 200px;
            min-width: 200px;
            min-height: 200px;
            img {
                max-width: 200px;
                max-height: 200px;
                min-width: 200px;
                min-height: 200px;
                object-fit: contain;
            }
            @include keyframes(purpleGamepad) {
                0% {
                    rotate: 0deg;
                }
                25% {
                    rotate: 20deg;
                    transform: scale(1.1);
                }
                50% {
                    rotate: -10deg;
                    transform: scale(0.9);
                }
                75% {
                    rotate: 5deg;
                    transform: scale(1);
                }
                100% {
                    rotate: 0deg;
                }
            }
            @include animate(purpleGamepad, 15s, ease-in-out, infinite);
        }
        .circle {
            position: absolute;
            &-90 {
                top: 55px;
                left: 52%;

                rotate: -12deg;
                @include keyframes(circle90) {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                        rotate: 10deg;
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                @include animate(circle90, 6s, ease-in-out, infinite);
            }
            &-60 {
                top: 35px;
                right: 15px;

                rotate: 18deg;
                @include keyframes(circle90) {
                    0% {
                        transform: scale(1);
                    }
                    50% {
                        transform: scale(1.2);
                        rotate: -10deg;
                    }
                    100% {
                        transform: scale(1);
                    }
                }
                @include animate(circle90, 20s, ease-in-out, infinite);
            }
            &-50 {
                top: 90px;
                left: 20px;

                rotate: -16deg;
                @include keyframes(circle50) {
                    0% {
                        rotate: -16deg;
                    }
                    25% {
                        rotate: 10deg;
                    }
                    50% {
                        rotate: -16deg;
                    }
                }
                @include animate(circle50, 12s, ease-in-out, infinite);
            }
            &-100 {
                bottom: 35px;
                left: 20px;

                rotate: -37deg;
                @include keyframes(circle100) {
                    0% {
                        rotate: -37deg;
                    }
                    20% {
                        transform: scale(1.1);
                        rotate: 50deg;
                    }
                    50% {
                        transform: scale(0.9);
                    }
                    to {
                        rotate: -37deg;
                    }
                }
                @include animate(circle100, 17s, ease-in-out, infinite);
            }
            &-x2 {
                bottom: 20px;
                right: 70px;

                rotate: 17deg;
                @include keyframes(circlex2) {
                    from {
                        rotate: 17deg;
                    }
                    25% {
                        rotate: -17deg;
                    }
                    50% {
                        rotate: 25deg;
                        transform: scale(1.2);
                    }
                    75% {
                        rotate: 0deg;
                        transform: scale(1);
                    }
                    to {
                        rotate: 17deg;
                    }
                }
                @include animate(circlex2, 12s, ease-in-out, infinite);
            }
            &-80 {
                z-index: 2;
                bottom: 58px;
                right: 90px;

                rotate: 17deg;
                @include keyframes(circle80) {
                    from {
                        transform: scale(1);
                    }
                    20% {
                        rotate: -5deg;
                        transform: scale(1.5);
                    }
                    40% {
                        transform: scale(0.9);
                    }
                    75% {
                        transform: scale(1);
                    }
                    to {
                    }
                }
                @include animate(circle80, 12s, ease-in-out, infinite);
            }
        }
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}
</style>
