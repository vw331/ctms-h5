import store from '@/store'
import { Toast } from 'vant';
import { useUserInfo, useInitialization } from '@/service/system'
import { useAll, initAll } from '@/service/project'
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
      const { initAll } = useInitialization()
      try {
        await getUserInfo()
        await initAll()
        next()
      } catch (err) {
        next({
          name: 'Login',
          query: { redirect: to.fullPath }
        })
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
export const afterEnterInterceptor = (to) => {
  const name = to.name
  const { title } = to.meta
  store.commit('SET_TITLE', title)
}

// 项目拦截器
export const projectInterceptor = async (to, from, next) => {
  const { getAll, loading } = useAll()

  watchEffect(() => {
    if (loading.value) {
      Toast.loading({
        message: '正在进入...',
        forbidClick: true,
      })
    } else {
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
