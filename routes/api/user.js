// login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const KEYS = require("../../config/keys");

/**
 * $route GET /api/users/test
 * @desc 返回请求的json数据
 * 
 * */ 
router.get("/test", (req, res) => {
  res.json(
    { msg: "login work" }
  )
})
// 注册
router.post("/register", (req, res) => {
  /**
   * 在数据库(model-User)查询邮箱是否存在
   * 如果存在则抛出错误
   * 不存在则创建新用户，并加密密码
   * 
  */
  User.findOne({email: req.body.email}).then( user => {
    if (user) {
      return res.status(400).json({email: "该邮箱已注册"})
    } else {
      const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'}); // 头像
      const newUser = new User({
        name: req.body.name,
        pass: req.body.pass,
        email: req.body.email,
        avatar
      })
      // bcrypt 密码加密
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.pass, salt, (err, hash) => {
          // Store hash in your password DB.
          if (err) throw err;
          newUser.pass = hash;
          newUser.save()
            .then( user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  })
})

// 登录 （根据邮箱判断密码是否匹配）
router.post("/login", (req, res) => {
  const email = req.body.email;
  const pass = req.body.pass;
  User.findOne({email}).then(user => {
    if (!user) {
      return res.status(404).json({email: "用户不存在"})
    };
    // 密码匹配 验证请求密码与数据库密码是否相等
    bcrypt.compare(pass, user.pass).then(isMatch => {
      if(isMatch) {
        // jwt.sign("规则","加密名字","过期时间","箭头函数")
        const rule = {id:user.id, email:user.email};
        jwt.sign(rule, KEYS.secretKeys, {expiresIn: 3600*2}, (err, token)=>{
          if(err) throw err;
          return res.json({
            msg: "success",
            token: "Bearer " + token
          })
        })
      } else {
        return res.status(400).json({msg: "密码不正确"})
      }
    })
  })
})

// 验证token获取某条信息 https://www.npmjs.com/package/passport
router.get("/current", passport.authenticate('jwt', {session: false}), (req, res)=>{
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email
  })
})




module.exports = router;