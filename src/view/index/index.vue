<template>
  <div class="page">
    main
    {{123 | showA}}
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action, Getter } from "vuex-class";
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
export default class App extends Vue {
  name: string = "Simon Zhang";
  @State login: boolean;
  @Getter load: boolean;

  get isLogin(): boolean {
    return this.login;
  }
  beforeRouteLeave() {
    console.log(1);
  }
  mounted() {}
}
</script>
