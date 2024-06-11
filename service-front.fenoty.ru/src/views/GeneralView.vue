<template>
    <WelcomePage v-if="welcome" />

    <section v-else class="general">
        <div class="user">
            <div class="user-avatar">
                <img
                    src="/src/assets/images/teams/small/Bear.jpg"
                    alt="Avatar"
                />
            </div>
            <div class="user-info">
                <div class="user-info-top">
                    <span>Уровень {{user.stats.level}}</span>
                    <RouterLink to="/arena" />
                </div>
                <Scale :score="user.stats.score" :level="user.stats.levelScore" />
            </div>
        </div>
        <Balance :score="user.stats.score" />
        <div class="buttons">
            <DefaultButton link="/" class="btn start_earn small">Начать зарабатывать</DefaultButton>
            <DefaultButton link="/" class="btn level_up small" :class="user.stats.score < user.stats.levelScore ? 'disabled' : 'active'">Повысить уровень</DefaultButton>
        </div>

        <WeekStats :games="user.week.games" :wins="user.week.wins" :defeat="user.week.defeat" />


    </section>
</template>

<script lang="ts">
import { mapState, mapActions, storeToRefs } from "pinia";
import WelcomePage from "@components/WelcomePage.vue";
import Scale from "@components/user/Scale.vue";
import Balance from "@components/user/Balance.vue";
import DefaultButton from "@components/buttons/Default.vue";
import WeekStats from "@components/user/WeekStats.vue";

import { userStore } from "@stores/user";
import { ref } from "vue";

export default {
    name: "General",
    components: {
        WelcomePage,
        Scale,
        Balance,
        DefaultButton,
        WeekStats,
    },
    setup() {
        const userStorage = userStore();
        // userStorage.fetchUsers();
        
        userStorage.startIntervalUpdate();

        
    },
    data() {
        return {
            welcome: true as boolean,
        };
    },
    watch: {},
    computed: {
        ...mapState(userStore, [
            'user',
        ]),
    },
    methods: {
        // ...mapActions(userStore, [
        //     'setBalance',
        // ])
    },
    mounted() {
        // const piniaState = userStore(); // Получаем состояние Pinia из this.$pinia
        // console.log(piniaState.fetchUsers());
        

        

        // setInterval(() => {
        //     piniaState.balance+=50
        // }, 2000);

        // this.$watch(() => piniaState,(state) => {
        //         this.balance = state.balance
        //     },
        //     { deep: true }
        // );
    },
};
</script>

<style lang="scss" scoped>
.general {
    .user {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 16px;
        margin-bottom: 24px;
        &-avatar {
            max-width: 78px;
            max-height: 78px;
            border-radius: 10px;
            overflow: hidden;
            img {
                max-width: inherit;
                max-height: inherit;
            }
        }
        &-info {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 10px;
            &-top {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: flex-end;
                gap: 10px;
                span {
                    color: $yellow;
                    font-family: $font-primary;
                    font-size: 18px;
                    font-weight: 400;
                }
                a {
                    display: block;

                    background-image: url("@images/icons/settings.svg");
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: contain;

                    max-width: 22px;
                    max-height: 22px;
                    min-width: 22px;
                    min-height: 22px;

                    margin-bottom: 8px;
                }
            }
        }
    }
    .buttons{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 7px;

        margin-top: 16px;
    }
}
</style>
