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
              <div>Action</div>
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

                  <div class="time-cell">
                    <n-button
                      size="small"
                      class="rounded-3"
                      @click="openModal(worker)"
                    >
                      Submit
                    </n-button>
                  </div>
                </div>
              </n-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <n-modal
      v-model:show="showModal"
      preset="card"
      title="Submit Report"
      :style="{ width: '520px' }"
      :segmented="{ content: true }"
      class="rounded-4"
    >
      <div class="d-flex flex-column gap-3">
        <n-form-item label="Note">
          <n-input
            v-model:value="form.note"
            placeholder="Write your note here..."
          />
        </n-form-item>

        <n-form-item label="Image">
          <div class="upload-container w-100">
            <n-upload
              v-if="!file"
              :show-file-list="false"
              :max="1"
              @change="handleChange"
            >
              <div class="upload-trigger-box">
                <Upload :size="24" />
                <span>Upload</span>
              </div>
            </n-upload>

            <div v-else class="preview-box">
              <img :src="file.url" class="img-preview" />
              <div class="overlay">
                <div class="icon-group">
                  <div class="action-icon" title="Preview" @click="openPreview">
                    <Eye :size="20" />
                  </div>
                  <div
                    class="action-icon remove-btn"
                    title="Remove"
                    @click="removeFile"
                  >
                    <Trash2 :size="20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </n-form-item>
      </div>

      <template #footer>
        <div class="d-flex justify-content-end gap-2">
          <n-button class="rounded-3" @click="showModal = false"
            >Cancel</n-button
          >
          <n-button type="primary" class="rounded-3" @click="handleSubmit">
            <template #icon><Plus :size="16" /></template>
            Submit
          </n-button>
        </div>
      </template>
    </n-modal>

    <!-- Hidden image for preview -->
    <n-image ref="imgRef" style="display: none" :src="file?.url" />
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from "vue";
import { Plus, Upload, Trash2, Eye } from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";

const showModal = ref(false);
const selectedWorker = ref(null);
const imgRef = ref(null);

const form = reactive({
  note: "",
});

const file = ref(null);

function openModal(worker) {
  selectedWorker.value = worker;
  form.note = "";
  file.value = null;
  showModal.value = true;
}

function handleChange(options) {
  const f = options.file.file;
  if (!f) return;
  file.value = {
    file: f,
    url: URL.createObjectURL(f),
  };
}

function removeFile() {
  file.value = null;
}

function openPreview() {
  nextTick(() => {
    const el = imgRef.value?.$el?.querySelector("img");
    if (el) el.click();
  });
}

function handleSubmit() {
  const formData = new FormData();
  formData.append("note", form.note);
  formData.append("worker_name", selectedWorker.value?.name ?? "");

  if (file.value?.file) {
    formData.append("image", file.value.file);
  }

  for (const [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
  }

  showModal.value = false;
}

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
    minmax(120px, 1.2fr) minmax(80px, 0.6fr) minmax(80px, 0.4fr);
  min-width: 680px;
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
