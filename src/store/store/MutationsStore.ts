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
  Set_SetProducts(state: any, payload: any) {
    state.setProducts = payload;
  },
};

export default mutationsStore;
