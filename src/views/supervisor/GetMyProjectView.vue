<template>
  <div>
    <div class="d-flex align-items-center mb-3">
      <BaseTitle :title="project.name" />
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane
        name="overview"
        tab="Overview"
        class="d-flex flex-column gap-4"
      >
        <div class="d-flex flex-column gap-4">
          <div class="row pt-3 g-4">
            <div class="col-lg-6">
              <div class="card shadow-box rounded-4 border-3">
                <div class="card-img" style="height: 245px">
                  <img
                    :src="project.thumbnail"
                    alt="Project Image"
                    class="w-100 h-100 object-fit-cover rounded-4"
                  />
                  <div
                    class="card-img-overlay bg-dark opacity-50 rounded-4"
                  ></div>

                  <div class="card-img-overlay text-light">
                    <h6 class="text-prime fs-6 ls fw-bold mt-2">
                      Project Overview
                    </h6>
                    <h4 class="fw-bold mb-3 ls">{{ project.name }}</h4>
                    <div class="d-flex align-items-center mb-2">
                      <MapPin size="20" />
                      <p class="m-0 fs-6 ms-1 fw-bold ls">
                        {{ project.location }}
                      </p>
                    </div>

                    <div class="d-flex align-items-center mb-2">
                      <DollarSign size="20" />
                      <p class="m-0 fs-6 ms-1 fw-bold ls">
                        {{ project.estimated_budget }}
                      </p>
                    </div>

                    <div
                      class="d-flex align-items-center fs-6 gap-1 mb-3 fw-bold ls"
                    >
                      <Calendar size="20" />
                      <p class="m-0 mx-1">
                        {{ formatDate(project.start_date) }}
                      </p>
                      <ArrowRight size="20" />
                      <p class="m-0 mx-1">{{ formatDate(project.end_date) }}</p>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <n-avatar
                        round
                        :size="35"
                        :src="project?.client?.avatar"
                      />
                      <div>
                        <p class="m-0 fs-8">Client</p>
                        <p class="m-0 fs-7 fw-bold">
                          {{ project?.client?.name }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <n-progress
                  type="circle"
                  :percentage="Number(project.project_progress)"
                  :offset-degree="180"
                  style="width: 160px"
                  :stroke-width="9"
                  color="#f97316"
                  class="mx-auto mb-3"
                />
                <p class="text-center mb-0 text-secondary fs-6">
                  Overall Progress
                </p>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-lg-12">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <h5 class="mb-2 fw-bold">{{ project.name }}</h5>
                    <div class="d-flex mb-2">
                      <p class="m-0 fs-7 text-secondary me-1">Total Budget:</p>
                      <DollarSign size="15" class="text-prime" />
                      <p class="m-0 fs-7 fw-bold ls text-prime">
                        {{ project.estimated_budget }}
                      </p>
                    </div>
                  </div>
                  <div>
                    <div class="d-flex mb-2">
                      <DollarSign size="20" class="text-prime" />
                      <h5 class="m-0 fw-bold ls text-prime">
                        {{ budget.used }}
                      </h5>
                    </div>
                    <p class="m-0 text-secondary fs-7">Utilized to date</p>
                  </div>
                </div>
                <div class="mb-2">
                  <n-progress
                    type="line"
                    :percentage="budget.progress"
                    :show-indicator="false"
                    processing
                    :height="15"
                    color="#f97316"
                  />
                </div>
                <div class="d-flex fs-7 justify-content-end mt-1">
                  <p class="m-0 text-secondary me-1">Project Budget:</p>
                  <DollarSign size="15" class="text-prime" />
                  <p class="m-0 fw-bold ls text-prime me-1">
                    {{ budget.remaining }}
                  </p>
                  <p class="m-0 text-secondary">Remaining</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-12">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <h5 class="fw-bold mb-3">Site Progress Photos</h5>
                <n-image-group>
                  <n-carousel
                    v-if="dailyReportStore.allReportImages.length"
                    :slides-per-view="3"
                    :space-between="10"
                    :show-dots="false"
                    show-arrow
                    draggable
                  >
                    <n-image
                      v-for="(src, index) in dailyReportStore.allReportImages"
                      :key="index"
                      :src="src"
                      object-fit="cover"
                      :style="{
                        borderRadius: '8px',
                        width: '100%',
                        height: '250px',
                      }"
                    />
                  </n-carousel>
                  <div v-else class="no-image">No Images Available</div>
                </n-image-group>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-lg-12">
              <h5 class="fw-bold mb-3">Material</h5>
              <n-data-table
                :columns="columns2"
                :data="data2"
                :pagination="data2.length >= 6 ? { pageSize: 5 } : false"
                :bordered="false"
                class="task-table"
              />
            </div>
          </div>
        </div>
      </n-tab-pane>

      <n-tab-pane name="team" tab="Team">
        <div class="row pt-3 g-4">
          <div class="col-lg-12">
            <n-data-table
              :columns="columns3"
              :data="data3"
              :pagination="data3.length >= 7 ? { pageSize: 6 } : false"
              :bordered="false"
              class="task-table"
            />
          </div>
        </div>
      </n-tab-pane>

      <n-tab-pane name="dailyReport" tab="Daily Report">
        <div class="row pt-3 g-4">
          <!-- SUMMARY -->
          <div class="col-12">
            <div class="d-flex gap-3 align-items-center mb-3">
              <h5 class="fw-bold">Daily Summary</h5>

              <n-popselect
                v-model:value="selectedDate"
                :options="options"
                :to="false"
                scrollable
                v-if="dailyReports.length > 0"
              >
                <n-button class="rounded-3">
                  {{ formatDateTime(selectedDate) }}
                </n-button>
              </n-popselect>
            </div>

            <div class="daily-summary bg-main shadow-box rounded-4">
              <p class="m-0">
                {{ activeReport?.summary || "No daily report selected" }}
              </p>
            </div>
          </div>

          <!-- IMAGES -->
          <div class="col-12">
            <div class="card p-4 rounded-4 shadow-box border-3">
              <h5 class="fw-bold mb-3">Site Progress Photos</h5>

              <n-image-group>
                <n-carousel
                  v-if="photos.length"
                  :slides-per-view="2"
                  :space-between="10"
                  :show-dots="false"
                  show-arrow
                  draggable
                >
                  <n-image
                    v-for="(src, index) in photos"
                    :key="index"
                    :src="src"
                    object-fit="cover"
                    style="border-radius: 8px; width: 100%; height: 250px"
                  />
                </n-carousel>
                <div v-else class="no-image">No Images Available</div>
              </n-image-group>
            </div>
          </div>

          <!-- MATERIAL -->
          <div class="col-12">
            <h5 class="fw-bold mb-3">Material Used</h5>
            <n-data-table
              :columns="materialColumns"
              :data="materialData"
              :pagination="false"
              :bordered="false"
              class="task-table"
            />
          </div>

          <!-- EXPENSE -->
          <div class="col-12">
            <h5 class="fw-bold mb-3">Expensed</h5>
            <n-data-table
              :columns="expenseColumns"
              :data="expenseData"
              :pagination="false"
              :bordered="false"
              class="task-table"
            />
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { h, onMounted, ref, computed, watch } from "vue";
import { NTag, NAvatar, NProgress } from "naive-ui";
import {
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight,
  ArrowRightLeft,
  User,
} from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import { useBudgetStore } from "@/stores/budget";
import { useDailyReportStore } from "@/stores/dailyReport";
import { useMaterialStore } from "@/stores/material";
import { useWorkerStore } from "@/stores/worker";

