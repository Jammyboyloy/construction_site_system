<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <BaseTitle title="Attendance" />
      <n-tag round :bordered="false" type="success">QR Active</n-tag>
    </div>

    <div class="row g-4">
      <div class="col-12 col-xl-4">
        <div class="card p-4 rounded-4 shadow-box border-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div>
              <h5 class="fw-bold mb-1">Project QR</h5>
              <p class="text-secondary fs-7 mb-0">Scan to check in or out</p>
            </div>
            <div class="qr-icon">
              <QrCode :size="22" />
            </div>
          </div>

          <div class="qr-box bg-main">
            <img :src="qrResponse.qr_image" alt="Attendance QR Code" />
          </div>

          <div class="d-flex justify-content-between mt-3">
            <div>
              <p class="text-secondary fs-7 mb-1">Expired Time</p>
              <h6 class="fw-bold mb-0">{{ qrResponse.expires_at }}</h6>
            </div>
            <div>
              <p class="text-secondary fs-7 mb-1">Manual Entry Code</p>
              <h6 class="fw-bold mb-0">{{ qrResponse.qr_data.token }}</h6>
            </div>
          </div>

          <BaseButton btnName="Regenerate QR" icon="RefreshCw" class="w-100 mt-3" />
          
        </div>
      </div>

      <div class="col-12 col-xl-8">
        <div class="card rounded-4 shadow-box border-3 overflow-hidden">
          <div class="attendance-header">
            <div>
              <h5 class="fw-bold mb-1">Today Attendance</h5>
              <p class="text-secondary fs-7 mb-0">
                Workers shown here after they scan the QR code.
              </p>
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
              :key="worker.name"
              class="attendance-row"
            >
              <div class="worker-cell">
                <div class="avatar-wrap">
                  <img :src="worker.avatar" :alt="worker.name" />
                </div>
                <div>
                  <p class="fw-bold mb-1 worker-name">{{ worker.name }}</p>
                  <p class="text-secondary fs-8 mb-0">{{ worker.role }}</p>
                </div>
              </div>
              <div class="time-cell">{{ worker.checkIn }}</div>
              <div class="time-cell muted">{{ worker.checkOut }}</div>
              <div class="time-cell">{{ worker.hours }}</div>
            </div>
            </n-scrollbar>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import BaseTitle from "@/components/BaseTitle.vue";
import { QrCode, RefreshCw } from "lucide-vue-next";
import BaseButton from "@/components/BaseButton.vue";

const qrResponse = ref({
  message: "QR generated",
  qr_data: {
    token: "pqr92yishuf",
  },
  expires_at: "05:30 PM",
  qr_image:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATUSURBVO3BQY4bSRAEwfAC//9l3znmqYBGJ2clIczwR6qWnFQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYs+eQnIb1JzA+RGzQRkUrMJyI2aGyC/Sc0bJ1WLTqoWnVQt+mSZmk1ANgG5ATKpmYBMaiYgN2reULMJyKaTqkUnVYtOqhZ98mVAnlDzBJBJzRNAJjU3aiYgk5oJyATkRs0TQJ5Q800nVYtOqhadVC365B8D5A0gT6iZgDyh5l9yUrXopGrRSdWiT/4xam6ATGomIDdqJiA3aiYgE5BJzd/spGrRSdWik6pFn3yZmv8TkEnNjZoJyATkCSCTmgnIG2r+JCdVi06qFp1ULfpkGZC/CZBJzY2aCcikZgKyCcif7KRq0UnVopOqRZ+8pOZPpuZGzRNAfpOav8lJ1aKTqkUnVYvwR14AMqmZgGxScwPkDTU3QN5Q8wSQTWq+6aRq0UnVopOqRfgjLwC5UXMD5EbNDZAbNTdAbtTcAJnUTEA2qZmATGqeADKpeeOkatFJ1aKTqkX4I4uA3KiZgLyhZgLym9RMQG7UTEBu1NwAmdRMQCY133RSteikatFJ1SL8kReATGomIJOaGyCTmk1AnlAzAZnU3AC5UTMB2aRmAjKp2XRSteikatFJ1aJPXlJzo2YCMqm5ATKpuQEyqXlCzQRkUnMDZFIzAXlCzRtAftNJ1aKTqkUnVYs++Z8BmdTcAHlDzRNqboBMap4AMqmZgGxSMwGZ1LxxUrXopGrRSdWiT14C8oaaCciNmgnIbwLyBJBJzQRkAvKb1Gw6qVp0UrXopGrRJ8vUbFIzAXkDyI2aCcik5g0gb6i5ATKpmYDcqHnjpGrRSdWik6pF+COLgExqJiCTmhsgN2omIE+oeQLIE2omIJOaCcik5g0gN2o2nVQtOqladFK16JOXgExqngByo2YCcqPmCSBPqJmATGqeADKpmYA8oeYJIJOaN06qFp1ULTqpWvTJlwGZ1ExAJjUTkEnNBORGzSYgTwCZ1NwAmdRMQCY1b6jZdFK16KRq0UnVok++TM2NmgnIpGYCMqm5ATKpeULNBGRSc6PmBsik5g0gk5obIJOaN06qFp1ULTqpWvTJLwNyo2YCMqnZpOYGyKTmBsik5gkgTwCZ1ExAftNJ1aKTqkUnVYvwR/5iQJ5QswnIpOYGyI2aJ4DcqLkBMql546Rq0UnVopOqRZ+8BOQ3qZnUTEAmNROQSc0TQG6AbAIyqdmkZtNJ1aKTqkUnVYs+WaZmE5AbIN8E5EbNDZA31GwCcqPmjZOqRSdVi06qFn3yZUCeUPOGmgnIG2pugDyhZgIyAXlDzQRkUvNNJ1WLTqoWnVQt+uQfA+RGzRNAJjVPqHlDzQTkCTUTkBs1b5xULTqpWnRSteiTf4yaCcgE5EbNDZBJzQ2QSc2kZgIyAXkCyBNqNp1ULTqpWnRSteiTL1PzTWomIJOaCcgTat5QcwNkUjMBmdRMQG7UTEC+6aRq0UnVopOqRZ8sA/KbgDyh5g0gb6iZ1ExAJjUTkCeATGq+6aRq0UnVopOqRfgjVUtOqhadVC06qVp0UrXopGrRSdWik6pFJ1WLTqoWnVQtOqladFK16KRq0UnVopOqRf8BzH83QXhKsJkAAAAASUVORK5CYII=",
});

