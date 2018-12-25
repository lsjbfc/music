<template>
  <transition name="slide">
    <div class="messageBox" v-show="show">
      <div>
        <div class="messageCon" :class="'messageCon-'+type">{{message}}</div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "v-message",
    mounted () {
      this.StartTime();
    },
    data () {
      return {
        message: "默认消息",
        show: false,
        timer: null,
        type: "success"
      };
    },
    props:[],
    methods:{
      StartTime () {
        this.show = true;
        if (this.timer) {
          clearTimeout(this.timer);
        } else {
          this.timer = setTimeout(() => {
            this.show = false;
          }, 3000);
        }
      }
    }
  };
</script>
<style lang="less" type="text/less">
.messageBox {
  position: fixed;
  top: 5px;
  left: 50%;
  text-align: center;
  color: #333;
  z-index: 990000;
  .messageCon {
    margin-left: -50%;
  }
  .messageCon-success {
    padding: 0;
    height: 40px;
    line-height: 40px;
    background: #f0f9eb;
    color: #67c23a;
  }
  .messageCon-success-large {
    padding: 0;
    height: 40px;
    line-height: 40px;
    background: #e8ffe9;
  }
  .messageCon-error {
    padding: 0;
    height: 40px;
    line-height: 40px;
    background: #fef0f0;
    color: #f56c6c;
  }
  .messageCon-error-small {
    padding: 0;
    height: 40px;
    line-height: 40px;
    background: #fef0f0;
    color: #f56c6c;
  }
}
.slide-enter-active,
.slide-leave-active {
  transition: all 1s ease;
}
.slide-enter,
.slide-leave-active {
  margin-top: -200px;
  opacity: 0;
}
</style>
