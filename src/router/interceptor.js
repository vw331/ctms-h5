import store from '@/store'
import { Toast } from 'vant';
import { useUserInfo } from '@/service/system'
import { useAll } from '@/service/project'
import { watchEffect } from 'vue'

// 权限守卫
export default async (to, from, next) => {
  const { token, userInfo } = store.getters

  if (token) {
    // 已登录状态
    if (userInfo) {
      next()
    } else {
      const { getUserInfo } = useUserInfo()
      try {
        await getUserInfo()
        next()
      } catch (err) {
        next({ name: 'Login' })
      }
    }
  } else {
    // 未登陆状态
    const { requiresAuth = true } = to.meta
    if (requiresAuth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      })
    } else {
      next()
    }
  }

}

// 后置钩子
export const afterEnterInterceptor =  (to) => {
  const name = to.name
  const { title } = to.meta
  store.commit('SET_TITLE', title)
}

// 项目拦截器
export const projectInterceptor = async (to, from, next) => {
  const { getAll, loading } = useAll()

  watchEffect(() => {
    if (loading.value) {
      console.log('loading 开始')
      Toast.loading({
        message: '正在进入...',
        forbidClick: true,
      })
    } else {
      console.log('loading 结束')
      Toast.clear()
    }
  })

  const { projectId } = to.params
  const { detail, menu, mem, center } = await getAll(projectId)

  to.params = {
    ...to.params,
    detail,
    menu,
    mem,
    center
  }
  next()
}
