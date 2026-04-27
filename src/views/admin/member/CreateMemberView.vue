<template>
  <div>
    <BaseTitle title="Create Account" class="mb-3" />
    <n-card class="rounded-5">
      <n-tabs type="line" animated>
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
            />
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="Worker" tab="Worker">
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
            />
          </n-form>
        </n-tab-pane>

        <n-tab-pane name="Client" tab="Client">
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
</script>

<style scoped>
:deep(.n-tabs-tab__label) {
  font-size: 15px;
  font-weight: 550;
  letter-spacing: 0.2px;
}
</style>
