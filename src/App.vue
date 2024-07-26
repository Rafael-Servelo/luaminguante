<template>
  <loading v-show="loadingPage" />
  <v-app theme="dark" style="background: var(--color-primary);">
    <router-view></router-view>
  </v-app>
</template>

<script setup lang="ts">
import Loading from "@/components/Loading.vue";
import { computed } from "vue";
import store from "./store";
const loadingPage = computed(() => store.state.loadingPage);
</script>
