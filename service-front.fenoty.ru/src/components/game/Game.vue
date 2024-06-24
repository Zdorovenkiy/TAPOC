<template>
    <div class="timer">
        <div class="timer-title">{{ $t('game.play.timerText') }}</div>
        <div class="timer-time">{{time}}</div>
    </div>

    <div class="score">
        <TapacCoin/>
        <span>{{score}}</span>
    </div>

    <div class="playground" ref="playground">
        <transition-group name="scale" tag="div">
            <Bubble 
                v-for="(item, index) in circles" 
                :key="index" 
                :value="item.value" 
                :size="item.size"
                :top="item.top"
                :left="item.left"
                @click.stop="claimCoin(item.value, index)"
            />
        </transition-group>
    </div>


    
</template>

<script lang="ts">
// var emitter = require('tiny-emitter/instance');

import { mapState, mapActions } from "pinia";
import {gameStore} from '@stores/game'
import {userStore} from '@stores/user'

import Bubble from "@components/game/Bubble.vue";
import TapacCoin from '@components/icons/iconTapac.vue'
 
export default {
    name: "Game",
    components: {
        Bubble,
        TapacCoin
    },
    props: {
        started: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            settings: {
                circleLifetime: 0.6,
                numFirstCircles: 10,
                numCircles: 4,
                circleSize: 106,
                bank: 1000,
                time: 15.0,
                coords: [
                    // bottom shedule
                    {
                        top: 0,
                        left: 10,
                    },
                    {
                        top: 0,
                        left: 116,
                    },
                    {
                        top: 0,
                        left: 222,
                    },

                    {
                        top: 100,
                        left: 60,
                    },
                    {
                        top: 100,
                        left: 170,
                    },


                    {
                        top: 200,
                        left: 10,
                    },
                    {
                        top: 200,
                        left: 116,
                    },
                    {
                        top: 200,
                        left: 222,
                    },

                    {
                        top: 300,
                        left: 60,
                    },
                    {
                        top: 300,
                        left: 170,
                    },


                    // top shedule
                    {
                        top: 0,
                        left: 60,
                    },
                    {
                        top: 0,
                        left: 170,
                    },


                    {
                        top: 100,
                        left: 10,
                    },
                    {
                        top: 100,
                        left: 116,
                    },
                    {
                        top: 100,
                        left: 222,
                    },

                    {
                        top: 200,
                        left: 60,
                    },
                    {
                        top: 200,
                        left: 170,
                    },

                    {
                        top: 300,
                        left: 10,
                    },
                    {
                        top: 300,
                        left: 116,
                    },
                    {
                        top: 300,
                        left: 222,
                    },

                ],
                rewards: [
                    {
                        value: 10,
                        maxCount: 0,
                        currCount: 0,
                    },
                    {
                        value: 20,
                        maxCount: 0,
                        currCount: 0,
                    },
                    {
                        value: 30,
                        maxCount: 0,
                        currCount: 0,
                    },
                    {
                        value: 40,
                        maxCount: 0,
                        currCount: 0,
                    },
                    {
                        value: 50,
                        maxCount: 0,
                        currCount: 0,
                    },
                    {
                        value: 60,
                        maxCount: 0,
                        currCount: 0,
                    },
                    {
                        value: 70,
                        maxCount: 7,
                        currCount: 0,
                    },
                    {
                        value: 80,
                        maxCount: 5,
                        currCount: 0,
                    },
                    {
                        value: 100,
                        maxCount: 5,
                        currCount: 0,
                    },
                    {
                        value: 'x2',
                        maxCount: 2,
                        currCount: 0,
                    }
                ]
            },
            time: 0,
            circles: [] as any,
            score: 0,
            rewardsArray: [] as any
        };
    },
    setup() {
        
    },
    computed: {
        ...mapState(userStore, [
            'user'
        ])
    },
    methods: {
        ...mapActions(gameStore, [
            'checkExistLobby',
            'setStatusGame',
            'setScore',
            'setActivity',
            'setCountdownDefault',
            'gamesHistory',
        ]),
        ...mapActions(userStore, [
            'getUserData',
        ]),
        setReward():any {
            let result = 0 as any;
            let index = this.randomInt(0, this.settings.rewards.length - 1)
            let reward = this.settings.rewards[index]


            if (reward.maxCount == 0){
                result = reward.value
            }
            else if (reward.currCount >= reward.maxCount) {
                result = this.setReward()
            }
            else{
                result = reward.value
            }
            
            this.settings.rewards[index].currCount++

            return result
            
        },
        randomInt(min: number, max: number){
            let rand = min + Math.random() * (max + 1 - min);
            return Math.floor(rand);
        },
        setPosition(){
            let position = this.settings.coords[this.randomInt(0, this.settings.coords.length - 1)]

            for (let i = 0; i < this.circles.length; i++) {

                if (this.circles[i].top == position.top && this.circles[i].left == position.left) {
                    position = this.settings.coords[this.randomInt(0, this.settings.coords.length - 1)]
                }
            }

            return position
        },
        setArrayCircles(){
            for (let index = 0; index < this.settings.numFirstCircles; index++) {
                let size = this.settings.circleSize;

                let position = this.setPosition()
                

                

                let top = position.top;
                let left = position.left;

                let value = this.setReward();
                this.circles.push({ value: value, size, top, left, time: this.time });   
                
                this.rewardsArray.push(value)

            }
        },
        setCircles(){
            if (this.settings.time > 0) {
                for (let index = 0; index < this.settings.numCircles; index++) {
                    let size = this.settings.circleSize;
                    let position = this.setPosition()

                    let top = position.top;
                    let left = position.left;

                    let value = this.setReward();
                    this.circles.push({ value: value, size, top, left, time: this.time });   

                    this.rewardsArray.push(value)

                }     
            }    
        },
        // checkLifetime(){
        //     this.circles.forEach((element: any, index: number) => {
        //         if (element.time - this.time >= this.settings.circleLifetime ) {
        //             this.circles.splice(index, 1);
        //         }
        //     });
            
        // },
        checkLifetime() {
            this.circles = this.circles.filter((circle:any) => (circle.time - this.time) <= this.settings.circleLifetime);
            
        },

        // timerStart(){
        //     const timer = setInterval(() => {
        //         let num = this.time
        //         if (num == 0) {
        //             clearInterval(timer) 
        //         }
        //         else{
        //             num -= 0.1
        //             this.time = Number(num.toFixed(2))
        //         }
                
                
        //     }, 100)
        // },
        timerStart(){
            let previousTimestamp = performance.now();
            const timer = setInterval(() => {
                let currentTimestamp = performance.now();
                let deltaTime = (currentTimestamp - previousTimestamp) / 1000; // Превращение в секунды
                previousTimestamp = currentTimestamp;

                this.time = Number((this.time - deltaTime).toFixed(2));
                if (this.time <= 0) {
                    this.time = 0;
                    clearInterval(timer);
                }
            }, 100)
        },
        claimCoin(value: string, index: number){
            // navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

            // if (navigator.vibrate) {
            //     navigator.vibrate(1000); // Массив значений времени в миллисекундах для вибрации
            // }



            if (typeof value == 'string') {
                if (value.includes('x')) {
                    value = value.replace('x', '')
                    this.score = this.score * Number(value)
                }
            }
            else{
                this.score += Number(value)
            }
            this.circles.splice(index, 1);

        },
        // claimCoin(value: string, index: number) {
        //     if (typeof value === 'string' && value.includes('x')) {
        //         value = value.replace('x', '');
        //         this.score = this.score * Number(value);
        //     } else {
        //         this.score += Number(value);
        //     }
        //     this.circles.splice(index, 1);

        //     this.$nextTick(() => {
                
        //     });
        // },
        async setDefaultSettings(){
            this.score = 0;
            this.circles = [];
            this.rewardsArray = [];
            // clearInterval(this.time); 
        },
        
    },
    watch: {
        started(value){
            if (value) {
                this.setScore(0)
                this.time = this.settings.time
                this.timerStart()

                this.setArrayCircles()

                
                setTimeout(() => {
                    setInterval(() => {
                        this.checkLifetime()
                    }, 300)
                    setInterval(() => {
                        this.setCircles()
                    }, 300)
                }, 300)
                
                
            }
        },
        async time(value){
            if (value <= 0) {
                await this.checkExistLobby(this.user.tg_id, this.score);
                await this.setStatusGame('final');
                await this.setScore(this.score);
                await this.setActivity(false);
                await this.setCountdownDefault();
                await this.setDefaultSettings();
                await this.getUserData(this.user.tg_id);
            }
        }
    },
    mounted() {
        

        
        
        // if (this.settings.time > 0) {
            
        // }
            
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

.timer{
    margin-top: 6px;
    font-family: $font-primary;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
    &-title{
        font-weight: 500;
        font-size: 8px;
        color: $gray;
    }
    &-time{
        font-weight: 700;
        font-size: 24px;
        color: $white;

    }
}
.score{
    margin-top: 18px;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
    span{
        font-family: $font-primary;
        font-weight: 700;
        font-size: 24px;
        color: $yellow;
    }
    svg{
        max-width: 22px;
        max-height: 22px;
        min-width: 22px;
        min-height: 22px;
    }
}


.playground{
    margin-top: 30px;
    min-height: 410px;
    width: 100%;
    position: relative;
} 



.scale-enter-from{
    opacity: 0;
    scale: 0;
}
.scale-enter-to{
    opacity: 1;
    scale: 1;
}
.scale-enter-active{
    transition: 
        scale 0.3s linear,
        opacity 0.3s linear;
}
.scale-leave-from{
    opacity: 1;
}
.scale-leave-to{
    opacity: 0;
}
.scale-leave-active{
    transition: opacity 0.2s linear;
}





</style>
