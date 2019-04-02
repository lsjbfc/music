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
</script>
