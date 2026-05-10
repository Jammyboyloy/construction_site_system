<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-lg-5 col-md-7 col-12">
        <!-- Icon Header -->
        <div class="scan-icon-wrap mx-auto mb-3">
          <ScanLine :size="32" class="text-prime" />
        </div>
        <h5 class="fw-bold text-center mb-1">QR Attendance</h5>
        <p class="text-secondary text-center fs-7 mb-4">
          Scan QR code or enter PIN to check in
        </p>

        <!-- Tab Switch -->
        <n-tabs type="segment" animated v-model:value="activeTab" class="mb-4">
          <!-- ── QR TAB ── -->
          <n-tab-pane name="qr" tab="QR Scan">
            <div class="camera-wrap mb-3">
              <div v-show="isScanning" id="reader" class="camera-box"></div>
              <div v-if="!isScanning" class="camera-placeholder">
                <QrCode :size="64" class="text-muted opacity-50" />
                <p class="text-secondary fs-7 mt-3 mb-0">Camera not active</p>
              </div>
            </div>

            <n-button
              v-if="!isScanning"
              block
              type="primary"
              class="rounded-3"
              size="large"
              @click="startScan"
            >
              <ScanText class="me-2" /> SCAN QR
            </n-button>

            <n-button
              v-else
              type="error"
              block
              class="rounded-3"
              size="large"
              @click="stopScan"
            >
              <Ban class="me-2" /> Cancel
            </n-button>
          </n-tab-pane>

          <!-- ── PIN TAB ── -->
          <n-tab-pane name="pin" tab="PIN Code">
            <div class="pin-wrap mb-4">
              <KeyRound size="60" class="text-prime" />
              <p class="text-secondary fs-6 mt-4">
                Enter your attendance PIN
              </p>
            </div>

            <n-form-item label="PIN Code" class="">
              <n-input
                v-model:value="pin"
                placeholder="Enter PIN code"
                size="large"
                @keyup.enter="submitPin"
              />
            </n-form-item>

            <n-button
              type="primary"
              block
              class="rounded-3"
              size="large"
              :loading="pinLoading"
              :disabled="!pin"
              @click="submitPin"
            >
              <template #icon><LogIn :size="18" /></template>
              Check In
            </n-button>
          </n-tab-pane>
        </n-tabs>

        <!-- Status -->
        <div v-if="status" class="status-box mt-3" :class="statusType">
          <component
            :is="statusType === 'success' ? CheckCircle : XCircle"
            :size="18"
          />
          <span>{{ status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onBeforeUnmount, watch } from "vue";
import { Html5Qrcode } from "html5-qrcode";
import {
  ScanLine,
  QrCode,
  ScanText,
  X,
  CheckCircle,
  XCircle,
  KeyRound,
  LogIn,
} from "lucide-vue-next";
import api from "@/api/https";

const activeTab = ref("qr");
const scanner = ref(null);
const isScanning = ref(false);
const status = ref("");
const statusType = ref("");

const pin = ref("");
const pinLoading = ref(false);

function setStatus(msg, type) {
  status.value = msg;
  statusType.value = type;
}

watch(activeTab, (val) => {
  status.value = "";
  statusType.value = "";
  if (val === "pin") stopScan();
});

async function startScan() {
  isScanning.value = true;
  status.value = "";

  await nextTick();

  try {
    scanner.value = new Html5Qrcode("reader");

    await scanner.value.start(
      { facingMode: "environment" },
      { fps: 10, qrbox: 220 },
      async (decodedText) => {
        try {
          await api.post("/api/attendance/scan", { token: decodedText });
          setStatus("Check-in successful!", "success");
          await stopScan();
        } catch (err) {
          setStatus(err?.response?.data?.message || "Invalid QR code", "error");
        }
      },
    );
  } catch (err) {
    isScanning.value = false;
    setStatus("Could not access camera", "error");
  }
}

async function stopScan() {
  if (!scanner.value) {
    isScanning.value = false;
    return;
  }

  try {
    const state = scanner.value.getState();
    if (state === 2 || state === 3) {
      await scanner.value.stop();
    }
  } catch (_) {
    // ignore
  } finally {
    scanner.value = null;
    isScanning.value = false;
  }
}

async function submitPin() {
  if (!pin.value) return;
  pinLoading.value = true;
  status.value = "";

  try {
    await api.post("/api/attendance/scan", { token: pin.value });
    setStatus("Check-in successful!", "success");
    pin.value = "";
  } catch (err) {
    setStatus(err?.response?.data?.message || "Invalid PIN code", "error");
  } finally {
    pinLoading.value = false;
  }
}

onBeforeUnmount(() => {
  stopScan();
});
</script>

<style scoped>
.scan-icon-wrap {
  width: 64px;
  height: 64px;
  background: #fff7ed;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-wrap {
  width: 100%;
  height: 260px;
  border-radius: 16px;
  overflow: hidden;
  background: #f9fafb;
  border: 2px dashed #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;
}

.camera-box {
  width: 100%;
  height: 100%; 
}

.camera-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.pin-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 0 10px;
}

.status-box {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 14px;
}

.status-box.success {
  background: #f0fdf4;
  color: #16a34a;
  border: 1px solid #bbf7d0;
}

.status-box.error {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
}

/* Force the video to fill the fixed-height box */
:deep(#reader) {
  border: none !important;
  width: 100% !important;
  height: 100% !important;
}

:deep(#reader video) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover;
  border-radius: 14px;
}

:deep(#reader__scan_region) {
  height: 100% !important;
}
</style>