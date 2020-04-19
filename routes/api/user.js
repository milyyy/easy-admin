// login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
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

module.exports = router;