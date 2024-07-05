<template>
  <v-app-bar color="var(--color-primary)">
    <v-app-bar-nav-icon />
    <v-app-bar-title :text="title" />
    <v-spacer></v-spacer>
    <v-btn icon>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
//import store from "@/store";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
  data(){
    return{
        title: "Mimos da Isa"   }
  }
});
</script>

<style scoped>
div {
  background: var(--color-primary);
}
</style>
