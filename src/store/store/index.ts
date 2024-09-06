import actionsStore from "./ActionsStore";
import mutationsStore from "./MutationsStore";

const store = {
  state() {
      return {
        resultSearch: [],
        products: []
    };
  },
  mutations: mutationsStore,
  actions: actionsStore
};

export default store