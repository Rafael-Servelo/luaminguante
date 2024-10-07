<template>
  <v-overlay
    :model-value="showAlert"
    class="align-center justify-center"
    theme="light"
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
        <strong>{{ deleteItem.name }}</strong
        >?
      </p>

      <div class="flex w-100 align-center justify-center" style="gap: 1rem">
        <v-btn color="error" @click="deleteitem(deleteItem.id)">Deletar</v-btn>
        <v-btn
          variant="outlined"
          color="error"
          @click="
            (showAlert = false), (deleteItem.id = ''), (deleteItem.name = '')
          "
          >Cancelar</v-btn
        >
      </div>
    </v-sheet>
  </v-overlay>
  <div class="flex col align-center" style="color: black; width: 100%" ron>
    <div class="my-2"></div>
    <v-card theme="light" color="var(--color-secondary)" class="mb-5">
      <v-select
        theme="light"
        bg-color="var(--color-secondary)"
        base-color="var(--color-primary)"
        color="var(--color-primary)"
        append-icon="mdi-filter"
        label="FILTRO"
        :items="itemsFilter"
        item-title="item"
        item-value="value"
        :width="$vuetify.display.mobile ? $vuetify.display.width - 20 : '300'"
        hide-details
        @update:model-value="filterResults($event)"
        class="pr-4"
      >
      </v-select>
    </v-card>
    <div
      class="text-h4 mb-10"
      style="
        color: var(--color-primary);
        font-weight: 500;
        font-family: var(--font-body);
      "
    >
      Produtos
    </div>
    <div class="producs-container">
      <div class="product" v-for="item in resultPagination" :key="item.id">
        <v-card
          class="mx-auto mb-4"
          rounded="xl"
          :width="$vuetify.display.mobile ? 160 : 300"
          color="white"
          elevation="6"
        >
          <v-sheet color="transparent">
            <v-carousel
              color="var(--color-secondary)"
              :height="$vuetify.display.mobile ? 160 : 300"
              deperPageer-icon="mdi-circle-medium"
              hide-deperPageer-background
              :continuous="false"
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
                v-for="img in item.images"
                :src="
                  img.startsWith('http')
                    ? img
                    : 'data: image/jpeg; base64,' + img
                "
                cover
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
          </v-sheet>
          <v-card-item>
            <div class="text-subtitle-1" style="color: var(--color-green)">
              {{ item.product }}
            </div>
            <div
              class="text-body-2"
              style="
                max-height: 80px;
                white-space: nowrap;
                text-overflow: '...';
                overflow: hidden;
              "
            >
              {{ item.description }}
            </div>
          </v-card-item>

          <v-card-item
            :style="{ minWidth: $vuetify.display.mobile ? '160px' : '300px' }"
          >
            <v-chip
              v-for="tag in item.tags"
              color="var(--color-secondary)"
              variant="tonal"
              :text="tag"
            ></v-chip>
            <div :class="{ flex: !$vuetify.display.mobile }">
              <v-card-item
                :subtitle="item.discountPrice ? 'de:' : 'A partir de:'"
              >
                <s v-if="item.discountPrice">
                  <span class="grey font-weight-light"
                    >R${{ item.price.toFixed(2) }}</span
                  >
                </s>
                <span v-else style="color: var(--color-green)"
                  >R${{ item.price.toFixed(2) }}</span
                >
              </v-card-item>
              <v-card-item
                :subtitle="item.discountPrice ? 'Por:' : ''"
                v-if="item.discountPrice"
              >
                <span style="color: var(--color-green)"
                  >R${{ item?.discountPrice.toFixed(2) }}</span
                >
              </v-card-item>
            </div>
          </v-card-item>
          <v-card-item>
            <div class="flex align-center w-100 justify-space-around">
              <v-btn
                icon
                variant="flat"
                base-color="transparent"
                @click="item.fav = !item.fav"
              >
                <v-icon
                  color="var(--color-green)"
                  v-if="item.fav"
                  v-tooltip="'Remover dos favoritos'"
                  >mdi-heart</v-icon
                >
                <v-icon
                  color="var(--color-green)"
                  v-else
                  v-tooltip="'Adicionar aos favoritos'"
                  >mdi-heart-outline</v-icon
                >
              </v-btn>
              <v-btn
                icon
                variant="flat"
                base-color="transparent"
                @click="item.card = !item.card"
              >
                <v-icon
                  color="var(--color-green)"
                  v-if="item.card"
                  v-tooltip="'Remover do carrinho'"
                  >mdi-cart-remove</v-icon
                >
                <v-icon
                  color="var(--color-green)"
                  v-else
                  v-tooltip="'Adicionar ao carrinho'"
                  >mdi-cart-plus</v-icon
                >
              </v-btn>
            </div>
            <div
              class="flex align-center w-100 justify-space-around"
              v-if="user.isAdm"
            >
              <v-btn
                icon
                variant="flat"
                base-color="transparent"
                @click="item.card = !item.card"
              >
                <v-icon color="var(--color-green)" v-tooltip="'Editar item'"
                  >mdi-pencil</v-icon
                >
              </v-btn>
              <v-btn
                icon
                variant="flat"
                base-color="transparent"
                @click="
                  (showAlert = !showAlert),
                    ((deleteItem.id = item.id),
                    (deleteItem.name = item.product))
                "
              >
                <v-icon color="var(--color-green)" v-tooltip="'Deletar item'"
                  >mdi-trash-can-outline</v-icon
                >
              </v-btn>
            </div>
          </v-card-item>
        </v-card>
      </div>
    </div>
    <div>
      <v-pagination
        ariant="plain"
        color="var(--color-green)"
        v-model="paginaAtual"
        :length="totalPage()"
        rounded="circle"
        @first="goToPage(1)"
        @last="goToPage(totalPage())"
        @update:model-value="(e: number) => goToPage(e)"
        :total-visible="$vuetify.display.mobile ? '4' : '7'"
      />
    </div>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "Products",
  props: {
    products: Array<object>,
    perPage: Number,
  } as any,
  data() {
    return {
      user: computed(() => store.state.auth.user),
      resultPagination: [] as any,
      paginaAtual: 1,
      config: {
        prefix: "",
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
        shouldRound: true,
        focusOnRight: false,
      },
      itemsFilter: [
        {
          item: "Ordem alfabética (A-Z)",
          value: "alfAZ",
        },
        {
          item: "Ordem alfabética (Z-A)",
          value: "alfZA",
        },
        {
          item: "Menor Valor",
          value: "menor",
        },
        {
          item: "Maior Valor",
          value: "maior",
        },
        {
          item: "Lançamento",
          value: "date",
        },
      ],
      showAlert: false,
      deleteItem: {
        name: "",
        id: "",
      },
    };
  },
  methods: {
    deleteitem(id: any) {
      let object = {
        id: id,
        email: this.user.email,
      };
      store.dispatch("deleteProducts", object);
    },
    count() {
      let counts = this.paginaAtual * this.perPage - this.perPage;

      return counts;
    },
    totalPage() {
      let total = Math.ceil(this.products.length / this.perPage);

      return total;
    },
    filterResults(evt: any) {
      if (evt === "alfAZ") {
        // Logica alfabetica
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.product > b.product;
          }),
          this.paginaAtual
        );
      } else if (evt === "alfZA") {
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.product < b.product;
          }),
          this.paginaAtual
        );
      } else if (evt === "menor") {
        // Logica menor preço
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.price - b.price;
          }),
          this.paginaAtual
        );
      } else if (evt === "maior") {
        // Logica maior preço
        this.listItems(
          this.products.sort((a: any, b: any) => {
            return b.price - a.price;
          }),
          this.paginaAtual
        );
      } else if (evt === "date") {
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            return a.datePost < b.datePost;
          }),
          this.paginaAtual
        );
      } else {
        store.dispatch("getProducts");
      }
    },
    async listItems(items: Array<object>, pageActual: any) {
      let result = [] as any;
      let totalPage = this.totalPage();
      let count = this.count();
      let deperPageer = count + this.perPage;

      if (pageActual <= totalPage) {
        for (let i = count; i < deperPageer; i++) {
          if (items[i]) {
            result.push(items[i]);
            count++;
          }
        }
      }

      this.resultPagination = result;
    },
    goToPage(page: any) {
      if (page > this.totalPage()) {
        return this.listItems(this.products, this.totalPage());
      }

      if (page < 1) {
        return this.listItems(this.products, 1);
      }

      this.listItems(this.products, page);
    },
  },
  mounted() {
    this.listItems(this.products, 1);
  },
});
</script>

<style scoped>
.producs-container {
  gap: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  justify-content: flex-start;
  padding: 1rem;
}
/**
 */
</style>
