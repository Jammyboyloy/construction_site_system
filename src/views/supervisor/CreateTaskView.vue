<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <BaseTitle title="Attendance" />
      <n-tag round :bordered="false" type="success">QR Active</n-tag>
    </div>

    <div class="row g-4">
      <div class="col-12">
        <div class="card rounded-4 shadow-box border-3">
          <div class="attendance-header">
            <div>
              <h5 class="fw-bold mb-1">Today Attendance</h5>
              <p class="text-secondary fs-7 mb-0">
                Workers shown here after they scan the QR code.
              </p>
            </div>
            <BaseButton
              @click="showModal = true"
              btnName="Create Task"
              icon="plus"
              position="ms-auto"
            />
            <n-modal
              v-model:show="showModal"
              preset="card"
              title="Create Task"
              :style="{ width: '600px' }"
              :segmented="{ content: true }"
              class="rounded-4"
            >
              <n-form class="mt-2">
                <n-form-item-row label="Task Title">
                  <n-input v-model:value="taskTitle" />
                </n-form-item-row>
                <n-form-item-row label="Description">
                  <n-input
                    v-model:value="description"
                    type="textarea"
                    :rows="2"
                  />
                </n-form-item-row>
              </n-form>

              <template #footer>
                <div class="d-flex justify-content-end gap-2">
                  <n-button @click="showModal = false" class="rounded-3"
                    >Cancel</n-button
                  >
                  <n-button
                    type="primary"
                    @click="showModal = false"
                    class="rounded-3"
                  >
                    <template #icon>
                      <Plus :size="16" />
                    </template>
                    Create Task
                  </n-button>
                </div>
              </template>
            </n-modal>
          </div>

          <div class="attendance-table">
            <div class="attendance-row attendance-head bg-main">
              <div>Task Title</div>
              <div>Description</div>
              <div>Worker</div>
              <div>Assign Worker</div>
            </div>

            <div class="attendance-scroll-wrap">
              <n-scrollbar style="max-height: 385px">
                <div
                  v-for="worker in workers"
                  :key="worker.name"
                  class="attendance-row"
                >
                  <div class="worker-cell">
                    <p class="fw-bold mb-0 worker-name">{{ worker.name }}</p>
                  </div>
                  <div class="time-cell">
                    <p class="text-secondary fs-7 mb-0">{{ worker.role }}</p>
                  </div>

                  <!-- Avatar Group column -->
                  <div class="time-cell">
                    <template v-if="worker.assignedWorkers?.length">
                      <n-avatar-group
                        :options="worker.assignedWorkers"
                        :size="38"
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
                          >
                            <n-avatar class="fs-7">+{{ rest }}</n-avatar>
                          </n-dropdown>
                        </template>
                      </n-avatar-group>
                    </template>
                    <span v-else class="no-worker">No workers</span>
                  </div>

                  <!-- Action column -->
                  <div class="time-cell">
                    <n-button
                      ghost
                      class="rounded-3"
                      @click="showModalAssign = true"
                    >
                      <UserPlus size="20" class="me-1" /> Assign
                    </n-button>
                  </div>
                </div>
                <n-modal
                  v-model:show="showModalAssign"
                  preset="card"
                  title="Content Scrollable"
                  :style="{ width: '700px' }"
                  :segmented="{ content: true }"
                  class="rounded-4"
                >
                  <n-select
                    multiple
                    :options="options"
                    :render-label="renderLabel"
                    :render-tag="renderMultipleSelectTag"
                    filterable
                  />

                  <template #footer>
                    <div class="d-flex justify-content-end gap-2">
                      <n-button @click="showModalAssign = false" class="rounded-3"
                        >Cancel</n-button
                      >
                      <n-button
                        type="primary"
                        @click="showModal = false"
                        class="rounded-3"
                      >
                        <template #icon>
                          <Plus :size="16" />
                        </template>
                        Assign Worker
                      </n-button>
                    </div>
                  </template>
                </n-modal>
              </n-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Plus } from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";
import BaseButton from "@/components/BaseButton.vue";

const showModal = ref(false);
const showModalAssign = ref(false);
const taskTitle = ref("");
const description = ref("");

function createDropdownOptions(options) {
  return options.map((option) => ({
    key: option.name,
    label: option.name,
  }));
}

const workers = [
  {
    name: "Marcus Thorne",
    role: "Structural Engineer",
    checkOut: "--:--",
    hours: "0.5h",
    assignedWorkers: [
      { name: "Alice Johnson", src: "https://i.pravatar.cc/40?img=1" },
      { name: "Bob Martinez", src: "https://i.pravatar.cc/40?img=3" },
      { name: "Carol Lee", src: "https://i.pravatar.cc/40?img=5" },
      { name: "David Kim", src: "https://i.pravatar.cc/40?img=7" },
      { name: "Eva Nguyen", src: "https://i.pravatar.cc/40?img=9" },
    ],
  },
  {
    name: "David Chen",
    role: "HVAC Specialist",
    checkOut: "--:--",
    hours: "0.0h",
    assignedWorkers: [
      { name: "Frank Obi", src: "https://i.pravatar.cc/40?img=11" },
      { name: "Alice Johnson", src: "https://i.pravatar.cc/40?img=1" },
    ],
  },
  {
    name: "David Chen",
    role: "HVAC Specialist",
    checkOut: "--:--",
    hours: "0.0h",
    assignedWorkers: [
      { name: "Frank Obi", src: "https://i.pravatar.cc/40?img=11" },
      { name: "Alice Johnson", src: "https://i.pravatar.cc/40?img=1" },
    ],
  },
  {
    name: "Sarah Jenkins",
    role: "Site Safety Lead",
    checkOut: "--:--",
    hours: "0.0h",
    assignedWorkers: [],
  },
  {
    name: "James Romero",
    role: "Electrician",
    checkOut: "04:00 PM",
    hours: "8.5h",
    assignedWorkers: [
      { name: "Carol Lee", src: "https://i.pravatar.cc/40?img=5" },
    ],
  },
  {
    name: "Lena Park",
    role: "Architect",
    checkOut: "--:--",
    hours: "1.0h",
    assignedWorkers: [
      { name: "Bob Martinez", src: "https://i.pravatar.cc/40?img=3" },
      { name: "Eva Nguyen", src: "https://i.pravatar.cc/40?img=9" },
      { name: "David Kim", src: "https://i.pravatar.cc/40?img=7" },
      { name: "Frank Obi", src: "https://i.pravatar.cc/40?img=11" },
    ],
  },
];
</script>

<style scoped>
.attendance-header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 24px;
}

.attendance-table {
  overflow-x: auto;
}

.attendance-scroll-wrap {
  overflow: hidden;
}

.attendance-row {
  align-items: center;
  border-top: 1px solid #eef1f5;
  display: grid;
  grid-template-columns:
    minmax(120px, 1fr) minmax(220px, 2fr) minmax(120px, 1fr)
    minmax(90px, 0.7fr);
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

.no-worker {
  font-size: 12px;
  color: #b4bfce;
  font-weight: 500;
}

.attendance-scroll-wrap {
  overflow: hidden;
}


@media (max-width: 575px) {
  .attendance-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
