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

axios.interceptors.request.use(config => {
  startLoading();
  if (localStorage.getItem('token')) {
    config.headers.Authrization = localStorage.getItem('token')
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
  Message.error(err.response.data);
  // token 过期处理
  const { status } = err.response;
  if(status == '401') {
    Message.error('token过期，请重新登录！');
    router.push("/login");
    localStorage.removeItem('token');
  }

  return Promise.reject(err);
})

export default axios