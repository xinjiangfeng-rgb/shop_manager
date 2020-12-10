<template>
  <el-button type="info" @click="loginOut()">退出</el-button>
</template>

<script>
export default {
  methods: {
      //退出功能的实现
    loginOut() {
      window.sessionStorage.clear();
      this.$router.replace("/login");
    },
  },
}
</script>

<style lang="less" scoped></style>
