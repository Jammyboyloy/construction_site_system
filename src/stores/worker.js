import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkerStore = defineStore("worker", () => {
  const getWorkerByProject = ref([]);

  const getWorkerByProjectStore = async (project_id) => {
    try {
      const res = await api.get(
        `/supervisor/projects/${project_id}/workers?page=1&per_page=10&sortBy=created_at&sortDir=desc&search=`,
      );

      getWorkerByProject.value = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const removeWorkerFromProject = async (project_id, worker_id) => {
    try {
      await api.delete(`/admin/project/${project_id}/remove-worker`, {
        data: { worker_id },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getWorkerByProject,
    getWorkerByProjectStore,
    removeWorkerFromProject,
  };
});
