<template>
  <el-form
    :model="form"
    status-icon
    ref="form"
    :rules="rules"
    label-width="auto"
    class="login-container"
  >
    <h3 class="login_title">系统登录</h3>
    <el-form-item
      label="用户名"
      label-width="80px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        utocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        utocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login">登录</el-button>
    </el-form-item>
    <router-link to="/regist" style="font-size: 12px; color: red"
      >还没有账号？立即注册</router-link
    >
  </el-form>
</template>

<script>
import { getMenu } from "../../api/data";
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          {
            require: true,
            message: "请输入用户名",
            trigger: "blur",
          },
          {
            min: 3,
            message: "用户名长度不能少于3位",
          },
        ],
        password: [
          {
            require: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        if (res.status === 0) {
          this.$message.success(res.message);
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  text-align: center;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_submit {
  display: flex;
  justify-content: center;
}
</style>