<template>
  <div
    v-if="show"
    style="position: absolute; top: 0; left: 0; z-index: 2000"
    class="w-100 h-100 flex align-center justify-center"
  >
    <div
      class="container w-100 h-100"
      style="background-color: var(--color-black-2); position: fixed"
      @click="$store.commit('Set_SetProducts', false)"
    ></div>
    <v-card
      :width="$vuetify.display.mobile ? $vuetify.display.width : 'auto'"
      :height="$vuetify.display.mobile ? $vuetify.display.height : 'auto'"
      color="grey-lighten-2"
      class="pa-5"
    >
      <v-card-title
        class="text-center text-h5 text-uppercase"
        style="color: var(--color-green); font-weight: bold"
        >Cadastrar Produto</v-card-title
      >
      <v-card-item>
        <v-carousel
          height="300"
          v-show="form.img.length"
          color="var(--color-secondary)"
          deperPageer-icon="mdi-circle-medium"
          cycle
        >
          <template v-slot:prev="{ props }">
            <v-btn
              color="var(--color-secondary)"
              variant="elevated"
              @click="props.onClick"
              icon
              size="30"
              ><v-icon>mdi-menu-left</v-icon></v-btn
            >
          </template>
          <v-carousel-item
            v-for="img in form.img"
            :src="img"
          ></v-carousel-item>
          <template v-slot:next="{ props }">
            <v-btn
              color="var(--color-secondary)"
              variant="elevated"
              @click="props.onClick"
              icon
              size="30"
              ><v-icon>mdi-menu-right</v-icon></v-btn
            >
          </template>
        </v-carousel>
        <v-file-input
          @input="encodeImageFileAsURL($event.target)"
          :rules="rules"
          max-width="500"
          multiple
          label="Enviar Fotos"
          prepend-icon="mdi-camera"
          variant="outlined"
        ></v-file-input>
      </v-card-item>
      <v-card-item>
        <div class="w-100 flex justify-center">
          <v-btn @click="$store.commit('Set_SetProducts', false)">Fechar</v-btn>
        </div></v-card-item
      >
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Set Products",
  props: {
    show: Boolean,
  },
  data() {
    return {
      rules: [
        (value: any) => {
          if (value.length) return true;

          return "Campo obrigatório";
        },
      ],
      form: {
        img: [],
      } as any,
    };
  },
  methods: {
    encodeImageFileAsURL(element: any) {
      return new Promise((resolve) => {
        let files = element.files;
        let array = this.form.img;
        for (let item of files) {
          let reader = new FileReader();
          reader.onloadend = function () {
            resolve(array.push(reader.result));
          };
          reader.readAsDataURL(item);
        }
      });
    },
  },
});
</script>
