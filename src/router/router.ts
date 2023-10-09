import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MenuView from "../views/MenuView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/menu",
      name: "menu",
      component: MenuView,
    },
    {
      path: "/singleplayer",
      name: "singleplayer",
      component: () => import("../views/SingleplayerView.vue"),
    },
    {
      path: "/multiplayer",
      name: "multiplayer",
      component: () => import("../views/MultiplayerView.vue"),
    },
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import('../views/AboutView.vue')
  ],
});

router.afterEach((to, from) => {
  const toPath = to.name?.toString();
  const fromPath = from.name?.toString();
  const tag = `${toPath}_${fromPath}`;
  to.meta.transition = tag;
  console.log(tag);
});

export default router;

declare module "vue-router" {
  interface RouteMeta {
    // is optional
    transition?: string;
  }
}
