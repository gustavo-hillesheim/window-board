import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import BoardPage from "../views/BoardPage.vue";
import PageLayout from "../components/PageLayout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: PageLayout,
    children: [
      {
        path: "board",
        name: "board",
        component: BoardPage,
      },
      {
        path: "**",
        redirect: "/board",
      },
    ],
  },
  {
    path: "**",
    redirect: "/board",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