const profileStore = useProfileStore();
const budgetStore = useBudgetStore();
const dailyReportStore = useDailyReportStore();
const materialStore = useMaterialStore();
const workerStore = useWorkerStore();
const { getMyProject: project } = storeToRefs(profileStore);
const { getBudgetByProject: budget } = storeToRefs(budgetStore);
const { getMaterialByProject: material } = storeToRefs(materialStore);
const { getWorkerByProject: worker } = storeToRefs(workerStore);
const { dailyReports } = storeToRefs(dailyReportStore);

const selectedDate = ref(null);

onMounted(async () => {
  await profileStore.getMyProjectStore();
  await budgetStore.getBudgetByProjectStore();
  await dailyReportStore.getDailyReportByProjectStore(project.value.id);
  await materialStore.getMaterialByProjectStore(project.value.id);
  await workerStore.getWorkerByProjectStore(project.value.id);
});

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const data2 = computed(() => {
  return material.value || [];
});

const columns2 = [
  {
    title: "MATERIAL NAME",
    key: "name",
    render(row) {
      return h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, {
          src: row.image,
          round: true,
          size: 28,
          objectFit: "cover",
        }),
        h("span", { class: "fw-medium" }, row.name),
      ]);
    },
  },
  {
    title: "Initial Quantity",
    key: "initial_quantity",
    align: "center",
    render(row) {
      return h("span", { class: "fw-bold" }, row.initial_quantity);
    },
  },
  {
    title: "Cost Per Unit",
    key: "cost_per_unit",
    align: "center",
    render(row) {
      return h("span", { class: "fw-bold" }, `$${row.cost_per_unit}`);
    },
  },
  {
    title: "USED",
    key: "used_quantity",
    align: "center",
    render(row) {
      return h("span", { class: "fw-bold" }, row.used_quantity);
    },
  },
  {
    title: "REMAINING",
    key: "remaining_quantity",
    align: "center",
    render(row) {
      return h("span", { class: "text-prime fw-bold" }, row.remaining_quantity);
    },
  },
];

