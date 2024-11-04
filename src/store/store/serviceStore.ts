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
    return axios.get(`${import.meta.env.VITE_URL}/store/products`, {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
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
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  },
  async updateProducts(form: any) {
    return axios.put(`${import.meta.env.VITE_URL}/store/update_product`, form, {
      headers: {
        email: sessionStorage.getItem("email"),
        id: form.id,
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  },
  async addFavorites(idProduct: any) {
    return axios.post(`${import.meta.env.VITE_URL}/store/add_favorites`, {
      productID: idProduct
    }, {
      headers: {
        id: getCookie("userID"),
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  },
  async removeFavorites(idProduct: any) {
    return axios.delete(`${import.meta.env.VITE_URL}/store/remove_favorites?id=${getCookie("userID")}&productID=${idProduct}`);
  },
};

export default serviceAuth;
