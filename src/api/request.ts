// import Config from "./config";
// import axios, { AxiosResponse } from "axios";
// axios.defaults.baseURL = Config.baseURL;
// axios.defaults.timeout = Config.timeout;
// let cancel = null;
// // 添加请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     // 在发送请求之前做些什么
//     // console.log("config", config);
//     return config;
//   },
//   function(error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   }
// );

// // 添加响应拦截器
// axios.interceptors.response.use(
//   function(response: any): AxiosResponse {
//     // 对响应数据做点什么
//     // 为登录
//     if (response.data.errcode === 600) {
//       window.location.href = response.data.errmsg;
//       return { success: false } as AxiosResponse;
//       // 为绑定
//     } else if (response.data.errcode === 905) {
//       window.location.href = "#/notbound";
//       return response;
//     } else {
//       return response;
//     }
//   },
//   function(error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
//   }
// );
// interface data{
//   contentType?:String
//   url:String
//   method:String
//   data:Object|String
// }
// const ajax = function(params:data) {
//   if (!params) return Promise.reject(new TypeError("paramsNull"));
//   // params.data.openid = "oa_4RxBEG1LK51kzyaasyLKy_nhA";
//   let p = new Promise((resolve, reject) => {
//     let contentType = "";
//     if (params.contentType === "") {
//       contentType = "application/x-www-form-urlencoded; charset=UTF-8";
//     }
//     if (params.contentType === "json") {
//       contentType = "application/json";
//     }
//     if (params.contentType === "multipart") {
//       contentType = "multipart/form-data";
//     }
//     let options = {
//       method: params.method || "get",
//       url: params.url,
//       headers: {
//         "Content-Type": contentType,
//         returnUrl: window.location.href
//       }
//     };
//     options = Object.assign({}, params.options, options);
//     // console.log("options", options);
//     let data = params.data || "";
//     options.data = data;
//     if (options.method === "get") {
//       let query = "";
//       let ary = [];
//       Object.keys(options.data).forEach(item => {
//         ary.push(item + "=" + options.data[item]);
//       });
//       query += ary.join("&");
//       options.data = {};
//       if (query) {
//         options.url += "?" + query;
//       }
//     }
//     axios(options)
//       .then(resolve)
//       .catch(reject);
//   });
//   return p;
// };

// const Get = async function(params) {
//   const p = await ajax({
//     method: "get",
//     url: params.url,
//     data: params.data,
//     contentType: params.contentType || ""
//   });
//   return p;
// };
// const Post = async function(params) {
//   const p = await ajax({
//     method: "post",
//     url: params.url,
//     data: params.data,
//     contentType: params.contentType || ""
//   });
//   return p;
// };
// const upload = async function(url, data, progress) {
//   const p = await axios({
//     url: url,
//     method: "post",
//     headers: {
//       "Content-Type": "multipart/form-data"
//     },
//     onUploadProgress(progressEvent) {
//       if (progressEvent.lengthComputable) {
//         progress && progress(progressEvent);
//       }
//     },
//     data: data
//   });
//   return p;
// };
// export { ajax, Get, Post, upload };
