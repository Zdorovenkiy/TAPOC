<template>
<div>
    <div v-if="welcomeStatus == 'welcome'" class="welcome">
        <div class="logo">
            <img alt="Logo" :src="Logo" />
        </div>
        <div class="content">
            <h1 class="title">{{ $t('welcome.title') }}</h1>
            <p>
                {{ $t('welcome.text') }}
            </p>
        </div>
        <!-- <DefaultButton link="/select-team" class="start_earn">{{ $t('buttons.start_earn') }}</DefaultButton> -->
        <DefaultButton @click="welcomeStatus = 'slider'" class="start_earn">{{ $t('buttons.start_earn') }}</DefaultButton>
    </div>

    <div v-if="welcomeStatus == 'slider'" class="welcome-slider">
        <swiper
            :modules="modules"
            :slides-per-view="1"
            :space-between="'100%'"
            :prevent-interaction-on-transition="true"
            
            @swiper="onSwiperMain"
        >
            <swiper-slide class="slide">
                <div class="slide-first">
                    <div class="top">
                        <h3>{{ $t('welcome.firstSlide.title') }}</h3>
                        <p>
                            {{ $t('welcome.firstSlide.text') }}
                        </p>
                    </div>
                    <div class="cards">
                        <div class="cards-bottom" ref="cardBottom">
                            <img src="@images/welcome/Duck.jpg" alt="Duck">
                        </div>
                        <div class="cards-center" ref="cardCenter">
                            <img src="@images/welcome/Raccoon.jpg" alt="Raccoon">
                        </div>
                        <div class="cards-top" ref="cardTop">
                            <img src="@images/welcome/Rhinoceros.jpg" alt="Rhinoceros">
                        </div>
                    </div>
                    <DefaultButton @click="onSlideTo(1)" width="213px" class="default welcome-btn max-width">{{ $t('welcome.buttons.next') }}</DefaultButton>
                </div>
            </swiper-slide>

            <swiper-slide class="slide">
                <div class="slide-second">
                    <div class="top">
                        <h3>{{ $t('welcome.secondSlide.title') }}</h3>
                        <p>
                            {{ $t('welcome.secondSlide.text') }}
                        </p>
                    </div>
                    <div class="phone">
                        <div class="result">
                            <span>{{ $t('welcome.secondSlide.result') }}</span>
                            <TapacCoin/>
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
                <DefaultButton @click="onSlideTo(2)" width="213px" class="default welcome-btn max-width">{{ $t('welcome.buttons.next') }}</DefaultButton>
            </swiper-slide>

            <swiper-slide class="slide">
                <div class="slide-third">
                    <div class="top">
                        <h3>{{ $t('welcome.thirdSlide.title') }}</h3>
                        <p>
                            {{ $t('welcome.thirdSlide.text') }}
                        </p>
                    </div>
                    <div class="phone">
      
                        <div ref="taskTelegram" class="mission">
                            <div class="mission-icon">
                                <img src="@images/social/telegram.svg" alt="Telegram">
                            </div>
                            <div class="mission-content">{{ $t('tasks.missions.subscribeTelegram') }}</div>
                            <TaskButton type="perform"/>
                        </div>
                    
                        <div ref="taskYoutube" class="mission">
                            <div class="mission-icon">
                                <img src="@images/social/youtube.svg" alt="Youtube">
                            </div>
                            <div class="mission-content">{{ $t('tasks.missions.subscribeYoutube') }}</div>
                            <TaskButton type="done"/>
                        </div>


                        <ul>
                            <li ref="friend1">
                                <div class="avatar">
                                    <img
                                        src="@images/welcome/Duck.jpg"
                                        alt="Duck"
                                    />
                                </div>
                                <div class="info">
                                    <div class="info-name">Player 1</div>
                                    <div class="info-level">
                                        {{ $t('user.level') }} 20
                                    </div>
                                </div>
                                <div class="bonus">
                                    <div class="bonus-title">{{ $t('friends.your.bonusText') }}</div>
                                    <div class="bonus-score">
                                        <span>1500</span>
                                        <TapacCoin />
                                    </div>
                                </div>
                            </li>
                            <li ref="friend2">
                                <div class="avatar">
                                    <img
                                        src="@images/welcome/Raccoon.jpg"
                                        alt="Raccoon"
                                    /> 
                                </div>
                                <div class="info">
                                    <div class="info-name">Player 2</div>
                                    <div class="info-level">
                                        {{ $t('user.level') }} 12
                                    </div>
                                </div>
                                <div class="bonus">
                                    <div class="bonus-title">{{ $t('friends.your.bonusText') }}</div>
                                    <div class="bonus-score">
                                        <span>120</span>
                                        <TapacCoin />
                                    </div>
                                </div>
                            </li>
                            <li ref="friend3">
                                <div class="avatar">
                                    <img
                                        src="@images/welcome/Rhinoceros.jpg"
                                        alt="Rhinoceros"
                                    /> 
                                </div>
                                <div class="info">
                                    <div class="info-name">Player 3</div>
                                    <div class="info-level">
                                        {{ $t('user.level') }} 9
                                    </div>
                                </div>
                                <div class="bonus">
                                    <div class="bonus-title">{{ $t('friends.your.bonusText') }}</div>
                                    <div class="bonus-score">
                                        <span>30</span>
                                        <TapacCoin />
                                    </div>
                                </div>
                            </li>
                        </ul>

                        <div ref="button">
                            <DefaultButton link="/select-team" class="default tiny">{{ $t('buttons.claim_all') }}</DefaultButton>
                        </div>

                    </div>
                </div>
                <DefaultButton link="/select-team" width="213px" class="default welcome-btn max-width">{{ $t('welcome.buttons.next') }}</DefaultButton>
            </swiper-slide>
           
        </swiper>
        
    </div>
