// profile 信息
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

router.get("/test", (req, res)=> {
  res.json("api/profile/test")
})


module.exports = router;