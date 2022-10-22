import { createApp } from 'vue'
import cookies from 'vue-cookies'
import App from './App.vue'
import store from './store'
import router from './router'

import './assets/css/fonts.css'
import './assets/css/public.css'
import './assets/css/animation.css'

const app = createApp(App).
  use(store).
  use(router).
  use(cookies).
  mount('#app')
