import getCookie from "@/assets/scripts/getCookies";
import axios from "axios";

const serviceAuth = {
  async login(form: any) {
    return axios.post(`${import.meta.env.VITE_URL}/auth/login`, {
      email: form.email,
      password: form.password,
    });
  },

  async forgotPassword(email: any) {
    return axios.post(`${import.meta.env.VITE_URL}/auth/forgot_password`, {
      email: email,
    });
  },
  async recoveryPassword(form: any) {
    return axios.post(`${import.meta.env.VITE_URL}/auth/reset_password/`, {
      email: form.email,
      token: form.token,
      password: form.password,
      confirmPassword: form.confirmPassword,
    });
  },

  async register(form: any) {
    return axios.post(`${import.meta.env.VITE_URL}/auth/register`, form);
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
