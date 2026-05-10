import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useClientStore = defineStore("client", () => {
  let getAllClient = ref([]);

  const getAllClientStore = async () => {
    const res = await api.get(
      "/admin/clients?page=1&per_page=10&sortBy=created_at&sortDir=desc&search=",
    );
    getAllClient.value = res.data.data;
    // console.log(getAllClient.value);
  };

  return { getAllClient, getAllClientStore };
});
