import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTaskStore = defineStore("task", () => {
  let getTaskByProject = ref([]);

  const getTaskByProjectStore = async (project_id) => {
    const res = await api.get(`/supervisor/project/${project_id}/tasks`);
    // console.log(res)
    getTaskByProject.value = res.data.tasks;
    // console.log(getTaskByProject.value);
  };

  return { getTaskByProject, getTaskByProjectStore };
});
