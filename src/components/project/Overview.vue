<template>
  <div class="d-flex flex-column gap-4">
    <div class="row pt-3 g-4">
      <div class="col-lg-5">
        <div class="card shadow-box rounded-4 border-3">
          <div class="card-img" style="height: 245px">
            <img
              :src="project.thumbnail"
              alt="Project Image"
              class="w-100 h-100 object-fit-cover rounded-4"
            />
            <div class="card-img-overlay bg-dark opacity-50 rounded-4"></div>

            <div class="card-img-overlay text-light">
              <h6 class="text-prime fs-6 ls fw-bold mt-2">Project Overview</h6>
              <h4 class="fw-bold mb-3 ls">{{ project.name }}</h4>
              <div class="d-flex align-items-center mb-2">
                <MapPin size="20" />
                <p class="m-0 fs-6 ms-1 fw-bold ls">{{ project.location }}</p>
              </div>

              <div class="d-flex align-items-center mb-2">
                <DollarSign size="20" />
                <p class="m-0 fs-6 ms-1 fw-bold ls">
                  {{ project.estimated_budget }}
                </p>
              </div>

              <div class="d-flex align-items-center fs-6 gap-1 mb-3 fw-bold ls">
                <Calendar size="20" />
                <p class="m-0 mx-1">{{ formatDate(project.start_date) }}</p>
                <ArrowRight size="20" />
                <p class="m-0 mx-1">{{ formatDate(project.end_date) }}</p>
              </div>

              <div class="d-flex align-items-center gap-2">
                <n-avatar round :size="35" :src="project?.client?.avatar" />
                <div>
                  <p class="m-0 fs-8">Client</p>
                  <p class="m-0 fs-7 fw-bold">{{ project?.client?.name }}</p>
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
            :percentage="Number(project.project_progress)"
            :offset-degree="180"
            style="width: 160px"
            :stroke-width="9"
            color="#f97316"
            class="mx-auto mb-3"
          />
          <p class="text-center mb-0 text-secondary fs-6">Overall Progress</p>
        </div>
      </div>

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
            <n-button
              type="primary"
              class="rounded-3"
              @click="confirmSupervisor"
            >
              Confirm
            </n-button>
          </div>
        </template>
      </n-modal>
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
                  {{ props.budget.used }}
                </h5>
              </div>
              <p class="m-0 text-secondary fs-7">Utilized to date</p>
            </div>
          </div>
          <div class="mb-2">
            <n-progress
              type="line"
              :percentage="props.budget.progress"
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
              {{ props.budget.remaining }}
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
              :slides-per-view="3"
              :space-between="10"
              :show-dots="false"
              show-arrow
              draggable
            >
              <n-image
                v-for="(src, index) in props.photos"
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
          </n-image-group>
        </div>
      </div>
    </div>

    <div class="row g-4">
      <div class="col-lg-6">
        <h5 class="fw-bold mb-3 text-center">Tasks</h5>
        <n-data-table
          :columns="columns"
          :data="data"
          :pagination="data.length >= 6 ? { pageSize: 5 } : false"
          :bordered="false"
          class="task-table"
        />
      </div>

      <div class="col-lg-6">
        <h5 class="fw-bold mb-3 text-center">Material</h5>
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
</template>

<script setup>
import { h, onActivated, onMounted, ref, watch, computed } from "vue";
import {
  NAvatar,
  NProgress,
  NTag,
  NText,
  NButton,
  NModal,
  NSelect,
  NDataTable,
  NImageGroup,
  NCarousel,
  NImage,
} from "naive-ui";
import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  MapPin,
  User,
  UserPlus,
} from "lucide-vue-next";
import { useSupervisorStore } from "@/stores/supervisor";

const props = defineProps({
  active: {
    type: Boolean,
    default: false,
  },
  project: {
    type: Object,
    default: null,
  },
  budget: {
    type: Object,
    default: null,
  },
  material: {
    type: Array,
    default: () => [],
  },
  task: {
    type: Array,
    default: () => [],
  },
  photos: {
    type: Array,
    default: () => [],
  },
});

const supervisorStore = useSupervisorStore();
const showModal = ref(false);
const selectedSupervisor = ref(null);
const percent = ref(0);
const target = 65;
let animationFrame = null;

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
  let list = available.filter(
    (s) => s.supervisor_id !== props.project?.supervisor?.supervisor_id,
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

const emit = defineEmits(["updatedSupervisor"]);

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

const startAnimation = () => {
  percent.value = 0;
  let current = 0;

  const animate = () => {
    current += (target - current) * 0.1;
    percent.value = Math.round(current);

    if (current < target) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      percent.value = target;
      cancelAnimationFrame(animationFrame);
    }
  };

  animate();
};

onMounted(startAnimation);
onActivated(startAnimation);

watch(
  () => props.active,
  (isActive) => {
    if (isActive) startAnimation();
  },
);

function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

const data = computed(() => {
  return props.task || [];
});

const columns = [
  {
    title: "TASK NAME",
    key: "title",
    render(row) {
      return h("span", { style: "font-weight: 500; color: #333;" }, row.title);
    },
  },
  {
    title: "STATUS",
    key: "status",
    render(row) {
      const typeMap = {
        completed: "success",
        in_progress: "info",
        pending: "warning",
      };

      const type = typeMap[row.status?.toLowerCase()] || "default";

      return h(
        NTag,
        {
          bordered: false,
          round: true,
          size: "small",
          type: type,
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
      const color =
        row.progress === 100
          ? "#22c55e"
          : row.progress === 0
            ? "#000"
            : "#3b82f6";

      return h("div", { class: "d-flex align-items-center" }, [
        h(
          "span",
          {
            style: `font-weight: bold; margin-right: 12px; min-width: 35px; color: ${color}`,
          },
          `${row.progress}%`,
        ),
        h(NProgress, {
          type: "line",
          percentage: row.progress,
          showIndicator: false,
          railColor: "#edf2f7",
          style: "width: 100px",
          color: color,
          processing: true,
        }),
      ]);
    },
  },
];

const data2 = computed(() => {
  return props.material || [];
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
