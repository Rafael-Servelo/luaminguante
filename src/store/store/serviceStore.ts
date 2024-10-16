import getCookie from "@/assets/scripts/getCookies";
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
  async deleteProducts(form: any) {
    return axios.delete(`${import.meta.env.VITE_URL}/store/delete_product`, {
      data: {
        id: form.id,
        email: form.email,
      },
    });
  },
  async setProducts(form: any) {
    return axios.post(`${import.meta.env.VITE_URL}/store/set_product`, form, {
      headers: {
        email: sessionStorage.getItem("email"),
      },
    });
  },
  async addFavorites(idProduct: any) {
    return axios.post(`${import.meta.env.VITE_URL}/store/add_favorites`, {
      productID: idProduct
    }, {
      headers: {
        id: getCookie("userID"),
      },
    });
  },
  async removeFavorites(idProduct: any) {
    return axios.delete(`${import.meta.env.VITE_URL}/store/remove_favorites?id=${getCookie("userID")}&productID=${idProduct}`);
  },
};

export default serviceAuth;
