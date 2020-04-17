// login & register
const express = require("express");
const router = express.Router();

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

module.exports = router;