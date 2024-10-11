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

      let favorites = await store.state.auth.user.favorites;
      let products = data.products;

      let pos = products.map((produc: any) => {
        return produc.id;
      });
      let idFav = favorites.map((produc: any) => {
        return produc.id;
      });

      for (let item of idFav) {
        let index = pos.indexOf(item);

        if (index > -1) {
          products[index]["fav"] = true;
        }
      }

      commit("Set_Products", products);
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
        window.location.reload();
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
        window.location.reload();
      }, 2500);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
};

export default actionsStore;
