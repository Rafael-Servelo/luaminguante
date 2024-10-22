<template>
  <v-navigation-drawer
    floating
    :width="$vuetify.display.mobile ? $vuetify.display.width : 400"
    color="var(--color-primary)"
    v-model="drawer.drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <v-responsive class="mx-auto" max-width="344">
      <v-form @submit.prevent="login">
        <v-text-field
          theme="light"
          class="my-2"
          variant="solo-filled"
          rounded="lg"
          hide-details
          placeholder="E-mail"
          type="email"
          autocomplete="username"
          v-model="form.email"
        />
        <v-text-field
          theme="light"
          class="my-2"
          variant="solo-filled"
          rounded="lg"
          hide-detail
          placeholder="Senha"
          :type="showPassword ? 'text' : 'password'"
          autocomplete="current-password"
          v-model="form.password"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          @click:append-inner="showPassword = !showPassword"
        />

        <div
          class="buttons d-flex justify-center align-center"
          style="flex-direction: column"
        ></div>
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

    <div class="d-flex w-100 mb-2 align-center justify-center">
      <div class="line"></div>
      <a
        class="frase-inteira link"
        @click="$router.push({ name: 'ForgotPassword' })"
        >Esqueceu a senha ?</a
      >
      <div class="line"></div>
    </div>

    <div
      class="buttons d-flex justify-center align-center"
      style="flex-direction: column"
    >
      <div class="d-flex w-100 align-center justify-center">
        <div class="line"></div>
        <p
          class="frase-inteira link"
          @click="store.commit('Set_IsRegister', !isRegister)"
        >
          Ainda não tem cadastro ?
        </p>
        <div class="line"></div>
      </div>
      <v-btn
        v-if="isRegister"
        @click="$router.push({ name: 'CreateAccount' })"
        class="ma-2"
        rounded
        color="var(--color-tertiary)"
        >Cadastre-se</v-btn
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
    drawer: Object as any,
  },
  data() {
    return {
      showPassword: false,
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
.link {
  cursor: pointer;
  color: white;
}
.link:hover {
  color: cornflowerblue;
}
</style>
