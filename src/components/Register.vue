<template>
  <v-navigation-drawer
    floating
    :width="$vuetify.display.mobile ? $vuetify.display.width : 400"
    color="var(--color-primary)"
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <v-responsive class="mx-auto" max-width="344">
      <v-form @submit.prevent="register">
        <v-text-field
          theme="light"
          class="my-2"
          variant="solo-filled"
          rounded
          hide-details
          placeholder="Nome"
          type="text"
          v-model="form.name"
        />
        <v-text-field
          class="my-2"
          variant="solo-filled"
          rounded
          hide-details
          theme="light"
          placeholder="E-mail"
          type="email"
          autocomplete="email"
          v-model="form.email"
        />
        <v-text-field
          class="my-2"
          variant="solo-filled"
          rounded
          hide-details
          theme="light"
          placeholder="Senha"
          type="password"
          autocomplete="current-password"
          v-model="form.password"
        />
        <v-text-field
          class="my-2"
          variant="solo-filled"
          rounded
          hide-details
          theme="light"
          placeholder="Confirmar Senha"
          type="password"
          v-model="form.confirmPassword"
        />
        <div class="inputs-field">
          <v-btn
            class="ma-2"
            type="submit"
            :loading="loadBtn"
            rounded
            color="var(--color-tertiary)"
            >Cadastre-se</v-btn
          >
        </div>
      </v-form>
    </v-responsive>

    <div
      class="buttons d-flex justify-center align-center"
      style="flex-direction: column"
    >
      <div class="d-flex w-100 align-center justify-center">
        <div class="line"></div>
        <p class="frase-inteira">Já possui login ?</p>
        <div class="line"></div>
      </div>
      <v-btn
        @click="store.commit('Set_IsRegister', !isRegister)"
        class="ma-2"
        rounded
        color="var(--color-secondary)"
        >Entrar</v-btn
      >
    </div>
  </v-navigation-drawer>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";
import { toast } from "vue3-toastify";

export default defineComponent({
  name: "Login Form",
  props: {
    drawer: Boolean,
  },
  data() {
    return {
      isRegister: computed(() => store.state.isRegister),
      toast,
      store,
      loadBtn: computed(() => store.state.auth.load),
      form: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    register() {
      store.commit("Set_Load", true);
      store.dispatch("register", this.form);
    },
  },
});
</script>

<style scoped>
.inputs-field {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
