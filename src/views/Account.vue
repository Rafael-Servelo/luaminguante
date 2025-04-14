<template>
  <Template1>
    <div class="content">
      <div class="txt-body text-h3">
        Minha Conta
        <v-divider opacity="1" color="var(--color-primary)"></v-divider>
      </div>
      <v-container>
        <div class="flex col align-center justify-center">
          Foto de perfil:
          <v-avatar color="var(--color-secondary)" size="100">
            <v-img :src="user.avatar"></v-img>
          </v-avatar>
        </div>
      </v-container>
      <div>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Nome" v-model="user.name"></v-text-field>
              </v-col>

              <v-col>
                <v-text-field label="Email" v-model="user.email"></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Número"
                  v-model="user.phone"
                ></v-text-field>
              </v-col>

              <v-col>
                <v-text-field
                  label="Documento (CPF)"
                  v-model="user.cpf"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
        <v-form>
          <v-container>
            <v-row>
              <v-col class="text-h4 txt-body">
                Endereços
                <v-divider opacity="1"></v-divider>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-h5 txt-body"> Principal </v-col>
            </v-row>
            <v-col v-for="item in user.address">
              <v-row>
                <v-col>
                  <v-text-field label="CEP" v-model="item.cep"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="RUA"
                    v-model="item.street"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="RUA"
                    v-model="item.number"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-text-field
                    label="Bairro"
                    v-model="item.neighborhood"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Cidade"
                    v-model="item.city"
                  ></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Estado"
                    v-model="item.state"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-col>
          </v-container>
        </v-form>
      </div>
    </div>
  </Template1>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import Template1 from "@/components/templates/Template1.vue";
import store from "@/store";

export default defineComponent({
  name: "Minha Conta",
  components: {
    Template1,
  },
  data() {
    return {
      user: computed(() => store.state.auth.user),
    };
  },
});
</script>

<style scoped>
.content {
  padding: 1rem;
}
</style>
