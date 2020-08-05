import axios from 'axios';
import { baseApi } from '@/config';

// create an axios instance
const service = axios.create({
  baseURL: baseApi, // url = base api url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
});

const errfunc = () => console.log('出错！');
// request 拦截器 request interceptor
service.interceptors.request.use(config => {
  console.log('请求拦截器1');
  if (console.method === 'post') {
    // config = xxxx;
    return config; // 修改config  并显式地返回 从而传递值
  }
}, errfunc);

// respone拦截器
service.interceptors.response.use(respone => {
  console.log('请求响应~');
  return respone.data;
}, errfunc);

export default service;