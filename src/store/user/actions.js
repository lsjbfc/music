import * as types from "./mutations_types";
// import Api from "../../api/user.js";
import qs from "qs";
import {
  savaToLocal,
  loadFromlLocal,
  sessionStorage,
  localStorage
} from "../../common/store.js";
/**
 * 登录
 */
// async function userLogin (dispatch, { that, options }) {
//   let login = Login({
//     data: qs.stringify(options)
//   });

//   login.then(res => {
//     let data = {};
//     if (res.data.code === that.GLOBAL.CODE_SUCCESS) {
//       data = res.data.data;
//     }
//     localStorage().setItem("info", data);
//     dispatch("loginSuccess", data);
//   });
//   return await login;
// }
export default {
  changeLoadStatus: ({ dispatch, commit }, loading) => {
    // localStorage().removeItem("info");
    // commit(types.REMOVE_USER_INFO);
    commit(types.LOADING, loading);
  }
  // exitLogin: ({ dispatch }, that, params) => exit(dispatch, that, params)
};
