<template>
<div id="game">

    <div class="game-container">
        <ReturnButton v-if="gameStatus != 'play'" link="/arena" @click.stop="reloadUserData" padding="20px" class="black"/>

        
        <Transition name="game-fade">
            <div v-if="gameStatus === 'ready'" class="ready">
                <h6>{{ $t('game.ready.title') }}</h6>
                <p>
                    {{ $t('game.ready.text') }}
                    <br />
                    {{ $t('game.ready.textEnd') }}
                </p>

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

                <DefaultButton @click="startGame" class="start">{{ $t('game.buttons.startGame') }}</DefaultButton>
            </div>
        </Transition>

        <Transition name="game-fade">
            <div v-if="gameStatus === 'play'" class="play">
                <div v-if="beforeGame.countdown.status" class="countdown">
                    <span ref="countDownElement">{{beforeGame.countdown.name}}</span>
                </div>

                <Game :started="gameActivity" />
            </div>
        </Transition>
        <Transition name="game-fade">
            <div v-if="gameStatus === 'final'" class="final">
                <h6>{{ $t('game.final.title') }}</h6>
                <p>
                    {{ $t('game.final.text') }}
                </p>
                <div class="score">
                    <div class="score-title">{{ $t('game.final.result') }}</div>
                    <div class="score-result">
                        <span>{{score}}</span>
                        <TapacCoin/>
                    </div>
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
    
                </div>

                <DefaultButton @click="startAnotherGame" class="one_more">{{ $t('game.buttons.startAnotherGame') }}</DefaultButton>
            </div>
        </Transition>   
        
    </div>


    <transition name="fade">
        <div v-if="modal" class="modal">
            <div class="modal-bank">
                <CloseButton @click="modal = !modal" padding="12px"/>
                <h5>{{ $t('game.bankFull.title') }}</h5>
                <p>
                    {{ $t('game.bankFull.text') }}
                </p>
                <div class="safe">
                    <img src="@images/safe-no-bg.png" alt="Safe">
                </div>
                
                <DefaultButton @click="[modal = !modal]" link="/level-up" class="level_up tiny active">{{ $t('buttons.level_up') }}</DefaultButton>
            </div>
        </div>
    </transition>
</div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import DefaultButton from "@components/buttons/Default.vue";
import ReturnButton from "@components/buttons/ReturnButton.vue";
import CloseButton from "@components/buttons/CloseButton.vue";
import Bubble from "@components/game/Bubble.vue";
import TapacCoin from "@components/icons/iconTapac.vue";
import Game from "@components/game/Game.vue";
import gsap from "gsap";

import { gameStore } from "@stores/game";
import { userStore } from "@stores/user";



