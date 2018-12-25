<template>
  <div id="app">
    <transition name="page">
      <!-- <keep-alive> -->
      <router-view />
      <!-- </keep-alive> -->
    </transition>
    <div
      class="loading"
      v-show="loadingStatus"
      style="z-index:90;"
    >
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        width="40px"
        height="40px"
        viewBox="0 0 40 40"
        enable-background="new 0 0 40 40"
        xml:space="preserve"
      >
        <path
          opacity="0.2"
          fill="#000"
          d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"
        ></path>
        <path
          fill="#000"
          d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
    C22.32,8.481,24.301,9.057,26.013,10.047z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 20 20"
            to="360 20 20"
            dur="0.7s"
            repeatCount="indefinite"
          ></animateTransform>
        </path>
      </svg>
    </div>
    <div
      v-show="false"
      class="app-back"
      ref="appback"
      @touchstart="down"
      @touchmove="move"
      @touchend="end"
      :style="`top:${top};left:${left}`"
    >
      <i class="icon icon-back"></i><span>返回</span>
    </div>
    <!-- transform:translate3d(${left},${top},0); -->
  </div>
</template>

<script>
let flag = false;
var cur = {
  x: 0,
  y: 0
};
var nx, ny, dx, dy, x, y;
export default {
  name: "App",
  data() {
    return {
      top: cur.x,
      left: cur.y
    };
  },
  created() {
    this.$nextTick(() => {
      x = 750;
      y = 20;
      let dom = this.$refs.appback;
      let maxX = document.documentElement.clientWidth - dom.offsetWidth;
      let maxY = document.documentElement.clientHeight - dom.offsetHeight;
      if (x > maxX) x = maxX;
      if (y > maxY) y = maxY;
      this.left = x + "px";
      this.top = y + "px";
    });
  },
  computed: {
    loadingStatus: {
      get() {
        return false;
      }
    }
  },
  methods: {
    down() {
      let dom = this.$refs.appback;
      flag = true;
      var touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      cur.x = touch.clientX;
      cur.y = touch.clientY;
      dx = dom.offsetLeft;
      dy = dom.offsetTop;
      this.move = () => {
        this.set();
      };
    },
    move() {
      this.set();
    },
    set() {
      let dom = this.$refs.appback;
      if (flag) {
        var touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        nx = touch.clientX - cur.x;
        ny = touch.clientY - cur.y;
        x = dx + nx;
        y = dy + ny;
        if (x <= 0) x = 0;
        if (y <= 0) y = 0;
        let maxX = document.documentElement.clientWidth - dom.offsetWidth;
        let maxY = document.documentElement.clientHeight - dom.offsetHeight;
        if (x > maxX) x = maxX;
        if (y > maxY) y = maxY;
        this.left = x + "px";
        this.top = y + "px";
        // 阻止页面的滑动默认事件

        document.addEventListener(
          "touchmove",
          function(event) {
            event.stopPropagation();
          },
          false
        );
      }
    },
    end() {
      flag = false;
      let dom = this.$refs.appback;
      document.addEventListener("touchmove", null, false);
      dom.addEventListener("touchmove", null);
      dom.addEventListener("touchend", null);
    },
    stop(event) {
      event.preventDefault();
    }
  }
};
</script>

<style>
body,
html {
  width: 100%;
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
