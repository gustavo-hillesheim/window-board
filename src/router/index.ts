import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import HomePage from "../views/HomePage.vue";
import PageLayout from "../components/PageLayout.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "layout",
    component: PageLayout,
    children: [
      {
        path: "home",
        name: "home",
        component: HomePage,
      },
      {
        path: "**",
        redirect: "/home",
      },
    ],
  },
  {
    path: "**",
    redirect: "/home",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
