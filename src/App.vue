<template>
  <div id="app">
    {{name}}
    {{nickname}}
    {{data}}
    <router-view/>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
interface listitem {
  id: string;
  name: string;
}
interface apidata {
  name: string;
  lable: string;
  list?: Array<listitem>;
}
@Component
export default class App extends Vue {
  name: string = "lsjbfc";
  nickname: string = "不会坏的草帽";
  alogin: boolean = false;
  data: apidata = {
    name: "1",
    lable: "1",
    list: [{ id: "1", name: "1" }]
  };
  mounted() {
    let a: string = "";
    this.getdata().then(res => {
      this.data = res;
    });
  }
  async getdata() {
    let a = async () => {
      return new Promise((resolve: (apidata) => void, reject) => {
        setTimeout(() => {
          let data: apidata = {
            name: "1",
            lable: "1",
            list: [{ name: "1", id: "a" }, { name: "222", id: "a1111" }]
          };
          resolve(data);
        }, 2000);
      });
    };
    const p = await a();
    return p;
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
