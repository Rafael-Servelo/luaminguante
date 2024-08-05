<template>
  <v-fab
    color="var(--color-secondary)"
    icon="mdi-chevron-up"
    location="bottom right"
    app
    class="mb-8"
    :appear="true"
    size="60"
    @click="upPage"
    v-if="upperBtn"
  ></v-fab>

  <header-nav />
  <v-main class="bg-img">
    <v-container class="flex col align-center">
      <v-card
        v-for="item in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]"
        class="mx-auto mb-4"
        rounded="lg"
        max-width="344"
        color="white"
      >
        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/forest-art.jpg"
        ></v-img>

        <v-card-text>
          <h2 class="text-h6" style="color: var(--color-green);">Main Content {{ item }}</h2>
          Travel to the best outdoor experience on planet Earth. A vacation you
          will never forget!
        </v-card-text>

        <v-card-title>
          <v-rating

            :model-value="4"
            background-color="var(--color-green)"
            class="me-2"
            color="var(--color-green)"
            dense
            hover
          ></v-rating>
          <span class="text-primary text-subtitle-2">64 Reviews</span>
        </v-card-title>
      </v-card>
    </v-container>
  </v-main>
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
import HeaderNav from "@/components/Header.vue";

export default defineComponent({
  components: {
    HeaderNav,
  },
  data() {
    return {
      icons: ["mdi-facebook", "mdi-instagram"],
      upperBtn: false,
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
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  mounted() {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 100) {
        this.upperBtn = true;
      } else {
        this.upperBtn = false;
      }
    });
  },
});
</script>

<style>
.fluter {
  z-index: 1006;
  position: fixed;
}
</style>
