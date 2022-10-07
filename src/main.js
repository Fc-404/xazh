import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/public.css'
import './assets/css/animation.css'
import '@lottiefiles/lottie-player'

const app = createApp(App)
app.use(router).mount('#app')