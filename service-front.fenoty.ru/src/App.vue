<template>

    <transition name="fade">
        <PreloaderView v-if="preloader"/>
    </transition>

    <main>
        <RouterView v-slot="{Component}">
            <transition name="slide" mode="out-in" >
                <!-- appear -->
                <!-- <KeepAlive> -->
                    <component :is="Component"></component>
                <!-- </KeepAlive> -->
            </transition>
        </RouterView>
    </main>

    <!-- <Game/> -->

    <header v-if="isLoggedIn && network">
        <Navigation />
    </header>

    <Loader type="full" :active="activity"/>

</template>

<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { toast, type ToastOptions } from "vue3-toastify";
import { mapState, mapActions } from "pinia";
import { telegramUserStore, userStore } from "@stores/user";
import { authStore } from "@stores/auth";

import PreloaderView from "@components/PreloaderView.vue"
import Navigation from "@components/Navigation.vue";
import Loader from "@components/loader/Loader.vue";
import { loaderStore } from '@stores/loader'
import Bubble from "@components/game/Bubble.vue";
import { state } from "@stores/wss";
import router from "@/router";

import axios from "axios";
import { socket } from "@stores/wss"


export default {
    name: "App",
    components: {
        Navigation,
        Loader,
        Bubble,
        PreloaderView,
    },
    setup() {
        const telegramStorage = telegramUserStore();
        telegramStorage.setTelegramUser();
    },
    async created() {
        const telegramStorage = telegramUserStore();
        const userStorage = userStore();
        const authStorage = authStore();

        await this.$nextTick();

        if (await authStorage.checkUserAuth(telegramStorage.telegramUser.id)) {
            console.log('getUserData', '1');

            await this.$nextTick();

            await userStorage.getUserData(telegramStorage.telegramUser.id);

            await this.$nextTick();

            console.log('getLevelLimit', '2');
            userStorage.getLevelLimit(telegramStorage.telegramUser.id);
           

            await this.$nextTick();

            console.log('getUserTeam', '3');
            await userStorage.getUserTeam(telegramStorage.telegramUser.id);
            
            socket.emit('rating', 
                {type: "updateStat", data: {id: userStorage.user.tg_id}}, 
            );

            


            // console.log(authStorage.isLoggedIn);
            
            setTimeout(() => {
                this.preloader = false;
            }, 1000);
        }
        else{
            if (await authStorage.checkAuthReturn(telegramStorage.telegramUser.id) == "ERR_NETWORK") {
                this.preloader = true;
            }
            else{
                setTimeout(() => {
                    this.preloader = false;
                }, 1000);
                router.push({path: '/welcome'})
            }
            
        }
    },
    data() {
        return {
            preloader: true as boolean,
            maxSpeed: 1 as number
        };
    },
    updated() {
        
    },
    computed: {
        ...mapState(authStore, [
            'isLoggedIn',
            'admin',
            'network',
        ]),
        ...mapState(loaderStore, [
            'activity',
        ]),

        connected() {
            return state.connected = true
        }
    },
    methods: {
        ...mapActions(authStore, [
            'setNetwork'
        ]),
        ...mapActions(loaderStore, [
            'stopLoader'
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


        const overflow = 100
        document.body.style.overflowY = 'hidden'
        document.body.style.marginTop = `${overflow}px`
        document.body.style.height = window.innerHeight + overflow + "px"
        document.body.style.paddingBottom = `${overflow}px`
        window.scrollTo(0, overflow)

        const scrollableEl = document.querySelector('#app')

        let ts: number | undefined
        const onTouchStart = (e: TouchEvent) => {
            ts = e.touches[0].clientY
        }
        const onTouchMove = (e: TouchEvent) => {
            if (scrollableEl) {
                const scroll = scrollableEl.scrollTop
                const te = e.changedTouches[0].clientY
                if (scroll <= 0 && ts! < te) {
                    e.preventDefault()
                }
            } else {
                e.preventDefault()
            }
        }
        document.documentElement.addEventListener('touchstart', onTouchStart, { passive: false })
        document.documentElement.addEventListener('touchmove', onTouchMove, { passive: false })

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



.slide-enter-from{
    transform: translateY(-100px);
    opacity: 0;
}
.slide-enter-to{
    transform: translateY(0px);
    opacity: 1;
}
.slide-enter-active{
    transition: all 0.3s ease;
}
.slide-leave-from{
    transform: translateY(0px);
    opacity: 1;
}
.slide-leave-to{
    transform: translateY(-100px);
    opacity: 0;
}
.slide-leave-active{
    transition: all 0.3s ease;
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
