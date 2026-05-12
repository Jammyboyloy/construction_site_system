import api from "@/api/https";
import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAttendanceStore = defineStore("attendance", () => {
  // ── State ───────────────────────────────────────────────────
  const qrData = ref(null);
  const timeLeft = ref(0);
  const getAttendanceToday = ref([]);
  let timerInterval = null;

  // ── Computed ────────────────────────────────────────────────
  const isExpired = computed(() => qrData.value && timeLeft.value <= 0);
  const isActive = computed(() => qrData.value && timeLeft.value > 0);

  const formattedTimeLeft = computed(() => {
    if (timeLeft.value <= 0) return "0:00";
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  });

  const checkedInCount = computed(
    () => getAttendanceToday.value.filter((w) => w.check_in).length,
  );

  // ── Actions ─────────────────────────────────────────────────
  const startCountdown = (seconds) => {
    if (timerInterval) clearInterval(timerInterval);
    timeLeft.value = seconds;

    timerInterval = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  };

  const generateQR = async (project_id) => {
    try {
      const res = await api.post("/api/attendance/generate-qr", { project_id });
      qrData.value = res.data;
      if (res.data.expires_in) {
        startCountdown(res.data.expires_in);
      }
    } catch (error) {
      console.error("QR Error:", error);
    }
  };

  const getAttendanceTodayStore = async (project_id) => {
    try {
      const res = await api.get(`/api/attendance/today/${project_id}`);
      getAttendanceToday.value = res.data.data;
    } catch (error) {
      console.error("Attendance Error:", error);
    }
  };

  const scanQr = async (project_id, token) => {
    try {
      await api.post("/api/attendance/scan", project_id, token);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    qrData,
    timeLeft,
    isExpired,
    isActive,
    formattedTimeLeft,
    getAttendanceToday,
    getAttendanceTodayStore,
    generateQR,
    checkedInCount,
    scanQr,
  };
});
