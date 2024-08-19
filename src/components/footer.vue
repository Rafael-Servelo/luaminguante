<template>
  <v-footer color="var(--color-green)" class="d-flex flex-column">
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

    <div>
      ©{{ new Date().getFullYear() }} Lua Minguante —
      <strong>Desenvolvido por Rafael Servelo</strong>
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