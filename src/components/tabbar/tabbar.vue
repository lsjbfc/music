<template>
  <footer class="page-footer">
    <router-link
      :to="{name:'main'}"
      class="list-item"
    >
      <i :class="{active:$route.name==='main'}"></i>
      <span>首页</span>
    </router-link>
    <router-link
      :to="{name:'projects'}"
      class="list-item"
    >
      <i :class="{active:$route.name==='projects'}"></i>
      <span>平台项目</span>
    </router-link>
    <router-link
      :to="{name:'find'}"
      class="list-item"
    >
      <i :class="{active:$route.name==='find'}"></i>
      <span>发现</span>
    </router-link>
    <router-link
      :to="{name:'me'}"
      class="list-item"
    >
      <i :class="{active:$route.name==='me'}"></i>
      <span>我的</span>
    </router-link>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      path: ""
    };
  },
  created() {
    // console.log(this.$route.name)
  }
};
</script>

<style lang="less">
@import url("./tabbar.less");
</style>
