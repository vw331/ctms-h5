import { setStore, getStore } from '@/util/store'

const user = {
  state: {
    token: getStore({ name: 'token' }) || '',
    refreshToken: getStore({ name: 'refreshToken' }) || '',
    userInfo: null,
    permission: null,
    roles: null,
  },
  actions: {

  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
      setStore({ name: 'token', content: state.token })
    },
    SET_REFRESH_TOKEN: (state, refreshToken) => {
      state.refreshToken = refreshToken
      setStore({ name: 'refreshToken', content: state.refreshToken })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    CLEAR_USER: (state) => {
      state.token = ''
      state.userInfo = null
      state.refreshToken = ''
      setStore({ name: 'token', content: '' })
      setStore({ name: 'refreshToken', content: '' })
    }
  }
}

export default user