<template>
  <div>
    <BaseTitle title="Project Management" class="mb-3" />
    <n-card class="rounded-5">
      <div class="row">
        <div class="col-lg-4">
          <div class="card border border-3 rounded-4 shadow-box">
            <div class="card-img" style="height: 200px; position: relative">
              <img
                src="https://i.pinimg.com/1200x/03/91/eb/0391eb49f97bd74318fd5e3797aeef26.jpg"
                alt="Project Image"
                class="w-100 h-100 object-fit-cover"
                style="border-radius: 12px 12px 0 0"
              />
              <div class="card-img-overlay">
                <p class="fs-7 bg-white w-fit m-0 px-3 rounded-pill">
                  Progress
                </p>
              </div>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between align-items-center">
                <h6 class="m-0 pt-1 fw-bold ls">Skyline Tower-Phase 2</h6>
                <n-dropdown
                  trigger="click"
                  :options="options"
                  @select="handleProfileSelect"
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
                class="mt-3 mb-2 d-flex justify-content-between align-items-center"
              >
                <div class="d-flex align-items-center">
                  <MapPin size="14" />
                  <p class="text-secondary m-0 fs-7 ms-1">Phnom Penh</p>
                </div>
                <div
                  class="d-flex align-items-center fs-7 text-secondary gap-1"
                >
                  <Calendar size="14" />
                  <p class="m-0">20 Jan 2026</p>
                  <ArrowRight size="14" />
                  <p class="m-0">20 Jun 2027</p>
                </div>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-3"
              >
                <div class="d-flex align-items-center gap-2">
                  <n-avatar
                    round
                    :size="30"
                    src="https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg"
                  />
                  <div>
                    <p class="m-0 fs-8 text-secondary">Client</p>
                    <p class="m-0 fs-7 fw-bold">Lay Jammy</p>
                  </div>
                </div>
                <div class="d-flex align-items-center text-prime">
                  <dollar-sign size="20" />
                  <p class="m-0 fs-6 ms-1 fw-bold ls">50000</p>
                </div>
              </div>
              <div class="d-flex justify-content-between mb-1">
                <p class="m-0 fs-7">Construction Progress</p>
                <p class="m-0 fs-7">60%</p>
              </div>
              <div class="mb-3">
                <n-progress
                  type="line"
                  :percentage="60"
                  :show-indicator="false"
                  processing
                  :height="8"
                  color="#f97316"
                />
              </div>
              <div class="d-flex justify-content-between mb-3">
                <div class="d-flex align-items-center gap-2">
                  <n-avatar
                    round
                    :size="30"
                    src="https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg"
                  />
                  <div>
                    <p class="m-0 fs-8 text-secondary">Supervisor</p>
                    <p class="m-0 fs-7 fw-bold">Lay Jammy</p>
                  </div>
                </div>
                <div class="d-flex align-items-center gap-2">
                  <n-avatar-group :options="avatarOption" :size="30" :max="3">
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
                    <p class="m-0 fs-7 fw-bold">5 Personnel</p>
                  </div>
                </div>
              </div>
              <button
                class="btn bg-prime text-white w-100 rounded-5 fw-medium fs-6"
                @click="goViewDetail"
              >
                View Details <ArrowRight size="16" class="ms-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup>
import { computed, h } from "vue";
import { useRouter } from "vue-router";
import {
  Plus,
  SquarePen,
  Trash2,
  EllipsisVertical,
  UserPlus,
} from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";

const router = useRouter();

function renderIcon(icon) {
  return () => h(icon, { size: 18 });
}

const dropdownTheme = {
  common: { borderRadius: "8px" },
};

const options = computed(() => [
  {
    label: "Add Material",
    key: "addMaterial",
    icon: renderIcon(Plus),
  },
  {
    label: "Assign Personnel",
    key: "assignPersonnel",
    icon: renderIcon(UserPlus),
  },
  {
    label: "Edit Project",
    key: "editProject",
    icon: renderIcon(SquarePen),
  },
  {
    label: "Delete Project",
    key: "deleteProject",
    icon: renderIcon(Trash2),
  },
]);

function handleProfileSelect(key) {
  if (key === "addMaterial") router.push("viewProjectById?tab=material");
  if (key === "editProject") router.push("/profile");
  if (key === "deleteProject") router.push("/edit-profile");
}

const goViewDetail = () => {
  router.push("/viewProjectById");
};

const avatarOption = [
  {
    name: "Leonardo DiCaprio",
    src: "https://i.pinimg.com/736x/eb/2b/81/eb2b81f9260fe98e8565a17be6055385.jpg",
  },
  {
    name: "Jennifer Lawrence",
    src: "https://i.pinimg.com/736x/28/ed/90/28ed90a80d043b62369e65c6769afc3a.jpg",
  },
  {
    name: "Audrey Hepburn",
  },
  {
    name: "Anne Hathaway",
  },
  {
    name: "Taylor Swift",
  },
];

function createDropdownOptions(options2) {
  return options2.map((option) => ({
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
