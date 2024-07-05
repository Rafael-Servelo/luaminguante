<template>
  <v-app>
    <v-main class="bg-img">
      <Home/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import {defineComponent} from "vue"
  import Home from "@/components/Home.vue"
  export default defineComponent({
    components: {Home}
  })
</script>
