# easy-admin
node.js+vue全家桶搭建一个前后端连载的极简后台


目标：
- 前端
  - [ ] vue.js路由全家桶使用
  - [ ] i18N国际化使用

- 服务端
  - [x] Mongodb数据库链接 
  - [x] 登录注册
  - [x] jwt验证
  - [ ] 侧边栏菜单路由渲染


目录：
```
├─config
    └─keys.js         // 数据库地址 
    └─passport.js     // token 验证
├─models              // 数据模型
├─node_modules        // 所需依赖
└─routes
    └─api             // 路由
├─package.json        
├─server.js           // 入口文件        
``` 


easy-admin package.json：
```
scripts: {
  "client-install": "npm install --prefix client",   // 启动安装client的依赖模块
  "client": "npm start --prefix client",    // 启动前端项目
  "dev": "concurrently \"npm run server\" \"npm run client\"" // 前后端连载

}
```