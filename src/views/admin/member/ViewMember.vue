<template>
  <div>
    <div class="d-flex align-items-center mb-1">
      <BaseTitle title="View Members" />
    </div>

    <n-tabs type="line" animated default-value="supervisor">
      <n-tab-pane name="supervisor" tab="Supervisor">
        <div class="row pt-3 g-4">
          <div class="col-lg-12">
            <n-data-table
              :columns="columns1"
              :data="data1"
              :pagination="data1.length >= 7 ? { pageSize: 6 } : false"
              :bordered="false"
              class="task-table"
            />
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="client" tab="Client">
        <div class="row pt-3 g-4">
          <div class="col-lg-12">
            <n-data-table
              :columns="columns2"
              :data="data2"
              :pagination="data2.length >= 7 ? { pageSize: 6 } : false"
              :bordered="false"
              class="task-table"
            />
          </div>
        </div>
      </n-tab-pane>
      <n-tab-pane name="worker" tab="Worker">
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
    </n-tabs>
  </div>
</template>

<script setup>
import { h, onMounted, ref } from "vue";
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
import { useWorkerStore } from "@/stores/worker";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useSupervisorStore } from "@/stores/supervisor";
import { useClientStore } from "@/stores/client";

const workerStore = useWorkerStore();
const supervisorStore = useSupervisorStore();
const clientStore = useClientStore();
const { getAllWorker: worker } = storeToRefs(workerStore);
const { allSupervisors: supervisor } = storeToRefs(supervisorStore);
const { getAllClient: client } = storeToRefs(clientStore);

onMounted(async () => {
  await supervisorStore.getAllSupervisors();
  await clientStore.getAllClientStore();
  await workerStore.getAllWorkerStore();
});

const data1 = computed(() => {
  return supervisor.value || [];
});

const columns1 = [
  {
    title: "NAME",
    key: "name",
    render: (row) =>
      h("div", { class: "d-flex align-items-center gap-3" }, [
        h(NAvatar, {
          src: row.avatar,
          round: true,
          size: 32,
          objectFit: "cover",
        }),
        h("span", { class: "fw-bold" }, row.name),
      ]),
  },
  {
    title: "EMAIL",
    key: "email",
    render: (row) =>
      h("span", { class: "fw-medium text-secondary" }, row.email),
  },
  {
    title: "PHONE",
    key: "phone",
    render: (row) =>
      h("span", { class: "fw-medium text-secondary" }, row.phone),
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
          type: row.status === "active" ? "success" : "error",
          style: "font-weight:500; padding:0 12px",
        },
        row.status,
      ),
  },
];

const data2 = computed(() => {
  return client.value || [];
});

const columns2 = [
  {
    title: "NAME",
    key: "name",
    render: (row) =>
      h("div", { class: "d-flex align-items-center gap-3" }, [
        h(NAvatar, {
          src: row.avatar,
          round: true,
          size: 32,
          objectFit: "cover",
        }),
        h("span", { class: "fw-bold" }, row.name),
      ]),
  },
  {
    title: "EMAIL",
    key: "email",
    render: (row) =>
      h("span", { class: "fw-medium text-secondary" }, row.email),
  },
  {
    title: "PHONE",
    key: "phone",
    render: (row) =>
      h("span", { class: "fw-medium text-secondary" }, row.phone),
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
          type: row.status === "active" ? "success" : "error",
          style: "font-weight:500; padding:0 12px",
        },
        row.status,
      ),
  },
];

const data3 = computed(() => {
  return worker.value || [];
});

const columns3 = [
  {
    title: "NAME",
    key: "name",
    render: (row) =>
      h("div", { class: "d-flex align-items-center gap-3" }, [
        h(NAvatar, {
          src: row.avatar,
          round: true,
          size: 32,
          objectFit: "cover",
        }),
        h("span", { class: "fw-bold" }, row.name),
      ]),
  },
  {
    title: "EMAIL",
    key: "email",
    render: (row) =>
      h("span", { class: "fw-medium text-secondary" }, row.email),
  },
  {
    title: "PHONE",
    key: "phone",
    render: (row) =>
      h("span", { class: "fw-medium text-secondary" }, row.phone),
  },
  {
    title: "SKILL TYPE",
    key: "skill_type",
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
        { default: () => row.skill_type },
      ),
  },
  {
    title: "RATE",
    key: "rate_per_hour",
    render: (row) =>
      h("span", { class: "fw-bold text-prime" }, `$ ${row.rate_per_hour}`),
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
          type: row.status === "active" ? "success" : "error",
          style: "font-weight:500; padding:0 12px",
        },
        row.status,
      ),
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
</style>
