<template>
  <v-app-bar color="var(--color-primary)">
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-if="drawer === false"
    />
    <v-btn
      rounded
      icon="mdi-close"
      @click.stop="drawer = !drawer"
      v-else
    ></v-btn>
    <v-spacer></v-spacer>
    <v-img src="../assets/img/logo-claro.png" max-width="60"></v-img>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
  <login-form v-if="!isLogged" :drawer="drawer" />
  <user-logged v-else :drawer="drawer" />
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import LoginForm from "@/components/Login.vue";
import UserLogged from "@/components/UserLogged.vue"
import getCookie from "@/assets/scripts/getCookies";
import store from "@/store";

export default defineComponent({
  name: "header nav",
  components: { LoginForm, UserLogged },
  data() {
    return {
      isLogged: computed(()=> store.state.auth.isLogged),
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
