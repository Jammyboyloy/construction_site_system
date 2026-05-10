import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useSupervisorStore = defineStore("supervisor", () => {
  const availableSupervisors = ref([]);
  const allSupervisors = ref([]);

  const getAvailableSupervisors = async () => {
    try {
      const res = await api.get("/admin/available-supervisors?search=");
      availableSupervisors.value = res.data.data || [];
    } catch (error) {
      console.error("Error fetching available supervisors:", error);
    }
  };

  const getAllSupervisors = async () => {
    try {
      const res = await api.get(
        "/admin/supervisors?page=1&per_page=100&sortBy=created_at&sortDir=asc&search=",
      );
      allSupervisors.value = res.data.data || [];
    } catch (error) {
      console.error("Error fetching all supervisors:", error);
    }
  };

  const assignSupervisor = async (project_id, supervisor_id) => {
    try {
      await api.put(`/admin/project/${project_id}/assign-supervisor`, {
        supervisor_id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAvailableSupervisors,
    availableSupervisors,
    getAllSupervisors,
    allSupervisors,
    assignSupervisor,
  };
});
