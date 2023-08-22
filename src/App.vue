<template>
  <div>
    <header v-if="authenticated">
      <div>로그인한 관리자 계정 정보 : {{ authenticated }}</div>
      <button @click="logout">로그아웃</button>
    </header>

    <router-view></router-view>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  name: "App",
  setup() {
    const store = useStore();
    const authenticated = computed(() => {
      return store.getters["auth/authUser"];
    });

    const logout = function logout() {
      store.dispatch("auth/logout");
    };

    return {
      authenticated,
      logout,
    };
  },
};
</script>

<style scoped>
header {
  background-color: lightgray;
}
</style>
