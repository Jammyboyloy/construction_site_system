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

const handleSubmit = () => {
  const formData = new FormData();
  formData.append("materialName", materialName.value);
  formData.append("quantity", quantity.value);
  formData.append("supplier", supplier.value);
  formData.append("cost", cost.value);
  if (file.value?.file) {
    formData.append("image", file.value.file);
  }

  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }
};
</script>
