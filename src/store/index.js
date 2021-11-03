import { createStore } from 'vuex'
import user from './modules/user'
import system from './modules/system'
import getters from './getters'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    system
  },
  getters
})
