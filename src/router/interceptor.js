import store from '@/store'
import { useUserInfo } from '@/service/system'

const whiteList = ['Login']

export default async (to, from, next) => {

  const { token, userInfo } = store.getters

  // 白名单页面直接通过
  if(whiteList.includes(to.name)) {
    next()
  }else {
    if(token) {
      if(userInfo) {
        next()
      }else {
        const { getUserInfo } = useUserInfo()
        try {
          await getUserInfo()
          next()
        }catch(err){
          next({name: 'Login'})
        }
        
      }
    }else {
      next({name: 'Login'})
    }
  }
}
