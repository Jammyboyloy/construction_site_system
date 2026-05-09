import api from "@/api/https";
import { defineStore } from "pinia";
import { computed } from "vue";
import { ref } from "vue";

export const useNotificationStore = defineStore("notification", () => {
  const getNotification = ref([]);

  const getMyNotification = async () => {
    const res = await api.get("/user/notifications");
    getNotification.value = res.data.data;
  };

  const addNotification = (notification) => {
    getNotification.value = [
      {
        id: notification.id || `socket-${Date.now()}`,
        message: notification.message,
        created_at: notification.created_at || new Date().toISOString(),
        is_read: notification.is_read ?? 0,
      },
      ...getNotification.value,
    ];
  };

  const readAllNotification = async () => {
    await api.put("/user/notifications/read-all");
    await getMyNotification();
  };

  const unreadCount = computed(
    () => getNotification.value.filter((n) => n.is_read === 0).length,
  );

  return {
    getMyNotification,
    getNotification,
    addNotification,
    readAllNotification,
    unreadCount,
  };
});
