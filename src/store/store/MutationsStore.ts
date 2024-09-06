const mutationsStore = {
  Set_ResultSearch(state: any, payload: any) {
    state.resultSearch = payload;
  },
  Set_Products(state: any, payload: any) {
    state.products = payload;
  },
};

export default mutationsStore;
