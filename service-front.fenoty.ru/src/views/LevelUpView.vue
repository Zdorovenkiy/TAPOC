<template>
    <div style="position: relative">
        <ReturnButton link="/" padding="0px" class="gray"/>

        <section class="level">
            <div class="info">
                <div class="info-avatar">
                    <img :src="team.imageSmall" :alt="team.name">
                </div>
                <div class="info-level">{{ $t('user.level') }} {{user.level_id}}</div>
                <div class="info-text" v-if="user.balance >= user.levelLimit">
                    {{ $t('levelUp.textFull') }}
                </div>
                <div class="info-text" v-if="user.balance < user.levelLimit">
                    {{ $t('levelUp.textNotFull') }}
                </div>
                <Balance :score="user.balance"/>
                <Scale :score="user.balance" :level="user.levelLimit"/>
            </div>
            <div v-if="user.balance >= user.levelLimit" class="missions">
                <Task v-for="(item, index) in levelTasks" :key="index" :task="item.tasks_per_level.task_name" :active="item.task_active"/>
            </div>
            <div v-if="user.balance < user.levelLimit" class="safe">
                <img src="@images/safe-no-bg.png" alt="Safe">
            </div>

            <transition name="tasks" tag="ul">
                <DefaultButton v-if="user.balance >= user.levelLimit && performTasksActive" class="level_up disabled">{{ $t('buttons.to_level_up') }}</DefaultButton>
                <DefaultButton v-else-if="user.balance >= user.levelLimit && !performTasksActive" @click="modalLevel = !modalLevel" class="level_up active">{{ $t('buttons.to_level_up') }}</DefaultButton>
                <DefaultButton v-else-if="user.balance < user.levelLimit" link="/arena" class="start_earn">{{ $t('buttons.start_earn') }}</DefaultButton>
            </transition>
        </section>







        <TransitionGroup tag="ul" name="fade">
            <div v-if="modalComplete" class="modal">
                <div class="modal-complete">
                    <h5>{{ $t('levelUp.modal.title') }}</h5>
                    <p>
                        {{ $t('levelUp.modal.text') }}
                    </p>
                    <div class="safe">
                        <img src="@images/safe-no-bg.png" alt="Safe">
                    </div>
                    
                    <DefaultButton @click="modalComplete = !modalComplete" class="default tiny">{{ $t('buttons.continue') }}</DefaultButton>
                </div>
            </div>

            <div v-if="modalLevel" class="modal">
                <div class="modal-level">
                    <h5>{{ $t('levelUp.modalLevel.title') }}</h5>
                    <p>
                        {{ $t('levelUp.modalLevel.text', {score: user.levelLimit / 2}) }}
                    </p>
                    <div class="safe">
                        <img src="@images/safe-no-bg.png" alt="Safe">
                    </div>
                    
                    <DefaultButton @click="levelUp" class="start_earn tiny">{{ $t('levelUp.modalLevel.button') }}</DefaultButton>
                </div>
            </div>
        </TransitionGroup>

    </div>
    
</template>

<script lang="ts">
import { mapState, mapActions, storeToRefs } from "pinia";
import Scale from '@components/user/Scale.vue'
import Balance from '@components/user/Balance.vue'
import Task from "@components/tasks/Default.vue";
import DefaultButton from '@components/buttons/Default.vue'
import ReturnButton from '@components/buttons/ReturnButton.vue'

import { telegramUserStore, userStore } from "@stores/user";

export default {
    name: "LevelUp",
    components: {
        Scale,
        Balance,
        Task,
        DefaultButton,
        ReturnButton
        // DefaultButton,
        // TapacCoin,
    },
    setup() {

        
        
    },
    async created() {
        await this.getLevelTask();

        await this.$nextTick();

        
        this.levelTasks.forEach(async (element: any) => {
            var response = false;

            switch (element.tasks_per_level.task_name) {
                case 'Telegram':
                    response = await this.checkUserSubscription('@tarac_test')
                    
                    break;
            
                default:
                    break;
            }

            console.log(response);
            

            if (response) {
                await this.changeTaskStatus(element.task_id, true)

                await this.$nextTick();

                await this.getLevelTask();
            }
            else{
                this.performTasks++
            }
          
        });
        

        this.performTasksActive = this.performTasks > 0 ? false : true

    },
    data() {
        return {
            modalComplete: false as boolean,
            modalLevel: false as boolean,
            performTasks: 0 as number,
            performTasksActive: true as boolean,
        };
    },
    watch: {},
    computed: {
        ...mapState(userStore, [
            "user", 
            "team", 
            "week", 
            "stats",
            "levelTasks",
        ]),
    },
    methods: {
        ...mapActions(userStore, [
            'userLevelUp',
            'getUserData',
            'getLevelLimit',

            'getLevelTask',
            'checkUserSubscription',
            'changeTaskStatus',
        ]),
        async levelUp(){
            this.modalLevel = !this.modalLevel
            this.modalComplete = true
            await this.userLevelUp()
            await this.getUserData(this.user.tg_id)
            await this.getLevelLimit(this.user.tg_id)
        }
    },
    mounted() {

        
        
    },
};
</script>

<style lang="scss">

.level{
    font-family: $font-primary;
    ul{
        position: relative;
    }
    .info{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        margin-bottom: 24px;
        &-avatar{
            max-width:  106px;
            max-height: 106px;
            min-width:  106px;
            min-height: 106px;
            border-radius: 10px;
            overflow: hidden;

            margin-bottom: 12px;
            img{
                max-width:  inherit;
                max-height: inherit;
                min-width:  inherit;
                min-height: inherit;
                object-fit: contain;
            }
        }
        &-level{
            
            font-weight: 500;
            font-size: 16px;
            color: $yellow;
            margin-bottom: 16px;
        }
        &-text{
            text-align: center;
            font-weight: 400;
            font-size: 14px;
            color: $white;

            margin-bottom: 20px;
        }
        .balance{
            span{
                font-size: 32px;
            }
            svg{
                max-width:  26px;
                max-height: 26px;
                min-width:  26px;
                min-height: 26px;
            }
        }
        .scale{
            width: 100%;
            max-width: 241px;
        }
    }
    .missions{
        display: flex;
        flex-direction: column;
        gap: 8px;

        margin-bottom: 24px;
    }
    .safe{
        display: block;
        margin: 0 auto 14px auto;
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
    &-complete{
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
        

    }
    &-level{
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
        

    }
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


.tasks-move,
.tasks-enter-active,
.tasks-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

/* 2. declare enter from and leave to state */
.tasks-enter-from,
.tasks-leave-to {
  opacity: 0;
  transform: translate(0, 10px);
}

/* 3. ensure leaving items are taken out of layout flow so that moving
      animations can be calculated correctly. */
.tasks-leave-active {
  position: absolute;
}



</style>
