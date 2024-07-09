import { toast } from "vue3-toastify";
import serviceAuth from "./serviceAuth";

const actionsAuth = {
  async login({ commit, dispatch }: any, form: any) {
    try {
      const { data } = await serviceAuth.login(form);
      commit("Set_Response", data);
      document.cookie = `token=${data.token}; path=/;`;
      document.cookie = `userID=${data.userID}; path=/;`;
      toast.success(data.msg);
      dispatch("getUser")
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_Load", false);
      window.location.reload()
    }
  },

  async getUser({ commit }: any) {
    try {
      const { data } = await serviceAuth.getUser();
      commit("Set_User", data);
    } catch (err:any) {
      toast.error(err.response.data.msg);
    }
  },
};

export default actionsAuth;
