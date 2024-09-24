<template>
  <header-nav></header-nav>

  <v-main style="background: white">
    <v-container
      class="flex col align-center justify-center h-100 w-100"
      style="background-color: white; color: black"
      ron
    >
      <v-card
        color="var(--color-secondary)"
        :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : '500'"
        elevation="4"
        rounded="xl"
        class="ma-10"
      >
        <v-card-title class="text-center">{{
          "Criar Conta".toLocaleUpperCase()
        }}</v-card-title>
        <v-card-text class="text-center" translate="yes"
          >Preencha o formulário abaixo para a criação de conta.</v-card-text
        >
        <v-form @submit.prevent="registerUser">
          <v-card-item>
            <v-text-field
              label="Nome Completo"
              v-model="form.name"
              type="text"
              bg-color="white"
              rounded
              variant="solo"
              :rules="rules"
              theme="light"
            />
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
              label="Senha"
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
            <v-text-field
              label="CPF"
              v-model="form.cpf"
              type="CPF"
              bg-color="white"
              rounded
              variant="solo"
              :rules="rules"
              theme="light"
            />
          </v-card-item>
          <v-card-item>
            <div class="d-flex w-100 align-center justify-center">
              <v-btn
                text="Enviar"
                color="var(--color-green)"
                rounded
                type="submit"
                @click="registerUser"
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
      form: {
        name: "",
        email: "",
        cpf: "",
        password: "",
        confirmPassword: "",
        address: {
          cep: "",
          rua: "",
          numero: "",
          bairro: "",
          cidade: "",
          uf: "",
        },
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
    registerUser() {
      console.log(this.form);
    },
  },
});
</script>
