<template>
    <section class="tasks">

        <div class="daily">
            <h1 class="side-title">{{ $t('tasks.daily.title') }}</h1>
            <div class="daily-container">
    
                <div class="task claim" v-for="item in dailyRewards" :key="item.id" 
                    :class="item.id < user.daily_id || (item.id == user.daily_id && user.daily_accepted) 
                        ? 'claimed'
                        : item.id == user.daily_id
                            ? ''
                            : 'not-claim'
                    "
                >
                    <div class="task-day">{{ $t('tasks.daily.day') }} {{item.id}}</div>
                    <div class="task-reward">
                        <span>{{item.reward}}</span>
                        <TapacCoin/>
                    </div>

                    <div>
                        <DailyButton v-if="item.id == user.daily_id && !user.daily_accepted" @click="setDailyRewards" type="claim"/>
                        <DailyButton v-else-if="item.id < user.daily_id || (item.id == user.daily_id && user.daily_accepted)" type="claimed"/>
                        <DailyButton v-else type="not-claim"/>
                    </div>
                </div>
    
            </div>
        </div>
        
        <div class="missions">
            <h2 class="side-title">{{ $t('tasks.missions.title') }}</h2>
            <div class="missions-container">
                <Task v-for="(item, index) in permanentTasks" :key="index" :task="item.tasks_permanent.task_name" :active="item.task_active" :task_id="item.task_id"/>
            </div>
        </div> 



        <transition name="fade">
            <div v-if="modalDaily" class="modal">
                <div class="modal-tasks">
                    <h5>{{ $t('tasks.modalDaily.title') }}</h5>
                    <p>{{ $t('tasks.modalDaily.text') }}</p>
                    <div class="wallet">
                        <img src="@images/bag-money.png" alt="Bag" />
                    </div>

                    <div class="bonus">
                        <span>{{ scoreDaily }}</span>
                        <TapacCoin />
                    </div>

                    <DefaultButton @click="modalDaily = !modalDaily" class="default tiny"
                        >{{ $t('tasks.modalDaily.button') }}</DefaultButton
                    >
                </div>
            </div>
        </transition>
<!-- 
        <transition name="fade">
            <div v-if="modalTask" class="modal">
                <div class="modal-task">
                    <h5>{{ $t('tasks.modalTask.title') }}</h5>
                    <p>{{ $t('tasks.modalTask.text') }}</p>
                    <div class="wallet">
                        <img src="@images/wallet-friends.png" alt="Wallet" />
                    </div>

                    <div class="bonus">
                        <span>{{ friendsTotalReward }}</span>
                        <TapacCoin />
                    </div>

                    <DefaultButton @click="modalTask = !modalTask" class="default tiny"
                        >{{ $t('tasks.modalTask.button') }}</DefaultButton
                    >
                </div>
            </div>
        </transition> -->


    </section>
</template>

<script lang="ts">
import DailyButton from "@components/buttons/DailyButton.vue";
import DefaultButton from "@components/buttons/Default.vue";
import Task from "@components/tasks/Default.vue";
import TapacCoin from "@components/icons/iconTapac.vue";

import "@assets/styles/_pagination.scss";
import { userStore } from "@stores/user";
import { mapActions, mapState } from "pinia";
import { socket } from "@stores/wss"

