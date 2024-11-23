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
        alt="Logo Lua Minguante"
        width="200"
        height="200"
        src="../assets/img/logo-claro.png"
      ></v-img>
    </div>
    <v-main style="background: white">
      <div style="color: var(--color-black)" class="ma-4">
        <div v-if="notFound">
          <v-empty-state class="pa-0" size="200">
            <template v-slot:media>
              <v-sheet class="py-4 mb-4" color="#fff">
                <v-img
                  src="https://vuetifyjs.b-cdn.net/docs/images/components/v-empty-state/astro-cat.svg"
                ></v-img>
              </v-sheet>
            </template>

            <template v-slot:title>
              <div class="text-h6 text-high-emphasis txt-assistant">Ops..</div>
            </template>

            <template v-slot:text>
              <div
                class="text-body-2 font-weight-medium text-medium-emphasis txt-assistant"
              >
                Produto não encontrado...
              </div>
            </template>
            <template v-slot:actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="goHome"
                text="Voltar ao ínicio"
                color="var(--color-secondary)"
              ></v-btn>
            </template>
          </v-empty-state>
        </div>
        <div v-for="(product, index) in products" :key="index">
          <div v-if="product.id.toString() === urlParams.get('id')">
            <div class="flex ga-8" :class="{ col: $vuetify.display.mobile }">
              <v-carousel
                :style="{
                  'min-width': $vuetify.display.mobile ? '100%' : '800px',
                  width: $vuetify.display.mobile ? '100%' : '800px',
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
                            readonly
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
                        <span class="text-subtitle-2"> Tags: </span>
                        <div class="text-body-2 flex ga-4">
                          <v-chip v-for="tag in product.tags">
                            {{ tag }}
                          </v-chip>
                        </div>
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
            <div class="similar flex col ga-4">
              <v-spacer></v-spacer>
              <span class="title text-h3 txt-primary">
                Produtos Semelhantes:
              </span>
              <div
                class="flex row"
                style="overflow: auto; background-color: var(--color-primary)"
              >
                <div v-for="semelhante in products" class="flex row">
                  <div
                    v-if="semelhante.category === product.category"
                    class="text-body-2"
                  >
                    <v-card
                      theme="light"
                      class="ma-4"
                      :width="$vuetify.display.mobile ? '200px' : '400px'"
                    >
                      <v-card-item class="flex align-center justify-center">
                        <v-img
                          :src="
                            semelhante.images[0].startsWith('http')
                              ? semelhante.images[0]
                              : 'data: image/jpeg; base64,' +
                                semelhante.images[0]
                          "
                          width="200"
                          height="200"
                        ></v-img>
                      </v-card-item>
                      <v-card-title class="text-h6">
                        {{ semelhante.product }}
                      </v-card-title>
                      <v-card-subtitle style="max-width: 400px">
                        {{ semelhante.description }}
                      </v-card-subtitle>
                      <v-card-item class="flex align-center justify-center">
                        <v-btn
                          color="var(--color-primary)"
                          theme="dark"
                          @click="accessProduct(semelhante.id)"
                          >Acessar</v-btn
                        >
                      </v-card-item>
                    </v-card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex align-center justify-center ma-4">
        <v-btn color="var(--color-secondary)" @click="goHome"
          >Página Inicial</v-btn
        >
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
import jp from "jsonpath";

export default defineComponent({
  name: "Product",
  components: {
    Loading,
    MyFooter,
    HeaderNav,
  },
  data() {
    return {
      jp,
      form: {
        variation: "",
        color: "",
        size: "",
        amount: 0,
      },
      notFound: false,
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
    accessProduct(id: any) {
      window.location.replace(`/produto.html?id=${id}`);
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
        if (index === -1 || index === undefined || index === null) {
          this.notFound = true;
        } else {
          document.title = this.products[index].product;
        }
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
  position: relative;
  top: 56px;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
}
</style>
