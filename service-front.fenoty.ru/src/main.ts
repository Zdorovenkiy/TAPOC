import './assets/styles/_main.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './App.vue'
import router from './router'

const tg = window.Telegram;
const WebApp = tg.WebApp;
if (tg && WebApp) {
    WebApp.ready();
    console.log('ready')
    WebApp.expand();
}



const app = createApp(App)

app.use(VueAxios, axios)
app.use(createPinia())
app.use(router)

app.mount('#app')
