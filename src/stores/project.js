import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  let getProject = ref([]);
  let getById = ref({});

  const getAllProject = async () => {
    const res = await api.get(
      "/admin/projects?page=1&per_page=10&sortBy=created_at&sortDir=desc&search=",
    );
    getProject.value = res.data.data;
    // console.log(getProject.value)
  };

  const getProjectById = async (id) => {
    const res = await api.get(`/admin/project/${id}`);
    getById.value = res.data.data;
    // console.log(getById.value)
  }

  return { getAllProject, getProject, getProjectById, getById };
});
