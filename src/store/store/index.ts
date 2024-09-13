import actionsStore from "./ActionsStore";
import mutationsStore from "./MutationsStore";

const store = {
  state() {
      return {
        resultSearch: [],
        products: [],
        loadProducts: true
    };
  },
  mutations: mutationsStore,
  actions: actionsStore
};

export default store