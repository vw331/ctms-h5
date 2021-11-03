const system = {
  state: {
    defaultTitle: document.title,
    title: '',
  },
  actions: {},
  mutations: {
    SET_TITLE: (state, title) => {
      state.title = title ? `${title} - ${state.defaultTitle}` : state.defaultTitle
    }
  },

}

export default system