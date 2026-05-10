import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useWorkerStore = defineStore("worker", () => {
  const getWorkerByProject = ref([]);
  const getAvailableWorker = ref([]);
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

  const getAvailableWorkerStore = async () => {
    try {
      try {
        const res = await api.get("/admin/available-workers?search=");
        getAvailableWorker.value = res.data.data || [];
      } catch (error) {
        console.error("Error fetching available worker:", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const assignWorker = async (project_id, worker_ids) => {
    try {
      await api.put(`/admin/project/${project_id}/assign-workers`, {
        worker_ids,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const removeWorkerFromProject = async (project_id, worker_id) => {
    try {
      await api.delete(`/admin/project/${project_id}/remove-worker`, {
        data: {
          worker_id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getWorkerByProject,
    getWorkerByProjectStore,
    removeWorkerFromProject,
    getAvailableWorker,
    getAvailableWorkerStore,
    assignWorker,
  };
});
