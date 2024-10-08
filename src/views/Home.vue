<template>
  
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
      alt="Logo Lua Minguante"
      width="200"
      height="200"
      src="../assets/img/logo-claro.png"
    ></v-img>
  </div>
  <v-main style="background: white">

    <div
      style="color: black"
      v-if="loadProducts"
      class="w-100 flex align-center justify-center h-100"
    >
      <v-progress-circular indeterminate size="150" color="var(--color-green)"
        >Carregando...</v-progress-circular
      >
    </div>
    <div
      v-else-if="products.length === 0"
      class="w-100 flex col align-center justify-center h-100"
      style="color: var(--color-primary)"
    >
      <v-empty-state
        class="pa-0"
        image="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
        size="200"
      >
        <template v-slot:media>
          <v-sheet class="py-4 mb-4" color="#fff">
            <v-img></v-img>
          </v-sheet>
        </template>

        <template v-slot:title>
          <div class="text-h6 text-high-emphasis txt-green">Ops..</div>
        </template>

        <template v-slot:text>
          <div
            class="text-body-2 font-weight-medium text-medium-emphasis txt-green"
          >
            Nenhum produto disponivel no momento...
          </div>
        </template>
        <template v-slot:actions>
          <v-spacer></v-spacer>
        </template>
      </v-empty-state>
    </div>
    <products v-else :products="products" :per-page="perPage" />
  </v-main>
  <my-footer></my-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderNav from "@/components/Header.vue";
import MyFooter from "@/components/footer.vue";
import Products from "@/components/Products.vue";
import SetProducts from "@/components/SetProducts.vue";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  components: {
    HeaderNav,
    MyFooter,
    Products,
    SetProducts,
  },
  data() {
    return {
      icons: ["mdi-instagram"],
      upperBtn: false,
      products: computed(() => store.state.store.products),
      perPage: Math.round(document.body.clientWidth / (document.body.clientWidth < 1280 ? 160 : 300) * 4),
      loadProducts: computed(() => store.state.store.loadProducts),
      urlParams: new URLSearchParams(window.location.search),
      setProduct: computed(() => store.state.store.setProducts),
    };
  },
  methods: {
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    getParam(param: string) {
      return this.urlParams.get(param);
    },
  },
  created() {
    store.dispatch("getProducts");

    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        this.upperBtn = true;
      } else {
        this.upperBtn = false;
      }
    });
  },
  mounted() {
    if (this.getParam("token")) {
      sessionStorage.setItem("resetToken", `${this.getParam("token")}`);
      router.push({ name: "ForgotPassword" });
    }
  },
});
</script>

<style scoped>
.bg-logo {
  position: relative;
  top: 56px;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
}
</style>
