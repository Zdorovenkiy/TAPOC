<script lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "@components/HelloWorld.vue";
import Navigation from "@components/Navigation.vue";

import { telegramUserStore } from "@stores/user";
// import Logo from '@icons/logo.svg'

export default {
    name: "app",
    components: {
        Navigation,
    },
    setup(){
        const tgStore = telegramUserStore()
        tgStore.setTelegramUser()
    },
    data() {
        return {
            // Logo: Logo
        };
    },
};
</script>

<template>
    <main>
      <RouterView />
    </main>

    <header>
      <Navigation />
    </header>
</template>

<style lang="scss" scoped></style>
