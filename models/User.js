const mongoose = require("mongoose");
// const Schema = mongoose.Schema();
const { Schema } = mongoose;

// create schema 创建数据模型
const userSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  pass: {
    type: String,
    require: true
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", userSchema);