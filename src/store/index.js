import { createStore } from 'vuex'
import user from './modules/user'
import system from './modules/system'
import project from './modules/project'
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
    system,
    project
  },
  getters
})
