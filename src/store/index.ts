import { createStore } from "vuex";
import auth from "./auth";

const store = createStore({
  namespace: true,
  modules:{
    auth: auth
  }
});

export default store