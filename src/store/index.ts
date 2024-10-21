import { createStore } from "vuex";
import auth from "./auth";
import storeModule from "./store";
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
    auth,
    store: storeModule,
    socket,
  },
});

export default store;
