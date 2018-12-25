<template>
  <div
    ref="wrapper"
    class="wrapper"
    :style="{height:height,width:width}"
  >
    <div class="content">
      <slot></slot>
      <div
        class="isgeting tip"
        v-if="!more"
      >
        没有更多</div>
      <div
        class="more  tip"
        v-else-if="isScroll"
      >
        松开加载更多
      </div>
      <div
        class="isgeting  tip"
        v-else-if="isgeting"
      >
        加载中</div>

    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
      isScroll: false
    };
  },
  props: {
    width: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: true
    },
    isgeting: {
      type: Boolean,
      required: true
    },
    isScrollY: {
      type: Boolean,
      required: true
    },
    more: {
      type: Boolean,
      required: true
    },
    refresh: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    isScrollY: function(n) {
      this.scroll.options.scrollY = n;
    },
    refresh: function(n) {
      if (n) this.handelscroll();
    }
  },
  mounted() {
    this.handelscroll();
  },
  methods: {
    handelscroll() {
      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            click: true,
            pullUpLoad: true
          });
        } else {
          this.scroll.refresh();
        }
        this.scroll.on("scroll", pos => {
          this.isScroll = true;
          if (this.scroll.maxScrollY >= pos.y) {
          }
        });
        this.scroll.on("touchEnd", pos => {
          this.isScroll = false;
          console.log("下拉刷新成功", this.scroll.maxScrollY >= pos.y);
          if (this.scroll.maxScrollY >= pos.y) {
            if (!this.isgeting) this.$emit("handelMore");
          }
        });
        this.scroll.on("scrollEnd", pos => {
          if (this.scroll.maxScrollY === pos.y) {
            // if (!this.isgeting) this.$emit("handelMore");
            console.log("a");
          }
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper {
  overflow: hidden;
}
.tip {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  color: #999;
}
</style>
