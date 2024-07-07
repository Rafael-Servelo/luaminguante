import { toast } from "vue3-toastify";
import serviceAuth from "./serviceAuth";

const actionsAuth = {
  async login({ commit }: any, form: any) {
    try {
      const { data } = await serviceAuth.login(form);
      commit("Set_User", data);
      document.cookie = `token=${data.token}; path=/;`
      toast.success(data.msg);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_Load", false);
    }
  },
};

export default actionsAuth;
