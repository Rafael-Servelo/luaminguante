<template>
  <loading v-show="loadingPage" />
  <v-app theme="dark" style="background: var(--color-primary)">
    <v-fab
      color="var(--color-secondary)"
      icon="mdi-chevron-up"
      location="bottom right"
      app
      class="mb-8"
      :appear="true"
      size="60"
      @click="upPage"
      v-if="upperBtn"
    ></v-fab>

    <header-nav />
    <div class="bg-logo">
      <v-img
        @click="goHome"
        alt="Logo Lua Minguante"
        width="200"
        height="200"
        src="../assets/img/logo-claro.png"
      ></v-img>
    </div>
    <v-main style="background: white">
      <div style="color: var(--color-black)" class="ma-4">
        <div v-for="(product, index) in products" :key="index">
          <div v-if="product.id.toString() === urlParams.get('id')">
            {{ product.product }}
          </div>
        </div>
      </div>
    </v-main>
    <my-footer></my-footer>
  </v-app>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Loading from "@/components/Loading.vue";
import MyFooter from "@/components/footer.vue";
import HeaderNav from "@/components/Header.vue";
import store from "@/store";

export default defineComponent({
  name: "Product",
  components: {
    Loading,
    MyFooter,
    HeaderNav,
  },
  data() {
    return {
      loadingPage: computed(() => store.state.loadingPage),
      upperBtn: false,
      urlParams: new URLSearchParams(window.location.search),
      products: computed(() => store.state.store.products),
    };
  },
  methods: {
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    goHome() {
      window.location.replace("/");
    },
  },
  mounted() {
    if (this.urlParams.get("id")) {
      setTimeout(() => {
        let pos = this.products.map((product: any) => {
          return product.id.toString();
        });
        let index = pos.indexOf(this.urlParams.get("id"));

        document.title = this.products[index].product;
      }, 500);
      store.dispatch("getProducts");
    } else {
      window.location.replace("/");
    }
  },
});
</script>

<style scoped>
.bg-logo {
  cursor: pointer;
  position: relative;
  top: 56px;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
}
</style>
