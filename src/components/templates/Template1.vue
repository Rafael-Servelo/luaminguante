<template>
  <v-fab
    color="var(--color-secondary)"
    icon="mdi-chevron-up"
    location="bottom right"
    app
    class="mb-8"
    :appear="true"
    size="60"
    @click="upPage"
    v-if="upperBtn"
  ></v-fab>

  <div class="container">
    <header>
      <HeaderComponent />
    </header>
    <main>
      <div class="content">
        <slot></slot>
      </div>
    </main>
    <footer>
      <FooterCompoent />
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import FooterCompoent from "@/components/footer.vue";
import HeaderComponent from "@/components/Header.vue";

export default defineComponent({
  name: "Template 1",
  components: {
    FooterCompoent,
    HeaderComponent,
  },
  data() {
    return {
      upperBtn: false,
    };
  },
  methods: {
    upPage() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    scrollBtn() {
      if (window.scrollY >= 100) {
        this.upperBtn = true;
      } else {
        this.upperBtn = false;
      }
    },
  },
  mounted() {
    window.addEventListener("scroll", this.scrollBtn);
  },
  unmounted() {
    window.removeEventListener("scroll", this.scrollBtn);
  },
});
</script>

<style scoped>
.content {
  margin-top: 56px;
  width: 100%;
  min-height: calc(100vh - 383px - 56px);
  background-color: white;
  color: black;
}
</style>
