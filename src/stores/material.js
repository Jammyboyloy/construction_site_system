import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMaterialStore = defineStore("material", () => {
  let getMaterialByProject = ref([]);

  const getMaterialByProjectStore = async (project_id) => {
    try {
      const res = await api.get(
        `/api/materials/project/${project_id}?page=1&per_page=10&sortBy=created_at&sortDir=desc&search=`,
      );
      getMaterialByProject.value = res.data.data;
      // console.log(getMaterialByProject.value);
    } catch (error) {
      console.log(error);
    }
  };

  const addMaterialByProject = async (formData) => {
    try {
      await api.post("/api/materials", formData); 
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getMaterialByProject,
    getMaterialByProjectStore,
    addMaterialByProject,
  };
});
