import api from "@/api/https";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useProjectStore = defineStore("project", () => {
  let getProject = ref([]);
  let getById = ref({});

  const getAllProject = async () => {
    try {
      const res = await api.get(
        "/admin/projects?page=1&per_page=10&sortBy=created_at&sortDir=desc&search=",
      );
      getProject.value = res.data.data;
      // console.log(getProject.value)
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectById = async (id) => {
    try {
      const res = await api.get(`/admin/project/${id}`);
      getById.value = res.data.data;
      // console.log(getById.value)
    } catch (error) {
      console.log(error);
    }
  };

  const createProject = async (data) => {
    try {
      const res = await api.post("/admin/create-project", data);
      return res; 
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const editProject = async (project_id, data) => {
    try {
      await api.put(`/admin/project/${project_id}`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeProject = async (project_id) => {
    try {
      await api.delete(`/admin/project/${project_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const updateThumbnailProject = async (project_id, thumbnail) => {
    try {
      await api.put(`/admin/project/${project_id}/thumbnail`, thumbnail);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getAllProject,
    getProject,
    getProjectById,
    getById,
    createProject,
    editProject,
    removeProject,
    updateThumbnailProject,
  };
});
