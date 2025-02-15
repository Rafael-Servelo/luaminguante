<template>
  <v-app-bar color="var(--color-primary)" density="comfortable">
    <v-app-bar-nav-icon
      @click.stop="drawer.drawer = !drawer.drawer"
      v-if="drawer.drawer === false"
    />
    <v-btn icon @click.stop="drawer.drawer = !drawer" v-else>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-spacer></v-spacer>

    <v-btn icon @click="initSearch" v-tooltip="'Pesquisar'" theme="light">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-menu location="start" theme="light">
      <template v-slot:activator="{ props }">
        <v-btn icon v-tooltip="'Favoritos'" theme="light" v-bind="props">
          <v-badge
            :color="user.favorites?.length > 0 ? 'red' : 'transparent'"
            :content="
              user.favorites?.length === 0 ? undefined : user.favorites?.length
            "
            location="top end"
            :floating="true"
          >
            <v-icon>mdi-heart</v-icon>
          </v-badge>
        </v-btn>
      </template>
      <v-list selectable>
        <div v-for="item in user.favorites">
          <div v-for="(product, index) in products" :key="index">
            <div v-if="product.id === item">
              <v-list-item
                @click="accessProduct(item)"
                v-if="user.favorites.length != 0"
                class="ga-4"
              >
                <template v-slot:prepend>
                  <v-img
                    :src="
                      products[index].images[0].startsWith('http')
                        ? products[index].images[0]
                        : 'data: image/jpeg; base64,' +
                          products[index].images[0]
                    "
                    width="50"
                  />
                </template>
                <v-list-item-title>{{
                  products[index].product
                }}</v-list-item-title>
              </v-list-item>
              <v-list-item v-else>
                <div class="text-subtitle-1">Nenhum produto adicionado...</div>
              </v-list-item>
            </div>
          </div>
        </div>
      </v-list>
    </v-menu>

    <v-btn class="me-4" icon v-tooltip="'Carrinho'" theme="light">
      <v-badge
        color="transparent"
        :content="undefined"
        location="top end"
        :floating="true"
      >
        <v-icon>mdi-cart</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
  <sidebar :drawer="drawer" />

  <v-overlay
    :model-value="search"
    class="align-center justify-center"
    theme="light"
    @click:outside="(search = false), (searchField = ''), (results = [])"
  >
    <v-sheet
      rounded
      :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : 700"
      style="overflow: scroll"
      :max-height="$vuetify.display.height - 20"
    >
      <v-card theme="light">
        <v-card-item>
          <v-text-field
            theme="light"
            variant="solo"
            hide-details
            density="compact"
            v-show="search"
            class="w-100"
            label="Pesquisar..."
            clearable
            v-model="searchField"
            @update:model-value="searchText"
          />
        </v-card-item>
        <v-list selectable>
          <v-list-item v-for="item in results">
            <template v-slot:prepend>
              <v-img
                width="90"
                :src="item.images[0]"
                v-if="item.images[0].startsWith('http')"
              ></v-img>
              <v-img
                v-else
                width="90"
                :src="'data: image/jpeg; base64,' + item.images[0]"
              ></v-img>
            </template>
            {{ item.product }}
            <template v-slot:append>
              <v-btn
                color="var(--color-primary)"
                theme="dark"
                @click="accessProduct(item.id)"
                >Acessar</v-btn
              >
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-sheet>
  </v-overlay>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import LoginForm from "@/components/Login.vue";
import UserLogged from "@/components/UserLogged.vue";
import getCookie from "@/assets/scripts/getCookies";
import store from "@/store";
import jp from "jsonpath";

export default defineComponent({
  name: "header nav",
  components: { Sidebar, LoginForm, UserLogged },
  data() {
    return {
      title: "Lua Minguante",
      drawer: {
        drawer: false,
      },
      group: null,
      search: false,
      searchField: "",
      user: computed(() => store.state.auth.user),
      products: computed(() => store.state.store.products),
      results: [] as any,
    };
  },
  watch: {
    group() {
      this.drawer.drawer = false;
    },
  },
  methods: {
    accessProduct(id: any) {
      window.location.replace(`/?id=${id}`);
    },
    initSearch() {
      this.search = true;
    },
    searchText() {
      let list = this.products;
      let res = jp.query(
        list,
        this.searchField === null || this.searchField === ""
          ? `$.product`
          : `$[?(@.product.match(/${this.searchField
              .toLowerCase()
              .replaceAll(" ", ".*")}/i))]`
      );

      this.results = res;
    },
  },
  mounted() {
    if (getCookie("token")) {
      store.dispatch("getUser");
      store.commit("Set_IsLogged", true);
    } else {
      store.commit("Set_IsLogged", false);
    }

    document.addEventListener("keydown", (evt: any) => {
      if (evt.keyCode == 27) {
        this.searchField = "";
        this.search = false;
        this.searchText();
      }
    });
  },
});
</script>
