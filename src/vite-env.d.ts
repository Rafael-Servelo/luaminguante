/// <reference types="vite/client" />

declare module "@devindex/vue-mask";

declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
