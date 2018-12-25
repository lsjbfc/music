<template>
  <div class="error-404">
    <p class="page-container">404 page not found</p>
    <div class="page-container">
      <router-link :to="{name:'index'}">返回首页</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "404",
  mounted() {
    this.allloaded();
  }
};
</script>

<style lang="less" scoped>
.error-404 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.page-container {
  font-size: 20px;
  text-align: center;
  margin: 30px 0;
}
</style>
