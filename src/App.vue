<template>
  <div id="app">
    {{name}}
    {{nickname}}
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class App extends Vue {
  name: string = "lsjbfc";
  nickname: string = "不会坏的草帽";
  alogin: boolean = false;

  mounted() {
    console.log(this.alogin);
  }
}
</script>
<style>
body,
html {
  width: 100%;
  height: 100%;
  min-height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
</style>
