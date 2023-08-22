<template>
  <div>
    <h1>LoginView</h1>

    <form action="">
      <input v-model="email" type="text" placeholder="이메일" />
      <br />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <br />
      <button @click="login">로그인</button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
export default {
  name: "LoginView",
  setup() {
    const email = ref("");
    const password = ref("");

    const store = useStore();
    const login = async function (e) {
      e.preventDefault();
      await store.dispatch("auth/login", {
        userStringId: email.value,
        password: password.value,
      });
    };

    return {
      email,
      password,
      login,
    };
  },
};
</script>
