import { createStore } from "vuex";
import AuthModule from "./AuthModule";
import StoreModule from "./StoreModule";
import socket from "./websocket";

const store = createStore({
  namespace: true,
  state() {
    return {
      loadingPage: false,
      isRegister: false,
    };
  },
  mutations: {
    Set_LoadingPage(state: any, payload: any) {
      state.loadingPage = payload;
    },
    Set_IsRegister(state: any, payload: any) {
      state.isRegister = payload;
    },
  },
  modules: {
    auth: AuthModule,
    store: StoreModule,
    socket,
  },
});

export default store;
