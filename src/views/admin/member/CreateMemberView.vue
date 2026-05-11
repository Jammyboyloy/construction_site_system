<template>
  <div>
    <BaseTitle title="Create Account" class="mb-3" />
    <n-card class="rounded-5">
      <n-tabs type="line" animated default-value="supervisor">
        // supervisor
        <n-tab-pane name="supervisor" tab="Supervisor">
          <n-form class="pt-3">
            <n-form-item-row label="Username">
              <n-input v-model:value="supervisorName" />
            </n-form-item-row>

            <n-form-item-row label="Email">
              <n-input v-model:value="supervisorEmail" />
            </n-form-item-row>

            <n-form-item-row label="Password">
              <n-input
                type="password"
                v-model:value="supervisorPassword"
                show-password-on="click"
              />
            </n-form-item-row>
            <n-form-item-row label="Phone">
              <n-input
                :allow-input="onlyAllowNumber"
                v-model:value="supervisorPhone"
              />
            </n-form-item-row>
            <BaseButton
              btnName="Create Account"
              icon="Plus"
              position="ms-auto"
              @click="handleSubmitSupervisors"
            />
          </n-form>
        </n-tab-pane>

        // client
        <n-tab-pane name="client" tab="Client">
          <n-form class="pt-3">
            <n-form-item-row label="Username">
              <n-input v-model:value="clientName" />
            </n-form-item-row>

            <n-form-item-row label="Email">
              <n-input v-model:value="clientEmail" />
            </n-form-item-row>

            <n-form-item-row label="Password">
              <n-input
                type="password"
                v-model:value="clientPassword"
                show-password-on="click"
              />
            </n-form-item-row>
            <n-form-item-row label="Phone">
              <n-input
                :allow-input="onlyAllowNumber"
                v-model:value="clientPhone"
              />
            </n-form-item-row>
            <n-form-item-row label="Address">
              <n-input v-model:value="clientAddress" />
            </n-form-item-row>
            <BaseButton
              btnName="Create Account"
              icon="Plus"
              position="ms-auto"
              @click="handleSubmitClients"
            />
          </n-form>
        </n-tab-pane>

        // worker
        <n-tab-pane name="worker" tab="Worker">
          <n-form class="pt-3">
            <n-form-item-row label="Username">
              <n-input v-model:value="workerName" />
            </n-form-item-row>

            <n-form-item-row label="Email">
              <n-input v-model:value="workerEmail" />
            </n-form-item-row>

            <n-form-item-row label="Password">
              <n-input
                type="password"
                v-model:value="workerPassword"
                show-password-on="click"
              />
            </n-form-item-row>

            <n-form-item-row label="Phone">
              <n-input
                :allow-input="onlyAllowNumber"
                v-model:value="workerPhone"
              />
            </n-form-item-row>

            <n-form-item-row label="Skill Type">
              <n-input v-model:value="workerSkillType" />
            </n-form-item-row>
            <BaseButton
              btnName="Create Account"
              icon="Plus"
              position="ms-auto"
              @click="handleSubmitWorkers"
            />
          </n-form>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseTitle from "@/components/BaseTitle.vue";
import api from "@/api/https";

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);
const supervisorName = ref("");
const supervisorEmail = ref("");
const supervisorPassword = ref("");
const supervisorPhone = ref("");

const workerName = ref("");
const workerEmail = ref("");
const workerPassword = ref("");
const workerPhone = ref("");
const workerSkillType = ref("");

const clientName = ref("");
const clientEmail = ref("");
const clientPassword = ref("");
const clientPhone = ref("");
const clientAddress = ref("");

const handleSubmitSupervisors = async () => {
  const data = {
    name: supervisorName.value,
    email: supervisorEmail.value,
    password: supervisorPassword.value,
    phone: supervisorPhone.value,
  };

  try {
    const res = await api.post("/admin/create-supervisor", data); // fixed
    console.log("Response:", res.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }

  console.log("Submitted Data:", data);
};

const handleSubmitWorkers = () => {
  const data = {
    name: workerName.value,
    email: workerEmail.value,
    password: workerPassword.value,
    phone: workerPhone.value,
    skill_type: workerSkillType,
  };
  console.log("Submitted Data:", data);
};

const handleSubmitClients = () => {
  const data = {
    name: clientName.value,
    email: clientEmail.value,
    password: clientPassword.value,
    phone: clientPhone.value,
    address: clientAddress,
  };
  console.log("Submitted Data:", data);
};
</script>

<style scoped>
:deep(.n-tabs-tab__label) {
  font-size: 15px;
  font-weight: 550;
  letter-spacing: 0.2px;
}
</style>
