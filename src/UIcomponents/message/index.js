import Vue from "vue";
let MessageBox = Vue.extend(require("./message.vue").default);
let instance;
let seed = 1;

let message = function(options) {
  if (typeof options === "string") {
    options = {
      message: options
    };
  }
  let id = "message_" + seed++;
  // 生成组件
  instance = new MessageBox({
    data: options
  });
  instance.id = id;
  // 组件需要挂载在dom元素上
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  return instance.vm;
};

const type = ["success", "info", "warning", "error"];
type.forEach(type => {
  message[type] = options => {
    if (typeof options === "string") {
      options = {
        message: options
      };
    }
    options.type = type;
    return message(options);
  };
});

export default message;