export default {
    name: "Tasks",
    components: {
        DailyButton,
        DefaultButton,
        TapacCoin,
        Task,
    },
    setup() {
        const userStorage = userStore()
        userStorage.getDailyRewards()
    },
    async created() {
        await this.getPermanentTasks();

        await this.$nextTick();

        
        this.permanentTasks.forEach(async (element: any) => {
            var response = false;

            switch (element.tasks_permanent.task_name) {
                case 'TelegramPacProject':
                    response = await this.checkUserSubscription('@tarac_test')
                    break;
            
                default:
                    break;
            }

            console.log(response);
            

            if (response) {
                await this.changeTaskStatus(element.task_id, true)

                await this.$nextTick();

            }
          
        });
        

    },
    data() {
        return {
            modalDaily: false as boolean,
            scoreDaily: false as boolean,

            modalTask: false as boolean,
            // dailyRewards: [] as any,
        }
    },
    computed: {
        ...mapState(userStore, [
            "dailyRewards",
            "user",
            "permanentTasks"
        ])
    },
    methods: {
        ...mapActions(userStore, [
            "checkDailyReward",
            "userDailyReward",
            "getUserData",
            "getLevelLimit",

            "checkUserSubscription",
            "getPermanentTasks",
            "changeTaskStatus",
        ]),
        async setDailyRewards(){
            
            this.dailyRewards.forEach((element: any) => {
                if (element.id == this.user.daily_id) {
                    this.scoreDaily = element.reward
                }
            });
            this.modalDaily = true


            await this.userDailyReward()
            await this.getUserData(this.user.tg_id)
            await this.getLevelLimit(this.user.tg_id)
        }
    },
    async mounted() {
        // this.checkUserSubscription()
        // socket.emit('userStat', {type: "stats", data: 906308044});
        // this.getDailyRewards();
        // this.setDailyRewards();
        // console.log(this.userDailyReward());
        
        // let time = Date.now()
        // console.log(time);
        // console.log( );
        
        
    },
};
</script>

<style lang="scss">
.tasks {
    margin-top: 8px;

    display: flex;
    flex-direction: column;
    gap: 24px;
    .daily{
        display: flex;
        flex-direction: column;
        gap: 16px;
        &-container{
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 8px;
            .task{
                background: $gray-dark;
                border-radius: 10px;
                padding: 8px;

                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;

                $opacity: 0.7;
                div{
                    width: 100%;
                }
                &.claimed{
                    
                    .task-day{
                        opacity: $opacity;
                    }
                    .task-reward{
                        opacity: $opacity;
                    }
                    .btn{
                        opacity: $opacity;
                    }
                }
                &.not-claim{
                    opacity: $opacity;
                    .task-reward{
                        span{
                            color: $white;
                        }
                    }
                }
                &-day{
                    text-align: center;
                    font-family: $font-primary;
                    color: $gray;
                    font-weight: 400;
                    font-size: 12px;
                }
                &-reward{
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 4px;
                    span{
                        font-family: $font-primary;
                        font-weight: 700;
                        font-size: 20px;
                        color: $yellow;
                    }
                    svg{
                        width: 20px;
                        height: 20px;
                    }
                }
                
            }
        }
    }
    .missions{
        display: flex;
        flex-direction: column;
        gap: 16px;
        &-container{
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
    }
}



.modal {
    z-index: 99;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0, 0, 0, 0.6);

    display: flex;
    justify-content: center;
    align-items: center;
    &-tasks {
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
        h5 {
            text-align: center;
            font-size: 16px;
            font-weight: 600;
            color: $white;
            max-width: 98%;
        }
        p {
            text-align: center;
            font-weight: 400;
            font-size: 12px;
            color: $white;
        }
        .wallet {
            position: relative;
            max-width: 132px;
            max-height: 132px;
            min-width: 132px;
            min-height: 132px;
            width: 100%;
            &::before {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                content: "";
                display: block;

                background-image: url("@images/safe-shadow.png");
                background-position: center;
                background-repeat: no-repeat;
                background-size: 100%;

                max-width: 200px;
                max-height: 200px;
                min-width: 200px;
                min-height: 200px;
            }
            img {
                max-width: inherit;
                max-height: inherit;
                min-width: inherit;
                min-height: inherit;
                object-fit: contain;
            }
        }
        .bonus {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 8px;
            span {
                font-family: $font-primary;
                font-weight: 700;
                color: $yellow;
                font-size: 32px;
            }
            svg {
                max-width: 26px;
                max-height: 26px;
                min-width: 26px;
                min-height: 26px;
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
