# client 客户端

## 技术点
- [x] 登录验证 token存储
- [x] 路由守卫钩子处理
- [x] 路由模块化
- [x] vuex模块化处理
- [x] 组件封装
- [x] 公用方法封装处理
- [x] transition动画过渡


## token处理
- 前端发送登录请求至服务器
- 验证通过返回token
- 前端将token存储值localstorage
  ```js
  submitForm(formName) {
    this.$refs[formName].validate(valid => {
      if (valid) {
        this.$axios.post("/api/users/login", this.ruleForm).then(res => {
          this.$message({
            message: "登录成功",
            type: "success"
          });
          // token本地存储，并在请求头响应头中处理
          const { token } = res.data;
          localStorage.setItem('token', token);
          // 解析token并存储到vuex中
          const decoded = jwt_decode(token); //从token中解析的用户信息
          this.$store.dispatch('setAuth', !isEmpty(decoded));
          this.$store.dispatch('setUser', decoded);
          this.$router.push("/index");
        })
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  },
  ```
- axios请求头中加入authrization字段，值为token
  ```js
  // http.js
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
  ```
- axios响应错误中判断token是否过期，过期则清除之前存储的token
  ```js
  // http.js
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
  ```
- 前端jwt-decode解析token，并改变vuex中认证状态，存储个人信息
  ```js
  const decoded = jwt_decode(token); //从token中解析的用户信息
  this.$store.dispatch('setAuth', !isEmpty(decoded));
  this.$store.dispatch('setUser', decoded);
  ``` 
- vuex/user.js 存储个人信息