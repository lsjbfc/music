import Vue from "vue";
import Router from "vue-router";
/**
 * 首页
 */
const Index = () =>
  import(/* webpackChunkName: "index" */ "@/view/index/index.vue");

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      name: "index",
      component: Index
    }
  ]
});
