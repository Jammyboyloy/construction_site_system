<template>
  <div class="row pt-3 g-4">
    <div class="col-lg-4">
      <div
        class="card p-4 rounded-4 shadow-box border-3 d-flex flex-column justify-content-center gap-4"
        style="height: 252px"
      >
        <h5 class="m-0 fw-bold">
          <User size="25" class="text-prime me-2" /> Supervisor
        </h5>

        <div
          v-if="!project?.supervisor"
          class="dashed-box"
          @click="openSupervisorModal"
        >
          <UserPlus size="20" class="text-secondary" />
          <span class="text-secondary fs-7">Assign Supervisor</span>
        </div>

        <div
          v-else
          class="d-flex align-items-center gap-2 bg-main p-3 rounded-4 shadow-box"
        >
          <n-avatar round :size="45" :src="project?.supervisor?.avatar" />
          <div>
            <p class="m-0 mb-1 fs-6 fw-bold">
              {{ project?.supervisor?.name }}
            </p>
            <p class="m-0 fs-7 text-secondary ls">
              {{ project?.supervisor?.email }}
            </p>
          </div>
        </div>

        <button
          v-if="project?.supervisor"
          class="shadow-box border-3 rounded-3 p-2 bg-white"
          @click="openSupervisorModal"
        >
          <ArrowRightLeft size="16" class="me-1" /> Change Supervisor
        </button>
      </div>
    </div>

    <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 450px"
      title="Select Supervisor"
      class="rounded-3"
    >
      <n-select
        v-model:value="selectedSupervisor"
        :options="options"
        :render-label="renderLabel"
        :render-tag="renderSingleSelectTag"
        filterable
        placeholder="Please Select"
      />
      <template #footer>
        <div class="d-flex justify-content-end gap-2">
          <n-button @click="showModal = false" class="rounded-3"
            >Cancel</n-button
          >
          <n-button type="primary" class="rounded-3" @click="confirmSupervisor">
            Confirm
          </n-button>
        </div>
      </template>
    </n-modal>

    <div class="col-lg-8">
      <n-data-table
        :columns="columns"
        :data="data"
        :pagination="data.length >= 6 ? { pageSize: 5 } : false"
        :bordered="false"
        :class="['task-table tb-h', { 'h-100': data.length === 0 }]"
      />
    </div>

    <n-modal
      v-model:show="showDeleteModal"
      preset="dialog"
      type="error"
      title="Delete Confirmation"
      content="Are you sure you want to remove?"
      positive-text="Delete"
      negative-text="Cancel"
      @positive-click="deleteSelectedWorker"
      @negative-click="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { h, ref, computed } from "vue";
import { NAvatar, NTag, NText } from "naive-ui";
import { ArrowRightLeft, Trash2, User, UserPlus } from "lucide-vue-next";
import { useSupervisorStore } from "@/stores/supervisor";
import { useWorkerStore } from "@/stores/worker";

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
  worker: {
    type: Array,
    default: () => [],
  },
});

const supervisorStore = useSupervisorStore();
const workerStore = useWorkerStore();
const showModal = ref(false);
const selectedSupervisor = ref(null);

const openSupervisorModal = async () => {
  await supervisorStore.getAvailableSupervisors();
  showModal.value = true;

  if (props.project?.supervisor) {
    selectedSupervisor.value = props.project.supervisor.supervisor_id;
  } else {
    selectedSupervisor.value = null;
  }
};

const renderSingleSelectTag = ({ option }) => {
  return h("div", { style: { display: "flex", alignItems: "center" } }, [
    h(NAvatar, {
      src: option.avatar,
      round: true,
      size: 26,
      style: { marginRight: "12px", marginLeft: "10px" },
    }),
    option.label,
  ]);
};

const renderLabel = (option) => {
  return h("div", { style: { display: "flex", alignItems: "center" } }, [
    h(NAvatar, {
      src: option.avatar,
      round: true,
      size: "small",
      style: { marginLeft: "10px" },
    }),
    h("div", { style: { marginLeft: "12px", padding: "6px 0" } }, [
      h("div", null, [option.label]),
      h(NText, { depth: 3, tag: "div" }, { default: () => option.email }),
    ]),
  ]);
};

