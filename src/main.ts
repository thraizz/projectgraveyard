import "./style.css";

import { createPinia } from "pinia";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";

import App from "./App.vue";
import HomeVue from "./views/Home.vue";

const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      components: {
        default: HomeVue,
      },
      meta: {
        title: "Home",
      },
    },
    {
      path: "/login",
      component: () => import("./views/Login.vue"),
      meta: {
        title: "Login",
      },
    },
    {
      path: "/register",
      component: () => import("./views/Registration.vue"),
      meta: {
        title: "Registration",
      },
    },
    {
      path: "/projects/new",
      component: () => import("./views/NewProject.vue"),
      meta: {
        title: "Bury A Project",
        showBack: true,
      },
    },
    {
      path: "/projects/:id",
      component: () => import("./views/Project.vue"),
      meta: {
        title: "Project",
        showBack: true,
      },
    },
  ],
});
const pinia = createPinia();
app.use(router).use(pinia).mount("#app");
