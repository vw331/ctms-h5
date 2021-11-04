export default  { 
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  dictTransform: state => (code, key) => {
    const { children: dictAll = [] } = state.system.dict.find(item => item?.code == code) || []
    if (!key) return dictAll
    if (dictAll.length == 0) return '--'
    const dictValue = dictAll.find(item => item?.dictKey == key)?.dictValue
    return dictValue
  },
}