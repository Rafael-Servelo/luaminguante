<template>
  <v-footer color="var(--color-assistant)" class="d-flex flex-column">
    <div class="flex col align-center">
      <v-img src="../assets/img/logo-claro.png" width="200"></v-img>
      <div class="text-subtitle-1" style="margin-top: -1.5rem; font-family: var(--font-body);">A beleza começa com o autocuidado!</div>
    </div>
    <v-divider class="w-100 my-4" opacity="0.2" color="white"></v-divider>
    <div class="flex align-center">
      <p class="pt-0">Nos acompanhe nas redes sociais!</p>
      <v-spacer />
      <v-btn
        v-for="icon in icons"
        :key="icon"
        :icon="icon"
        class="mx-2"
        variant="text"
        @click="icon.includes('instagram') ? openInsta() : console.log('Face')"
      ></v-btn>
    </div>

    <v-divider></v-divider>

    <div style="font-weight: 400">
      <strong> &copy;{{ new Date().getFullYear() }} Lua Minguante </strong> —
      Desenvolvido por <strong>Rafael Servelo</strong>
    </div>
    <v-divider class="w-100 my-4" opacity="0.2" color="white"></v-divider>
    <div style="font-weight: 400">
      Lua Minguante. 2024 - Todos os direitos reservados.
    </div>
  </v-footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Footer",
  data() {
    return {
      icons: ["mdi-instagram"],
    };
  },
  methods: {
    openInsta() {
      window.open(
        "https://www.instagram.com/luaminguanteloja/",
        "WindowName",
        "noopener"
      );
    },
  },
});
</script>
