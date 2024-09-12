// import getCookie from "@/assets/scripts/getCookies";
import axios from "axios";

const serviceAuth = {
  async search(text: any) {
    if (!text) {
      return axios.get(`${import.meta.env.VITE_URL}/store`, {
        params: {
          search: " ",
        },
      });;
    } else {
      return axios.get(`${import.meta.env.VITE_URL}/store`, {
        params: {
          search: text,
        },
      });
    }
  },
  async getProducts() {
    return axios.get(`${import.meta.env.VITE_URL}/store/products`)
  }
};

export default serviceAuth;
