import { Toast } from 'vant'
import store from '@/store'

Toast.allowMultiple()

/**
 * 异常提示函数
 */
 const tip = (message, type = 'fail') => {
  Toast({
    message,
    type
  })
}

/**
 * 统一异常处理
 * @param(Number) status 请求失败状态码
 **/
 const errorHandle = (status, msg) => {
  //状态码判断
  switch (status) {
  //401: 未登录状态
  case 401:
    tip(msg || '未授权')
    store.commit('CLEAR_USER')
    break;
    //403 token 过期
  case 403:
    tip(msg || '登录过期，请重新登录')
    store.commit('CLEAR_USER')
    break;
  case 404:
    tip(msg || '404,请求的资源不存在')
    break;
  case 500:
    tip('500,服务错误')
    break;
  default:
    console.warn(msg)
    tip(msg || `连接失败: ${status}`)
  }
}

/**
 *  请求之前
 */
const preHandle = () => {
  return [
    function(config) {
      return config
    },
    function(error) {
      return Promise.reject(error);
    }
  ]
}

/**
 *  请求之后
 */
const responseHandle = () => {
  return [
    function(res) {
      return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
    },
    function(error) {
      const { response } = error
      if (response) {
        errorHandle(response.status, response.data.msg)
        return Promise.reject(response.statusText)
      } else {
        //未返回,超时或断网
        tip('请求超时')
      }
    }
  ]
}

export {
  preHandle,
  responseHandle
}