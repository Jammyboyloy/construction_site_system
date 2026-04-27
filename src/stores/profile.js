import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  let getProfile = ref({});

  const getMe = async () => {
    const res = await api.get("/auth/me");
    getProfile.value = res.data.data;
    console.log(getProfile)
  };

  return { getProfile, getMe };
});
