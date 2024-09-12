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
      class="flex col align-center"
      style="background-color: white; color: black; width: 100%"
      ron
    >
      <div class="my-2"></div>
      <v-card theme="light" color="var(--color-secondary)" class="mb-5">
        <v-select
          theme="light"
          bg-color="var(--color-secondary)"
          base-color="var(--color-primary)"
          color="var(--color-primary)"
          append-icon="mdi-filter"
          label="FILTRO"
          :items="itemsFilter"
          item-title="item"
          item-value="value"
          :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : '300'"
          hide-details
          @update:model-value="filterResults($event)"
          class="pr-4"
        >
        </v-select>
      </v-card>
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
      <v-row class="w-100">
        <v-col v-for="item in resultPagination" :key="item.id" sm>
          <v-card
            class="mx-auto mb-4"
            rounded="xl"
            :width="
              $vuetify.display.mobile ? $vuetify.display.width / 2 - 30 : 300
            "
            :height="$vuetify.display.mobile ? 'auto' : 600"
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
              <div :class="{ flex: !$vuetify.display.mobile }">
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
                  :subtitle="item.discountPrice ? 'Por:' : ''"
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
          v-model="paginaAtual"
          :length="totalPage()"
          rounded="circle"
          @first="goToPage(1)"
          @last="goToPage(totalPage())"
          @update:model-value="(e: number) => goToPage(e)"
          :total-visible="$vuetify.display.mobile ? '4' : '7'"
        />
      </div>
    </div>
  </v-main>
  <my-footer></my-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderNav from "@/components/Header.vue";
import MyFooter from "@/components/footer.vue";
import store from "@/store";
// @click="changePage($event.target.innerText)"

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
      resultPagination: [] as any,
      paginaAtual: 1,
      limit: 10,
      itemsFilter: [
        {
          item: "Ordem alfabética (A-Z)",
          value: "alfAZ",
        },
        {
          item: "Ordem alfabética (Z-A)",
          value: "alfZA",
        },
        {
          item: "Menor Valor",
          value: "menor",
        },
        {
          item: "Maior Valor",
          value: "maior",
        },
        {
          item: "Lançamento",
          value: "date",
        },
      ],
      urlParams: new URLSearchParams(window.location.search) as any,
    };
  },
  methods: {
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    count() {
      let counts = this.paginaAtual * this.limit - this.limit;

      return counts;
    },
    totalPage() {
      let total = Math.ceil(this.products.length / this.limit);

      return total;
    },
    // changePage(n: any) {
    //   this.urlParams.set("page", `${n}`);
    //   window.location.search = this.urlParams;
    // },
    filterResults(evt: any) {
      if (evt === "alfAZ") {
        // Logica alfabetica
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.product > b.product;
          }),
          this.paginaAtual,
        );
      } else if (evt === "alfZA") {
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.product < b.product;
          }),
          this.paginaAtual,
        );
      } else if (evt === "menor") {
        // Logica menor preço
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.price - b.price;
          }),
          this.paginaAtual,
        );
      } else if (evt === "maior") {
        // Logica maior preço
        this.listItems(
          this.products.sort((a: any, b: any) => {
            return b.price - a.price;
          }),
          this.paginaAtual,
        );
      } else if (evt === "date") {
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.datePost < b.datePost;
          }),
          this.paginaAtual,
        );
      } else {
        store.dispatch("getProducts");
      }
    },
    listItems(items: Array<object>, pageActual: any) {
      let result = [] as any;
      let totalPage = this.totalPage();
      let count = this.count();
      let delimiter = count + this.limit;

      if (pageActual <= totalPage) {
        for (let i = count; i < delimiter; i++) {
          if (items[i]) {
            result.push(items[i]);
            count++;
          }
        }
      }

      this.resultPagination = result;
    },
    goToPage(page: any) {
      if (page > this.totalPage()) {
        return this.listItems(this.products, this.totalPage());
      }

      if (page < 1) {
        return this.listItems(this.products, 1);
      }

      this.listItems(this.products, page);
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
    setTimeout(() => {
      this.listItems(this.products, 1);
    }, 200);
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
