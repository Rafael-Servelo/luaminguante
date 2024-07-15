import { createStore } from "vuex";
import auth from "./auth";

const store = createStore({
  namespace: true,
  state(){
    return{
      loadingPage: false,
      isRegister: false
    }
  },
  mutations:{
    Set_LoadingPage(state:any, payload:any){
      state.loadingPage = payload
    },
    Set_IsRegister(state:any, payload:any){
      state.isRegister = payload
    }
  },
  modules:{
    auth: auth
  }
});

export default store