// import getCookie from "@/assets/scripts/getCookies";
import axios from "axios";

const serviceAuth = {
  async search(text: any) {
    if (!text) {
      return axios.get(`${import.meta.env.VITE_DEV_URL}/store`, {
        params: {
          search: " ",
        },
      });;
    } else {
      return axios.get(`${import.meta.env.VITE_DEV_URL}/store`, {
        params: {
          search: text,
        },
      });
    }
  },
};

export default serviceAuth;
