<template>
  <v-app-bar color="var(--color-primary)" density="comfortable">
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-if="drawer === false"
    />
    <v-btn icon @click.stop="drawer = !drawer" v-else>
      <v-icon>mdi-close</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
    <v-img src="../assets/img/logo-claro.png" max-width="60"></v-img>
    <v-spacer></v-spacer>

    <v-form
      @submit.prevent="initSearch"
      class="flex align-center"
      :class="{ 'w-100': search }"
    >
      <v-text-field
        variant="outlined"
        hide-details
        v-if="search"
        class="w-100"
        v-model="searchField"
      ></v-text-field>
      <v-btn icon @click="initSearch">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
    </v-form>
    <v-btn icon v-tooltip="'Favoritos'" v-if="!search">
      <v-icon>mdi-heart</v-icon>
    </v-btn>
    <v-btn icon v-tooltip="'Carrinho'" v-if="!search">
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
  <sidebar :drawer="drawer" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import LoginForm from "@/components/Login.vue";
import UserLogged from "@/components/UserLogged.vue";
import getCookie from "@/assets/scripts/getCookies";
import store from "@/store";

export default defineComponent({
  name: "header nav",
  components: { Sidebar, LoginForm, UserLogged },
  data() {
    return {
      title: "Lua Minguante",
      drawer: false,
      group: null,
      search: false,
      searchField: "",
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  methods: {
    initSearch() {
      if (this.searchField === "") {
        this.search = !this.search;
      } else {
        console.log("Pesquisar:", this.searchField);
      }
    },
  },
  mounted() {
    if (getCookie("token")) {
      store.dispatch("getUser");
      store.commit("Set_IsLogged", true);
    } else {
      store.commit("Set_IsLogged", false);
    }
  },
});
</script>
