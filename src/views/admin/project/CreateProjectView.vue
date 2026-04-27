<template>
  <div>
    <BaseTitle title="Create Project" class="mb-3" />

    <n-card class="rounded-5">
      <n-form class="pt-3">
        <n-form-item-row label="Project Name">
          <n-input v-model:value="projectName" />
        </n-form-item-row>

        <n-form-item-row label="Location">
          <n-input v-model:value="location" />
        </n-form-item-row>

        <n-form-item-row label="Client Name">
          <n-select
            :options="options"
            :render-label="renderLabel"
            :render-tag="renderSingleSelectTag"
            :theme-overrides="selectThemeOverrides"
            filterable
          />
        </n-form-item-row>

        <n-form-item-row label="Date">
          <n-date-picker
            v-model:value="range"
            type="daterange"
            clearable
            class="w-100"
          />
        </n-form-item-row>

        <n-form-item-row label="Estimated Budget">
          <n-input :allow-input="onlyAllowNumber" v-model:value="budget" />
        </n-form-item-row>

        <n-form-item-row label="Project Image">
          <div class="upload-container w-100">
            <n-upload
              v-if="!file"
              :show-file-list="false"
              :max="1"
              @change="handleChange"
            >
              <div class="upload-trigger-box">
                <UploadIcon :size="24" />
                <span>Upload</span>
              </div>
            </n-upload>

            <div v-else class="preview-box">
              <img :src="file.url" class="img-preview" />

              <div class="overlay">
                <div class="icon-group">
                  <div class="action-icon" title="Preview" @click="openPreview">
                    <EyeIcon :size="20" />
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
        </n-form-item-row>

        <BaseButton
          btnName="Create Project"
          icon="Plus"
          position="ms-auto"
          @click="handleSubmit"
        />
      </n-form>
    </n-card>

    <n-image ref="imgRef" style="display: none" :src="file?.url" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick, h } from "vue";
import BaseTitle from "@/components/BaseTitle.vue";
import BaseButton from "@/components/BaseButton.vue";
import { NAvatar, NText } from "naive-ui";

const projectName = ref("");
const location = ref("");
const clientName = ref("");
const range = ref(null);
const startDate = ref(null);
const endDate = ref(null);
const budget = ref("");
const file = ref(null);
const imgRef = ref(null);

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

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

const formatDate = (timestamp) => {
  const d = new Date(timestamp);
  return d.toISOString().split("T")[0];
};

watch(range, (val) => {
  if (val && val.length === 2) {
    startDate.value = formatDate(val[0]);
    endDate.value = formatDate(val[1]);
  } else {
    startDate.value = null;
    endDate.value = null;
  }
});

const handleSubmit = () => {
  const data = {
    projectName: projectName.value,
    location: location.value,
    clientName: clientName.value,
    budget: budget.value,
    startDate: startDate.value,
    endDate: endDate.value,
    image: file.value?.file || null,
  };
  console.log("Submitted Data:", data);
};

const selectThemeOverrides = {
  peers: {
    InternalSelection: {
      heightMedium: "40px",
      border: "1px solid #e5e5e5",
      borderHover: "1px solid #f97316",
      borderFocus: "1px solid #f97316",
      borderActive: "1px solid #f97316",
      boxShadowHover: "1px solid #f97316",
      boxShadowFocus: "1px solid #f97316",
      boxShadowActive: "1px solid #f97316",
      caretColor: "#f97316",
    },
    InternalSelectMenu: {
      optionTextColorPressed: "#f97316",
      optionCheckColor: "#f97316",
    },
  },
};

const renderSingleSelectTag = ({ option }) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        marginLeft: "8px",
      },
    },
    [
      h(NAvatar, {
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        round: true,
        size: 24,
        style: {
          marginRight: "12px",
        },
      }),
      option.label,
    ],
  );
};

const renderLabel = (option) => {
  return h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        marginLeft: "8px",
      },
    },
    [
      h(NAvatar, {
        src: "https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg",
        round: true,
        size: "small",
      }),
      h(
        "div",
        {
          style: {
            marginLeft: "12px",
            padding: "5px 0",
          },
        },
        [
          h("div", null, [option.label]),
          h(
            NText,
            { depth: 3, tag: "div" },
            {
              default: () => "description",
            },
          ),
        ],
      ),
    ],
  );
};

const options = [
  {
    label: "07akioni",
    value: "07akioni",
  },
  {
    label: "08akioni",
    value: "08akioni",
  },
  {
    label: "09akioni",
    value: "09akioni",
  },
];
</script>

<style scoped>
.upload-trigger-box {
  width: 120px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.3s;
}

.upload-trigger-box:hover {
  border-color: #f97316;
  color: #f97316;
}

.preview-box {
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  overflow: hidden;
}

.img-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.preview-box:hover .overlay {
  opacity: 1;
}

.icon-group {
  display: flex;
  gap: 5px;
}

.action-icon {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 50%;

  transition: all 0.3s ease;
}

.action-icon:hover {
  background-color: rgba(255, 255, 255, 0.25);
}
</style>
