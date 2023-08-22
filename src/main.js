import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

store
  .dispatch("auth/attempt", localStorage.getItem("vue3_login_token"))
  .then(() => {
    // attempt로 토큰과 관리자 계정 정보를 저장 후 라우터를 실행해야 로그인의 beforeEnter가 작동함
    createApp(App).use(router).use(store).mount("#app");
  });
