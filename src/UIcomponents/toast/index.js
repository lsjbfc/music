import ToastComponent from "./toast.vue"; // 引入先前写好的vue

const Toast = {};

// 注册Toast
Toast.install = function(Vue) {
  // 生成一个Vue的子类
  const ToastConstructor = Vue.extend(ToastComponent);
  // 生成一个该子类的实例
  const instance = new ToastConstructor();

  // 将这个实例挂载在我创建的div上
  // 并将此div加入全局挂载点内部
  instance.$mount(document.createElement("div"));
  document.body.appendChild(instance.$el);

  // 通过Vue的原型注册一个方法
  // 让所有实例共享这个方法 <br>    // 其中的duration是持续时间
  let toast = params => {
    instance.msg = params.msg;
    instance.type = params.type;
    instance.theToast = true;
    instance.hide = function() {
      instance.theToast = false;
    };
    if (params.autoclose) {
      let duration = params.duration || 1250;
      setTimeout(() => {
        instance.theToast = false;
      }, duration);
    }
  };
  toast.hide = function() {
    instance.theToast = false;
  };
  toast.show = function(params) {
    instance.theToast = true;
    instance.msg = params.msg;
    instance.type = params.type;
  };
  Vue.prototype.$toast = toast;
};

export default Toast;
