import actionsAuth from "./ActionsAuth";
import mutationsAuth from "./MutationsAuth";

const auth = {
  state() {
      return {
      response: "",
      user: "",
      isLogged: false,
      load: false
    };
  },
  mutations: mutationsAuth,
  actions: actionsAuth
};

export default auth