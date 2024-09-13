const mutationsStore = {
  Set_ResultSearch(state: any, payload: any) {
    state.resultSearch = payload;
  },
  Set_Products(state: any, payload: any) {
    state.products = payload;
  },
  Set_LoadProducts(state: any, payload: any) {
    state.loadProducts = payload;
  },
};

export default mutationsStore;
