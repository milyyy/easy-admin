// 服务端入口文件
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const verPass = require("./config/passport");
const app = express();

const users = require("./routes/api/user"); // suers将作为数据库表名
const profile = require("./routes/api/profile");


// 解析post表单请求  必须要放在路由配置之前
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// passport初始化
app.use(passport.initialize());
// 分离模块，给passport.js传递初始化过后的passport
require("./config/passport")(passport);



// 中间件
app.use("/api/users", users);
app.use("/api/profile", profile);

// 监听端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
})

// 连接数据库 https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose
const uri = require("./config/keys").mongoURI;
// const uri = "mongodb://mily:123456@127.0.0.1:27017/?gssapiServiceName=mongodb/easy_admin";
// const uri = 'mongodb://127.0.0.1:27017/?gssap\iServiceName=mongodb';
mongoose.set('useCreateIndex', true);
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
)

mongoose.connection.on('connected', function () { 
  console.log('Mongoose connection open !!!!!!!!! ');
});

mongoose.connection.on('error',function (err) { 
 console.log('Mongoose connection error: ' + err);
}); 


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