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
  <v-main style="background: white;">
    <v-container
      class="flex col align-center"
      style="background-color: white; width: 100%"
      ron
    >
      <div class="my-2"></div>
      <div
        class="text-h4 mb-10"
        style="
          color: var(--color-primary);
          font-weight: 500;
          font-family: var(--font-body);
        "
      >
        Destaques
      </div>
      <v-row>
        <v-col v-for="item in products" :key="item.id">
          <v-card
            class="mx-auto mb-4"
            rounded="xl"
            :max-width="$vuetify.display.mobile ? 190 : 300"
            color="white"
            elevation="6"
          >
            <v-sheet color="transparent">
              <v-carousel
                color="var(--color-secondary)"
                :height="$vuetify.display.mobile ? 190 : 300"
                delimiter-icon="mdi-circle-medium"
                hide-delimiter-background
                :continuous="false"
              >
                <template v-slot:prev="{ props }">
                  <v-btn
                    color="var(--color-secondary)"
                    variant="elevated"
                    @click="props.onClick"
                    icon
                    size="30"
                    ><v-icon>mdi-menu-left</v-icon></v-btn
                  >
                </template>
                <v-carousel-item
                  v-for="img in item.images"
                  :src="
                    img.startsWith('http')
                      ? img
                      : 'data: image/jpeg; base64,' + img
                  "
                  cover
                ></v-carousel-item>
                <template v-slot:next="{ props }">
                  <v-btn
                    color="var(--color-secondary)"
                    variant="elevated"
                    @click="props.onClick"
                    icon
                    size="30"
                    ><v-icon>mdi-menu-right</v-icon></v-btn
                  >
                </template>
              </v-carousel>
            </v-sheet>
            <v-card-item>
              <h2 class="text-h6" style="color: var(--color-green)">
                {{ item.product }}
              </h2>
              <div
                class="text-subtitle-1"
                style="
                  max-height: 80px;
                  white-space: nowrap;
                  text-overflow: '...';
                  overflow: hidden;
                "
              >
                {{ item.description }}
              </div>
            </v-card-item>

            <v-card-item style="min-width: 250px">
              <v-chip
                v-for="tag in item.tags"
                color="var(--color-secondary)"
                variant="flat"
                :text="tag"
                theme="light"
              ></v-chip>
              <div class="flex">
                <v-card-item
                  :subtitle="item.discountPrice ? 'de:' : 'A partir de:'"
                >
                  <s v-if="item.discountPrice">
                    <span class="grey font-weight-light"
                      >R$ {{ item.price }}</span
                    >
                  </s>
                  <span v-else style="color: var(--color-green)"
                    >R$ {{ item.price }}</span
                  >
                </v-card-item>
                <v-card-item
                  :subtitle="item.discountPrice ? 'A partir de:' : ''"
                  v-if="item.discountPrice"
                >
                  <span style="color: var(--color-green)"
                    >R$ {{ item?.discountPrice }}</span
                  >
                </v-card-item>
              </div>
            </v-card-item>
            <v-card-item>
              <div class="flex align-center w-100 justify-space-around">
                <v-btn
                  icon
                  variant="flat"
                  base-color="transparent"
                  @click="item.fav = !item.fav"
                >
                  <v-icon
                    color="var(--color-green)"
                    v-if="item.fav"
                    v-tooltip="'Remover dos favoritos'"
                    >mdi-heart</v-icon
                  >
                  <v-icon
                    color="var(--color-green)"
                    v-else
                    v-tooltip="'Adicionar aos favoritos'"
                    >mdi-heart-outline</v-icon
                  >
                </v-btn>
                <v-btn
                  icon
                  variant="flat"
                  base-color="transparent"
                  @click="item.card = !item.card"
                >
                  <v-icon
                    color="var(--color-green)"
                    v-if="item.card"
                    v-tooltip="'Remover do carrinho'"
                    >mdi-cart-remove</v-icon
                  >
                  <v-icon
                    color="var(--color-green)"
                    v-else
                    v-tooltip="'Adicionar ao carrinho'"
                    >mdi-cart-plus</v-icon
                  >
                </v-btn>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
      <div>
        <v-pagination
          ariant="plain"
          color="var(--color-green)"
          v-model="state.page"
          :length="state.totalPages"
          rounded="circle"
          @first="controls.goTo(1)"
          @last="controls.goTo(state.totalPages)"
          @update:model-value="(e: number) => controls.goTo(e)"
          @click="changePage($event.target.innerText)"
          :total-visible="$vuetify.display.mobile ? '4' : '7'"
        />
      </div>
    </v-container>
  </v-main>
  <my-footer></my-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderNav from "@/components/Header.vue";
import MyFooter from "@/components/footer.vue";
import router from "@/router";
import store from "@/store";
import { controls, state, changePage } from "@/assets/scripts/pagination"

export default defineComponent({
  components: {
    HeaderNav,
    MyFooter,
  },
  data() {
    return {
      icons: ["mdi-instagram"],
      upperBtn: false,
      products: computed(() => store.state.store.products),
      state,
      controls,
      changePage
    };
  },
  methods: {
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    store.dispatch("getProducts");
    const urlParams = new URLSearchParams(window.location.search) as any;
    if (urlParams != "") {
      controls.goTo(urlParams.get("page"));
    } else {
      urlParams.set("page", `${state.page}`);
      window.location.search = urlParams;
    }
    if (urlParams.get("token")) {
      sessionStorage.setItem("resetToken", urlParams.get("token"));
      router.push({ name: "ForgotPassword" });
    }
    /**
     * Função para voltar ao topo da pagina
     */
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        this.upperBtn = true;
      } else {
        this.upperBtn = false;
      }
    });
  },
});
</script>

<style>
.bg-logo {
  position: relative;
  top: 56px;
  width: 100%;
  background-color: var(--color-primary);
  display: flex;
}
.fluter {
  z-index: 1006;
  position: fixed;
}
</style>
