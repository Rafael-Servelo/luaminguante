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
  <v-main class="bg-img">
    <v-container
      class="flex col align-center"
      style="background-color: white"
      :style="{ width: $vuetify.display.mobile ? '100%' : '1500px' }"
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
        <v-col
          v-for="item in products"
          :key="item.id"
          :cols="$vuetify.display.mobile === false ? '3' : false"
        >
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
                  :src="img.startsWith('http') ? img : 'data: image/jpeg; base64,'+ img"
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
            <v-card-text>
              <h2 class="text-h6" style="color: var(--color-green)">
                {{ item.product }}
              </h2>
              {{ item.description }}
            </v-card-text>

            <v-card-item style="min-width: 250px">
              <v-chip
              v-for="tag in item.tags"
                color="var(--color-secondary)"
                variant="flat"
                :text="tag"
                theme="light"
              ></v-chip>
              <v-card-item subtitle="A partir de:">
                <span style="color: var(--color-green)"
                  >R$ {{ item.price }}</span
                >
              </v-card-item>
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
          v-model="state.page.value"
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
import { computed, defineComponent, ref } from "vue";
import HeaderNav from "@/components/Header.vue";
import MyFooter from "@/components/footer.vue";
import router from "@/router";
import store from "@/store";

export default defineComponent({
  components: {
    HeaderNav,
    MyFooter,
  },
  data() {
    return {
      icons: ["mdi-instagram"],
      upperBtn: false,
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
  setup() {
    const products =  computed(() => store.state.store.products);
    let listArray = ref([] as any);
    const urlParams = new URLSearchParams(window.location.search) as any;
    /**
     * Populando Lista para paginação
     */
    const data = Array.from({ length: 4 }).map((el, i) => {
      if (!el) {
        el = {
          name: `Main Content ${i + 1}`,
          id: i,
          fav: false,
          card: false,
          rated: Math.floor(Math.random() * (5 - 1 + 1)) + 1,
        };
      }
      return el as any;
    });

    let perPage = 16;
    const state = {
      page: ref(1),
      perPage,
      totalPages: Math.ceil(data.length / perPage),
    };
    const controls = {
      next() {
        state.page.value++;

        if (state.page.value > state.totalPages) {
          this.prev();
        }

        urlParams.set("page", `${state.page.value}`);
      },
      prev() {
        state.page.value--;

        if (state.page.value < 1) {
          this.next();
        }
        urlParams.set("page", `${state.page.value}`);
      },
      goTo(page: number) {
        state.page.value = page;

        list.update();

        if (state.page.value > state.totalPages) {
          this.goTo(state.totalPages);
        }

        if (state.page.value < 1) {
          this.goTo(1);
        }
        urlParams.set("page", `${state.page.value}`);
      },
    };

    const list = {
      update() {
        listArray.value = [];

        let page = state.page.value - 1;
        let start = page * state.perPage;
        let end = start + state.perPage;

        const paginatedItems = data.slice(start, end);

        listArray.value = paginatedItems;
        urlParams.set("page", state.page.value);
      },
    };

    function changePage(n: any) {
      urlParams.set("page", `${n}`);
      window.location.search = urlParams;
    }

    return {
      data,
      state,
      controls,
      list,
      listArray,
      products,
      changePage,
    };
  },
  mounted() {
    store.dispatch("getProducts");
    const urlParams = new URLSearchParams(window.location.search) as any;
    if (urlParams != "") {
      this.controls.goTo(urlParams.get("page"));
    } else {
      urlParams.set("page", `${this.state.page.value}`);
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
