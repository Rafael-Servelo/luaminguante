<template>
  <v-app>
    <loading v-show="loadingPage" />

    <v-main class="bg-img">
      <header-nav />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import HeaderNav from "@/components/Header.vue";
import Loading from "@/components/Loading.vue";
import { computed } from "vue";
import store from "./store";
const loadingPage = computed(() => store.state.loadingPage);
</script>
