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
            <div class="flex ga-8" :class="{ col: $vuetify.display.mobile }">
              <v-carousel
                :style="{
                  'min-width': $vuetify.display.mobile ? '100%' : '800px',
                }"
                color="var(--color-primary)"
              >
                <v-carousel-item
                  v-for="img in product.images"
                  :src="
                    img.startsWith('http')
                      ? img
                      : 'data: image/jpeg; base64,' + img
                  "
                ></v-carousel-item>
              </v-carousel>
              <div class="info">
                <div
                  class="text-h5 txt-body txt-primary"
                  style="font-weight: bold"
                >
                  {{ product.product }}
                </div>
                <div class="flex ga-4">
                  <v-rating
                    hover
                    readonly
                    :size="32"
                    :model-value="product.rating"
                    active-color="var(--color-primary)"
                  />
                  <v-divider vertical opacity=".5" />
                  <div style="color: var(--color-black-4)">
                    {{ product.numberReview }} Avaliações
                  </div>
                </div>

                <v-list theme="light">
                  <v-list-item class="ga-4">
                    <div class="flex col ga-4">
                      <div
                        class="variedades flex col"
                        v-if="product.variations.length !== 0"
                      >
                        <span class="text-body-1"> Modelo: </span>
                        <v-btn-toggle
                          v-model="form.variation"
                          base-color="tranparent"
                          color="var(--color-secondary)"
                        >
                          <v-btn
                            v-for="item in product.variations"
                            :value="item"
                          >
                            {{ item }}
                          </v-btn>
                        </v-btn-toggle>
                      </div>
                      <div class="cores" v-if="product.colors.length !== 0">
                        <span class="text-body-1"> Cor: </span>
                        <v-btn-toggle
                          v-model="form.color"
                          base-color="tranparent"
                          color="var(--color-secondary)"
                        >
                          <v-btn v-for="item in product.colors" :value="item">
                            <v-avatar :color="item"></v-avatar>
                          </v-btn>
                        </v-btn-toggle>
                      </div>
                      <div class="tamanho" v-if="product.sizes.length !== 0">
                        <span class="text-body-1"> Tamanho: </span>
                        <v-btn-toggle
                          v-model="form.size"
                          divided
                          base-color="grey-lighten-2"
                          color="var(--color-secondary)"
                        >
                          <v-btn v-for="item in product.sizes" :value="item">{{
                            item
                          }}</v-btn>
                        </v-btn-toggle>
                      </div>
                      <div class="quantidade">
                        <span class="text-subtitle-2"> Quantidade: </span>
                        <div>
                          <v-btn
                            :disabled="form.amount < 1"
                            @click="form.amount = form.amount - 1"
                            ><v-icon>mdi-menu-down</v-icon></v-btn
                          >
                          <input
                            class="text-center"
                            v-model="form.amount"
                            :max="product.amount"
                            min="0"
                            style="width: 70px"
                          />
                          <v-btn
                            :disabled="form.amount === product.amount"
                            @click="form.amount = form.amount + 1"
                            ><v-icon>mdi-menu-up</v-icon></v-btn
                          >
                        </div>
                      </div>

                      <div
                        class="flex ga-4"
                        :class="{
                          col: $vuetify.display.mobile,
                        }"
                      >
                        <v-btn
                          theme="dark"
                          color="var(--color-secondary)"
                          prepend-icon="mdi-cart"
                          @click="product.cart = !product.cart"
                          >Adicionar ao Carrinho</v-btn
                        >
                        <v-btn theme="dark" color="var(--color-primary)"
                          >Comprar Agora</v-btn
                        >
                      </div>

                      <div class="descricao flex col">
                        <span class="text-subtitle-2"> Descrição: </span>
                        <div class="text-body-2">
                          {{ product.description }}
                        </div>
                      </div>
                    </div>
                  </v-list-item>
                </v-list>
              </div>
            </div>
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
      form: {
        variation: "",
        color: "",
        size: "",
        amount: 0,
      },
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
  created() {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        this.upperBtn = true;
      } else {
        this.upperBtn = false;
      }
    });
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
