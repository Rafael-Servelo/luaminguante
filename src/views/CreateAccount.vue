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
        :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : '1000'"
        elevation="4"
        rounded="xl"
        class="ma-10"
      >
        <v-card-title class="text-center text-h3">{{
          "Criar Conta".toLocaleUpperCase()
        }}</v-card-title>
        <v-card-text class="text-center text-body-1" translate="yes"
          >Preencha o formulário abaixo para a criação de conta.</v-card-text
        >
        <v-form @submit.prevent="registerUser">
          <v-card-item>
            <div class="flex w-100 justify-center" :class="{col: $vuetify.display.mobile}">
              <div class="w-100">
                <div class="w-100 text-subtitle-2 mb-2">Dados Pessoais:</div>
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
                  :rules="rulesPassword"
                  theme="light"
                  id="password"
                />
                <v-text-field
                  label="Confirmar Senha"
                  v-model="form.confirmPassword"
                  type="password"
                  bg-color="white"
                  rounded
                  variant="solo"
                  :rules="rulesConfirmPassword"
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
                <input
                  type="text"
                  name="mask"
                  v-model="form.cpf"
                  v-mask="'000.000.000-00'"
                  hidden
                />
                <v-text-field
                  label="Telefone"
                  v-model="form.phone"
                  type="phone"
                  bg-color="white"
                  rounded
                  variant="solo"
                  :rules="rules"
                  theme="light"
                />
                <input
                  type="text"
                  name="mask"
                  v-model="form.phone"
                  v-mask="'(00) 00009-0000'"
                  hidden
                />
              </div>
              <v-divider
                :vertical="!$vuetify.display.mobile"
                class="mx-4"
                opacity=".3"
                color="white"
              />
              <div class="w-100">
                <div class="w-100 text-subtitle-2 mb-2">Endereço:</div>
                <v-text-field
                  label="CEP"
                  v-model="form.address[0].cep"
                  type="text"
                  bg-color="white"
                  rounded
                  variant="solo"
                  :rules="rules"
                  theme="light"
                  @blur="buscarCEP"
                />
                <input
                  type="text"
                  name="mask"
                  v-model="form.address[0].cep"
                  v-mask="'00000-000'"
                  hidden
                />
                <div class="flex" style="gap: 1rem">
                  <v-text-field
                    :width="$vuetify.display.mobile ? '200' : '280'"
                    label="Rua"
                    v-model="form.address[0].street"
                    type="text"
                    bg-color="white"
                    rounded
                    variant="solo"
                    theme="light"
                    :disabled="disableCEP"
                    :loading="cepLoad"
                  />
                  <v-text-field
                    label="Numero"
                    v-model="form.address[0].number"
                    type="text"
                    bg-color="white"
                    rounded
                    variant="solo"
                    theme="light"
                    :rules="rules"
                  />
                </div>
                <v-text-field
                  label="Complemento"
                  v-model="form.address[0].complement"
                  type="text"
                  bg-color="white"
                  rounded
                  variant="solo"
                  theme="light"
                  :loading="cepLoad"
                />
                <v-text-field
                  label="Bairro"
                  v-model="form.address[0].neighborhood"
                  type="text"
                  bg-color="white"
                  rounded
                  variant="solo"
                  theme="light"
                  :disabled="disableCEP"
                  :loading="cepLoad"
                />
                <div class="flex" style="gap: 1rem">
                  <v-text-field
                    :width="$vuetify.display.mobile ? '200' : '280'"
                    label="Cidade"
                    v-model="form.address[0].city"
                    type="text"
                    bg-color="white"
                    rounded
                    variant="solo"
                    theme="light"
                    :disabled="disableCEP"
                    :loading="cepLoad"
                  />
                  <v-text-field
                    label="UF"
                    v-model="form.address[0].state"
                    type="text"
                    bg-color="white"
                    rounded
                    variant="solo"
                    theme="light"
                    :disabled="disableCEP"
                    :loading="cepLoad"
                  />
                </div>
              </div>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="d-flex w-100 align-center justify-center">
              <v-btn
                text="Enviar"
                color="var(--color-green)"
                rounded
                type="submit"
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
      disableCEP: true,
      cepLoad: false,
      form: {
        address: [
          {
            cep: "",
            street: "",
            number: "",
            complement: "",
            neighborhood: "",
            city: "",
            state: "",
          },
        ],
        avatar: "https://cdn-icons-png.flaticon.com/512/3899/3899618.png",
        confirmPassword: "",
        cpf: "",
        name: "",
        email: "",
        isAdm: false,
        password: "",
        phone: "",
      },
      recoveryPassword: false,
      rules: [
        (value: any) => {
          if (value) return true;

          return "Campo obrigatório";
        },
      ],
      rulesPassword: [
        (value: any) => {
          if (value.length >= 8) return true;

          return "É preciso ter no minimo 8 caracteres";
        },
      ],
      rulesConfirmPassword: [
        (value: any) => {
          let password = document.getElementById("password") as any;
          // console.log(value)
          console.log(password.value);
          if (value === password.value) return true;

          return "As senhas não conferem";
        },
      ],
    };
  },
  methods: {
    registerUser() {
      store.commit("Set_Load", true);

      store.dispatch("register", this.form);
    },
    buscarCEP() {
      let cep = this.form.address[0].cep.replace("-", "");

      this.disableCEP = true;
      this.cepLoad = true;

      fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
        .then((res) => res.json())
        .then((data) => {
          try {
            this.form.address[0].street = data.street;
            this.form.address[0].neighborhood = data.neighborhood;
            this.form.address[0].city = data.city;
            this.form.address[0].state = data.state;
            this.disableCEP = false;
            this.cepLoad = false;
          } catch (error) {
            console.error(error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
});
</script>
