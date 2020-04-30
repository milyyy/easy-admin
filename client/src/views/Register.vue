<template>
  <div class="register">
    <h1 class="title">Easy-admin后台管理系统</h1>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="registerForm"
        status-icon
        label-width="80px"
        class="ruleForm"
        size="small"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择身份" prop="identity">
          <el-select v-model="ruleForm.identity" placeholder="请选择身份">
            <el-option label="管理员" value="admin"></el-option>
            <el-option label="其他" value="other"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
        </el-form-item>
        <el-form-item align="right">
          <span>已有账号，马上
            <router-link to="/login">登录</router-link>
          </span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'register',
  data() {
    // 验证器校验
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    var validateEmail = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        email: "",
        pass: "",
        identity: "admin",
        checkPass: "",
      },
      rules: {
        // 两种验证方式，一种验证器validator验证，另一种直接在rules里设置验证规则
        name: [
          { required:true, message:"用户名不能为空", trigger:"blur"},
          { min:3, max:10, message:"长度在3-10字符", trigger:"blur"}
          // { validator: validateName, trigger: "blur" }
        ],
        email: [
          { required:true, message: "邮箱不能为空", trigger: "blur"},
          { type:'email', message: "邮箱格式不正确", trigger: "blur"}
          // { validator: validateEmail, trigger: "blur" }
        ],
        pass: [
          { required:true, message: "密码不能为空", trigger: "blur"},
          { min:4, max:10, message:"密码长度在4-10位", trigger: "blur"},
          // { validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { validator: validatePass2, trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/register", this.ruleForm).then(res => {
            this.$message({
              message: "注册成功",
              type: "success"
            });
            this.$router.push("/login")
          }).catch(
            err => {
              this.$message({
                message: err,
                type: "warning"
              });
            }
          )
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.register {
  width: 100%;
  height: 100%;
  background: no-repeat center/100% url("../assets/imgs/bg.jpg");
  overflow: hidden;
  .title {
    width: 400px;
    margin: auto;
    margin-top: 100px;
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #fff;
  }
  .form {
    margin: 0 auto;
    width: 350px;
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    /deep/ .el-form-item{
      &:last-child{
        margin-bottom: 0;
      }
    } 
  }
}
</style>