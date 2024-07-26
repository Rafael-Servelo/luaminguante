<template>
  <v-main>
    <v-container class="flex col align-center justify-center w-100 h-100">
      <v-card
        elevation="12"
        :height="400"
        :width="400"
        rounded="xl"
        color="#f4f4f4"
      >
        <div class="flex col align-center">
          <h1>404</h1>
          <h4>Página não encontrada 😢</h4>
          <img src="/src/assets/img/404.gif" alt="404" width="300" />
        </div>
      </v-card>
      <v-btn class="ma-10" color="var(--color-green)" rounded variant="elevated" @click="$router.push({name: 'Home'})">Voltar para página inicial</v-btn>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "404",
});
</script>

<style scoped>
div {
  font-size: xx-large;
  color: var(--color-green);
  user-select: none;
}
</style>
