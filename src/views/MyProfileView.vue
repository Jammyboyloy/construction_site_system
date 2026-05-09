<template>
  <div>
    <div class="container-fluid py-4 bg-white rounded-5 px-4 shadow-sm">
      
      <!-- Header -->
      <div class="d-flex align-items-center gap-3 mt-5 mb-5">
        <div class="icon-box-title">
          <User class="text-main" :size="28" />
        </div>
        <div>
          <h3 class="fw-bold mb-1">My Profile</h3>
          <p class="text-muted mb-0 small">
            Manage your account and store details
          </p>
        </div>
      </div>

      <!-- Profile -->
      <div class="d-flex align-content-center bg-light rounded-5 px-5">
        
        <!-- LEFT -->
        <div class="col-lg-6">
          <div class="d-flex pb-3">
            
            <!-- Avatar -->
            <div class="border-0 me-4 mt-3">
              <div
                class="position-relative mx-auto"
                style="width: 150px; height: 150px"
              >
                <img
                  :src="avatar || 'https://via.placeholder.com/150'"
                  class="rounded-circle border w-100 h-100 object-fit-cover"
                  alt="profile"
                />

                <!-- Dropdown -->
                <div
                  class="dropdown position-absolute bg-main rounded-circle"
                  style="bottom: 50px; right: -12px"
                >
                  <span
                    class="d-flex justify-content-center align-items-center bg-btn text-white rounded-circle shadow"
                    data-bs-toggle="dropdown"
                    style="width: 35px; height: 35px; cursor: pointer"
                  >
                    <Pencil size="20" />
                  </span>

                  <ul class="dropdown-menu px-2 bg-main border">
                    
                    <!-- Upload -->
                    <li>
                      <input
                        id="uploadImage"
                        type="file"
                        @change="handleFile"
                        accept="image/*"
                        style="display: none"
                      />
                      <label
                        for="uploadImage"
                        class="btn dropdown-item mb-1 nav-text"
                      >
                        <Pencil class="me-2" size="21" />
                        Change Profile
                      </label>
                    </li>

                    <!-- Remove -->
                    <li>
                      <button
                        class="btn dropdown-item nav-text"
                        type="button"
                        @click="removeImage"
                      >
                        <Trash2 class="me-2 text-danger" size="21" />
                        Remove Profile
                      </button>
                    </li>

                  </ul>
                </div>
              </div>
            </div>

            <!-- Info -->
            <div class="mt-8">
              <h4 class="fw-bold">
                {{ MyProfileStore?.name || "Your Name" }}
              </h4>

              <div class="lh-1 mt-3">
                <p>
                  <span class="text-muted">Email:</span>
                  {{ MyProfileStore?.email || "example@gmail.com" }}
                </p>

                <p>
                  <span class="text-muted">Created At:</span>
                  {{ formatDate(MyProfileStore?.created_at) }}
                </p>
              </div>
            </div>

          </div>
        </div>

        <!-- RIGHT -->
        <div class="col-lg-6">
          <div class="d-flex justify-content-end mt-10">
            <button
              class="btn bg-btn rounded-pill py-2 px-6 me-3"
            >
              Edit Profile
            </button>

            <button
              class="btn btn-danger rounded-pill py-2 px-6"
            >
              Sign out
            </button>
          </div>
        </div>

      </div>

      <!-- CROPPER MODAL -->
      <BaseModal
        v-if="showCropper"
        @closeModal="showCropper = false"
        position="justify-content-center"
      >
        <template #header>
          <h5 class="modal-title mx-auto fw-bold">Crop Profile Picture</h5>
        </template>

        <template #body>
          <div class="cropper-container mb-5">
            <Cropper
              ref="cropperRef"
              :src="imageSource"
              :stencil-props="{
                aspectRatio: 1 / 1,
                movable: true,
                resizable: true,
              }"
              :stencil-component="CircleStencil"
              image-restriction="stencil"
              class="cropper-instance"
            />
          </div>
          <p class="text-center text-muted m-0">
            Scroll to zoom • Drag to move
          </p>
        </template>

        <template #footer>
          <button
            class="btn btn-secondary rounded-pill px-6 py-2"
            @click="showCropper = false"
          >
            Cancel
          </button>

          <button
            class="btn bg-btn text-white rounded-pill px-6"
            @click="cropImage"
            :disabled="Loading"
          >
            Confirm Crop
          </button>
        </template>
      </BaseModal>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseModal from "@/components/BaseModal.vue";

// Cropper
import { Cropper, CircleStencil } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

// 🔥 STATE
const imageSource = ref(null);
const showCropper = ref(false);
const cropperRef = ref(null);
const Loading = ref(false);
const avatar = ref(null);

// Dummy profile (no API)
const MyProfileStore = {
  name: "John Doe",
  email: "john@gmail.com",
  created_at: new Date(),
};

// 📌 Upload file
const handleFile = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (imageSource.value) URL.revokeObjectURL(imageSource.value);

  imageSource.value = URL.createObjectURL(file);
  showCropper.value = true;
  event.target.value = "";
};

// 📌 Crop (NO API → just preview)
function cropImage() {
  const { canvas } = cropperRef.value.getResult();
  if (!canvas) return;

  avatar.value = canvas.toDataURL("image/png");
  showCropper.value = false;
}

// 📌 Remove
function removeImage() {
  avatar.value = null;
}

// 📌 Format Date
function formatDate(dateString) {
  if (!dateString) return "N/A";

  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}
</script>

<style scoped>
.cropper-container {
  height: 400px;
  background: #111;
  overflow: hidden;
  border-radius: 8px;
}

.cropper-instance {
  height: 100%;
  width: 100%;
}

:deep(.vue-circle-stencil) {
  border: 2px solid #fff;
}

:deep(.vue-cropper__stencil) {
  box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.6);
}
</style>