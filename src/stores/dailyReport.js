import api from "@/api/https";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useDailyReportStore = defineStore("dailyReport", () => {
  const dailyReports = ref([]);

  const getDailyReportByProjectStore = async (project_id) => {
    try {
      const res = await api.get(
        `/supervisor/daily-reports/${project_id}?page=1&per_page=100&sortBy=created_at&sortDir=desc&search=`,
      );

      dailyReports.value = res.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  const allReportImages = computed(() => {
    return dailyReports.value
      .flatMap((r) => r.images || [])
      .map((img) => (typeof img === "string" ? img : img.url))
      .filter(Boolean);
  });

  return { getDailyReportByProjectStore, dailyReports, allReportImages };
});
