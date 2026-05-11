import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfileStore = defineStore("profile", () => {
  let getProfile = ref({});
  let getMyProject = ref([]);

  const getMe = async () => {
    try {
      const res = await api.get("/auth/me");
      getProfile.value = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAvatar = async (avatar) => {
    try {
      await api.put("/user/avatar", avatar);
    } catch (error) {
      console.log(error);
    }
  };

  const resetAvatar = async () => {
    try {
      await api.put("/user/avatar/reset");
    } catch (error) {
      console.log(error);
    }
  };

  const getMyProjectStore = async () => {
    try {
      const res = await api.get("/user/my-projects");
      // console.log(res)
      getMyProject.value = res.data.data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = async (password) => {
    try {
      await api.post("/user/change-password", password);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getProfile,
    getMe,
    updateAvatar,
    resetAvatar,
    getMyProjectStore,
    getMyProject,
    changePassword,
  };
});
