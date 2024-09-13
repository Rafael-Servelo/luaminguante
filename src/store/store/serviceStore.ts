// import getCookie from "@/assets/scripts/getCookies";
import axios from "axios";

const serviceAuth = {
  async search(text: any) {
    if (!text) {
      return axios.get(`${import.meta.env.VITE_URL}/store`, {
        params: {
          search: " ",
        },
      });
    } else {
      return axios.get(`${import.meta.env.VITE_URL}/store`, {
        params: {
          search: text,
        },
      });
    }
  },
  async getProducts() {
    return axios.get(`${import.meta.env.VITE_URL}/store/products`);
  },
  async deleteProducts(id: any, email: any) {
    return axios.delete(
      `${import.meta.env.VITE_URL}/store/delete_product`,
      {
        headers: {
          email
        },
        data: {
          id
        }
      },
    );
  },
};

export default serviceAuth;