const isGenerating = ref(false);

const workerAvatar =
  "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg";

const workers = [
  {
    name: "Marcus Thorne",
    role: "Structural Engineer",
    checkIn: "07:45 AM",
    checkOut: "--:--",
    hours: "0.5h",
    avatar: workerAvatar,
  },
  {
    name: "Marcus Thorne",
    role: "Structural Engineer",
    checkIn: "07:45 AM",
    checkOut: "--:--",
    hours: "0.5h",
    avatar: workerAvatar,
  },
  {
    name: "David Chen",
    role: "HVAC Specialist",
    checkIn: "08:15 AM",
    checkOut: "--:--",
    hours: "0.0h",
    avatar: workerAvatar,
  },
  {
    name: "David Chen",
    role: "HVAC Specialist",
    checkIn: "08:15 AM",
    checkOut: "--:--",
    hours: "0.0h",
    avatar: workerAvatar,
  },
  {
    name: "Sarah Jenkins",
    role: "Site Safety Lead",
    checkIn: "--:--",
    checkOut: "--:--",
    hours: "0.0h",
    avatar: workerAvatar,
  },
];

const checkedInCount = computed(
  () => workers.filter((worker) => worker.checkIn !== "--:--").length,
);

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
  justify-content: center;
  padding: 24px;
}

.qr-box img {
  height: 210px;
  image-rendering: pixelated;
  width: 210px;
}

.qr-meta {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.attendance-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 24px;
}

.attendance-table {
  overflow-x: auto;
}

.attendance-row {
  align-items: center;
  border-top: 1px solid #eef1f5;
  display: grid;
  grid-template-columns: minmax(220px, 2fr) minmax(120px, 1fr) minmax(
      120px,
      1fr
    ) minmax(90px, 0.7fr);
  min-width: 720px;
  padding: 18px 24px;
}

.attendance-head {
  background: #fbfcfe;
  color: #a4afbf;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.worker-cell {
  align-items: center;
  display: flex;
  gap: 14px;
}

.avatar-wrap {
  flex: 0 0 auto;
  height: 46px;
  position: relative;
  width: 46px;
}

.avatar-wrap img {
  border-radius: 50%;
  height: 46px;
  object-fit: cover;
  width: 46px;
}

.worker-name {
  color: #1f2937;
  font-size: 15px;
}

.time-cell {
  color: #667085;
  font-size: 15px;
  font-weight: 800;
}

.time-cell.muted {
  color: #b4bfce;
}

@media (max-width: 575px) {
  .attendance-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }

  .qr-meta {
    grid-template-columns: 1fr;
  }
}
</style>
