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
              :text="`${
                user.name?.split(' ')[0][0] +
                user.name?.split(' ').slice(-1).join(' ')[0]
              }`"
              color="var(--color-secondary)"
              style="font-family: var(--font-header); font-size: 18pt"
              :image="
                user.avatar?.includes('http')
                  ? user.avatar
                  : 'data:image/png;base64, ' + user.avatar
              "
            />
            <span class="nameUser">{{
              user.name?.split(" ")[0] +
              " " +
              user.name?.split(" ").slice(-1).join(" ")
            }}</span>
            <a :href="`mailto:${user.email}`" class="emailUser">{{
              user.email
            }}</a>
          </div>
          <v-divider opacity="0.5"></v-divider>
          <v-list selectable>
            <v-list-item
              prepend-icon="mdi-view-dashboard"
              title="Início"
              @click="home"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-account"
              title="Minha Conta"
            ></v-list-item>
            <v-list-item
              prepend-icon="mdi-format-list-bulleted"
              title="Meus Pedidos"
            ></v-list-item>
            <v-list-item
              v-if="user.isAdm"
              prepend-icon="mdi-note-plus"
              title="Cadastrar Produtos"
              @click="showSetProducts"
            >
            </v-list-item>
          </v-list>
        </div>

        <div class="pa-5">
          <v-btn
            block
            rounded
            color="var(--color-tertiary)"
            theme="light"
            @click="logout"
          >
            Logout
          </v-btn>
        </div>
      </div>
    </v-responsive>
  </v-navigation-drawer>
</template>

<script lang="ts">
import router from "@/router";
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
      router,
      loadBtn: computed(() => store.state.auth.load),
      user: computed(() => store.state.auth.user),
      avatar: "",
    };
  },
  methods: {
    home() {
      window.location.replace("/");
    },
    logout() {
      try {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "userID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } catch (err) {
        console.error(err);
      } finally {
        store.commit("Set_IsLogged", false);
        store.dispatch("disconnect");
      }
    },
    showSetProducts() {
      store.commit("Set_SetProducts", true);
    },
  },
  mounted() {
    setTimeout(() => {
      this.avatar = this.user.avatar.includes("http")
        ? this.user.avatar
        : "data:image/png;base64, " + this.user.avatar;
    }, 300);
    setInterval(() => {
      if (!store.state.auth.isLogged) {
        (window.location.reload as (cache: boolean) => void)(true);
      }
    }, 1000);
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
