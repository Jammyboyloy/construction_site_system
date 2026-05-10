<template>
  <div>
    <n-form class="pt-3">
      <n-form-item-row label="Material Name">
        <n-input v-model:value="materialName" />
      </n-form-item-row>

      <n-form-item-row label="Quantity">
        <n-input :allow-input="onlyAllowNumber" v-model:value="quantity" />
      </n-form-item-row>

      <n-form-item-row label="Supplier">
        <n-input v-model:value="supplier" />
      </n-form-item-row>

      <n-form-item-row label="Cost Per Unit">
        <n-input :allow-input="onlyAllowNumber" v-model:value="cost" />
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
        btnName="Add Material"
        icon="Plus"
        position="ms-auto"
        @click="handleSubmit"
      />
    </n-form>

    <n-image ref="imgRef" style="display: none" :src="file?.url" />
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import { Trash2 } from "lucide-vue-next";
import { useMaterialStore } from "@/stores/material";
import { notify } from "@/utils/toast";
import { useRouter } from "vue-router";

const router = useRouter();
const toast = notify(router);

const props = defineProps({
  project: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits("[updateMaterial]");

const materialStore = useMaterialStore();
const materialName = ref("");
const quantity = ref("");
const supplier = ref("");
const cost = ref("");
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

const handleSubmit = async () => {
  const formData = new FormData();

  formData.append("project_id", props.project.id);
  formData.append("name", materialName.value);
  formData.append("quantity", quantity.value);
  formData.append("supplier", supplier.value);
  formData.append("cost_per_unit", cost.value);

  if (file.value?.file) {
    formData.append("image", file.value.file);
  }

  await materialStore.addMaterialByProject(formData);

  // reset form
  materialName.value = "";
  quantity.value = "";
  supplier.value = "";
  cost.value = "";
  file.value = null;

  emit("updateMaterial");

  toast.success("Add Material Successfully", {
    path: `/admin/viewProjectById/${props.project.id}`,
    query: { tab: "overview" },
  });
};
</script>
