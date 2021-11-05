import { Toast } from 'vant'
import store from '@/store'
import { ref } from 'vue'
import { CancelToken  } from 'axios'

// 取消队列
const cancleQueue = ref([])

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
    tip('500, 服务错误')
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
      if(config.$loading) {
        config.$loadingInstance = Toast.loading({
          message: config.$loading,
          forbidClick: true,
          duration: config.timeout
        });
      }
      config.cancelToken = new CancelToken(function executor(c) {
        // executor 函数接收一个 cancel 函数作为参数
        cancleQueue.value.push(c)
      })
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
      cancleQueue.value.shift()
      // 跳过拦截器
      const { $originalResponse = false, $loading = false } = res.config
      if($loading) {
        res.config.$loadingInstance.clear()
      }
      return res.status === 200 ? Promise.resolve($originalResponse ? res : res.data) : Promise.reject(res)
    },
    function(error) {
      cancleQueue.value.shift()
      const { response } = error
      if (response) {
        if(response.status == '401') {
          cancleQueue.value.forEach(cancle => Reflect.apply(cancle, undefined, [401]))
        }
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