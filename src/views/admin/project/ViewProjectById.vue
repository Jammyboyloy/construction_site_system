<template>
  <div>
    <div class="d-flex align-items-center mb-3">
      <BaseTitle :title="project.name" />
      <BaseButton
        v-if="activeTab === 'team'"
        btnName="Assign Worker"
        icon="UserPlus"
        position="ms-auto"
        @click="openAssignModal"
      />

      <n-modal
        v-model:show="showAssignModal"
        preset="card"
        style="width: 600px"
        title="Assign Workers"
        class="rounded-3"
      >
        <n-select
          v-model:value="selectedWorkers"
          multiple
          :options="options"
          :render-label="renderLabel"
          :render-tag="renderMultipleSelectTag"
          filterable
          placeholder="Select workers"
        />

        <template #footer>
          <div class="d-flex justify-content-end gap-2">
            <n-button @click="showAssignModal = false" class="rounded-3"
              >Cancel</n-button
            >
            <n-button
              type="primary"
              class="rounded-3"
              @click="confirmAssignWorker"
            >
              Confirm
            </n-button>
          </div>
        </template>
      </n-modal>
    </div>

    <n-tabs type="line" animated v-model:value="activeTab">
      <n-tab-pane
        name="overview"
        tab="overview"
        class="d-flex flex-column gap-4"
      >
        <Overview
          :active="activeTab === 'overview'"
          :project="project"
          :material="material"
          :budget="budget"
          :photos="dailyReportStore.allReportImages"
          :task="task"
          @updatedSupervisor="projectStore.getProjectById(id)"
        />
      </n-tab-pane>

      <n-tab-pane name="team" tab="Team">
        <TeamView
          :project="project"
          :worker="worker"
          @updatedWorkers="workerStore.getWorkerByProjectStore(id)"
          @updatedSupervisor="projectStore.getProjectById(id)"
        />
      </n-tab-pane>

      <n-tab-pane name="material" tab="Material">
        <AddMaterialView
          :project="project"
          @updateMaterial="materialStore.getMaterialByProjectStore(id)"
        />
      </n-tab-pane>

      <n-tab-pane name="dailyReport" tab="Daily Report">
        <DailyReportView :project="project" :dailyReport="dailyReport" />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, h, computed } from "vue";
import { NAvatar, NTag, NText } from "naive-ui";
import { useRoute, useRouter } from "vue-router";
import BaseTitle from "@/components/BaseTitle.vue";
import BaseButton from "@/components/BaseButton.vue";
import Overview from "@/components/project/Overview.vue";
import TeamView from "@/components/project/TeamView.vue";
import AddMaterialView from "@/components/project/AddMaterialView.vue";
import DailyReportView from "@/components/project/DailyReportView.vue";
import { useProjectStore } from "@/stores/project";
import { storeToRefs } from "pinia";
import { useWorkerStore } from "@/stores/worker";
import { useMaterialStore } from "@/stores/material";
import { useBudgetStore } from "@/stores/budget";
import { useDailyReportStore } from "@/stores/dailyReport";
import { useTaskStore } from "@/stores/task";

const router = useRouter();
const route = useRoute();
let id = route.params.id;
const activeTab = ref("overview");
const showAssignModal = ref(false);

const projectStore = useProjectStore();
const workerStore = useWorkerStore();
const materialStore = useMaterialStore();
const budgetStore = useBudgetStore();
const dailyReportStore = useDailyReportStore();
const taskStore = useTaskStore();
const { getById: project } = storeToRefs(projectStore);
const { getWorkerByProject: worker } = storeToRefs(workerStore);
const { getMaterialByProject: material } = storeToRefs(materialStore);
const { getBudgetByProject: budget } = storeToRefs(budgetStore);
const { dailyReports: dailyReport } = storeToRefs(dailyReportStore);
const { getTaskByProject: task } = storeToRefs(taskStore);

onMounted(async () => {
  await projectStore.getProjectById(id);
  await workerStore.getWorkerByProjectStore(id);
  await workerStore.getAvailableWorkerStore();
  await materialStore.getMaterialByProjectStore(id);
  await budgetStore.getBudgetByProjectStore(id);
  await dailyReportStore.getDailyReportByProjectStore(id);
  await taskStore.getTaskByProjectStore(id);
});

watch(activeTab, (val) => {
  router.replace({
    query: { ...route.query, tab: val },
  });
});

watch(
  () => route.query.tab,
  (tab) => {
    activeTab.value = tab || "overview";
  },
  { immediate: true },
);

const selectedWorkers = ref([]);

const openAssignModal = async () => {
  selectedWorkers.value = [];
  await workerStore.getAvailableWorkerStore();
  showAssignModal.value = true;
};

const confirmAssignWorker = async () => {
  if (!selectedWorkers.value.length) return;

  try {
    await workerStore.assignWorker(project.value.id, selectedWorkers.value);

    await workerStore.getWorkerByProjectStore(project.value.id);
    showAssignModal.value = false;
    // refresh table
  } catch (error) {
    console.log(error);
  }
};

const renderMultipleSelectTag = ({ option, handleClose }) => {
  return h(
    NTag,
    {
      style: {
        padding: "0 6px 0 4px",
      },
      round: true,
      closable: true,
      onClose: (e) => {
        e.stopPropagation();
        handleClose();
      },
    },
    {
      default: () =>
        h(
          "div",
          {
            style: {
              display: "flex",
              alignItems: "center",
            },
          },
          [
            h(NAvatar, {
              src: option.avatar,
              round: true,
              size: 22,
              style: {
                marginRight: "4px",
              },
            }),
            option.label,
          ],
        ),
    },
  );
};

const renderLabel = (option) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
      },
    },
    [
      h(NAvatar, {
        src: option.avatar,
        round: true,
        size: "small",
      }),
      h(
        "div",
        {
          style: {
            marginLeft: "12px",
            padding: "4px 0",
          },
        },
        [
          h("div", null, [option.label]),
          h(
            NText,
            { depth: 3, tag: "div" },
            {
              default: () => option.skill_type,
            },
          ),
        ],
      ),
    ],
  );
};

const options = computed(() => {
  return (workerStore.getAvailableWorker || []).map((w) => ({
    label: w.name,
    value: w.worker_id || w.id,
    avatar: w.avatar,
    skill_type: w.skill_type,
  }));
});
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

:deep(.n-base-selection) {
  --n-height: 40px !important;
}
</style>
