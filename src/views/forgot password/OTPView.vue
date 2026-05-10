<template>
  <div class="otp-container">
    <div class="card shadow-lg border-0 rounded-4 p-4 otp-card">

      <!-- Title -->
      <div class="text-center mb-4">
        <h2 class="fw-bold">OTP Verification</h2>
        <p class="text-muted">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <!-- OTP Form -->
      <form @submit.prevent="verifyOTP">

        <div class="d-flex justify-content-between gap-2 mb-4">
          <input
            v-for="(digit, index) in otp"
            :key="index"
            type="text"
            maxlength="1"
            class="form-control text-center otp-input"
            v-model="otp[index]"
            @input="moveNext(index, $event)"
          />
        </div>

        <!-- Verify Button -->
        <button
          type="submit"
          class="btn btn-primary w-100 btn-lg"
        >
          Verify OTP
        </button>
      </form>

      <!-- Resend -->
      <div class="text-center mt-4">
        <p class="text-muted mb-1">
          Didn’t receive the code?
        </p>

        <button
          class="btn btn-link text-decoration-none"
          @click="resendOTP"
        >
          Resend OTP
        </button>
      </div>

      <!-- Back -->
      <div class="text-center mt-2">
        <router-link
          to="/forget"
          class="text-decoration-none"
        >
          ← Back
        </router-link>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { notify } from "@/utils/toast";
import api from "@/api/https";

const router = useRouter();
const toast = notify(router);

const otp = ref(["", "", "", "", "", ""]);
const loading = ref(false);
const resendLoading = ref(false);

const moveNext = (index, event) => {
  const value = event.target.value;

  // only number
  event.target.value = value.replace(/[^0-9]/g, "");

  if (value && index < 5) {
    event.target.nextElementSibling.focus();
  }
};

const verifyOTP = async () => {
  const code = otp.value.join("");

  if (code.length < 6) {
    toast.error("Please enter complete OTP");
    return;
  }

  try {
    loading.value = true;

    const response = await api.post("user/verify-otp",{otp: code,}
    );

    console.log(response.data);

    toast.success("OTP verified successfully!");

    router.push("/newpassword");

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Invalid OTP"
    );

  } finally {
    loading.value = false;
  }
};

const resendOTP = async () => {
  try {
    resendLoading.value = true;

    const response = await api.post("user/resend-otp");

    console.log(response.data);

    toast.success("OTP resent successfully!");

  } catch (error) {
    console.log(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to resend OTP"
    );

  } finally {
    resendLoading.value = false;
  }
};
</script>

<style scoped>
.otp-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.otp-card {
  width: 100%;
  max-width: 450px;
}

.otp-input {
  width: 55px;
  height: 55px;
  font-size: 24px;
  font-weight: bold;
  border-radius: 12px;
}
</style>