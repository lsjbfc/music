<template>
  <div class="page"></div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { State, Action, Getter } from "vuex-class";

@Component
export default class App extends Vue {
  name: string = "Simon Zhang";
  @State login: boolean;
  @Getter load: boolean;

  get isLogin(): boolean {
    return this.login;
  }
  mounted() {}
}
</script>
