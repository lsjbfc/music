<template>
  <div class="mask-passowrd" style="z-index:33">
    <!-- 输入密码弹出层 -->
    <div class="box">
      <div class="top">
        <i class="icon icon-close" @click="close"></i>
        <span>输入密码</span>
      </div>
      <template v-if="!runing">
        <div class="phone-code">
          <input
            type="tel"
            :focus="focus"
            v-model="password"
            maxlength="6"
            max="6"
            ref="password"
            @input="handelChange"
          >
          <ul class="pass">
            <li
              v-for="(item,index) in passlist"
              :key="index"
              :class="{active:password.length>=index+1}"
            >{{item}}</li>
          </ul>
        </div>
        <span class="tip" @click="$router.push({name:'changepassword'})">忘记密码?</span>
        <ul class="key">
          <li v-for="(item,index) in passnumber" :key="index" @click="pushPass(item)">
            <template v-if=" item!=='del'">{{item}}</template>
            <template v-else-if="item=='del'">
              <i class="icon icon-del"></i>
            </template>
          </li>
        </ul>
      </template>
      <template v-else>
        <div class="runing">
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
          <span>支付中</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  name: "password",
  data() {
    return {
      runing: false,
      password: "",
      focus: false,
      passlist: ["", "", "", "", "", ""],
      passnumber: [1, 2, 3, 4, 5, 6, 7, 8, 9, "", 0, "del"]
    };
  },
  props: {
    stop: {
      type: Boolean,
      required: true
    }
  },
  watch: {
    password: function(n) {
      if (n.length === 6) {
        this.runing = true;
        this.$emit("changePassword", n);
      }
    },
    stop: function(n) {
      if (n) {
        this.runing = false;
        this.password = "";
        this.passlist = ["", "", "", "", "", ""];
      }
    }
  },
  created() {
    // this.$nextTick(function() {
    // let el = this.$refs.password;
    // el.focus();
    // });
  },
  methods: {
    close() {
      if (!this.runing) {
        this.password = "";
        this.passlist = ["", "", "", "", "", ""];
        this.$emit("close");
      }
    },
    pushPass(val) {
      let pass = this.password;
      if (val !== "del") pass = pass + val;
      if (val === "del") pass = pass.substr(0, pass.length - 1);
      console.log("val", val, val !== "del" && val != "");
      this.password = this.password;
      this.handelChange(pass);
    },
    handelChange(val) {
      // let val = e.target.value;

      let spassword = val.slice(0, 6);
      this.password = spassword;
      let password = [
        ...spassword.split("").fill("*"),
        ...["", "", "", "", "", ""]
      ];
      this.passlist = password.slice(0, 6);
    }
  }
};
</script>
<style lang="less">
@import url("./password.less");
</style>

