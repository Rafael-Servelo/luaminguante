<template>
  <alert-delete-item :show-alert="showAlert" :item="deleteItem" />
  <edit-item :show-edit="showEdit" :form="form" />
  <div class="flex col align-center" style="color: black; width: 100%" ron>
    <div class="my-2"></div>
    <v-card theme="light" color="var(--color-secondary)" class="mb-5">
      <v-select
        theme="light"
        bg-color="var(--color-secondary)"
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
      class="text-h2 mb-10 title"
      style="
        color: var(--color-primary);
        font-weight: 500;
        font-family: var(--font-body);
      "
    >
      Produtos
    </div>
    <div class="producs-container">
      <div
        style="position: relative"
        class="product"
        :style="{
          filter: item.amount == 0 ? 'grayscale(100%)' : 'none',
        }"
        v-for="item in resultPagination"
        :key="item.id"
      >
        <img
          v-if="item.promotion"
          style="position: absolute; z-index: 1; top: 0; right: 0"
          src="../assets/img/placa-de-promocao.png"
          alt="promoção"
          width="100"
        />
        <v-card
          class="mx-auto mb-4"
          rounded="lg"
          :width="$vuetify.display.mobile ? 160 : 300"
          theme="light"
          elevation="6"
        >
          <v-sheet color="transparent">
            <v-carousel
              color="var(--color-secondary)"
              :height="$vuetify.display.mobile ? 160 : 300"
              deperPageer-icon="mdi-circle-medium"
              hide-deperPageer-background
              :continuous="false"
              hide-delimiter-background
            >
              <template v-slot:prev="{ props }">
                <v-btn
                  color="var(--color-secondary)"
                  variant="elevated"
                  @click="props.onClick"
                  icon
                  size="24"
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
                  size="24"
                  ><v-icon>mdi-menu-right</v-icon></v-btn
                >
              </template>
            </v-carousel>
          </v-sheet>
          <v-card-item>
            <div @click="goToProduct(item.id)" class="text-center" style="color: var(--color-primary); font-family: var(--font-body); cursor: pointer;">
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
              color="var(--color-assistant)"
              variant="tonal"
              :text="tag"
            ></v-chip>
            <v-card-item :class="{ flex: !$vuetify.display.mobile }">
              <div v-if="item.promotion">
                <span class="text-subtitle-1">De:</span>
                <span v-if="item.discountPrice">
                  <span class="grey font-weight-light">
                    R$<s>{{ formatCentavos(item.price) }}</s></span
                  >
                </span>
                <div>
                  <span class="text-subtitle-1">Por:</span>
                  <span style="color: var(--color-assistant)">
                  R${{ formatCentavos(item.discountPrice) }}
                </span>
                </div>
              </div>
              <div v-else>
                <span class="text-subtitle-1">A partir de:</span>
                <span style="color: var(--color-assistant)">
                  R${{ formatCentavos(item.price) }}
                </span>
              </div>
            </v-card-item>
            <div
              class="flex align-center w-100 justify-space-around"
              v-if="user"
            >
              <v-btn
                :disabled="item.amount == 0"
                icon
                variant="flat"
                base-color="transparent"
                @click="addFavorite(item.fav, item.id)"
              >
                <heart-icon
                  v-tooltip="
                    item.fav
                      ? 'Remover dos favoritos'
                      : 'Adicionar aos favoritos'
                  "
                  :fill="item.fav"
                  color="var(--color-assistant)"
                />
              </v-btn>
              <v-menu
                :disabled="item.amount == 0"
                location="bottom start"
                v-if="user"
                theme="light"
                :close-on-content-click="false"
              >
                <template v-slot:activator="{ props }">
                  <v-btn
                    :disabled="item.amount == 0"
                    icon
                    variant="flat"
                    base-color="transparent"
                    v-bind="props"
                  >
                    <shop-cart-icon
                      color="var(--color-assistant)"
                      v-tooltip="
                        item.cart
                          ? 'Remover do carrinho'
                          : 'Adicionar no carrinho'
                      "
                      :fill="item.cart"
                    />
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item class="ga-4">
                    <v-list-item-title>
                      <div class="text-h6 txt-assistant txt-body font-weight-bold">
                        {{ "Adicionar ao carrinho".toUpperCase() }}
                      </div>
                    </v-list-item-title>
                    <div class="flex col ga-4">
                      <div class="variedades flex col">
                        <span class="text-body-1"> Modelo: </span>
                        <v-btn-toggle
                          v-model="cart.variation"
                          base-color="tranparent"
                          color="var(--color-secondary)"
                        >
                          <v-btn v-for="item in variations" :value="item">
                            {{ item }}
                          </v-btn>
                        </v-btn-toggle>
                      </div>
                      <div class="cores">
                        <span class="text-body-1"> Cor: </span>
                        <v-btn-toggle
                          v-model="cart.color"
                          base-color="tranparent"
                          color="var(--color-secondary)"
                        >
                          <v-btn v-for="item in colors" :value="item">
                            <v-avatar :color="item"></v-avatar>
                          </v-btn>
                        </v-btn-toggle>
                      </div>
                      <div class="tamanho">
                        <span class="text-body-1"> Tamanho: </span>
                        <v-btn-toggle
                          v-model="cart.size"
                          divided
                          base-color="grey-lighten-2"
                          color="var(--color-secondary)"
                        >
                          <v-btn v-for="item in sizes" :value="item">{{
                            item
                          }}</v-btn>
                        </v-btn-toggle>
                      </div>
                      <div class="quantidade">
                        <span class="text-body-1"> Quantidade: </span>
                        <div>
                          <v-btn
                            :disabled="cart.amount < 1"
                            @click="cart.amount = cart.amount - 1"
                            ><v-icon>mdi-menu-down</v-icon></v-btn
                          >
                          <input
                            class="text-center"
                            v-model="cart.amount"
                            :max="item.amount - item.numberSold"
                            min="0"
                            style="width: 70px"
                          />
                          <v-btn
                            :disabled="
                              cart.amount === item.amount - item.numberSold
                            "
                            @click="cart.amount = cart.amount + 1"
                            ><v-icon>mdi-menu-up</v-icon></v-btn
                          >
                        </div>
                      </div>

                      <v-btn
                        color="var(--color-secondary)"
                        prepend-icon="mdi-cart"
                        @click="item.cart = !item.cart"
                        >Adicionar ao Carrinho</v-btn
                      >
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
            <div
              class="flex align-center w-100 justify-space-around"
              v-if="user.isAdm"
            >
              <v-btn
                style="filter: none !important"
                icon
                variant="flat"
                base-color="transparent"
                @click="(showEdit.showEdit = !showEdit.showEdit), (form = item)"
              >
                <v-icon color="var(--color-assistant)" v-tooltip="'Editar item'"
                  >mdi-pencil</v-icon
                >
              </v-btn>
              <v-btn
                icon
                variant="flat"
                base-color="transparent"
                @click="
                  (showAlert.showAlert = !showAlert.showAlert),
                    ((deleteItem.id = item.id),
                    (deleteItem.name = item.product))
                "
              >
                <v-icon
                  color="var(--color-assistant)"
                  v-tooltip="'Deletar item'"
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
        color="var(--color-assistant)"
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
import shopCartIcon from "./icons/shop-cart-icon.vue";
import heartIcon from "./icons/heart-icon.vue";
import alertDeleteItem from "./alertDeleteItem.vue";
import editItem from "./editItem.vue";