export default {
    name: "GameView",
    components: {
        DefaultButton,
        Bubble,
        TapacCoin,
        Game,
        ReturnButton,
        CloseButton,
    },
    data() {
        return {
            countdown: {
                name: 3 as any,
                final: "Игра" as string,
                status: true as boolean,
            },
            modal: false as boolean
        };
    },
    setup() {},
    computed: {
        ...mapState(gameStore, [
            "gameStatus",
            "score",
            "gameActivity",
            "beforeGame"
        ]),
        ...mapState(userStore, ["user",]),
    },
    methods: {
        ...mapActions(gameStore, ["toggleGame","setStatusGame","setActivity"]),
        ...mapActions(userStore, [
            "getUserData",
            "getLevelLimit",
        ]),
        startGame() {
            console.log(typeof this.user.balance);
            console.log(typeof this.user.levelLimit);
            
            if (this.user.balance >= this.user.levelLimit) {
                this.modal = true
            }
            else{
                this.setStatusGame("play");
                this.startCountdown();
            }
        },
        startAnotherGame() {
            if (this.user.balance >= this.user.levelLimit) {
                this.modal = true
            }
            else{
                this.setStatusGame("ready");
            }
        },
        scaleAnimation(scale: number) {
            gsap.fromTo(
                this.$refs.countDownElement as any,
                {
                    scale: 1,
                    duration: 1,
                    force3D: false,
                },
                {
                    scale: scale,
                    duration: 1,
                    force3D: false,
                }
            );
        },
        startCountdown() {
            setTimeout(() => {
                this.scaleAnimation(5);
                const intervalCountdown = setInterval(() => {
                    if (this.beforeGame.countdown.name == 1) {
                        this.beforeGame.countdown.name = this.beforeGame.countdown.final;
                        this.scaleAnimation(2.5);
                    } else {
                        this.beforeGame.countdown.name--;
                        this.scaleAnimation(5);
                    }
                }, 1000);

                setTimeout(() => {
                    clearInterval(intervalCountdown);
                    this.beforeGame.countdown.status = false;
                    this.setActivity(true)
                }, 4000);
            }, 300);
        },

        async reloadUserData(){
            this.toggleGame()

            await this.getUserData(this.user.tg_id)

            await this.$nextTick();

            await this.getLevelLimit(this.user.tg_id)


        }

    },
    watch: {},
    mounted() {
        // this.startGame()
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


#game {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 9999;
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: flex-end;
    background: $gray-dark;
    .game-container {
        height: auto;
        max-width: 375px;
        margin: 0 auto;
        padding: 0;

        background: $gray-dark;
        position: relative;
        width: 100%;

        padding: 16px;
        height: 100%;
    }
    .ready {
        margin-top: 60px;
        margin-bottom: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        position: absolute;
        padding: inherit;
        top: 0;
        left: 0;
        width: 100%;
        h6 {
            font-family: $font-primary;
            font-weight: 600;
            font-size: 24px;
            color: $white;

            text-align: center;
        }
        p {
            max-width: 80%;
            font-family: $font-primary;
            font-weight: 400;
            font-size: 14px;
            color: $white;

            text-align: center;
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
    .play {
        margin-top: 40px;

        display: flex;
        flex-direction: column;
        align-items: center;

        //position: relative;
        position: absolute;
        padding: inherit;
        top: 0;
        left: 0;
        width: 100%;
        .countdown {
            position: absolute;
            z-index: 3;
            background: $gray-dark;
            border-radius: 10px;
            width: 100%;
            height: 100%;

            color: $black;

            display: flex;
            justify-content: center;
            align-items: center;
            span {
                font-family: $font-primary;
                font-weight: 700;
                font-size: 50px;
                color: $yellow;
            }
        }
    }
    .final {
        margin-top: 60px;
        margin-bottom: 20px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;

        position: absolute;
        padding: inherit;
        top: 0;
        left: 0;
        width: 100%;
        h6 {
            font-family: $font-primary;
            font-weight: 600;
            font-size: 24px;
            color: $white;

            text-align: center;
        }
        p {
            max-width: 80%;
            font-family: $font-primary;
            font-weight: 400;
            font-size: 14px;
            color: $white;

            text-align: center;
        }
        .score{
            margin-top: 12px;
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 8px;
            font-family: $font-primary;
            color: $yellow;
            font-size: 24px;
            flex-wrap: wrap;
            justify-content: center;
            &-title{
                font-weight: 500;
            }
            &-result{
                display: flex;
                flex-direction: row;
                align-items: center;
                gap: 4px;
                span{
                    font-weight: 700;
                }
                svg{
                    max-width: 22px;
                    max-height: 22px;
                    min-width: 22px;
                    min-height: 22px;
                }
            }
        }
        .preview {
            position: relative;
            min-height: 290px;
            width: 100%;
            .orange-gamepad {
                z-index: 3;
                position: absolute;
                bottom: -20px;
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
            }
        }
    }
}


.modal{
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    &-bank{
        position: relative;
        width: 100%;
        max-width: 277px;
        background: $gray-dark;
        border-radius: 15px;
        padding: 44px 32px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 16px;
        font-family: $font-primary;
        font-weight: 500;
        h5{
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: $white;

        }
        p{
            text-align: center;
            font-weight: 400;
            font-size: 12px;
            color: $white;

        }
        .safe{
            position: relative;
            max-width:  132px;
            max-height: 132px;
            min-width:  132px;
            min-height: 132px;
            width: 100%;
            &::before{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                content: '';
                display: block;
        
                background-image: url('@images/safe-shadow.png');
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;
        
                max-width:  200px;
                max-height: 200px;
                min-width:  200px;
                min-height: 200px;
            }
            img{
                max-width:  inherit;
                max-height: inherit;
                min-width:  inherit;
                min-height: inherit;
                object-fit: contain;
            }
        }

    }
}




.game-fade-enter-active,
.game-fade-leave-active {
    transition: all 0.5s ease;
    position: absolute;
}

.game-fade-enter-from,
.game-fade-leave-to {
    //transform: translateX(100px);
    opacity: 0;
}
.game-fade-enter-to,
.game-fade-leave-from {
    //transform: translateX(0px);
    opacity: 1;
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


// .game-enter-active,
// .game-leave-active {
//     transition: all 0.3s ease;
// }
// 
// .game-enter-from,
// .game-leave-to {
//     opacity: 0;
//     transform: translateY(100%);
// }
// .game-enter-to,
// .game-leave-from {
//     opacity: 1;
//     transform: translateY(0%);
// }
</style>
