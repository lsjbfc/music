<template>
  <!-- 首页 -->
  <div class="page index-page"></div>
</template>Í
<script>
import "./index.less";
import categoryTitle from "@/components/category-title/category-title.vue";
import {
  GetTopAdList,
  GetNoticeList,
  GetTopProjectList
} from "../../api/index.js";
export default {
  data() {
    return {};
  },
  components: {
    categoryTitle
  },
  created() {},
  methods: {}
};
</script>
<style lang="less">
@import url("./index.less");
</style>
