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
        window.location.reload(true);
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
        window.location.reload(true);
      }, 2500);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async addFavorites({commit}:any, idProduct:any){
    try{
      const { data } = await serviceStore.addFavorites(idProduct);
      toast.success(data.msg)
      setTimeout(()=>{
        window.location.reload(true)
      },1000)
    } catch (err){
      console.log(err)
    } finally {
      commit("Set_LoadProducts", false);
    }
  },
  async removeFavorites({commit}:any, idProduct:any){
    try{
      const { data } = await serviceStore.removeFavorites(idProduct);
      toast.success(data.msg)
      setTimeout(()=>{
        window.location.reload(true)
      },1000)
    } catch (err: any){
      console.log(err)
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_LoadProducts", false);
    }
  }
};

export default actionsStore;
