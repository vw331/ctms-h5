const system = {
  state: {
    defaultTitle: document.title,
    title: '',
    dict: [],
    dictBiz: [],
    menus: [],
    buttons: []
  },
  actions: {},
  mutations: {
    SET_TITLE: (state, title) => {
      state.title = title ? `${title} - ${state.defaultTitle}` : state.defaultTitle
    },
    SET_INIT_DATA: (state, {dict, dictBiz, menus, buttons}) => {
      state.dict = [...dict, ...dictBiz];
      //state.dictBiz = dictBiz;
      state.menus = menus;
      state.buttons = buttons;
    }
  },

}

export default system