const mongoose = require("mongoose");
const { Schema } = mongoose;

// create schema 创建数据模型
const profileSchema = new Schema({
  type: {
    type: String,
  },
  desc: {
    type: String,
  },
  income: {
    type: String,
    required: true
  },
  expend: {
    type: String,
    required: true
  },
  cash: {
    type: String,
    required: true
  },
  remark: {
    type: String,
  },
  data: {
    type: String,
    default: Date.now
  },

});

module.exports = Profile = mongoose.model("profile", profileSchema);