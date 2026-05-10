<template>
  <div class="reset-container">
    <div class="card shadow-lg border-0 rounded-4 p-4 reset-card">

      <div class="text-center mb-4">
        <h2 class="fw-bold">Create New Password</h2>
      </div>

      <!-- Email (readonly or hidden if you want) -->
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="email"
          placeholder="Enter your email"
        />
      </div>

      <!-- New Password -->
      <div class="mb-3">
        <label class="form-label">New Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="new_password"
          placeholder="Enter new password"
        />
      </div>

      <!-- Confirm Password -->
      <div class="mb-4">
        <label class="form-label">Confirm Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="confirm_password"
          placeholder="Confirm password"
        />
      </div>

      <!-- Button -->
      <button
        class="btn bg-prime text-white w-100 btn-lg"
        @click="handleSubmit"
        :disabled="loading"
      >
        {{ loading ? "Updating..." : "Reset Password" }}
      </button>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { notify } from "@/utils/toast";
import api from "@/api/https";

const router = useRouter();
const toast = notify(router);

const email = ref("");
const new_password = ref("");
const confirm_password = ref("");
const loading = ref(false);

// get email from previous page (router state or localStorage)
onMounted(() => {
  email.value = history.state.email || localStorage.getItem("email") || "";
});

const handleSubmit = async () => {
  if (!new_password.value || !confirm_password.value) {
    toast.error("Please fill all fields");
    return;
  }

  if (new_password.value !== confirm_password.value) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    // loading.value = true;
    console.log(new_password.value);
    const res = await api.post("user/reset-password",{
        email: email.value,
        new_password: new_password.value,
        confirm_password: confirm_password.value,
      }
    );

    console.log(res.data);

    toast.success("Password reset successful!");

    router.push("/login");

  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "Reset failed");

  } 
};
</script>

<style scoped>
.reset-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.reset-card {
  width: 100%;
  max-width: 450px;
}
</style>