</div>
</template>



<script lang="ts">
import Logo from "@icons/logo.svg";
import DefaultButton from "@components/buttons/Default.vue";
import { authStore } from "@stores/auth";
import { mapState } from "pinia";
import router from "@/router";

import { Swiper, SwiperSlide } from "swiper/vue";
import type { Swiper as SwiperClass } from "swiper/types";
import { Navigation, Thumbs, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import { ref } from "vue";
import gsap from "gsap";
import TapacCoin from "@components/icons/iconTapac.vue";

import Bubble from "@components/game/Bubble.vue";
import TaskButton from "@components/buttons/TaskButton.vue";



export default {
    name: "Welcome",
    components: {
        Bubble,
        DefaultButton,
        Swiper,
        SwiperSlide,
        TapacCoin,
        TaskButton,
    },
    setup(){
        const swiperMain = ref<SwiperClass>();
        const onSwiperMain = (swiper: SwiperClass) => {
            swiperMain.value = swiper;
        };

        // const onSlideNext = () => {
        //     swiperThumbs.value?.slideNext();
        //     swiperName.value?.slideNext();
        // };
        // const onSlidePrev = () => {
        //     swiperThumbs.value?.slidePrev(); 
        //     swiperName.value?.slidePrev();
        // };

        const onSlideTo = (index: number) => {
            swiperMain.value?.slideTo(index);
        };

        return {
            modules: [Pagination],
            swiperMain,
            onSwiperMain,

            onSlideTo,
            // onSlideNext,
            // onSlidePrev,
        };
    },
    data() {
        return {
            Logo: Logo,
            welcomeStatus: 'slider'
        };
    },
    computed:{
        ...mapState(authStore, [
            'isLoggedIn'
        ])
    },
    methods: {
        
    },
    mounted() {
        if (this.isLoggedIn) {
            router.push('/');
        }


        gsap.to(this.$refs.cardBottom as any, {
            duration: 2, 
            top: '25%',
            left: '25%',
            rotate: '-25deg',
            scale: 0.8,
            repeat: -1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            delay: 1.5,
        })
        gsap.to(this.$refs.cardTop as any, {
            duration: 2, 
            top: '75%',
            left: '75%',
            rotate: '15deg',
            scale: 0.6,
            repeat: -1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            delay: 1,
        })


        var tl = gsap.timeline({delay: 5, repeat: -1, repeatDelay: 3, repeatRefresh: true})

        tl
        .to(this.$refs.taskTelegram as any, {
            duration: 2, 
            scale: 1.3,
            repeat: 1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            // delay: 1.5,
        })
        .to(this.$refs.taskYoutube as any, {
            duration: 2, 
            scale: 1.3,
            repeat: 1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            // delay: 5.5,
        })
        .to(this.$refs.friend1 as any, {
            duration: 2, 
            scale: 1.2,
            repeat: 1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            // delay: 11,
        })
        .to(this.$refs.friend2 as any, {
            duration: 2, 
            scale: 1.2,
            repeat: 1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            // delay: 16.5,
        })
        .to(this.$refs.friend3 as any, {
            duration: 2, 
            scale: 1.2,
            repeat: 1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            // delay: 22,
        })
        .to(this.$refs.button as any, {
            duration: 2, 
            scale: 1.3,
            repeat: 1,
            
            ease: "power2.inOut",
            yoyo: true,
            repeatDelay: 2,
            // delay: 22,
        })

        tl.play()


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

main{
    padding-bottom: 0;
}
.welcome {
    padding: 90px 0 40px 0;
    height: 100%;
    display: grid;
    gap: 70px;
    align-items: center;
    width: 100%;
    .logo {
        width: 100%;
        max-width: 100%;
        img {
            width: 100%;
            object-fit: contain;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        gap: 12px;
        text-align: center;
        p {
            color: $white;
            font-family: $font-primary;
            font-size: 16px;
            font-weight: 400;
        }
    }
}

.welcome-slider{
    .swiper-wrapper{
        .welcome-btn{
            margin: 24px auto 0 auto;
        }
        .slide{
            font-family: $font-primary;
            &-first{
                margin-top: 40px;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 18px;
                .top{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    h3{
                        color: $yellow;
                        font-size: 24px;
                        font-weight: 600;
                        text-align: center;
                    }
                    p{
                        text-align: center;
                        font-weight: 400;
                        color: $white;
                        font-size: 16px;
                    }
                }
                .cards{
                    min-height: 400px;
                    width: 100%;
                    position: relative;
                    div{
                        max-width:  200px;
                        min-width:  200px;
                        max-height: 200px;
                        min-height: 200px;
                        border-radius: 15px;
                        overflow: hidden;

                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        img{
                            max-width:  inherit;
                            min-width:  inherit;
                            max-height: inherit;
                            min-height: inherit;
                            object-fit: contain;
                        }
                    }
                    &-bottom{
                        position: absolute;
                        z-index: 2;

                        max-width:  150px!important;
                        min-width:  150px!important;
                        max-height: 150px!important;
                        min-height: 150px!important;
                        img{
                            max-width:  inherit;
                            min-width:  inherit;
                            max-height: inherit;
                            min-height: inherit;
                        }
                    }
                    &-center{
                        position: absolute;
                        z-index: 2;
    
                    }
                    &-top{
                        position: absolute;
                        z-index: 3;

                        
                    }
                }
            }
            &-second{
                margin-top: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 60px;
                .top{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    h3{
                        color: $yellow;
                        font-size: 24px;
                        font-weight: 600;
                        text-align: center;
                    }
                    p{
                        text-align: center;
                        font-weight: 400;
                        color: $white;
                        font-size: 16px;
                    }
                }
                
                .phone{
                    position: relative;
                    flex-grow: 1;
                    border-radius: 40px 40px 0 0;
                    border: 1px solid $yellow;
                    border-bottom: none;
                    min-height: 350px;
                    width: 100%;
                    max-width: 278px;
                    .result{
                        padding: 31px 20px 0 20px;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 4px;
                        span{
                            font-size: 16px;
                            color: $yellow;
                            font-weight: 600;
                        }
                        svg{
                            max-width:  16px;
                            max-height: 16px;
                            min-width:  16px;
                            min-height: 16px;
                        }
                    }
                    .preview {
                        position: relative;
                        min-height: 300px;
                        width: 100%;
                        .orange-gamepad {
                            z-index: 3;
                            position: absolute;
                            bottom: 20px;
                            left: 0;
                            max-width:  150px;
                            max-height: 150px;
                            min-width:  150px;
                            min-height: 150px;
                            img {
                                max-width:  150px;
                                max-height: 150px;
                                min-width:  150px;
                                min-height: 150px;
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
                            top: 60px;
                            right: 0;
            
                            max-width:  150px;
                            max-height: 150px;
                            min-width:  150px;
                            min-height: 150px;
                            img {
                                max-width:  150px;
                                max-height: 150px;
                                min-width:  150px;
                                min-height: 150px;
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
                            &-90 {
                                z-index: 2;
                                top: 20px;
                                left: 50%;
            
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
            }
            &-third{
                margin-top: 40px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                gap: 60px;
                .top{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 18px;
                    h3{
                        color: $yellow;
                        font-size: 24px;
                        font-weight: 600;
                        text-align: center;
                    }
                    p{
                        text-align: center;
                        font-weight: 400;
                        color: $white;
                        font-size: 16px;
                    }
                }
            
            }
        }
    }

}

</style>


<style lang="scss">

.swiper{
        
    .swiper-pagination-bullets{
        width: 100%;
        height: 20px;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 8px;
        .swiper-pagination-bullet{
            cursor: pointer;
            display: block;
            min-width:  10px;
            min-height: 10px;
            max-width:  10px;
            max-height: 10px;
            background: rgba(217, 217, 217, 1);
            border-radius: 1000px;
            &-active{
                background: $yellow;
            }
        }
    }
}


.slide-third{
    .phone{
        position: relative;
        flex-grow: 1;
        border-radius: 40px 40px 0 0;
        border: 1px solid $yellow;
        border-bottom: none;
        min-height: 350px;
        width: 100%;
        max-width: 278px;
        padding: 10px;

        display: flex;
        flex-direction: column;
        gap: 16px;
        padding-top: 20px;
        .mission{
            display: grid;
            grid-template-columns: 32px 1fr 74px;
            align-items: center;
            gap: 8px;
            background: $gray-dark;
            border-radius: 15px;
            padding: 8px;
            &-icon{
                max-width:  32px;
                max-height: 32px;
                min-width:  32px;
                min-height: 32px;
                background: $black;
                border-radius: 10px;
                overflow: hidden;
                img{
                    max-width:  inherit;
                    max-height: inherit;
                    min-width:  inherit;
                    min-height: inherit;
                    object-fit: contain;
                }
            }
            &-content{
                font-family: $font-primary;
                font-weight: 400;
                font-size: 10px;
                color: $white;
                max-width: 95%;
            }
            .btn{
                padding: 6px 10px;
                span{
                    font-size: 10px;
                }
            }
        }

        ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            li {
                background: $gray-dark;
                border-radius: 10px;
                padding: 8px;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
                .avatar {
                    max-width:  32px;
                    max-height: 32px;
                    min-width:  32px;
                    min-height: 32px;
                    border-radius: 10px;
                    overflow: hidden;
                    img {
                        max-width: inherit;
                        max-height: inherit;
                        min-width: inherit;
                        min-height: inherit;
                        object-fit: contain;
                    }
                }
                .info {
                    font-family: $font-primary;
                    font-size: 8px;

                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    &-name {
                        text-align: center;
                        color: $yellow;
                        font-weight: 500;
                    }
                    &-level {
                        text-align: center;
                        font-weight: 400;
                        color: $gray;
                    }
                }
                .bonus {
                    font-family: $font-primary;
                    font-size: 8px;
                    color: $yellow;

                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    &-title {
                        font-weight: 500;
                    }
                    &-score {
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        gap: 2px;
                        font-weight: 400;
                        svg {
                            max-width: 10px;
                            max-height: 10px;
                            min-width: 10px;
                            min-height: 10px;
                        }
                    }
                }
            }
        }
        
    } 
}
</style>