export default defineComponent({
  name: "Products",
  components: {
    shopCartIcon,
    heartIcon,
    alertDeleteItem,
    editItem,
  },
  props: {
    products: Array<object>,
    perPage: Number,
  } as any,
  data() {
    return {
      productsLoad: computed(() => store.state.store.loadProducts),
      form: {},
      user: computed(() => store.state.auth.user),
      resultPagination: [] as any,
      colors: ["#FF4040", "#33302D", "#116600"],
      sizes: ["P", "M", "G"],
      variations: ["Pitaya", "Melancia"],
      cart: {
        amount: 0,
        color: undefined,
        size: undefined,
        variation: undefined,
      },
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
      showAlert: {
        showAlert: false,
      },
      showEdit: {
        showEdit: false,
      },
      deleteItem: {
        name: "",
        id: "",
      },
    };
  },
  methods: {
    formatCentavos(valor: any) {
      if (valor.toString().includes(".")) {
        let price = valor.toString().split(".")[0];
        let centavos = valor.toString().split(".")[1];

        if (parseInt(centavos) < 10) {
          return price + "," + centavos + "0";
        } else {
          return price + "," + centavos;
        }
      } else {
        return valor + ",00";
      }
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
            if (a.discountPrice) {
              return a.discountPrice - b.price;
            } else if (b.discountPrice) {
              return a.price - b.discountPrice;
            } else if (a.discountPrice && b.discountPrice) {
              return a.discountPrice - b.discountPrice;
            } else {
              return a.price - b.price;
            }
          }),
          this.paginaAtual
        );
      } else if (evt === "maior") {
        // Logica maior preço
        return this.listItems(
          this.products.sort((a: any, b: any) => {
            if (a.discountPrice) {
              return b.price - a.discountPrice;
            } else if (b.discountPrice) {
              return b.discountPrice - a.price;
            } else if (a.discountPrice && b.discountPrice) {
              return b.discountPrice - a.discountPrice;
            } else {
              return b.price - a.price;
            }
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
    addFavorite(ev: any, id: any) {
      if (ev) {
        store.dispatch("removeFavorites", id);
      } else {
        store.dispatch("addFavorites", id);
      }
    },
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "instant",
      });
    },
    goToPage(page: any) {
      this.upPage();
      if (page > this.totalPage()) {
        return this.listItems(this.products, this.totalPage());
      }

      if (page < 1) {
        return this.listItems(this.products, 1);
      }

      this.listItems(this.products, page);
    },
    goToProduct(id:number){
      window.location.replace(`/produto.html?id=${id}`)
    }
  },
  mounted() {
    store.dispatch("getUser");

    setTimeout(() => {
      let pos = this.products.map((product: any) => {
        return product.id;
      });
      let favorites = this.user.favorites;

      if (favorites.length != 0) {
        let idFav = favorites.map((product: any) => {
          return product.id;
        });
        for (let item of idFav) {
          let index = pos.indexOf(item);

          if (index > -1) {
            this.products[index]["fav"] = true;
          }
        }
      }
    }, 800);
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
  justify-content: center;
  padding: 1rem;
}
</style>
