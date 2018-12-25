<template>
  <div class="PopupPicker">
    <div
      ref="reference"
      @click="status=!status"
      class="title"
      style="height:100%"
      v-clickoutside="outside"
    >
      <slot name="title"></slot>
    </div>
    <div
      class="ref-content"
      ref="popper"
      v-show="status"
    >
      <div
        class="mask"
        @click="status=false"
      ></div>
      <div @click="handelContent">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import vuepopper from "../../utils/vue-popper.js";
export default {
  name: "popper",
  mixins: [vuepopper],
  data() {
    return {
      status: false
    };
  },
  watch: {
    status: function(n) {
      if (n) document.body.style.overflowY = "hidden";
      else document.body.style.overflowY = "auto";
    }
  },
  mounted() {
    this.$on("aaa", this.a);
  },
  methods: {
    outside() {
      this.status = false;
    },
    handelContent() {
      this.status = false;
    }
  }
};
</script>

<style lang="less">
.PopupPicker {
  width: 100%;
  height: 100%;
  > div {
    height: 100%;
  }
  .title {
    height: 100%;
  }
}
.ref-content {
  width: 100%;
  height: 100%;
  left: 0 !important;
  z-index: 3;
  overflow-y: hidden;
  // margin-top: 4px !important;
}
.record-popper {
  position: absolute;
  left: 0;
  width: 100%;
  float: left;
  // overflow: hidden;
}
.rcontent {
  width: 100%;
  float: left;
}
.mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.35);
  // background: red;
}
</style>
