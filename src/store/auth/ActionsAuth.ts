import { toast } from "vue3-toastify";
import serviceAuth from "./serviceAuth";
import router from "@/router";

const actionsAuth = {
  async login({ commit, dispatch }: any, form: any) {
    try {
      const { data } = await serviceAuth.login(form);
      commit("Set_Response", data);
      document.cookie = `token=${data.token}; path=/;`;
      document.cookie = `userID=${data.userID}; path=/;`;
      toast.success(data.msg);
      commit("Set_IsLogged", true);
      dispatch("getUser");
      (window.location.reload as (cache: boolean) => void)(true);
    } catch (err: any) {
      toast.error(err.response.data.msg);
      commit("Set_IsLogged", false);
    } finally {
      commit("Set_Load", false);
    }
  },
  async forgotPassword({ commit }: any, email: string) {
    try {
      const { data } = await serviceAuth.forgotPassword(email);
      toast.success(data.msg);
      setTimeout(() => {
        router.push({ name: "Home" });
      }, 3000);
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_Load", false);
    }
  },
  async recoveryPassword({ commit }: any, email: string) {
    try {
      const { data } = await serviceAuth.recoveryPassword(email);
      toast.success(data.msg);
      setTimeout(() => {
        router.push({ name: "Home" });
        sessionStorage.clear();
      }, 3000);
    } catch (err: any) {
      toast.error(err.response.data.msg);
      setTimeout(() => {
        router.push({ name: "Home" });
        sessionStorage.clear();
      }, 3000);
    } finally {
      commit("Set_Load", false);
    }
  },
  async register({ commit }: any, form: any) {
    try {
      const { data } = await serviceAuth.register(form);
      toast.success(data.msg);
      commit("Set_IsRegister", false);
      setTimeout(()=>{
        router.push({name: "Home"})
      }, 3000)
    } catch (err: any) {
      toast.error(err.response.data.msg);
    } finally {
      commit("Set_Load", false);
    }
  },

  async getUser({ commit }: any) {
    try {
      const { data } = await serviceAuth.getUser();

      sessionStorage.setItem("email", data.user.email)
      commit("Set_User", data.user);
      commit("Set_IsLogged", true);
    } catch (err: any) {
      // toast.error(err.response.data.msg);
      // commit("Set_IsLogged", false);
    }
  },
};

export default actionsAuth;
