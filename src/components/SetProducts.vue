<template>
  <div
    v-if="show"
    style="position: absolute; top: 0; left: 0; z-index: 2000"
    class="w-100 h-100 flex align-center justify-center"
  >
    <div
      class="container w-100 h-100"
      style="background-color: var(--color-black-2); position: fixed"
      @click="$store.commit('Set_SetProducts', false), (arrayImages = [])"
    ></div>
    <v-card
      :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : 'auto'"
      :height="$vuetify.display.mobile ? $vuetify.display.height - 20 : 'auto'"
      color="grey-lighten-5"
      class="pa-0"
      max-height="100vh"
      style="overflow: scroll"
      max-width="100vw"
      rounded="xl"
    >
      <v-form @submit.prevent="handleSave">
        <v-card-title
          class="text-center text-h5 text-uppercase"
          style="color: var(--color-assistant); font-weight: bold"
          >Cadastrar Produto</v-card-title
        >
        <v-card-item>
          <div
            class="justify-center"
            :class="{ flex: !$vuetify.display.mobile }"
          >
            <div
              :style="{ minWidth: $vuetify.display.mobile ? 'auto' : '400px' }"
            >
              <div class="flex justify-center">
                <v-carousel
                  height="300"
                  v-show="arrayImages.length"
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
                    v-for="img in arrayImages"
                    :src="
                      img.base64.startsWith('http')
                        ? img.base64
                        : 'data:image/png;base64,' + img.base64
                    "
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
              </div>

              <v-chip-group direction="vertical">
                <v-chip
                  v-for="(obj, index) in arrayImages"
                  :key="index"
                  style="max-width: 400px"
                >
                  <template v-slot:prepend>
                    <v-icon @click="removeImg(index)">mdi-close</v-icon>
                  </template>
                  {{ obj.name }}
                </v-chip>
              </v-chip-group>

              <v-card-item>
                <div
                  class="w-100 flex align-center justify-center"
                  style="gap: 1rem"
                >
                  <v-btn variant="flat" color="var(--color-assistant)" rounded>
                    <v-label for="imgInput"> Importar Fotos </v-label>
                    <template v-slot:append>
                      <v-file-input
                        rounded
                        @input="encodeImageFileAsURL($event.target)"
                        max-width="500"
                        multiple
                        label="Enviar Fotos"
                        prepend-icon="mdi-camera"
                        variant="outlined"
                        id="imgInput"
                        hide-input
                        @click:clear="arrayImages = []"
                      ></v-file-input>
                    </template>
                  </v-btn>
                </div>
                <div
                  class="w-100 flex align-center justify-center"
                  style="gap: 1rem; margin: 1rem 0"
                >
                  <v-divider></v-divider>
                  ou
                  <v-divider></v-divider>
                </div>
              </v-card-item>

              <v-card-item>
                <v-text-field
                  class="mt-1"
                  v-model="urlIMG"
                  variant="outlined"
                  rounded
                  label="Adicionar URL da imagem"
                  append-inner-icon="mdi-send"
                  @click:append-inner="
                    arrayImages.push({ name: urlIMG, base64: urlIMG }),
                      (urlIMG = '')
                  "
                />
                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Nome do produto"
                  v-model="form.product"
                />
                <v-textarea
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Descrição"
                  v-model="form.description"
                  auto-grow
                />

                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Altura ( cm )"
                  v-model="form.height"
                />
                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Largura ( cm )"
                  v-model="form.width"
                />
                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Comprimento ( cm )"
                  v-model="form.length"
                />
                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Peso ( kg )"
                  v-model="form.weight"
                />
              </v-card-item>
            </div>
            <v-divider
              v-if="!$vuetify.display.mobile"
              vertical
              opacity="1"
              class="mx-4"
            ></v-divider>
            <div
              :style="{ minWidth: $vuetify.display.mobile ? 'auto' : '400px' }"
            >
              <v-card-item>
                <v-text-field
                  :rules="rules"
                  class="mt-1"
                  rounded
                  variant="outlined"
                  label="Quantidade"
                  v-model="form.amount"
                />

                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Preço"
                  v-model="form.price"
                />
                <money3
                  style="color: black"
                  v-model="form.price"
                  v-bind="config"
                  hidden
                ></money3>

                <v-text-field
                  :rules="rules"
                  rounded
                  variant="outlined"
                  label="Categoria"
                  v-model="form.category"
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arrayTags"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeTag(index)">mdi-close</v-icon>
                    </template>
                    {{ obj }}
                  </v-chip>
                </v-chip-group>
                <v-text-field
                  v-model="tag"
                  variant="outlined"
                  rounded
                  label="Adicionar Tags"
                  append-inner-icon="mdi-send"
                  @click:append-inner="arrayTags.push(tag), (tag = '')"
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arrayColors"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeTag(index)">mdi-close</v-icon>
                    </template>
                    {{ obj }}
                  </v-chip>
                </v-chip-group>
                <v-text-field
                  v-model="color"
                  variant="outlined"
                  rounded
                  label="Adicionar Cores"
                  append-inner-icon="mdi-send"
                  @click:append-inner="arrayColors.push(color), (color = '')"
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arraySizes"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeTag(index)">mdi-close</v-icon>
                    </template>
                    {{ obj }}
                  </v-chip>
                </v-chip-group>
                <v-text-field
                  v-model="size"
                  variant="outlined"
                  rounded
                  label="Adicionar Tamanhos"
                  append-inner-icon="mdi-send"
                  @click:append-inner="arraySizes.push(size), (size = '')"
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arrayVariations"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeTag(index)">mdi-close</v-icon>
                    </template>
                    {{ obj }}
                  </v-chip>
                </v-chip-group>
                <v-text-field
                  v-model="variation"
                  variant="outlined"
                  rounded
                  label="Adicionar Variações"
                  append-inner-icon="mdi-send"
                  @click:append-inner="
                    arrayVariations.push(variation), (variation = '')
                  "
                />
                <v-text-field
                  rounded
                  variant="outlined"
                  label="Especificações"
                  v-model="form.specifications"
                />
                <v-card-item
                  style="
                    border: 1px solid #00000070;
                    border-radius: 25px;
                    margin-bottom: 1.5rem;
                  "
                >
                  <div class="w-100 flex justify-center">
                    <v-switch
                      label="Promoção"
                      v-model="form.promotion"
                      :inset="false"
                      base-color="red-darken-2"
                      color="green-darken-2"
                      false-icon="mdi-close"
                      true-icon="mdi-check"
                      hide-details
                    ></v-switch>
                  </div>
                  <v-text-field
                    v-if="form.promotion"
                    rounded
                    variant="outlined"
                    label="Preço com Desconto"
                    v-model="form.discountPrice"
                  />
                  <money3
                    style="color: black"
                    v-model="form.discountPrice"
                    v-bind="config"
                    hidden
                  ></money3>
                </v-card-item>
              </v-card-item>
            </div>
          </div>
          <v-card-item>
            <div class="w-100 flex justify-center" style="gap: 1rem">
              <v-btn type="submit" rounded color="var(--color-assistant)"
                >Salvar</v-btn
              >
              <v-btn
                rounded
                variant="outlined"
                color="red"
                @click="
                  $store.commit('Set_SetProducts', false), (arrayImages = [])
                "
                >Fechar</v-btn
              >
            </div>
          </v-card-item>
        </v-card-item>
      </v-form>
    </v-card>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Set Products",
  props: {
    show: Boolean,
  },
  data() {
    return {
      config: {
        masked: false,
        prefix: "R$",
        suffix: "",
        thousands: ",",
        decimal: ".",
        precision: 2,
        disableNegative: false,
        disabled: false,
        min: null,
        max: null,
        allowBlank: false,
        minimumNumberOfCharacters: 0,
        modelModifiers: {
          number: false,
        },
        shouldRound: true,
        focusOnRight: false,
      },
      rules: [
        (value: any) => {
          if (value.length) return true;

          return "Campo obrigatório";
        },
      ],
      user: computed(() => store.state.auth.user),
      arrayImages: [] as any,
      arrayTags: [] as any,
      arrayColors: [] as any,
      arraySizes: [] as any,
      arrayVariations: [] as any,
      urlIMG: "",
      tag: "",
      color: "",
      size: "",
      variation: "",
      form: {
        amount: "",
        category: "",
        colors: [],
        description: "",
        discountPrice: "",
        height: "",
        images: [],
        length: "",
        numberSold: "",
        numberReview: "",
        price: "",
        product: "",
        promotion: false,
        rating: "",
        sizes: [],
        specifications: "",
        tags: [],
        variations: [],
        weight: "",
        width: "",
      } as any,
    };
  },
  methods: {
    removeImg(index: number) {
      this.arrayImages.splice(index, 1);
    },
    removeTag(index: number) {
      this.arrayTags.splice(index, 1);
    },
    encodeImageFileAsURL(element: any) {
      return new Promise((resolve) => {
        let files = element.files;
        let arrayImages = this.arrayImages;
        for (let item of files) {
          let reader = new FileReader() as any;
          reader.onloadend = function () {
            let obj = {} as any;
            obj["name"] = item.name;
            obj["base64"] = reader.result?.replace(/data:.+;base64,/g, "");

            resolve(arrayImages.push(obj));
          };
          reader.readAsDataURL(item);
        }
      });
    },
    handleSave() {
      for (let item of this.arrayImages) {
        this.form.images.push(item.base64);
      }

      this.form.product = this.form.product.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
      this.form.colors = this.arrayColors;
      this.form.tags = this.arrayTags;
      this.form.sizes = this.arraySizes;
      this.form.variation = this.arrayVariations;

      store.dispatch("setProducts", this.form);
    },
  },
});
</script>
