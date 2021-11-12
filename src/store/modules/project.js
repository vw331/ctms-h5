const project = {
  state: {
    projectId: '',
  },
  actions: {},
  mutations: {
    SET_PROJECT_ID: (state, id) => {
      console.log(id)
      state.projectId = id
    }
  },

}

export default project