/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "@/plugins";
import router from "./router";
import "@/assets/css/base.css";
import "vue3-toastify/dist/index.css";
import axios from "axios";

axios.defaults.headers.common = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

// Components
import App from "./App.vue";
import Product from "./components/Product.vue";

// Composables
import { createApp } from "vue";

const app = createApp(App);
const product = createApp(Product);

registerPlugins(app);
registerPlugins(product);

app.use(router);
app.mount("#app");

product.mount("#product")