const options = computed(() => {
  const available = supervisorStore.availableSupervisors || [];
  
  // 1. Create a clean list without the current supervisor (if one exists)
  let list = available.filter(s => 
    s.supervisor_id !== props.project?.supervisor?.supervisor_id
  );

  // 2. If the project has a supervisor, force them to the top (index 0)
  if (props.project?.supervisor) {
    list.unshift({
      supervisor_id: props.project.supervisor.supervisor_id,
      name: props.project.supervisor.name,
      email: props.project.supervisor.email,
      avatar: props.project.supervisor.avatar,
    });
  }

  return list.map((s) => ({
    label: s.name,
    value: s.supervisor_id,
    email: s.email,
    avatar: s.avatar,
  }));
});

const emit = defineEmits(["updatedSupervisor", "updatedWorkers"]);

const confirmSupervisor = async () => {
  if (!selectedSupervisor.value) return;

  if (selectedSupervisor.value === props.project?.supervisor?.supervisor_id) {
    showModal.value = false;
    return;
  }

  try {
    await supervisorStore.assignSupervisor(
      props.project.id,
      selectedSupervisor.value,
    );
    emit("updatedSupervisor");
    showModal.value = false;
  } catch (error) {
    console.log(error);
  }
};

const data = computed(() => {
  return props.worker || [];
});

const showDeleteModal = ref(false);
const selectedWorker = ref(null);

const deleteSelectedWorker = async () => {
  if (selectedWorker.value) {
    try {
      await workerStore.removeWorkerFromProject(
        props.project.id,
        selectedWorker.value.worker_id,
      );

      emit("updatedWorkers");
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  showDeleteModal.value = false;
};

const columns = [
  {
    title: "NAME",
    key: "name",
    render(row) {
      return h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, {
          src: row.avatar,
          round: true,
          size: 32,
          objectFit: "cover",
        }),
        h("span", { class: "fw-medium" }, row.name),
      ]);
    },
  },
  {
    title: "SKILLTYPE",
    key: "skill_type",
    render(row) {
      return h(
        NTag,
        {
          bordered: false,
          round: true,
          size: "small",
          type: "info",
          style: "font-weight: 500; padding: 0 12px",
        },
        { default: () => row.skill_type },
      );
    },
  },
  {
    title: "RATE",
    key: "rate_per_hour",
    render(row) {
      return h(
        "span",
        { class: "fw-bold text-prime" },
        `$${row.rate_per_hour}`,
      );
    },
  },
  {
    title: "STATUS",
    key: "status",
    render() {
      return h(
        NTag,
        {
          bordered: false,
          round: true,
          size: "small",
          type: "success",
          style: "font-weight: 500; padding: 0 12px",
        },
        { default: () => "Active" },
      );
    },
  },
  {
    title: "Action",
    key: "action",
    render(row) {
      return h(
        "div",
        {
          class: "d-flex justify-content-center align-items-center",
          style:
            "cursor: pointer; color: #ef4444; width: 32px; height: 32px; border-radius: 8px; transition: background 0.2s",
          onMouseenter: (e) => (e.currentTarget.style.background = "#fef2f2"),
          onMouseleave: (e) =>
            (e.currentTarget.style.background = "transparent"),
          onClick: () => {
            selectedWorker.value = row;
            showDeleteModal.value = true;
          },
        },
        [h(Trash2, { size: 20 })],
      );
    },
  },
];
</script>

<style scoped>
.dashed-box {
  border: 2px dashed #d9d9d9;
  border-radius: 12px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.dashed-box:hover {
  border-color: #f97316;
  color: #f97316;
}

.dashed-box:hover .text-secondary {
  color: #f97316 !important;
}

:deep(.n-base-selection) {
  --n-height: 38px !important;
}
</style>
