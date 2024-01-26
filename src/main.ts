import "./style.css";

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import HomeVue from "./views/Home.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: HomeVue,
      },
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
    },
    {
      path: "/register",
      component: () => import("./views/Registration.vue"),
    },
  ],
});
createApp(App).use(router).mount("#app");
