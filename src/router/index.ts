import { RouteRecordRaw, createWebHistory, createRouter } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/404.vue"),
  },
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/esqueci-a-senha",
    name: "ForgotPassword",
    component: () => import("@/views/ForgotPassword.vue"),
  },
  {
    path: "/criar-conta",
    name: "CreateAccount",
    component: () => import("@/views/CreateAccount.vue"),
  },
  {
    path: "/produto",
    name: "Product",
    component: () => import("@/components/Products.vue"),
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes: routes,
});

export default router;
