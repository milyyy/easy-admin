import { SET_AUTH, SET_USER } from "../types";
import { set } from "mongoose";

const user = {
  state: {
    isAuth: false, // 是否认证
    user: {}
  },
  getters: {
    isAuth:state => state.isAuth,
    userInfo: state => state.user
  },
  mutations: {
    [SET_AUTH](state, isAuth){
      if(isAuth) {
        state.isAuth = isAuth;
      } else {
        state.isAuth = false;
      }
    },
    [SET_USER](state, user) {
      if(user) {
        state.user = user;
      } else {
        state.user = {}
      }
    }
  },
  actions: {
    setAuth({commit}, isAuth) {
      commit(SET_AUTH, isAuth)
    },
    setUser({commit}, user) {
      commit(SET_USER, user)
    },
  },
}

export default user;