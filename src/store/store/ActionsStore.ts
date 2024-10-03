import { toast } from "vue3-toastify";
import serviceStore from "./serviceStore";

const actionsStore = {
  async search({ commit }: any, text: any) {
    try {
      const { data } = await serviceStore.search(text);

      commit("Set_ResultSearch", data.result);
    } catch (err: any) {
      console.log(err.messagee);
    }
  },
  async getProducts({ commit }: any) {
    try {
      const { data } = await serviceStore.getProducts();
      commit("Set_Products", data.products);
    } catch (err) {
      console.error(err);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async deleteProducts({ commit }: any, form: any) {
    try {
      const { data } = await serviceStore.deleteProducts(form);
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
    } finally {
      commit("Set_LoadProducts", false);
      window.location.reload();
    }
  },
  async setProducts({ commit }: any, form: any, email: any) {
    try {
      const { data } = await serviceStore.setProducts(form, email);
      toast.success(data.msg);
    } catch (err) {
      console.error(err);
    } finally {
      commit("Set_LoadProducts", false);
      window.location.reload();
    }
  },
};

export default actionsStore;
