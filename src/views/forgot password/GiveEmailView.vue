<template>
  <div class="forgot-container">
    <div class="card shadow-lg border-0 rounded-4 p-4 forgot-card">

      <!-- Title -->
      <div class="text-center mb-4">
        <h2 class="fw-bold">Forgot Password</h2>
        <p class="text-muted">
          Enter your email address to reset your password
        </p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit">

        <!-- Email -->
        <div class="mb-4">
          <label class="form-label fw-semibold">
            Email Address
          </label>

          <input
            type="email"
            class="form-control form-control-lg"
            placeholder="Enter your email"
            v-model="email"
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          class="btn btn-primary w-100 btn-lg"
        >
          Send Reset Link
        </button>
      </form>

      <!-- Success Message -->
      <div
        v-if="message"
        class="alert alert-success mt-4"
      >
      </div>

      <!-- Back Login -->
      <div class="text-center mt-4">
        <router-link
          to="/login"
          class="text-decoration-none"
        >
          ← Back to Login
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import { notify } from "@/utils/toast";

const toast = notify(router);
const email = ref("");
const handleSubmit = () => {
  if (!email.value) {
    toast.error("Please input email");
    return;
  }

  // fake success
  toast.success("OTP sent successfully (TEST MODE)");

  router.push("/otp");
};
// const handleSubmit = async () => {
//   if (!email.value) {
//     toast.error("Please input email");
//     return;
//   }

//   try {
//     loading.value = true;

//     const response = await api.post("/user/forgot-password",
//       {
//         email: email.value,
//       }
//     );


//     toast.success("OTP sent successfully!");

//     // go to otp page
//     router.push("/otp");

//   } catch (error) {
//     console.log(error);

//     toast.error(
//       error.response?.data?.message ||
//       "Something went wrong"
//     );

//   } finally {
//     loading.value = false;
//   }
// };
</script>

<style scoped>
.forgot-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.forgot-card {
  width: 100%;
  max-width: 450px;
}
</style>