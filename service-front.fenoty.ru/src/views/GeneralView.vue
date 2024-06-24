<template>
    <section class="general">
        <div class="user">
            <div class="user-avatar">
                <img
                    :src="team.imageSmall"
                    :alt="team.name"
                />
            </div>
            <div class="user-info">
                <div class="user-info-top">
                    <span>{{ $t('user.level') }} {{user.level_id}}</span>
                    <RouterLink to="/switch-team" />
                </div>
                <Scale :score="user.balance" :level="user.levelLimit" />
            </div>
        </div>
        <Balance :score="user.balance" />
        <div class="buttons">
            <DefaultButton link="/arena" class="btn start_earn small">{{ $t('buttons.start_earn') }}</DefaultButton>
            <DefaultButton v-if="user.balance >= user.levelLimit" link="/level-up" class="btn level_up small active">{{ $t('buttons.level_up') }}</DefaultButton>
            <DefaultButton v-if="user.balance < user.levelLimit" link="/level-up" class="btn level_up small disabled">{{ $t('buttons.level_up') }}</DefaultButton>
        </div>

        <WeekStats/>

        <UserRating/>


        <RatingView/>



    </section>
</template>

<script lang="ts">
import { mapState, mapActions, storeToRefs } from "pinia";
import Scale from "@components/user/Scale.vue";
import Balance from "@components/user/Balance.vue";
import DefaultButton from "@components/buttons/Default.vue";
import WeekStats from "@components/user/WeekStats.vue";
import UserRating from "@components/rating/Rating.vue";
import RatingView from "@views/RatingView.vue";


import { telegramUserStore, userStore } from "@stores/user";
import { loaderStore } from '@stores/loader';

import router from "@/router";
import { authStore } from "@stores/auth";

export default {
    name: "General",
    components: {
        Scale,
        Balance,
        DefaultButton,
        WeekStats,
        UserRating,
        RatingView
    },
    setup() {
        // const userStorage = userStore();
        // userStorage.startIntervalUpdate();
        

    },
    data() {
        return {
            maxSpeed: 1 as number
        };
    },
    watch: {},
    computed: {
        ...mapState(userStore, [
            'user',
            'team',
            'week',
            'stats',
        ]),
    },
    methods: {
        ...mapActions(loaderStore, [
            'stopLoader'
        ]),
        ...mapActions(authStore, [
            'setNetwork',
        ]),
        async testSpeed(iterations: number) {
  
            const fileSize = 240 * 1024;

            // Включаем счетчик времени
            var start = performance.now() as any;

            var url = import.meta.env.VITE_API_URL + '/checkConnectionSpeed'

            console.log( import.meta.env.VITE_STORAGE_URL );


            let speeds = [] as any;

            for (let i = 0; i < iterations; i++) {
                const start = performance.now();

                await fetch(url).then(async (response) => {
                    console.log(response.blob())

                    const end = performance.now();
                    speeds.push(fileSize * 8 / (1024 * 1024 * (end - start) / 1000));
                });
                
            }

            return Number((speeds.reduce((sum: any, speed: any) => sum + speed, 0) / speeds.length).toFixed(2));
        },
    },
    async mounted() {
        this.stopLoader()

        var currentSpeed = await this.testSpeed(2)

        console.log(currentSpeed)
        if (currentSpeed < this.maxSpeed) {
            this.setNetwork(false)
            router.push({path: '/network'})
            console.log(currentSpeed)
            console.log('Low network speed')
        }
        else{
            this.setNetwork(true)
        }
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
