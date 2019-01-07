import "babel-polyfill";
import Vue from "vue";
import FastClick from "fastclick";
import App from "./App.vue";
import router from "./router/Index";
import "./vue/Filter.ts";
import "./utils/clickoutside.js";

FastClick.attach(document.body);
router.beforeEach((to, from, next) => {
  let title = "";
  if (to.meta.title) title = to.meta.title;
  document.title = title;
  next();
});
router.afterEach(() => {
  // 控制路由页面跳转滚动条在顶部
  window.scrollTo(0, 0);
});
let vm = new Vue({
  router,
  components: { App },
  template: "<App/>"
});
vm.$mount("#app");
