import { useDic } from '@/service/dic'

// 使用字典
let transformDicFn;
export const dic = (...rest) => {
  if(!transformDicFn) {
    let { transformDic } = useDic()
    transformDicFn = transformDic
  }
  return transformDicFn(...rest)
}

// 隐私处理手机号码
export const encryptionPhone = phone => {
  const result = Array.from(phone);
  result.splice(3, 4, '*', '*', '*', '*')
  return result.join('')
}