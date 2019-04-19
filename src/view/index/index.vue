<template>
  <div class="page">
    main
    {{123 | showA}}
  </div>
</template>
<script lang="ts">
// import Vue from "vue";
// import Component from "vue-class-component";
import { Component, Prop, Vue } from "vue-property-decorator";
import { State, Action, Getter } from "vuex-class";
interface Ab {
  readonly a1: string;
  readonly a2: boolean;
}
let minxs = {
  created() {
    console.log("created");
  }
};
@Component({
  mixins: [minxs],
  filters: {
    showA: function(val: any): string {
      return "A";
    }
  },
  watch: {},
  props: {},
  model: {}
})
export default class Index extends Vue {
  name: string = "Simon Zhang";
  @State login: boolean;
  @Getter load: boolean;
  @Prop({
    type: Object as () => Ab,
    required: false,
    default: function(): Ab {
      return {
        a1: "1",
        a2: false
      };
    }
  })
  private A: Ab;
  userInfo: Object = { a: 1 };
  get isLogin(): boolean {
    return this.login;
  }
  beforeRouteLeave() {
    console.log(1);
  }
  mounted() {
    this.userInfo;
    console.log(this.A);
  }
}

function a() {
  this.name = "1";
  this.sayname = function() {
    return this.name;
  };
}
a.prototype.id = "id1";
a.prototype.sayid = function() {
  return this.id;
};
var a1 = new a();
(function() {
  /**
   * 原型链
   */
  function b() {}
  b.prototype = new a();
  b.prototype.name = "111";
  var b1 = new b();
  a1.sayid();
  a1.id = "idb1";
  a.prototype.id = "b1";
  b1.sayid();
  console.log(a1.sayid(), b1.sayid());
  // 父
})();
(function() {
  // 构造继承
  function b() {
    a.call(this);
  }
  b.prototype.name = "bname";
  var b1 = new b();
  console.log("b1id", b1.sayname());
  // 只能访问构造函数示例方法，不能访问原型方法
})();
(function() {
  /**
   * 组合继承
   */
  function b() {
    a.call(this);
  }
  b.prototype = new a();
  b.prototype.name = "bname";
  b.prototype.constructor = b;
})();
(function() {
  // 拷贝继承
})();
(function() {})();
</script>
