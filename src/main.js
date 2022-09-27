import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import readJson from './assets/js/readJson.js'

import './assets/font-awesome-4.7.0/css/font-awesome.min.css'
import './assets/main.css'

const app = createApp(App)

// Set global variables
readJson.apply(app, ['/json/committee.json','committee'])
readJson.apply(app, ['/json/projects_total.json','projectsList'])

app.use(router)

app.mount('#app')
