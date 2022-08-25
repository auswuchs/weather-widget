import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import { OhVueIcon, addIcons } from "oh-vue-icons";
import { LaCogSolid, IoClose } from 'oh-vue-icons/icons'

addIcons(LaCogSolid, IoClose);

import '@/index.css'
import './assets/main.css'

const app = createApp(App)

app.component("v-icon", OhVueIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
