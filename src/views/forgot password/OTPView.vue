sphinxgod0+1@gmail.com
<template>
  <div class="otp-container">
    <div class="card shadow-lg border-0 rounded-4 p-4 otp-card">
      <!-- Title -->
      <div class="text-center mb-4">
        <h2 class="ffw-bold mb-4 text-center">OTP Verification</h2>
        <p class="text-muted">Enter the 6-digit code sent to your email</p>
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
            @keydown="handleKeydown(index, $event)"
          />
        </div>

        <!-- Verify Button -->
        <button type="submit" class="btn bg-prime text-white w-100 btn-lg">
          Verify OTP
        </button>
      </form>

      <!-- Resend -->
      <div class="text-center mt-4">
        <p class="text-muted mb-1">Didn’t receive the code?</p>

        <button
          class="btn btn-link text-prime text-decoration-none"
          @click="resendOTP"
        >
          Resend OTP
        </button>
      </div>

      <!-- Back -->
      <div class="text-center mt-2">
        <router-link to="/forget" class="text-decoration-none text-prime">
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

// get email from localStorage
const email = localStorage.getItem("email");

const moveNext = (index, event) => {
  let value = event.target.value;

  // only numbers
  value = value.replace(/[^0-9]/g, "");

  otp.value[index] = value;

  // move next
  if (value && index < 5) {
    event.target.nextElementSibling.focus();
  }
};

const handleKeydown = (index, event) => {
  // backspace
  if (event.key === "Backspace") {
    // if current input has value -> clear only
    if (otp.value[index]) {
      otp.value[index] = "";
      return;
    }

    // move previous when empty
    if (index > 0) {
      otp.value[index - 1] = "";

      event.target.previousElementSibling.focus();
    }
  }
};

const verifyOTP = async () => {
  const code = otp.value.join("");

  if (code.length < 6) {
    toast.error("Please enter complete OTP");
    return;
  }

  try {
    // loading.value = true;

    console.log(code);
    console.log(email);

    const response = await api.post("user/verify-otp", {
      email: email,
      otp: code,
    });

    console.log(response.data);

    toast.success("OTP verified successfully!");

    router.push("/newpassword");
  } catch (error) {
    console.log(error);

    toast.error(error.response?.data?.message || "Invalid OTP");
  }
  // finally {
  //   loading.value = false;
  // }
};

const resendOTP = async () => {
  try {
    resendLoading.value = true;

    const response = await api.post("user/resend-otp", {
      email: email,
    });

    console.log(response.data);

    toast.success("OTP resent successfully!");
  } catch (error) {
    console.log(error);

    toast.error(error.response?.data?.message || "Failed to resend OTP");
  }
  // finally {
  //   resendLoading.value = false;
  // }
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
  border: 1px solid #f97316;
}
.otp-input:focus {
  border-color: #ea580c;
  box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.2);
  outline: none;
}
</style>
