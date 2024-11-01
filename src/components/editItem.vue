<template>
  <v-overlay
    :model-value="showEdit.showEdit"
    class="align-center justify-center"
    theme="light"
    persistent
  >
    <v-sheet
      rounded="xl"
      class="pa-6 text-green-darken-4 mx-auto"
      color="white"
      :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : 'auto'"
      :max-width="$vuetify.display.width - 20"
      :max-height="$vuetify.display.height - 20"
      style="overflow: auto"
    >
      <div class="w-100 flex col align-center mb-4" style="gap: 0.5rem">
        <h4 class="text-h5 font-weight-bold text-uppercase">Editar Produto</h4>
      </div>

      <v-form @submit.prevent="">
        <v-card-item>
          <div
            class="justify-center"
            :class="{ flex: !$vuetify.display.mobile }"
          >
            <div
              :style="{
                minWidth: $vuetify.display.mobile ? 'auto' : '400px',
              }"
            >
              <div class="flex justify-center">
                <v-carousel
                  height="300"
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
                    :src="
                      img.startsWith('http')
                        ? img
                        : 'data:image/png;base64,' + img
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
                  <v-btn
                    variant="flat"
                    color="var(--color-assistant)"
                    theme="dark"
                    rounded
                  >
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
                      form.images.push(urlIMG),
                      (urlIMG = '')
                  "
                />
                <v-text-field
                  rounded
                  variant="outlined"
                  label="Nome do produto"
                  v-model="form.product"
                />
                <v-textarea
                  rounded
                  variant="outlined"
                  label="Descrição"
                  v-model="form.description"
                  auto-grow
                />

                <v-text-field
                  rounded
                  variant="outlined"
                  label="Altura ( cm )"
                  v-model="form.height"
                />
                <v-text-field
                  rounded
                  variant="outlined"
                  label="Largura ( cm )"
                  v-model="form.width"
                />
                <v-text-field
                  rounded
                  variant="outlined"
                  label="Comprimento ( cm )"
                  v-model="form.length"
                />
                <v-text-field
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
              :style="{
                minWidth: $vuetify.display.mobile ? 'auto' : '400px',
              }"
            >
              <v-card-item>
                <v-text-field
                  class="mt-1"
                  rounded
                  variant="outlined"
                  label="Quantidade"
                  v-model="form.amount"
                />

                <v-text-field
                  class="mt-1"
                  rounded
                  variant="outlined"
                  label="Vendidos"
                  v-model="form.numberSold"
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
                  @click:append-inner="
                    arrayTags.push(tag), form.tags.push(tag), (tag = '')
                  "
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arrayColors"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeColor(index)">mdi-close</v-icon>
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
                  @click:append-inner="
                    arrayColors.push(color),
                      form.colors.push(color),
                      (color = '')
                  "
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arraySizes"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeSize(index)">mdi-close</v-icon>
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
                  @click:append-inner="
                    arraySizes.push(size), form.sizes.push(size), (size = '')
                  "
                />
                <v-chip-group direction="vertical">
                  <v-chip
                    v-for="(obj, index) in arrayVariations"
                    :key="index"
                    class="mb-2"
                    style="max-width: 400px"
                  >
                    <template v-slot:prepend>
                      <v-icon @click="removeVariation(index)">mdi-close</v-icon>
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
                    arrayVariations.push(variation),
                      form.variations.push(variation),
                      (variation = '')
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
                </v-card-item>
              </v-card-item>
            </div>
          </div>
          <v-card-item>
            <div class="w-100 flex justify-center" style="gap: 1rem">
              <v-btn
                type="submit"
                theme="dark"
                rounded
                color="var(--color-assistant)"
                @click="handleSave"
                >Salvar</v-btn
              >
              <v-btn
                rounded
                variant="outlined"
                color="red"
                @click="(showEdit.showEdit = false), (arrayImages = [])"
                >Fechar</v-btn
              >
            </div>
          </v-card-item>
        </v-card-item>
      </v-form>
    </v-sheet>
  </v-overlay>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "AlertDeleteItem",
  props: {
    showEdit: Object as any,
    form: Object as any,
  },
  data() {
    return {
      user: computed(() => store.state.auth.user),
      arrayImages: [] as any,
      arrayTags: [] as any,
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
    };
  },
  methods: {
    removeImg(index: number) {
      for (let i = 0; i < this.form.images.length; i++) {
        if (this.form.images[i] === this.arrayImages[index].base64) {
          this.form.images.splice(i, 1);
          this.arrayImages.splice(index, 1);
        }
      }
    },
    removeTag(index: number) {
      for (let i = 0; i < this.form.tags.length; i++) {
        if (this.form.tags[i] === this.arrayTags[index]) {
          this.form.tags.splice(i, 1);
          this.arrayTags.splice(index, 1);
        }
      }
    },
    removeColor(index: number) {
      for (let i = 0; i < this.form.colors.length; i++) {
        if (this.form.colors[i] === this.arrayColors[index]) {
          this.form.colors.splice(i, 1);
          this.arrayColors.splice(index, 1);
        }
      }
    },
    removeVariation(index: number) {
      for (let i = 0; i < this.form.variations.length; i++) {
        if (this.form.variations[i] === this.arrayVariations[index]) {
          this.form.variations.splice(i, 1);
          this.arrayVariations.splice(index, 1);
        }
      }
    },
    removeSize(index: number) {
      for (let i = 0; i < this.form.sizes.length; i++) {
        if (this.form.sizes[i] === this.arraySizes[index]) {
          this.form.sizes.splice(i, 1);
          this.arraySizes.splice(index, 1);
        }
      }
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
    handleSave(){
      store.dispatch("updateProducts", this.form)
    }
  },
});
</script>

<style scoped></style>
