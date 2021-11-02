import axios from 'axios'
import { preHandle, responseHandle } from './interceptor'
import website from '@/config/website.js'
import { Base64 } from 'js-base64';

//创建实例
const request = axios.create({
  //baseURL: '/api',
  timeout: 1000 * 100 
})

request.defaults.headers.post['Content-Type'] = 'application/json'
request.defaults.headers['Authorization'] = `Basic ${Base64.encode(`${website.clientId}:${website.clientSecret}`)}`;
/**
 * 请求拦截器
 * 配置token
 * **/
request.interceptors.request.use(...preHandle())

/**
 * 响应拦截器
 **/
request.interceptors.response.use(...responseHandle())


export default request

export const setRequestToken = token => {
  request.defaults.headers.common['Blade-Auth'] = token;
}

