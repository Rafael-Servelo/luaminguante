<template>
  <p>State: {{ connected }}</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { state } from "@/socket";

export default defineComponent({
  name: "ConnectionState",

  computed: {
    connected() {
      return state.connected;
    },
  },
});
</script>
