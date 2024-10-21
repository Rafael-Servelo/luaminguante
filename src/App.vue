<template>
  <loading v-show="loadingPage" />
  <set-products :show="setProduct" />
  <v-app theme="dark" style="background: var(--color-primary)">
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { computed } from "vue";
import store from "./store";
import { socket } from "@/socket";
const loadingPage = computed(() => store.state.loadingPage);
const setProduct = computed(() => store.state.store.setProducts);

socket.off();

store.dispatch("bindEvents");
</script>

<!-- 
let favorites = store.state.auth.user.favorites;
let products = await data.products;

let pos = products.map((produc: any) => {
  return produc.id;
});
let idFav = favorites.map((produc: any) => {
  return produc.id;
});
for (let item of idFav) {
  let index = pos.indexOf(item);

  if (index > -1) {
    products[index]["fav"] = true;
  }
} -->
