// 字典
import store from '@/store/'

export const useDic = () => {
  const dict = store.state.system.dict

  const transformDic = (...rest) => {
    const [code, dictKey] = rest
    const result = dict.find(item => item.code == code)
    if(dictKey) {
      if(result.children) {
        const dic =  result.children.find(item => item.dictKey == dictKey)
        return dic?.dictValue
      }else {
        result?.dictValue
      }
    }else {
      return result
    }
  }

  return {
    transformDic
  }
}