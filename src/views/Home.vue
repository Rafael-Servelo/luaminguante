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
  <v-main class="bg-img">
    <v-container
      class="flex col align-center"
      style="background-color: white"
      ron
    >
      <div
        class="text-h3 mb-6"
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
          v-for="item in listArray"
          :key="item.id"
          :cols="$vuetify.display.mobile === false ? '3' : false"
        >
          <v-card
            class="mx-auto mb-4"
            rounded="xl"
            max-width="344"
            color="white"
            elevation="6"
          >
            <v-img
              :src="`https://picsum.photos/500/300?image=${item.id + 10}`"
            ></v-img>
            <v-card-text>
              <h2 class="text-h6" style="color: var(--color-green)">
                {{ item.name }}
              </h2>
              Travel to the best outdoor experience on planet Earth. A vacation
              you will never forget!
            </v-card-text>

            <v-card-item>
              <div class="flex align-center w-100 justify-space-around">
                <div
                  class="text-subtitle-3"
                  style="user-select: none; color: var(--color-green)"
                >
                  R$ 49,99
                </div>
                <v-btn icon variant="plain">
                  <v-icon color="var(--color-green)">mdi-heart-outline</v-icon>
                </v-btn>
                <v-btn icon variant="plain">
                  <v-icon color="var(--color-green)">mdi-cart-plus</v-icon>
                </v-btn>
              </div>
            </v-card-item>

            <v-card-title>
              <div class="flex align-center col">
                <v-rating
                  :model-value="4"
                  background-color="var(--color-green)"
                  class="me-2"
                  color="var(--color-green)"
                  dense
                  hover
                ></v-rating>
                <div
                  class="text-subtitle-2"
                  style="color: var(--color-secondary)"
                >
                  64 Reviews
                </div>
              </div>
            </v-card-title>
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
          :total-visible="$vuetify.display.mobile ? '4' : '7'"
        />
      </div>
    </v-container>
  </v-main>
  <v-footer color="var(--color-green)" class="d-flex flex-column">
    <div class="flex align-center">
      <p class="pt-0">Nos acompanhe nas redes sociais!</p>
      <v-spacer />
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-2"
        variant="text"
        @click="icon.includes('instagram') ? openInsta() : console.log('Face')"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div>
      ©{{ new Date().getFullYear() }} Lua Minguante —
      <strong>Desenvolvido por Rafael Servelo</strong>
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import HeaderNav from "@/components/Header.vue";

export default defineComponent({
  components: {
    HeaderNav,
  },
  data() {
    return {
      icons: ["mdi-instagram"],
      upperBtn: false,
    };
  },
  methods: {
    openInsta() {
      window.open(
        "https://www.instagram.com/luaminguanteloja/",
        "WindowName",
        "noopener"
      );
    },
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  setup() {
    let listArray = ref([] as any);
    /**
     * Populando Lista para paginação
     */
    const data = Array.from({ length: 100 }).map((el, i) => {
      if (!el) {
        el = {
          name: `Main Content ${i + 1}`,
          id: i,
        };
      }
      return el as any;
    });

    let perPage = 8;
    const state = {
      page: ref(0),
      perPage,
      totalPages: Math.ceil(data.length / perPage),
    };
    const controls = {
      next() {
        state.page.value++;

        if (state.page.value > state.totalPages) {
          this.prev();
        }
      },
      prev() {
        state.page.value--;

        if (state.page.value < 1) {
          this.next();
        }
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

        console.log(paginatedItems);
      },
    };

    return {
      data,
      state,
      controls,
      list,
      listArray,
    };
  },
  mounted() {
    this.controls.goTo(0);
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
.fluter {
  z-index: 1006;
  position: fixed;
}
</style>
