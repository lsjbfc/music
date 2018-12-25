<template>
  <div class="page">
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>
<script>
import tabbar from "@/components/tabbar/tabbar.vue";
export default {
  components: {
    tabbar
  }
};
</script>
