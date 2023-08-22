import { createRouter, createWebHistory } from "vue-router";

import store from "@/store";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/login",
      name: "LoginView",
      component: () => import("@/views/LoginView.vue"),
      beforeEnter: (to, from, next) => {
        if (store.getters["auth/authUser"]) {
          // 이미 로그인된 상태에서 로그인 페이지로 가는 경우
          next({ name: "HomeView" });
          return;
        }
        next();
      },
    },
    {
      path: "/",
      name: "HomeView",
      component: HomeView,
      meta: { requireLogin: true },
    },
    {
      path: "/temp",
      name: "TempView",
      component: () => import("@/views/TempView.vue"),
      meta: { requireLogin: true },
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requireLogin && !store.getters["auth/authUser"]) {
    // 로그인이 필요한 페이지로 갈 때 토큰이 없는 경우
    next({ name: "LoginView" });
    return;
  }
  next();
});

export default router;
