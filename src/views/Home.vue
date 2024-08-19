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
      <v-img
        alt="Logo Lua Minguante"
        width="200"
        src="../assets/img/logo-escuro.png"
      ></v-img>
      <v-divider color="var(--color-green)" opacity=".5" width="100%" />
      <div class="my-2"></div>
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

            <v-card-item style="min-width: 250px;">
              <v-chip color="var(--color-secondary)" variant="flat" text="Frete Grátis" theme="light" ></v-chip>
              <div class="flex align-center w-100 justify-space-around">
                <div>
                  <div
                    class="text-subtitle-1"
                    style="user-select: none;"
                  >
                    A partir de
                  </div>
                  <div
                    class="text-subtitle-3"
                    style="user-select: none; color: var(--color-green)"
                  >
                    R$ 249,99
                  </div>
                </div>
                <v-btn icon variant="plain" @click="item.fav = !item.fav">
                  <v-icon color="var(--color-green)" v-if="item.fav"
                    >mdi-heart</v-icon
                  >
                  <v-icon color="var(--color-green)" v-else
                    >mdi-heart-outline</v-icon
                  >
                </v-btn>
                <v-btn icon variant="plain" @click="item.card = !item.card">
                  <v-icon color="var(--color-green)" v-if="item.card"
                    >mdi-cart-remove</v-icon
                  >
                  <v-icon color="var(--color-green)" v-else
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
import { defineComponent, ref } from "vue";
import HeaderNav from "@/components/Header.vue";
import MyFooter from "@/components/footer.vue"

export default defineComponent({
  components: {
    HeaderNav,
    MyFooter
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
    let listArray = ref([] as any);
    const urlParams = new URLSearchParams(window.location.search) as any;
    /**
     * Populando Lista para paginação
     */
    const data = Array.from({ length: 200 }).map((el, i) => {
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

        urlParams.set('page', `${state.page.value}`);
      },
      prev() {
        state.page.value--;

        if (state.page.value < 1) {
          this.next();
        }
        urlParams.set('page', `${state.page.value}`);
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
        urlParams.set('page', `${state.page.value}`);
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
        urlParams.set("page", state.page.value)
      },
    };

    function changePage(n: any){
      urlParams.set("page", `${n}`);
      window.location.search = urlParams
    }

    return {
      data,
      state,
      controls,
      list,
      listArray,
      changePage
    };
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.search) as any;
    if(urlParams != ''){
      this.controls.goTo(urlParams.get("page"));
    } else {
      urlParams.set('page', `${this.state.page.value}`);
      window.location.search = urlParams
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
.fluter {
  z-index: 1006;
  position: fixed;
}
</style>