// ── Team table ───────────────────────────────────────────────
const data3 = computed(() => {
  return worker.value || [];
});

const columns3 = [
  {
    title: "NAME",
    key: "name",
    render: (row) =>
      h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, {
          src: row.image,
          round: true,
          size: 32,
          objectFit: "cover",
        }),
        h("span", { class: "fw-medium" }, row.name),
      ]),
  },
  {
    title: "SKILL TYPE",
    key: "skill",
    render: (row) =>
      h(
        NTag,
        {
          bordered: false,
          round: true,
          size: "small",
          type: "info",
          style: "font-weight:500; padding:0 12px",
        },
        { default: () => row.skill },
      ),
  },
  {
    title: "RATE",
    key: "rate",
    render: (row) => h("span", { class: "fw-bold text-prime" }, row.rate),
  },
  {
    title: "STATUS",
    key: "status",
    render: (row) =>
      h(
        NTag,
        {
          bordered: false,
          round: true,
          size: "small",
          type: row.active ? "success" : "error",
          style: "font-weight:500; padding:0 12px",
        },
        { default: () => (row.active ? "Active" : "Inactive") },
      ),
  },
];

const options = computed(() => {
  const map = new Map();

  (dailyReports.value || []).forEach((r) => {
    const key = new Date(r.created_at).toISOString().slice(0, 16);

    if (!map.has(key)) {
      map.set(key, {
        label: formatDateTime(r.created_at),
        value: r.created_at,
      });
    }
  });

  return Array.from(map.values());
});

watch(
  () => dailyReports.value,
  (val) => {
    if (val?.length) {
      selectedDate.value = val[0].created_at;
    }
  },
  { immediate: true },
);

const activeReport = computed(() => {
  if (!dailyReports.value?.length) return null;

  return dailyReports.value.find((r) => r.created_at === selectedDate.value);
});

const photos = computed(() => {
  return (
    activeReport.value?.images?.map((img) =>
      typeof img === "string" ? img : img.url,
    ) || []
  );
});

const materialData = computed(() => activeReport.value?.materials || []);
const expenseData = computed(() => activeReport.value?.expenses || []);

const materialColumns = [
  {
    title: "Material Name",
    key: "name",
    render: (row) =>
      h("div", { style: "display:flex; align-items:center; gap:15px;" }, [
        h(NAvatar, { src: row.image || "", round: true, size: 40 }),
        h("strong", row.name),
      ]),
  },
  { title: "Quantity Used", key: "used_quantity" },
  { title: "Note", key: "note" },
];

const expenseColumns = [
  { title: "Type", key: "type" },
  { title: "Description", key: "description" },
  {
    title: "Amount",
    key: "amount",
    render: (row) => h("span", { class: "fw-bold" }, `$${row.amount}`),
  },
];
</script>

<style scoped>
:deep(.n-carousel-item) {
  width: auto !important;
}

:deep(.n-image) {
  width: 100% !important;
  display: block;
}

:deep(.n-image img) {
  width: 100% !important;
  height: 250px !important;
  object-fit: cover;
  border-radius: 8px;
}

:deep(.n-tabs-tab__label) {
  font-size: 15px;
  font-weight: 550;
  letter-spacing: 0.2px;
}

:deep(.task-table .n-data-table-wrapper) {
  overflow: hidden;
  background-color: #ffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  border: 3px solid #ebebeb;
  border-radius: 12px;
}

:deep(.n-data-table-th) {
  background-color: #ffff !important;
  color: #8e99a7 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  padding: 18px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.n-data-table-td) {
  padding: 15px !important;
  height: 60px !important;
}

:deep(.tb-h .n-data-table-td) {
  padding: 15px !important;
  height: 63px !important;
}

:deep(.n-data-table__pagination) {
  padding-top: 5px !important;
  padding-bottom: 0px !important;
}

:deep(.task-table .n-data-table-tbody tr:last-child td) {
  border-bottom: none !important;
}

:deep(.task-table .n-data-table-td) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.daily-summary {
  border-left: 5px solid #1d5fbf;
  color: #4b5563;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55;
  padding: 22px 24px;
}

.no-image {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 8px;
  font-weight: 600;
  color: #6b7280;
}

:deep(.n-base-select-menu) {
  padding: 6px 0 !important;
  border-radius: 15px;
  min-width: 280px !important;
}

:deep(.n-base-select-menu .n-base-select-option) {
  padding: 9px 28px !important;
}

:deep(.n-base-select-option__check) {
  padding-right: 35px !important;
}
</style>
