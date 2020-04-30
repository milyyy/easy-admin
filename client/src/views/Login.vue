<template>
  <div class="login">
    <h1 class="title">Easy-admin后台管理系统</h1>
    <div class="form">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="loginForm"
        status-icon
        label-width="80px"
        class="ruleForm"
        size="small"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submitForm('loginForm')">登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
        <el-form-item align="right">
          <span>还没有账号？现在
            <router-link to="/register">注册</router-link>
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
    return {
      ruleForm: {
        name: "",
        email: "",
        pass: "",
      },
      rules: {
        email: [
          { validator: validateEmail, trigger: "blur" }
        ],
        pass: [
          { validator: validatePass, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios.post("/api/users/login", this.ruleForm).then(res => {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            const { token } = res.data;
            localStorage.setItem('token', token);
            this.$router.push("/index")
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
.login {
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