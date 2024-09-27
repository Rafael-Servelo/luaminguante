<template>
  <v-navigation-drawer
    floating
    :width="$vuetify.display.mobile ? $vuetify.display.width : 400"
    color="var(--color-primary)"
    v-model="drawer.drawer"
    :location="$vuetify.display.mobile ? 'left' : undefined"
    temporary
  >
    <v-responsive class="mx-auto h-100" max-width="344">
      <div class="d-flex flex-column h-100 justify-space-between">
        <div>
          <div class="d-flex flex-column align-center my-3">
            <v-avatar
              density="compact"
              size="80"
              :text="user.name"
              color="var(--color-primary)"
              style="font-family: var(--font-header); font-size: 18pt"
              :image="
                user.avatar.includes('http')
                  ? user.avatar
                  : 'data:image/png;base64, ' + user.avatar
              "
            />
            <span class="nameUser">{{ user.name }}</span>
            <a :href="`mailto:${user.email}`" class="emailUser">{{
              user.email
            }}</a>
          </div>
          <v-divider opacity="0.5"></v-divider>
          <v-list selectable>
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Início"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-box"
              title="Minha Conta"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account-box"
              title="Meus Pedidos"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-note-plus"
              title="Cadastrar Produtos"
            ></v-list-item>
          </v-list>
        </div>

        <div class="pa-5">
          <v-btn block rounded color="var(--color-tertiary)" @click="logout">
            Logout
          </v-btn>
        </div>
      </div>
    </v-responsive>
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
      toast,
      store,
      loadBtn: computed(() => store.state.auth.load),
      user: computed(() => store.state.auth.user),
    };
  },
  methods: {
    logout() {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    },
  },
});
</script>

<style scoped>
.nameUser {
  margin: 0.5rem;
  font-family: var(--font-body);
  font-size: xx-large;
}
.emailUser a {
  color: var(--color-tertiary) !important;
}
</style>
