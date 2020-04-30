// 请求封装
import axios from "axios"
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
  return Promise.reject(err);
})

export default axios