<template>
  <div class="g- ignore">
    <div
      class="content animated"
      style="dispaly:block;"
      ref="content"
    >
      <div
        class="dataBox"
        id="dataBox"
        ref="dataBox"
      >
        <div class="middle"></div>
        <div
          class="mengban"
          @touchstart="touchstart"
          @touchend="touchend"
          @touchmove="touchmove"
        ></div>
        <div
          class="data"
          id="data"
          ref="data"
          :style="`transform: translate3d(0px, ${h}px, 0px);${transition}`"
        >
          <div
            v-for="(item,index) in list"
            :key="index"
            :class="{active:index===active}"
            :data-index="index"
          >{{item}}/{{index}}/{{active}}</div>
        </div>
      </div>
    </div>
    <!-- <div class="mask animated"></div> -->
  </div>
</template>
<script>
let years = [],
  mouth = [];
for (let index = 2000; index < 2004; index++) {
  years.push(index);
}
for (let index = 1; index <= 12; index++) {
  mouth.push(index);
}
export default {
  name: "",
  data() {
    return {
      list: years,
      style: "",
      active: "",
      index: 0,
      midh: 0,
      startY: 0,
      h: 0,
      curh: 0,
      transition: ""
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
    });
  },
  methods: {
    init() {
      let boxh = this.$refs.dataBox.clientHeight;
      let datafrist = this.$refs.data.children[0].clientHeight;
      let midh = parseFloat((boxh - datafrist) / 2, 10);
      this.midh = 31.5;
      this.h = 31.5;
      this.midh = midh;
      this.h = midh;
      this.curh = datafrist;
    },
    touchstart(e) {
      let startY = e.touches[0].pageY;
      this.startY = startY;
      // this.h
      console.log("startY", startY);
    },
    touchmove(e) {
      let { startY } = this;
      let offsetY = e.touches[0].pageY - startY;
      this.h = offsetY;

      console.log("offsetY", offsetY);
    },
    touchend() {
      let { midh, list, h, datafrist } = this;
      let len = list.length;
      console.log("h", h);
      if (h > midh) {
        h = midh;
      }
      let fuck = -((len - 1) * midh);
      if (h < fuck) {
        h = fuck;
      }
      // let a = -(len - ) * midh;
      // console.log("a", a, h, midh);
      // if (h <= a) {
      //   h = a;
      // }
      this.active = Math.round(Math.abs(h - midh) / midh);
      Math.abs(Math.round(h / midh));
      let middileh = Math.round(h / midh) * midh;
      console.log(Math.round(h / midh), h, midh, middileh);

      console.log(this.active);
      this.transition = "300ms ease-out";
      this.h = middileh;
      this.startY = middileh;
      // console.log("touchend", middileh);
    },
    endh() {}
  }
};
</script>

<style lang="less">
.g-picker,
.ignore {
  width: 100%;
  .dataBox {
    position: relative;
    display: flex;
    height: 100%;
    background: #f1f2f3;
    overflow: hidden;
    height: 170px;
  }
  .middle {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    height: 100%;
    margin: auto;
    width: 100%;
    height: 68px;
    z-index: 2;
    transform: translateZ(0px);
    background-color: rgba(0, 0, 0, 0.5);
  }
  .mengban {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    margin: 0 auto;
    width: 100%;
    z-index: 4;
    background-color: rgba(11, 22, 33, 0.5);
  }

  .data {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    transform: translateZ(0);
  }

  .data > div {
    text-align: center;
    height: 68px;
    line-height: 68px;
    // background-color: #000;
    font-size: 28px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: black;
    border: 1px solid;
    box-sizing: border-box;
  }

  .active {
    color: red !important;
  }

  @-webkit-keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeInUp {
    -webkit-animation-name: fadeInUp;
    animation-name: fadeInUp;
  }

  .animated {
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  .fadeIn {
    -webkit-animation-name: fadeIn;
    animation-name: fadeIn;
  }

  @-webkit-keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      display: none;
    }
  }

  @keyframes fadeOut {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .fadeOut {
    -webkit-animation-name: fadeOut;
    animation-name: fadeOut;
  }

  @-webkit-keyframes fadeInDown {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }

    to {
      opacity: 1;
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
  }

  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
  }

  .mask {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }

  @-webkit-keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }

  @keyframes fadeOutDown {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
      -webkit-transform: translate3d(0, 100%, 0);
      transform: translate3d(0, 100%, 0);
    }
  }

  .fadeOutDown {
    -webkit-animation-name: fadeOutDown;
    animation-name: fadeOutDown;
  }
}
</style>
