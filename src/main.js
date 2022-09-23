import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/main.css'


const app = createApp(App)

app.use(router)

app.mount('#app')
