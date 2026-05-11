import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBudgetStore = defineStore("budget", () => {
  let getBudgetByProject = ref({});

  const getBudgetByProjectStore = async (project_id) => {
    try {
      const res = await api.get(`/api/projects/budget-status/${project_id}`);
      // console.log(res)
      getBudgetByProject.value = res.data;
      // console.log(getBudgetByProject.value);
    } catch (error) {
      console.log(error);
    }
  };

  return { getBudgetByProject, getBudgetByProjectStore };
});
