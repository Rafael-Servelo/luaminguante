<template>
  <v-overlay
    :model-value="showAlert.showAlert"
    class="align-center justify-center"
    theme="light"
    persistent
  >
    <v-sheet
      rounded="xl"
      class="pa-6 text-green-darken-4 mx-auto"
      color="#f4f4f4"
      :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : 'auto'"
    >
      <div class="w-100 flex col align-center mb-4" style="gap: 0.5rem">
        <v-icon color="amber" size="112">mdi-alert</v-icon>
        <h4 class="text-h5 font-weight-bold">Atenção!</h4>
      </div>
      <p class="mb-4 text-body-1">
        Tem certeza que deseja deletar o item
        <strong>{{ item.name }}</strong
        >?
      </p>

      <div class="flex w-100 align-center justify-center" style="gap: 1rem">
        <v-btn color="error" @click="deleteitem(item.id)">Deletar</v-btn>
        <v-btn
          variant="outlined"
          color="error"
          @click="
            (showAlert.showAlert = false), (item.id = ''), (item.name = '')
          "
          >Cancelar</v-btn
        >
      </div>
    </v-sheet>
  </v-overlay>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "AlertDeleteItem",
  props: {
    showAlert: Object as any,
    item: Object as any
  },
  data() {
    return {
        user: computed(()=> store.state.auth.user)
    };
  },
  methods:{
    deleteitem(id: any) {
      let object = {
        id: id,
        email: this.user.email,
      };
      store.dispatch("deleteProducts", object);
    },
  }
});
</script>

<style scoped></style>
