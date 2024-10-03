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
const loadingPage = computed(() => store.state.loadingPage);
const setProduct = computed(() => store.state.store.setProducts);
</script>
