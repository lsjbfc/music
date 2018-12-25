<template>
  <!-- 首页 -->
  <div class="page index-page">
    <!-- 轮播图 -->
    <div class="slideshow"></div>
    <!-- 精选标题 -->
    <category-title
      title="项目展示"
      after="更多"
      @handelafter="go('projects')"
    ></category-title>
    <!-- 精选列表 -->
    <section
      class="selection-list"
      aspectratio
    >
      <div
        class="list-item"
        v-for="(item,index) in ProjectList"
        :key="index"
        @click="goDetail(item.Id)"
      >
        <div class="left">
          <span class="top">{{item.Name}}</span>
          <span class="bottom">{{item.Remark}}</span>
        </div>
        <div class="right">
          <span class="top mark">
            <span>{{item.Price || 0 | FormattedAmount(3) | formattingNumber}}</span>元/股
          </span>
          <span class="bottom">
            已有
            <span class="number">{{item.Number}}</span>人参与
          </span>
        </div>
      </div>
    </section>
    <!-- 广告标题 -->
    <category-title
      title="平台公告"
      after="更多"
      @handelafter="go('notice')"
    ></category-title>
    <!-- 广告列表 -->
    <div
      class="advertising-list"
      aspectratio
    >
      <div
        class="list-item"
        v-for="(item,index) in noticelist"
        :key="index"
        @click="link(item.Url)"
      >
        <span class="left">{{item.Name}}</span>
        <span class="right number">{{item.Time}}</span>
      </div>
    </div>
  </div>
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
    return {
      /**
       * 轮播图
       */
      adlist: [],
      index: "",
      /**
       * 项目精选
       */
      ProjectList: [],
      /**
       * 公告
       */
      noticelist: []
    };
  },
  components: {
    categoryTitle
  },
  // mixins: [loading],
  created() {
    this.init();
  },
  methods: {
    go(name) {
      this.$router.push({ name });
    },
    link(url) {
      window.location.href = url;
    },
    onIndexChange() {},
    init() {
      Promise.all([
        this.GetTopAdList(),
        this.GetNoticeList(),
        this.GetTopProjectList()
      ])
        .then(() => {
          this.loaded();
        })
        .catch(() => {
          this.loaded();
        });
    },
    goDetail(id = "") {
      this.$router.push({ name: "holddetails", query: { id: id } });
    },
    /**
     * 获取轮播图
     */
    async GetTopAdList() {
      let p = await GetTopAdList()
        .then(res => {
          if (res.success) {
            this.adlist = res.data;
          }
        })
        .catch();
      return p;
    },
    /** 获取公告  */
    async GetNoticeList() {
      let p = await GetNoticeList(1, 20)
        .then(res => {
          if (res.success) {
            this.noticelist = res.data.List;
          }
        })
        .catch();
      return p;
    },
    /** 获取项目精选 */
    async GetTopProjectList() {
      let p = await GetTopProjectList()
        .then(res => {
          if (res.data) {
            this.ProjectList = res.data;
          }
        })
        .catch();
      return p;
    }
  }
};
</script>
<style lang="less">
@import url("./index.less");
</style>
