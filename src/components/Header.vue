<template>
  <v-app-bar color="var(--color-primary)">
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-if="drawer === false"
    />
    <v-btn
      icon
      @click.stop="drawer = !drawer"
      v-else
    ><v-icon>mdi-close</v-icon></v-btn>
    <v-spacer></v-spacer>
    <v-img src="../assets/img/logo-claro.png" max-width="60"></v-img>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
  <sidebar :drawer="drawer" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import LoginForm from "@/components/Login.vue";
import UserLogged from "@/components/UserLogged.vue"
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
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
  mounted() {
    if (getCookie("token")) {
      store.dispatch('getUser')
      store.commit("Set_IsLogged", true)
    } else {
      store.commit("Set_IsLogged", false)
    }
  },
});
</script>
