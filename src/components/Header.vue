<template>
  <v-app-bar color="var(--color-primary)">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer" v-if="drawer === false" />
    <v-btn rounded icon="mdi-close" @click.stop="drawer = !drawer" v-else></v-btn>
    <v-spacer></v-spacer>
    <v-img src="../assets/img/logo.png" max-width="60"></v-img>
    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon>mdi-cart</v-icon>
    </v-btn>
  </v-app-bar>
  <login-form :drawer="drawer" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginForm from "@/components/Login.vue";

export default defineComponent({
  name: "header nav",
  components: { LoginForm },
  data() {
    return {
      title: "Mimos da Isa",
      drawer: false,
      group: null,
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
});
</script>
