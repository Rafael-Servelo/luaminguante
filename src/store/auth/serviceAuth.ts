import axios from "axios";

const serviceAuth = {
  async login(form: any) {
    return axios
      .post(`${import.meta.env.VITE_URL}/auth/login`, {
        email: form.email,
        password: form.password,
      })
  },
};

export default serviceAuth;
