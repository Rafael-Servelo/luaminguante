import actionsAuth from "./ActionsAuth";
import mutationsAuth from "./MutationsAuth";

const auth = {
  state() {
      return {
      user: "",
      load: false
    };
  },
  mutations: mutationsAuth,
  actions: actionsAuth
};

export default auth