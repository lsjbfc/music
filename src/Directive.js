import Vue from "vue";

Vue.directive("qcLoading", {
  inserted: function(el, value) {
    // console.log("xxxx", el, el.className);
    let name = null;
    let className = el.className;
    let classNameNew = className + " qc-loading";
    if (value) {
      name = className;
    } else {
      name = classNameNew;
    }
    el.className = name;
  }
});
