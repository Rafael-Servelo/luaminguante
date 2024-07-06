<template>
  <v-app>
    <v-main class="bg-img">
      <header-nav />
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  import HeaderNav from "@/components/Header.vue"
  export default defineComponent({
    components: { HeaderNav }
  })
</script>
