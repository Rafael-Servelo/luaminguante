import { toast } from "vue3-toastify";
import serviceStore from "./serviceStore";
import store from "../../store";

const actionsStore = {
  async search({ commit }: any, text: any) {
    try {
      const { data } = await serviceStore.search(text);

      commit("Set_ResultSearch", data.result);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    }
  },
  async getProducts({ commit }: any) {
    try {
      const { data } = await serviceStore.getProducts();

      commit("Set_Products", data.products);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async deleteProducts({ commit }: any, form: any) {
    try {
      const { data } = await serviceStore.deleteProducts(form);
      toast.success(data.msg);
      setTimeout(() => {
        (window.location.reload as (cache: boolean) => void)(true);
      }, 2500);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async setProducts({ commit }: any, form: any) {
    try {
      const { data } = await serviceStore.setProducts(form);
      toast.success(data.msg);
      setTimeout(() => {
        (window.location.reload as (cache: boolean) => void)(true);
      }, 2500);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async updateProducts({ commit, dispatch }: any, form: any) {
    try {
      const { data } = await serviceStore.updateProducts(form);
      toast.success(data.msg);
      dispatch("getProducts");
      // setTimeout(() => {
      //   (window.location.reload as (cache: boolean) => void)(true);
      // }, 2500);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async addFavorites({ commit }: any, idProduct: any) {
    try {
      const { data } = await serviceStore.addFavorites(idProduct);
      store.dispatch("getUser");
      toast.success(data.msg);

      let index = 0;
      let products = store.state.store.products;

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === idProduct) index = i;
      }

      products[index].fav = true;
    } catch (err) {
      console.log(err);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async removeFavorites({ commit }: any, idProduct: any) {
    try {
      const { data } = await serviceStore.removeFavorites(idProduct);
      store.dispatch("getUser");
      toast.success(data.msg);

      let index = 0;
      let products = store.state.store.products;

      for (let i = 0; i < products.length; i++) {
        if (products[i].id === idProduct) index = i;
      }

      products[index].fav = false;
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
};

export default actionsStore;
