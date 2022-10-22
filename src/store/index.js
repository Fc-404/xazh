import { createStore } from 'vuex'
import tools from '@/assets/js/tools'

export default createStore({
  state: {
    tools: tools,
    title: 'XaZh - ',
    server: 'localhost:9000',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    assets: {
      state: {
        error404: require('@/assets/jsonIcon/404.json')
      }
    },
  }
})
