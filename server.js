// 服务端入口文件
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const users = require("./routes/api/user");



// 路由
app.get("/", (req, res) => {
  res.send("hello world")
})

// 解析post表单请求  必须要放在路由配置之前
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// 中间件
app.use("/api/users", users);

// 监听端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
})

// 连接数据库 https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose
// const uri = require("./config/milydb").mongoURI;
// const uri = "mongodb://mily:123456@127.0.0.1:27017/?gssapiServiceName=mongodb/easy_admin";
const uri = 'mongodb://127.0.0.1:27017/?gssap\iServiceName=mongodb';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

mongoose.connection.on('connected', function () { 
  console.log('Mongoose connection open !!!!!!!!! ');
}); /** * 连接异常 */ 

mongoose.connection.on('error',function (err) { 
 console.log('Mongoose connection error: ' + err);
}); 
// 取得默认连接


/**
 * 总结：
 * 引入express
 * 创建服务器
 * 监听端口
 * 创建路由 
 * 
 * 引入mongoose
 * mongoose连接数据库
 * 
 * 写路由：routes/api/
 * 创建数据模型model
 * 
 * 接口验证数据模型中是否已存在某字段
 * 
 * 
 * 安装 ：
 * mongoose、连接数据库
 * body-parser、 解析post请求
 * bcrypt
 * 
 * 
 * 
 * 
*/