// login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

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
  // console.log(req.body);
  // 在数据库(model)查询邮箱是否存在
  User.findOne({email: req.body.email}).then( user => {
    if (user) {
      return res.status(400).json({email: "该邮箱已注册"})
    } else {
      const newUser = new User({
        name: req.body.name,
        pass: req.body.pass,
        email: req.body.email,
        // avatar
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