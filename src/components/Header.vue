<template>
  <v-app-bar color="var(--color-primary)" @click.stop="drawer = !drawer">
    <v-app-bar-nav-icon />
    <v-app-bar-title :text="title" />
    <v-spacer></v-spacer>
    <template v-if="$vuetify.display.mdAndUp">
      <v-btn icon>
        <v-icon>mdi-cart</v-icon>
      </v-btn>
    </template>
  </v-app-bar>
  <v-navigation-drawer
    color="var(--color-primary)"
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <div class="inputs-field ma-2">
      <v-text-field
        class="my-2"
        variant="solo-filled"
        rounded
        hide-details
        bg-color="white"
        placeholder="email"
        type="email"
      />
      <v-text-field
        class="my-2"
        variant="solo-filled"
        rounded
        hide-details
        bg-color="white"
        placeholder="senha"
        type="password"
      />
    </div>
    <div class="buttons d-flex justify-center align-center" style="flex-direction: column;">
      <v-btn class="ma-2" rounded color="var(--color-secondary)">Entrar</v-btn>
      <v-btn class="ma-2" rounded color="var(--color-tertiary)"
        >Cadastre-se</v-btn
      >
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "header nav",
  data() {
    return {
      title: "Mimos da Isa",
      drawer: false,
      group: null,
      items: [
        {
          title: "Foo",
          value: "foo",
        },
        {
          title: "Bar",
          value: "bar",
        },
        {
          title: "Fizz",
          value: "fizz",
        },
        {
          title: "Buzz",
          value: "buzz",
        },
      ],
    };
  },
  watch: {
    group() {
      this.drawer = false;
    },
  },
});
</script>

<style scoped>
div {
  background: var(--color-primary);
}
</style>
