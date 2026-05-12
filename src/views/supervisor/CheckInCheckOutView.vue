<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <BaseTitle title="Attendance" />

      <!-- N-Tag auto switches color and text -->
      <n-tag v-if="isActive" round :bordered="false" type="success">
        QR Active
      </n-tag>
      <n-tag v-else-if="isExpired" round :bordered="false" type="error">
        QR Expired
      </n-tag>
      <n-tag v-else round :bordered="false"> Ready to Generate </n-tag>
    </div>

    <div class="row g-4">
      <div class="col-12 col-xl-4">
        <div class="card p-4 rounded-4 shadow-box border-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 class="fw-bold mb-1">Project QR</h5>
              <p class="text-secondary fs-7 mb-0">Generate code for workers</p>
            </div>
            <div class="qr-icon">
              <QrCode :size="22" />
            </div>
          </div>

          <!-- Image Box: Image REMOVED if expired -->
          <div class="qr-box bg-main">
            <template v-if="isActive">
              <img :src="qrData?.qr_image" alt="Attendance QR Code" />
            </template>
            <div v-else-if="isExpired" class="text-danger fw-bold">
              SESSION EXPIRED
            </div>
            <div v-else class="text-secondary fs-7">Click button to start</div>
          </div>

          <div class="d-flex justify-content-between mt-3">
            <div>
              <p class="text-secondary fs-7 mb-1">Time Remaining</p>
              <h6 :class="['fw-bold mb-0', isExpired ? 'text-danger' : '']">
                {{ formattedTimeLeft }}
              </h6>
            </div>
            <div>
              <p class="text-secondary fs-7 mb-1">Manual Entry Code</p>
              <!-- Code REMOVED if expired -->
              <h6 class="fw-bold mb-0">
                {{ isActive ? qrData?.qr_data?.token : "---" }}
              </h6>
            </div>
          </div>

          <BaseButton
            btnName="Generate QR Code"
            icon="RefreshCw"
            class="w-100 mt-3"
            @click="handleManualGenerate"
          />
        </div>
      </div>

      <!-- Attendance Table -->
      <div class="col-12 col-xl-8">
        <div class="card rounded-4 shadow-box border-3 overflow-hidden">
          <div class="attendance-header">
            <div>
              <h5 class="fw-bold mb-1">Today Attendance</h5>
              <p class="text-secondary fs-7 mb-0">Real-time worker list</p>
            </div>
            <n-tag round :bordered="false" type="warning">
              {{ checkedInCount }} Checked In
            </n-tag>
          </div>

          <div class="attendance-table">
            <div class="attendance-row attendance-head bg-main">
              <div>Worker</div>
              <div>Check-In</div>
              <div>Check-Out</div>
              <div>Hours</div>
            </div>

            <n-scrollbar x-scrollable style="max-height: 332px">
              <div
                v-for="worker in workers"
                :key="worker.worker_id"
                class="attendance-row"
              >
                <div class="worker-cell">
                  <div class="avatar-wrap">
                    <img
                      :src="worker.avatar || NO_IMAGE_URL"
                      @error="handleImageError"
                    />
                  </div>
                  <div>
                    <p class="fw-bold mb-1 worker-name">{{ worker.name }}</p>
                    <p class="text-secondary fs-8 mb-0">
                      {{ worker.skill_type }}
                    </p>
                  </div>
                </div>
                <div class="time-cell">{{ formatTime(worker.check_in) }}</div>
                <div class="time-cell muted">
                  {{ formatTime(worker.check_out) }}
                </div>
                <div class="time-cell">{{ worker.working_hours }}h</div>
              </div>
            </n-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import BaseTitle from "@/components/BaseTitle.vue";
import { QrCode, RefreshCw } from "lucide-vue-next";
import BaseButton from "@/components/BaseButton.vue";
import { useAttendanceStore } from "@/stores/attendance";
import { useProfileStore } from "@/stores/profile";

const profileStore = useProfileStore();
const attendanceStore = useAttendanceStore();

const { getMyProject: project } = storeToRefs(profileStore);
const {
  qrData,
  getAttendanceToday: workers,
  checkedInCount,
  isExpired,
  isActive,
  formattedTimeLeft,
} = storeToRefs(attendanceStore);

// Global Image Helpers
const NO_IMAGE_URL = "https://placehold.co/200";
const handleImageError = (e) => {
  e.target.src = NO_IMAGE_URL;
};

onMounted(async () => {
  await profileStore.getMyProjectStore();
  if (project.value?.id) {
    await attendanceStore.getAttendanceTodayStore(project.value.id);
  }
});

const handleManualGenerate = async () => {
  if (project.value?.id) {
    await attendanceStore.generateQR(project.value.id);
  }
};

function formatTime(dateStr) {
  if (!dateStr) return "--:--";
  return new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
</script>

<style scoped>
.qr-icon {
  align-items: center;
  background: #fff7ed;
  border-radius: 14px;
  color: #f97316;
  display: flex;
  height: 46px;
  justify-content: center;
  width: 46px;
}
.qr-box {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #edf0f3;
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 258px;
  padding: 24px;
  text-align: center;
}
.qr-box img {
  height: 210px;
  width: 210px;
}
.attendance-header {
  display: flex;
  justify-content: space-between;
  padding: 24px;
}
.attendance-row {
  display: grid;
  grid-template-columns: minmax(220px, 2fr) minmax(120px, 1fr) minmax(
      120px,
      1fr
    ) minmax(90px, 0.7fr);
  padding: 18px 24px;
  border-top: 1px solid #eef1f5;
  align-items: center;
}
.attendance-head {
  background: #fbfcfe;
  color: #a4afbf;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}
.worker-cell {
  display: flex;
  align-items: center;
  gap: 14px;
}
.avatar-wrap img {
  border-radius: 50%;
  height: 46px;
  width: 46px;
  object-fit: cover;
}
.time-cell {
  color: #667085;
  font-weight: 800;
}
.muted {
  color: #b4bfce !important;
}
</style>
