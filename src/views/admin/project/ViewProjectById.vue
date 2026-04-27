<template>
  <div>
    <BaseTitle title="Skyline Tower-Phase 2" class="mb-3" />
    <n-card class="rounded-5">
      <n-tabs type="line" animated v-model:value="activeTab">
        <n-tab-pane name="overview" tab="overview">
          <div class="row pt-3">
            <div class="col-lg-5">
              <div class="card shadow-box rounded-4 border-3">
                <div class="card-img" style="height: 245px">
                  <img
                    src="https://i.pinimg.com/1200x/03/91/eb/0391eb49f97bd74318fd5e3797aeef26.jpg"
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
                    <h4 class="fw-bold mb-3 ls">Skyline Tower-Phase 2</h4>
                    <div class="d-flex align-items-center mb-2">
                      <MapPin size="20" />
                      <p class="m-0 fs-6 ms-1 fw-bold ls">Phnom Penh</p>
                    </div>

                    <div class="d-flex align-items-center mb-2">
                      <dollar-sign size="20" />
                      <p class="m-0 fs-6 ms-1 fw-bold ls">50000</p>
                    </div>

                    <div
                      class="d-flex align-items-center fs-6 gap-1 mb-3 fw-bold ls"
                    >
                      <Calendar size="20" />
                      <p class="m-0 mx-1">20 Jan 2026</p>
                      <ArrowRight size="20" />
                      <p class="m-0 mx-1">20 Jun 2027</p>
                    </div>

                    <div class="d-flex align-items-center gap-2">
                      <n-avatar
                        round
                        :size="35"
                        src="https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg"
                      />
                      <div>
                        <p class="m-0 fs-8">Client</p>
                        <p class="m-0 fs-7 fw-bold">Lay Jammy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <n-progress
                  type="circle"
                  :percentage="65"
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
            <div class="col-lg-4">
              <div class="card p-4 rounded-4 shadow-box border-3 d-flex flex-column justify-content-center gap-4" style="height: 252px;">
                <h5 class="m-0 fw-bold">
                  <User size="25" class="text-prime me-2" /> Supervisor
                </h5>

                <div
                  class="d-flex align-items-center gap-2 bg-main p-3 rounded-4 shadow-box"
                >
                  <n-avatar
                    round
                    :size="45"
                    src="https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg"
                  />
                  <div>
                    <p class="m-0 mb-1 fs-6 fw-bold">Lay Jammy</p>
                    <p class="m-0 fs-7 text-secondary ls">jammylay@gmail.com</p>
                  </div>
                </div>

                <button class="shadow-box border-3 rounded-3 p-2 bg-white"> <arrow-right-left size="16" class="me-1" /> Change Supervisor</button>
              </div>
            </div>
          </div>
        </n-tab-pane>
        <n-tab-pane name="team" tab="Team"> Hey Jude </n-tab-pane>
        <n-tab-pane name="material" tab="Material"> Qilixiang </n-tab-pane>
      </n-tabs>
      <!-- <div class="row mt-1">
        <div class="col-lg-8">
          <div class="row gx-0">
            <n-data-table
              :columns="columns"
              :data="data"
              :pagination="pagination"
              :bordered="false"
              class="task-table"
            />
          </div>
        </div>
      </div> -->
    </n-card>
  </div>
</template>

<script setup>
import { h, ref, watch } from "vue";
import { NTag, NProgress } from "naive-ui";
import BaseTitle from "@/components/BaseTitle.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const activeTab = ref(route.query.tab || "overview");

watch(activeTab, (val) => {
  router.replace({
    query: { ...route.query, tab: val },
  });
});

const createColumns = () => [
  {
    title: "TASK NAME",
    key: "taskName",
    render(row) {
      return h(
        "span",
        { style: "font-weight: 500; color: #333;" },
        row.taskName,
      );
    },
  },
  {
    title: "STATUS",
    key: "status",
    render(row) {
      return h(
        NTag,
        {
          bordered: false,
          round: true,
          size: "small",
          type: row.statusType,
          style: "font-weight: 500; padding: 0 15px",
        },
        { default: () => row.status },
      );
    },
  },
  {
    title: "PROGRESS",
    key: "progress",
    render(row) {
      return h("div", { class: "d-flex align-items-center" }, [
        h(
          "span",
          { style: "font-weight: bold; margin-right: 12px; min-width: 35px" },
          `${row.progress}%`,
        ),
        h(NProgress, {
          type: "line",
          percentage: row.progress,
          showIndicator: false,
          status: row.statusType === "success" ? "success" : "default",
          railColor: "#edf2f7",
          style: "width: 100px",
          processing: true,
        }),
      ]);
    },
  },
];

const data = ref([
  {
    taskName: "Foundation Pouring",
    status: "In Progress",
    progress: 75,
    statusType: "info",
  },
  {
    taskName: "Electrical Wiring - L1",
    status: "Pending",
    progress: 0,
    statusType: "warning",
  },
  {
    taskName: "Material Log Audit",
    status: "Completed",
    progress: 100,
    statusType: "success",
  },
  {
    taskName: "Site Setup",
    status: "Completed",
    progress: 100,
    statusType: "success",
  },
]);

const columns = createColumns();
const pagination = { pageSize: 2 };
</script>

<style scoped>
:deep(.n-tabs-tab__label) {
  font-size: 15px;
  font-weight: 550;
  letter-spacing: 0.2px;
}

:deep(.task-table .n-data-table-wrapper) {
  border-radius: 10px;
  overflow: hidden;
  background-color: #ffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
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
</style>
