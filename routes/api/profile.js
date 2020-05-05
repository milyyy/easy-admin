// profile 信息
const express = require("express");
const router = express.Router();
const passport = require("passport");
const Profile = require("../../models/Profile");

router.get("/test", (req, res)=> {
  res.json("api/profile/test")
})

/**
 * @route POST api/profile/add
 * @desc  创建信息接口
 * @access Private, 需验证token
*/
router.post("/add", passport.authenticate('jwt', {session: false}), (req, res) => {
  const addInfo = {};
  if (req.body.type) addInfo.type = req.body.type;
  if (req.body.desc) addInfo.desc = req.body.desc;
  if (req.body.income) addInfo.income = req.body.income;
  if (req.body.expend) addInfo.expend = req.body.expend;
  if (req.body.cash) addInfo.cash = req.body.cash;
  if (req.body.remark) addInfo.remark = req.body.remark;

  new Profile(addInfo).save().then(info => {
    res.json(info)
  })
})

/**
 * @route GET api/profile
 * @desc  获取所有信息
 * @access Private, 需验证token
*/
router.get("/", passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.find().then(info => {
    if(!info) {
      return res.status(400).json("暂无信息")
    }
    res.json(info)
  }).catch(err => {
    res.status(404).json(err);
  })
})

/**
 * @route GET api/profile/:id
 * @desc  获取单个信息
 * @access Private, 需验证token
*/
router.get("/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOne({_id: req.params.id}).then(info => {
    if(!info) {
      return res.status(400).json("暂无信息")
    }
    res.json(info)
  }).catch(err => {
    res.status(404).json(err);
  })
})

/**
 * @route POST api/profile/edit/:id
 * @desc  修改单个信息
 * @access Private, 需验证token
*/
router.post("/edit/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  const addInfo = {};
  if (req.body.type) addInfo.type = req.body.type;
  if (req.body.desc) addInfo.desc = req.body.desc;
  if (req.body.income) addInfo.income = req.body.income;
  if (req.body.expend) addInfo.expend = req.body.expend;
  if (req.body.cash) addInfo.cash = req.body.cash;
  if (req.body.remark) addInfo.remark = req.body.remark;

  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: addInfo}, // 更新的内容
    {new: true}
  ).then(info => {
    res.status(200).json(info)
  })
})

/**
 * @route POST api/profile/delete/:id
 * @desc  删除单个信息
 * @access Private, 需验证token
*/
router.delete("/delete/:id", passport.authenticate('jwt', {session: false}), (req, res) => {
  Profile.findOneAndDelete({_id: req.params.id})
    .then( info => {
      // Profile.save(info);
      res.status(200).json(info);
    })
    .catch(err => res.status(400).json(err))
})


module.exports = router;