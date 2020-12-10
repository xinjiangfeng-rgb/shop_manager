<template>
  <div class="login_view">
    <div class="login-box">
      <div class="avator-box">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <div>
        <el-form
          class="login-form"
          :model="loginForm"
          ref="loginFormRef"
          :rules="loginFromRouls"
          label-width="60px"
        >
          <el-form-item prop="username">
            <el-input
              prefix-icon="iconfont icon-user"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              prefix-icon="iconfont icon-3702mima"
              v-model="loginForm.password"
              type="password"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="login">提交</el-button>
            <el-button type="info" @click="resetLoginForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },

      loginFromRouls: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    //点击重置按钮，重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //element登录验证表单
    login() {
      this.$refs.loginFormRef.validate((isSuccess, obj) => {
        console.log(isSuccess);

        if (!isSuccess) return;

        request()
          .post("login", this.loginForm)
          .then((data) => {
            const { data: res } = data; //对象拆分
            if (res.meta.status !== 200) return this.$message.error("登录失败");
            this.$message.success("登录成功");
            //将token保存到sessionStorage中
            window.sessionStorage.setItem("token", res.data.token);
            //跳转到首页
            this.$router.push("/home");
          });
      });
    },
  },
};
</script>
<style lang="less" scoped>
.login_view {
  background-color: #2b4b6b;
  height: 100%;
}
.login-box {
  width: 450px;
  height: 360px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;

  div {
    height: 100%;
    .login-form {
      width: 100%;
      position: absolute;
      bottom: 60px;
      width: 100%;
      padding: 0 20px;
      text-align: center;
      box-sizing: border-box;
    }
  }
  .avator-box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;

    img {
      background-color: #eee;
      widows: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
</style>
