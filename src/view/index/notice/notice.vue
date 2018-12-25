<template>
  <div></div>
</template>
<script>
import categoryTitle from "@/components/category-title/category-title.vue";
import { GetNoticeList } from "../../../api/index.js";
export default {
  name: "notice",
  components: { categoryTitle, Scroller },
  data() {
    return {
      pageIndex: 1,
      pageSize: 20,
      noticelist: [],
      HasMore: true
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.GetNoticeList()
        .then(res => {
          this.loaded();
        })
        .catch(() => {
          this.loaded();
        });
    },
    link(url) {
      window.location.href = url;
    },
    async GetNoticeList() {
      let pageIndex = this.pageIndex;
      let pageSize = this.pageSize;
      let p = await GetNoticeList(pageIndex, pageSize)
        .then(res => {
          let noticelist = this.noticelist;
          this.HasMore = res.data.HasMore;
          noticelist = [...noticelist, ...res.data.List];
          this.noticelist = noticelist;
        })
        .catch();
      return p;
    },
    onScrollBottom() {
      if (this.HasMore) {
        this.pageIndex++;
        this.GetNoticeList();
      }
    }
  }
};
</script>
<style lang="less">
@import url("./notice.less");
</style>
