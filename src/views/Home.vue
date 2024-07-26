<template>
  <header-nav />
  <v-main class="bg-img">
      <v-container class="flex col align-center">        
          <v-card v-for="item in [1,2,3]" height="500" class="flex col align-center justify-center my-2 w-100" rounded="xl" color="white">
              <strong>
                Main Content {{ item }}
              </strong>
          </v-card>
      </v-container>
  </v-main>
  <v-footer color="var(--color-green)" class="d-flex flex-column">
    <div class="flex align-center">
      <p class="pt-0"> Nos acompanhe nas redes sociais! </p>
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
    };
  },
  methods:{
    openInsta(){
    window.open('https://www.instagram.com/luaminguanteloja/')
  }
  }
});
</script>
