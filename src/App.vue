<script setup>
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { connectSocket } from "@/socket";
import NotificationHandler from "@/components/NotificationHandler.vue";

const auth = useAuthStore();

onMounted(async () => {
  try {
    if (auth.isLoggedIn && !auth.socketUserId) {
      await auth.loadMe();
    }

    if (auth.isLoggedIn && auth.socketUserId) {
      connectSocket(auth.socketUserId);
    }
  } catch (error) {
    console.error("Unable to initialize socket user:", error);
  }
});
</script>

<template>
  <n-notification-provider>
    <NotificationHandler />
    <router-view />
  </n-notification-provider>
</template>
