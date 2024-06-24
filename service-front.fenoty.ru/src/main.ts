import "@assets/styles/_main.scss";
import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import VueAxios from "vue-axios";
import { VueClipboard } from '@soerenmartius/vue3-clipboard'

import Vue3Toasity, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

import App from "@/App.vue";
import router from "@/router";
import i18n from '@/localization'


declare var window: any;

const tg = window.Telegram;
const WebApp = tg.WebApp;
if (tg && WebApp) {
    WebApp.ready();
    console.log("ready");
    WebApp.expand();
    
}

const app = createApp(App);

app.use(VueAxios, axios);
app.use(createPinia());

app.use(Vue3Toasity, {
    autoClose: 3000,
} as ToastContainerOptions)


app.use(router);
app.use(i18n)
app.use(VueClipboard);
app.mount("#app");




