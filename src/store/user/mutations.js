import * as types from "./mutations_types";

export default {
  // [types.SET_USER_INFO] (state, data) {
  //   state.userInfo = data;
  // }
  [types.LOADING](state, data) {
    state.loading = data;
  }
};
