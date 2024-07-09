import getCookie from "@/assets/scripts/getCookies";
import axios from "axios";

const serviceAuth = {
  async login(form: any) {
    return axios.post(`${import.meta.env.VITE_URL}/auth/login`, {
      email: form.email,
      password: form.password,
    });
  },

  async getUser() {
    const token = `Bearer ${getCookie("token")}`;
    const userID = getCookie("userID");
    return axios.get(`${import.meta.env.VITE_URL}/auth/${userID}`, {
      headers: {
        authorization: token,
      },
    });
  },
};

export default serviceAuth;
