import actionsStore from "./ActionsStore";
import mutationsStore from "./MutationsStore";

const store = {
  state() {
      return {
        resultSearch: []
    };
  },
  mutations: mutationsStore,
  actions: actionsStore
};

export default store