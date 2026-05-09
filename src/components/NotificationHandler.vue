<script setup>
import { onMounted, onUnmounted } from "vue";
import { useNotification } from "naive-ui";
import { socket } from "@/socket";
import { useNotificationStore } from "@/stores/notification";

const notification = useNotification();
const notificationStore = useNotificationStore();

function handleNotification(data) {
  notificationStore.addNotification(data);

  notification.success({
    title: data.title || "New notification",
    content: data.message,
    duration: 5000,
    keepAliveOnHover: true,
  });
}

onMounted(() => {
  socket.off("notification", handleNotification);
  socket.on("notification", handleNotification);
});

onUnmounted(() => {
  socket.off("notification", handleNotification);
});
</script>

<template>
  <span style="display: none"></span>
</template>
