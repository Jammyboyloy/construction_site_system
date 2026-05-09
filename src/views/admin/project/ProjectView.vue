<template>
  <div>
    <BaseTitle title="Project Management" class="mb-3" />
    <div class="row g-3">
      <!-- Loop through the projects from your store -->
      <div class="col-lg-4" v-for="project in projects" :key="project.id">
        <div class="card border border-3 rounded-4 shadow-box">
          <div class="card-img" style="height: 200px; position: relative">
            <img
              :src="project.thumbnail"
              alt="Project Image"
              class="w-100 h-100 object-fit-cover"
              style="border-radius: 12px 12px 0 0"
            />
            <div class="card-img-overlay">
              <p
                class="fs-7 bg-white w-fit m-0 px-3 rounded-pill text-capitalize"
              >
                {{ project.status }}
              </p>
            </div>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <h6 class="m-0 pt-1 fw-bold ls">{{ project.name }}</h6>
              <n-dropdown
                trigger="click"
                :options="options"
                @select="(key) => handleProfileSelect(key, project.id)"
                :theme-overrides="dropdownTheme"
                style="min-width: 150px; padding: 7px 4px"
              >
                <span
                  class="dropdown-trigger d-flex justify-content-center align-items-center cursor-pointer text-secondary"
                >
                  <EllipsisVertical size="20" />
                </span>
              </n-dropdown>
            </div>
            <div
              class="mt-3 mb-3 d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <MapPin size="14" />
                <p class="text-secondary m-0 fs-7 ms-1">
                  {{ project.location }}
                </p>
              </div>
              <div class="d-flex align-items-center fs-7 text-secondary gap-1">
                <Calendar size="14" />
                <p class="m-0">{{ formatDate(project.start_date) }}</p>
                <ArrowRight size="14" />
                <p class="m-0">{{ formatDate(project.end_date) }}</p>
              </div>
            </div>

            <!-- Client & Budget -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div class="d-flex align-items-center gap-2">
                <n-avatar round :size="30" :src="project.client?.avatar" />
                <div>
                  <p class="m-0 fs-8 text-secondary">Client</p>
                  <p class="m-0 fs-7 fw-bold">{{ project.client?.name }}</p>
                </div>
              </div>
              <div class="d-flex align-items-center text-prime">
                <DollarSign size="20" />
                <p class="m-0 fs-6 ms-1 fw-bold ls">
                  {{ project.estimated_budget }}
                </p>
              </div>
            </div>

            <!-- Progress Bar Section (Kept from your real code) -->
            <div class="d-flex justify-content-between mb-1">
              <p class="m-0 fs-7">Construction Progress</p>
              <p class="m-0 fs-7">{{ project.project_progress }}%</p>
              <!-- Replace with project.progress if available -->
            </div>
            <div class="mb-3">
              <n-progress
                type="line"
                :percentage="Number(project.project_progress)"
                :show-indicator="false"
                processing
                :height="8"
                color="#f97316"
              />
            </div>

            <!-- Supervisor & Workforce -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div
                v-if="project?.supervisor"
                class="d-flex align-items-center gap-2"
              >
                <n-avatar round :size="30" :src="project.supervisor?.avatar" />
                <div>
                  <p class="m-0 fs-8 text-secondary">Supervisor</p>
                  <p class="m-0 fs-7 fw-bold">{{ project.supervisor?.name }}</p>
                </div>
              </div>
              <div v-else class="">
                <p class="m-0 fs-8 text-secondary">Supervisor</p>
                <p class="m-0 fs-7 fw-bold">
                  {{ project.worker_count }} Personnel
                </p>
              </div>
              <div class="d-flex align-items-center gap-2">
                <n-avatar-group
                  :options="
                    project.workers.map((w) => ({
                      name: w.name,
                      src: w.avatar,
                    }))
                  "
                  :size="30"
                  :max="3"
                >
                  <template #avatar="{ option: { name, src } }">
                    <n-tooltip>
                      <template #trigger>
                        <n-avatar :src="src" />
                      </template>
                      {{ name }}
                    </n-tooltip>
                  </template>
                  <template #rest="{ options: restOptions, rest }">
                    <n-dropdown
                      :options="createDropdownOptions(restOptions)"
                      placement="top"
                      :theme-overrides="dropdownTheme"
                      style="min-width: 150px; padding: 7px 4px"
                    >
                      <n-avatar style="cursor: default">+{{ rest }}</n-avatar>
                    </n-dropdown>
                  </template>
                </n-avatar-group>
                <div>
                  <p class="m-0 fs-8 text-secondary">Workforce</p>
                  <p class="m-0 fs-7 fw-bold">
                    {{ project.worker_count }} Personnel
                  </p>
                </div>
              </div>
            </div>

            <button
              class="btn bg-prime text-white w-100 rounded-5 fw-medium fs-6"
              @click="goViewDetail(project.id)"
            >
              View Details <ArrowRight size="16" class="ms-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, h, onMounted } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import {
  Plus,
  SquarePen,
  Trash2,
  EllipsisVertical,
  UserPlus,
  MapPin,
  Calendar,
  ArrowRight,
  DollarSign,
} from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";
import { useProjectStore } from "@/stores/project";

const projectStore = useProjectStore();
const { getProject: projects } = storeToRefs(projectStore);

onMounted(() => {
  projectStore.getAllProject();
});

const router = useRouter();

// Helper to format dates correctly
function formatDate(dateStr) {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function renderIcon(icon) {
  return () => h(icon, { size: 18 });
}

const dropdownTheme = {
  common: { borderRadius: "8px" },
};

const options = computed(() => [
  { label: "Add Material", key: "addMaterial", icon: renderIcon(Plus) },
  {
    label: "Assign Personnel",
    key: "assignPersonnel",
    icon: renderIcon(UserPlus),
  },
  { label: "Edit Project", key: "editProject", icon: renderIcon(SquarePen) },
  { label: "Delete Project", key: "deleteProject", icon: renderIcon(Trash2) },
]);

function handleProfileSelect(key, projectId) {
  if (key === "addMaterial")
    router.push(`/admin/viewProjectById/${projectId}?tab=material`);
  if (key === "editProject") router.push(`/admin/editProject/${projectId}`);
  if (key === "deleteProject") {
    // Add your delete logic here
    console.log("Deleting project:", projectId);
  }
}

const goViewDetail = (id) => {
  router.push(`/admin/viewProjectById/${id}`);
};

function createDropdownOptions(optionsList) {
  return optionsList.map((option) => ({
    key: option.name,
    label: option.name,
  }));
}
</script>

<style scoped>
.dropdown-trigger {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background-color 0.2s;
  cursor: pointer;
}

.dropdown-trigger:hover {
  background-color: #f3f4f6;
}
</style>
