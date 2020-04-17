// 服务端入口文件
const express = require("express");
const mongoose = require("mongoose");
let app = express();

const users = require("./routes/api/user");



// 路由
app.get("/", (req, res) => {
  res.send("hello world")
})

// 中间件
app.use("/api/users", users);


// 监听端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server running on ${port}`);
})

// 连接数据库 https://developer.mozilla.org/zh-CN/docs/learn/Server-side/Express_Nodejs/mongoose
// const uri = require("./config/milydb").mongoURI;
const uri = 'mongodb://localhost:27017/mongoosesample';
mongoose.connect(uri
  ,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
)

mongoose.connection.on('connected', function () { 
  console.log('Mongoose connection open to ' + DB_URL);
}); /** * 连接异常 */ 

mongoose.connection.on('error',function (err) { 
 console.log('Mongoose connection error: ' + err);
}); 
// 取得默认连接
