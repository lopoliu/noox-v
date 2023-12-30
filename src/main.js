import './assets/main.css'

import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {ConfigProvider} from "vant"
import createPersistedState from "pinia-plugin-persistedstate"
import { Lazyload } from 'vant';

import App from './App.vue'
import router from './router'
import "vant/lib/index.css"
const app = createApp(App)

const pinia = createPinia()
pinia.use(createPersistedState)
app.use(ConfigProvider)
app.use(Lazyload)
app.use(pinia)
app.use(router)

app.mount('#app')
