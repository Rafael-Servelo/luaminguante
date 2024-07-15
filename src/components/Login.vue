<template>
  <v-navigation-drawer
    v-if="!isRegister"
    floating
    :width="$vuetify.display.mobile ? $vuetify.display.width : 400"
    color="var(--color-primary)"
    v-model="drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <v-responsive class="mx-auto" max-width="344">
      <v-form @submit.prevent="login">
        <v-text-field
          class="my-2"
          variant="solo-filled"
          rounded
          hide-details
          bg-color="white"
          placeholder="E-mail"
          type="email"
          autocomplete="username"
          v-model="form.email"
        />
        <v-text-field
          class="my-2"
          variant="solo-filled"
          rounded
          hide-details
          bg-color="white"
          placeholder="Senha"
          type="password"
          autocomplete="current-password"
          v-model="form.password"
        />
        <div class="inputs-field">
          <v-btn
            class="ma-2"
            rounded
            color="var(--color-secondary)"
            type="submit"
            :loading="loadBtn"
            >Entrar</v-btn
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
        <p class="frase-inteira">Ainda nao tem cadastro ?</p>
        <div class="line"></div>
      </div>
      <v-btn
        @click="store.commit('Set_IsRegister', !isRegister)"
        class="ma-2"
        rounded
        color="var(--color-tertiary)"
        >Cadastre-se</v-btn
      >
    </div>
  </v-navigation-drawer>
  <register v-else :drawer="drawer" />
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";
import { toast } from "vue3-toastify";
import Register from "@/components/Register.vue";

export default defineComponent({
  name: "Login Form",
  components: { Register },
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
        email: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      store.commit("Set_Load", true);
      store.dispatch("login", this.form);
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
