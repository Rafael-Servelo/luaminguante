<template>
  <header-nav></header-nav>

  <v-main style="background: white;">
    <v-container
      class="flex col align-center justify-center h-100 w-100"
      style="background-color: white"
      ron
    >
      <v-card
        color="var(--color-secondary)"
        :width="$vuetify.display.mobile ? $vuetify.display.width - 20: '500'"
        elevation="4"
        rounded="xl"
        class="ma-10"
        v-if="!recoveryPassword"
      >
        <v-card-title class="text-center">{{
          "Esqueci a senha!".toLocaleUpperCase()
        }}</v-card-title>
        <v-card-text class="text-center" translate="yes"
          >Enviaremos no seu email um link para recuperação de senha. Caso não
          encontre na caixa de entrada, verifique no lixo eletronico
          (SPAN)</v-card-text
        >
        <v-form @submit.prevent="sendEmail">
          <v-card-item>
            <v-text-field
              label="E-mail"
              v-model="email"
              type="email"
              bg-color="white"
              rounded
              variant="solo"
              :rules="rules"
              theme="light"
            />
            <div class="w-100 flex justify-center mt-2">
              <v-btn
                text="Recuperar Senha"
                color="var(--color-green)"
                type="submit"
                rounded
                :loading="loadBtn"
                @click="$store.commit('Set_Load', true)"
              />
            </div>
          </v-card-item>
        </v-form>
      </v-card>
      <v-card
        v-else
        color="var(--color-secondary)"
        :width="$vuetify.display.mobile ? $vuetify.display.width - 20: '500'"
        elevation="4"
        rounded="xl"
        class="ma-10"
      >
        <v-card-title class="text-center">{{
          "Recuperar Senha".toLocaleUpperCase()
        }}</v-card-title>
        <v-form @submit.prevent="sendRecovery">
          <v-card-item>
            <v-text-field
              label="E-mail"
              v-model="form.email"
              type="email"
              bg-color="white"
              rounded
              variant="solo"
              :rules="rules"
              theme="light"
            />
            <v-text-field
              label="Nova Senha"
              v-model="form.password"
              type="password"
              bg-color="white"
              rounded
              variant="solo"
              :rules="rules"
              theme="light"
            />
            <v-text-field
              label="Confirmar Senha"
              v-model="form.confirmPassword"
              type="password"
              bg-color="white"
              rounded
              variant="solo"
              :rules="rules"
              theme="light"
            />
            <div class="w-100 flex justify-center mt-2">
              <v-btn
                text="Recuperar Senha"
                color="var(--color-green)"
                type="submit"
                :loading="loadBtn"
                rounded
                @click="$store.commit('Set_Load', true)"
              />
            </div>
          </v-card-item>
        </v-form>
      </v-card>
      <v-btn
        text="Voltar para Página inicial"
        color="var(--color-green)"
        rounded
        @click="$router.push({ name: 'Home' })"
      />
    </v-container>
  </v-main>
  <my-footer></my-footer>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import HeaderNav from "@/components/Header.vue";
import MyFooter from "@/components/footer.vue";
import store from "@/store";

export default defineComponent({
  name: "ForgotPassword",
  components: {
    HeaderNav,
    MyFooter,
  },
  data() {
    return {
      loadBtn: computed(() => store.state.auth.load),
      email: "",
      form: {
        email: "",
        token: "",
        password: "",
        confirmPassword: "",
      },
      recoveryPassword: false,
      rules: [
        (value: any) => {
          if (value) return true;

          return "Campo obrigatório";
        },
      ],
    };
  },
  methods: {
    sendEmail() {
      store.dispatch("forgotPassword", this.email);
    },
    sendRecovery() {
      store.dispatch("recoveryPassword", this.form);
    },
  },
  mounted() {
    const resetToken = sessionStorage.getItem("resetToken");

    if (resetToken !== null) {
      this.recoveryPassword = true;
      this.form.token = resetToken;
    } else {
      this.recoveryPassword = false;
    }
  },
});
</script>
