<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <BaseTitle title="View Tasks" />
      <n-tag round :bordered="false" type="success">QR Active</n-tag>
    </div>

    <div class="row g-4">
      <div class="col-12">
        <div class="card rounded-4 shadow-box border-3">
          <div class="attendance-header">
            <div>
              <h5 class="fw-bold mb-1">Progress Task</h5>
              <p class="text-secondary fs-7 mb-0">
                Workers shown here after they scan the QR code.
              </p>
            </div>
          </div>

          <div class="attendance-table">
            <div class="attendance-row attendance-head bg-main">
              <div>Task Title</div>
              <div>Note</div>
              <div>Worker</div>
              <div>Progress</div>
              <div>Status</div>
            </div>

            <div class="attendance-scroll-wrap">
              <n-scrollbar style="max-height: 375px">
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

                  <div class="time-cell pe-10">
                    <n-progress
                      type="line"
                      :percentage="worker.progress"
                      processing
                    />
                  </div>

                  <div class="time-cell">
                    <n-tag
                      round
                      :bordered="false"
                      class="fs-7 px-3"
                      :type="
                        worker.status === 'approve'
                          ? 'success'
                          : worker.status === 'reject'
                            ? 'error'
                            : 'warning'
                      "
                    >
                      {{
                        worker.status === "approve"
                          ? "Approve"
                          : worker.status === "reject"
                            ? "Reject"
                            : "Pending"
                      }}
                    </n-tag>
                  </div>
                </div>
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
import BaseTitle from "@/components/BaseTitle.vue";

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
    status: "approve",
    progress: 75,
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
    status: "reject",
    progress: 40,
    assignedWorkers: [
      { name: "Frank Obi", src: "https://i.pravatar.cc/40?img=11" },
      { name: "Alice Johnson", src: "https://i.pravatar.cc/40?img=1" },
    ],
  },
  {
    name: "David Chen",
    role: "HVAC Specialist",
    status: "reject",
    progress: 40,
    assignedWorkers: [
      { name: "Frank Obi", src: "https://i.pravatar.cc/40?img=11" },
      { name: "Alice Johnson", src: "https://i.pravatar.cc/40?img=1" },
    ],
  },
  {
    name: "Sarah Jenkins",
    role: "Site Safety Lead",
    status: null,
    progress: 10,
    assignedWorkers: [],
  },
  {
    name: "Sarah Jenkins",
    role: "Site Safety Lead",
    status: null,
    progress: 10,
    assignedWorkers: [],
  },
  {
    name: "Lena Park",
    role: "Architect",
    status: null,
    progress: 55,
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
    minmax(120px, 1fr) minmax(100px, 1fr) minmax(80px, 0.8fr)
    minmax(100px, 1fr) minmax(80px, 0.5fr);
  min-width: 620px;
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

@media (max-width: 575px) {
  .attendance-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 12px;
  }
}
</style>