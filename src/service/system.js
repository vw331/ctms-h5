import request from '@/core/axios'
import md5 from 'js-md5'
import { ref } from 'vue'
import { Notify } from 'vant';
import store from '@/store'
import { Toast } from 'vant';

/**
 * 获取登录验证码
 * @returns 
 */
export const useCaptchaImg = () => {
  const captchaImg = ref("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")
  const captchaKey = ref('')

  const getCaptchaImg = async () => {
    const data = await request.get('/api/blade-auth/oauth/captcha')
    captchaImg.value = data.image
    captchaKey.value = data.key
  }

  return {
    getCaptchaImg,
    captchaImg,
    captchaKey
  }
}

/**
 * 登录
 * @param {*} async 
 */

export const useLogin = () => {

  const loginLoading = ref(false)

  const login = async form => {
    try {
      loginLoading.value = true
      const { username, password, grant_type, scope, type, tenantId, captchaCode, captchaKey } = form
      const data = await request({
        method: 'post',
        url: '/api/blade-auth/oauth/token',
        headers: {
          'Tenant-Id': tenantId,
          'Captcha-Code': captchaCode,
          'Captcha-Key': captchaKey
        },
        params: {
          tenantId,
          username,
          password: md5(password),
          grant_type,
          scope,
          type,
        }
      })
      if (data.error_code) {
        Notify({ type: 'danger', message: data.error_description });
      } else {
        Notify({ type: 'success', message: '登录成功!' });
        store.commit('SET_TOKEN', data.access_token)
        store.commit('SET_REFRESH_TOKEN', data.refresh_token)
        return true
      }
    } catch (error) {
      console.log(error)
    } finally {
      loginLoading.value = false
    }
  }

  return {
    loginLoading,
    login
  }
}

/**
 * 登出
 * @returns 
 */
export const useLogout = () => {

  const logoutLoading = ref(false)
  const logout = async () => {
    try {
      logoutLoading.value = true
      await request('/api/blade-auth/oauth/logout')
      store.commit('CLEAR_USER')
    } catch (err) {
      console.log(err)
    } finally {
      logoutLoading.value = false
    }
  }

  return {
    logoutLoading,
    logout
  }

}

/**
 * 用户信息
 * @returns 
 */
export const useUserInfo = () => {

  const userInfoLoading = ref(false)
  const getUserInfo = async () => {
    const loadingToast = Toast.loading({
      message: '初始化...',
      forbidClick: true,
      loadingType: 'spinner',
    });
    try {
      userInfoLoading.value = true
      const data = await request('/api/blade-user/info')
      store.commit('SET_USER_INFO', data.data)
    } catch (err) {
      console.log(err)
      throw err
    } finally {
      loadingToast.clear()
      userInfoLoading.value = false
    }
  }

  return {
    getUserInfo,
    userInfoLoading
  }
}

/**
 * 初始化数据
 */
export const useInitialization = () => {
  const loading = ref(false)
  const initAll = async () => {
    try {
      loading.value = true
      const res = await Promise.all([
        request('/api/blade-system/dict/list'),
        request('/api/blade-system/dict-biz/list'),
        request('/api/blade-system/menu/routes'),
        request('/api/blade-system/menu/buttons')
      ])
      const [dict, dictBiz, menus, buttons] = res.map(item => item.data)
      store.commit('SET_INIT_DATA', {
        dict, dictBiz, menus, buttons
      })
    }catch(err) {
      console.log(err)
    }finally {
      loading.value = false
    }
  }

  return {
    loading,
    initAll
  }
}