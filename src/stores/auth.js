import { ref, computed } from "vue";
import { defineStore } from "pinia";
import api from "@/api/https";

export const useAuthStore = defineStore("auth", () => {
  function getSavedUser() {
    const savedUser = localStorage.getItem("user");

    if (!savedUser || savedUser === "undefined" || savedUser === "null") {
      localStorage.removeItem("user");
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch (error) {
      console.error("Invalid saved user data:", error);
      localStorage.removeItem("user");
      return null;
    }
  }

  let user = ref(getSavedUser());
  let token = ref(localStorage.getItem("token"));
  let isLoggedIn = computed(() => !!token.value);
  const socketUserId = computed(() => user.value?.user_id || user.value?.id);
  // console.log(isLoggedIn);

  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log(res);
      user.value = res.data.data.user;
      token.value = res.data.token;
      localStorage.setItem("token", token.value);
      localStorage.setItem("user", JSON.stringify(user.value));
    } catch (err) {
      console.log(err);
      throw new Error(err.response?.data?.message || "Login failed");
    }
  }

  async function loadMe() {
    if (!token.value || user.value) return user.value;

    const res = await api.get("/auth/me");
    user.value = res.data.data;
    localStorage.setItem("user", JSON.stringify(user.value));
    return user.value;
  }

  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }

  return { user, token, isLoggedIn, socketUserId, login, loadMe, logout };
});
