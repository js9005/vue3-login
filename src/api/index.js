import axios from "axios";
import store from "@/store";
import router from "@/router";

axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "vue3_login_token"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status == 401) {
      store.dispatch("auth/logout");
      router.push("/login").catch(() => {});
    }
    return Promise.reject(error);
  }
);

//로그인
export function loginApi(params) {
  return axios.post("login", params);
}
//관리자 계정 정보
export function getAdmin() {
  return axios.get("me");
}
