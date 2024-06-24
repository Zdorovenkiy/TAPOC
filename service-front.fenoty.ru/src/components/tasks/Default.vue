<template>
    <div v-if="task === 'Telegram'" class="mission">
        <div class="mission-icon">
            <img src="@images/social/telegram.svg" alt="Telegram">
        </div>
        <div class="mission-content">{{ $t('tasks.missions.subscribeTelegram') }}</div>
        
        <TaskButton v-if="active == true" link="https://t.me/+kFSgnveHcPE1Njcy" type="perform"/>
        <TaskButton v-else type="done"/>
    </div>

    <div v-if="task === 'TelegramPacProject'" class="mission">
        <div class="mission-icon">
            <img src="@images/social/telegram.svg" alt="Telegram">
        </div>
        <div class="mission-content">{{ $t('tasks.missions.subscribeTelegram') }}</div>
        
        <TaskButton v-if="active == true" link="https://t.me/+kFSgnveHcPE1Njcy" type="perform"/>
        <TaskButton v-else type="done"/>
    </div>



    <div v-if="task === 'Youtube'" class="mission">
        <div class="mission-icon">
            <img src="@images/social/youtube.svg" alt="Youtube">
        </div>
        <div class="mission-content">{{ $t('tasks.missions.subscribeYoutube') }}</div>
        <TaskButton v-if="active == true" @click="" link="https://www.youtube.com/@tapac_official" type="perform"/>
        <TaskButton v-else type="done"/>
    </div>

    <!-- <div v-if="task === 'Safe'" class="mission">
        <div class="mission-icon">
            <img src="@images/icons/safe.svg" alt="Safe">
        </div>
        <div class="mission-content">{{ $t('tasks.missions.enteredScore', {score}) }}</div>
        <TaskButton type="entered"/>
    </div> -->

  
</template>

<script lang="ts">
import { mapActions, mapState } from "pinia";
import { userStore } from "@stores/user";


import TaskButton from "@components/buttons/TaskButton.vue";

export default {
    components: {
        TaskButton,
    },
    name: "Task",
    props: {
        task: {
            type: String,
            required: true,
        },
        score: {
            type: Number,
            required: false,
        },
        active: {
            type: Boolean,
            required: false,
        },
        task_id: {
            type: Number,
            required: false,
        },
    },
    computed: {

    },
    methods: {
        ...mapActions(userStore, [
            "checkDailyReward",
            "userDailyReward",
            "getUserData",
            "getLevelLimit",

            "checkUserSubscription",
            "getPermanentTasks",
        ]),
    },
    mounted() {
        
    },
};
</script>


<style lang="scss" scoped>
.mission{
    display: grid;
    grid-template-columns: 42px 1fr 74px;
    align-items: center;
    gap: 8px;
    background: $gray-dark;
    border-radius: 15px;
    padding: 8px;
    &-icon{
        max-width:  42px;
        max-height: 42px;
        min-width:  42px;
        min-height: 42px;
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
}
</style>
