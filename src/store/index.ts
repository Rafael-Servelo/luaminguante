import { createStore } from "vuex";
import auth from "./auth";

const store = createStore({
  namespace: true,
  state(){
    return{
      loadingPage: false
    }
  },
  mutation:{
    Set_LoadingPage(state:any, payload:any){
      state.loadingPage = payload
    }
  },
  modules:{
    auth: auth
  }
});

export default store