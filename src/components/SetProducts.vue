<template>
  <div
    v-if="show"
    style="position: absolute; top: 0; left: 0; z-index: 2000"
    class="w-100 h-100 flex align-center justify-center"
  >
    <div
      class="container w-100 h-100"
      style="background-color: var(--color-black-2); position: fixed"
      @click="$store.commit('Set_SetProducts', false), (form.images = [])"
    ></div>
    <v-card
      :width="$vuetify.display.mobile ? $vuetify.display.width : 'auto'"
      :height="$vuetify.display.mobile ? $vuetify.display.height : 'auto'"
      color="grey-lighten-5"
      class="pa-5"
      max-height="100vh"
      style="overflow: scroll"
      max-width="100vw"
    >
      <v-card-title
        class="text-center text-h5 text-uppercase"
        style="color: var(--color-green); font-weight: bold"
        >Cadastrar Produto</v-card-title
      >
      <v-card-item>
        <div class="flex">
          <div style="min-width: 500px">
            <v-carousel
              height="300"
              v-show="form.images.length"
              hide-delimiter-background
              color="var(--color-secondary)"
              deperPageer-icon="mdi-circle-medium"
              cycle
              :continuous="false"
              class="mb-4"
              style="max-width: 500px"
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
                v-for="img in form.images"
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
            <v-card-text v-show="form.images.length === 0" class="text-center"
              >Adicionar Imagens</v-card-text
            >
            <v-file-input
              @input="encodeImageFileAsURL($event.target)"
              :rules="rules"
              max-width="500"
              multiple
              label="Enviar Fotos"
              prepend-icon="mdi-camera"
              variant="outlined"
              class="ma-4"
            ></v-file-input>
            <v-card-item>
              <v-text-field
                rounded
                variant="outlined"
                label="Nome do produto"
                v-model="form.product"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Descrição"
                v-model="form.description"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Altura ( cm )"
                type="number"
                v-model="form.height"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Largura ( cm )"
                type="number"
                v-model="form.width"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Comprimento ( cm )"
                type="number"
                v-model="form.length"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Peso ( kg )"
                type="number"
                v-model="form.weight"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Quantidade"
                type="number"
                v-model="form.amount"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Preço"
                v-model="form.price"
              />
              <v-text-field
                rounded
                variant="outlined"
                label="Categoria"
                v-model="form.category"
              />
              <v-text-field rounded variant="outlined" label="Tags" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
              <v-text-field rounded variant="outlined" label="" />
            </v-card-item>
          </div>
          <v-divider vertical opacity="1" class="mx-4"></v-divider>
          <div>
            <v-card-item>
              <pre style="max-width: 700px">{{ form }}</pre>
            </v-card-item>
          </div>
        </div>
      </v-card-item>
      <v-card-item>
        <div class="w-100 flex justify-center">
          <v-btn
            @click="$store.commit('Set_SetProducts', false), (form.images = [])"
            >Fechar</v-btn
          >
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
        amount: 0,
        category: "",
        colors: [],
        description: "",
        discountPrice: 0,
        height: 0,
        images: [],
        length: 0,
        numberSold: 0,
        numberReview: 0,
        price: 0,
        product: "",
        promotion: false,
        rating: 0,
        sizes: [],
        specifications: "",
        tags: [],
        variations: [],
        weight: 0,
        width: 0,
      } as any,
    };
  },
  methods: {
    encodeImageFileAsURL(element: any) {
      return new Promise((resolve) => {
        let files = element.files;
        let array = this.form.images;
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
