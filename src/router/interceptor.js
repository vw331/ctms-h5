import store from '@/store'
import { Toast } from 'vant';
import { useUserInfo } from '@/service/system'
import { useProject } from '@/service/project'
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
export const afterEnterInterceptor = () => {
  const originTitle = document.title
  return (to) => {
    const name = to.name
    const { title } = to.meta
    document.title = (title || name) + ' - ' + originTitle
  }
}

// 项目拦截器
export const projectInterceptor = async (to, from, next) => {
  const { getProject, loading } = useProject()

  watchEffect(() => {
    if (loading) {
      Toast.loading({
        message: '正在进入...',
        forbidClick: true,
      })
    } else {
      Toast.clear()
    }
  })

  const { projectId } = to.params
  const { data } = await getProject(projectId)
  to.params = {
    ...to.params,
    detail: data,
  }
  next()
}
