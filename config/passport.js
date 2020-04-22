/*
  * token 身份验证, 获取数据的令牌
  * current是为了拿到数据库中的某条数据，必须验证token
  * 验证成功反应对应的内容，这里返回了user用户信息
  * 过程： 在server.js初始化passport => 在passport.js验证token => 在数据库验证返回的信息是否存在
  * 
*/ 

const User = require("../models/User");
const KEYS = require("./keys");

// https://www.npmjs.com/package/passport-jwt
const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports = (passport) => {
  // 接收来自server.js传递的passport
  // 开始验证
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // jwt_payload: 验证后获取到的用户信息
    // done： 回调函数
    // console.log(jwt_payload);
    User.findById(jwt_payload.id).then( user => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }).catch(err => {
      console.log(err);    
    })
  }))
}