import { RouteRecordRaw, createWebHistory, createRouter } from "vue-router"

const routes: RouteRecordRaw[] = [
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: ()=> import("@/views/404.vue") },
    { path: '/', name: 'Home', component: ()=> import("@/views/Home.vue") },
]

const router = createRouter({
    history: createWebHistory('/'),
    routes: routes
})

export default router