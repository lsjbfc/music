import Vue from "vue";
import App from "./App";
import router from "./router";
import FastClick from "fastclick";
import "./api/index.js";
import "babel-polyfill";
import "./Filter.js";
import "./Directive.js";
import "./utils/clickoutside.js";

FastClick.attach(document.body);
router.beforeEach((to, from, next) => {
  let title = "";
  if (to.meta.title) title = to.meta.title;
  document.title = title;
  next();
});
router.afterEach((to, from, next) => {
  // 控制路由页面跳转滚动条在顶部
  window.scrollTo(0, 0);
});
let vm = new Vue({
  router,
  components: { App },
  template: "<App/>"
});
vm.$mount("#app");
