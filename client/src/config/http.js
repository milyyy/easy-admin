// 请求封装
import axios from "axios"
import router from '../router/index'
import { Message, Loading } from 'element-ui'

let loading;
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,.333)'
  })
}
function closeLoading() {
  loading.close();
}

axios.defaults.timeout = 5000;

axios.interceptors.request.use(config => {
  startLoading();
  if (localStorage.getItem('token')) {
    config.headers.Authorization = localStorage.getItem('token')
  }
  return config;
}, err => {
  closeLoading();
  return Promise.reject(err)
})

axios.interceptors.response.use(res => {
  closeLoading();
  return res;
}, err => {
  closeLoading();
  // Message.error(err.response.data);
  // token 过期处理
  let status  = err && err.response;
  switch (status) {
    case 400:
      Message.error('请求错误！');
      break;
    case 401:
      Message.error('token过期，请重新登录！');
      router.push("/login");
      localStorage.removeItem('token');
      break;
    case 404:
      Message.error('请求错误，未找到该资源');
      break;
    case 405:
      Message.error('请求方法未允许');
      break;
    default:
      Message.error('请求超时');
  }
    
  return Promise.reject(err);
})

export default axios