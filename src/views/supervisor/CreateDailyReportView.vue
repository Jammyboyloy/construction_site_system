<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <BaseTitle title="Daily Report" />
    </div>

    <n-card class="rounded-5">
      <n-form :model="form" class="pt-3 pb-2">
        <!-- Summary -->
        <n-form-item label="Summary" path="summary">
          <n-input
            v-model:value="form.summary"
            type="textarea"
            :rows="2"
            placeholder="e.g. Wall 50% done"
          />
        </n-form-item>

        <!-- Materials -->
        <div class="section-header mb-2">
          <span class="fw-bold">Materials</span>
          <n-button ghost @click="addMaterial" class="rounded-3 ">
            <span class="me-2 fs-5">+</span> Create Task
          </n-button>
        </div>

        <div
          v-for="(material, index) in form.materials"
          :key="index"
          class="section-row mb-4 px-5"
        >
          <div class="row pt-3">
            <div class="col-6">
              <n-form-item :label="`Material #${index + 1}`">
                <n-select
                  v-model:value="material.material_id"
                  :options="materialOptions"
                  placeholder="Select material"
                />
              </n-form-item>
            </div>
            <div class="col-6">
              <n-form-item label="Used Quantity">
                <n-input
                  placeholder="0"
                  :min="0"
                  v-model:value="material.used_quantity"
                  :allow-input="onlyAllowNumber"
                />
              </n-form-item>
            </div>
            <div class="col-12">
              <n-form-item label="Note">
                <n-input
                  v-model:value="material.note"
                  placeholder="e.g. cement work"
                />
              </n-form-item>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <n-button
              size="small"
              type="error"
              ghost
              class="rounded-3"
              @click="removeMaterial(index)"
              :disabled="form.materials.length === 1"
            >
              <Trash2 :size="14" class="me-1" /> Remove
            </n-button>
          </div>
        </div>

        <!-- Expenses -->
        <div class="section-header mb-2 mt-3 bg-white">
          <span class="fw-bold">Expenses</span>
          <n-button ghost class="rounded-3" @click="addExpense">
            <span class="me-2 fs-5">+</span> Add Expense
          </n-button>
        </div>

        <div
          v-for="(expense, index) in form.expenses"
          :key="index"
          class="section-row px-5"
        >
          <div class="row pt-3">
            <div class="col-6">
              <n-form-item label="Type">
                <n-select
                  v-model:value="expense.type"
                  :options="expenseTypeOptions"
                  placeholder="Select type"
                />
              </n-form-item>
            </div>
            <div class="col-6">
              <n-form-item label="Amount ($)">
                <n-input
                  placeholder="0"
                  :min="0"
                  v-model:value="expense.amount"
                  :allow-input="onlyAllowNumber"
                />
              </n-form-item>
            </div>
            <div class="col-12">
              <n-form-item label="Description">
                <n-input
                  v-model:value="expense.description"
                  placeholder="e.g. truck fuel"
                />
              </n-form-item>
            </div>
          </div>

          <div class="d-flex justify-content-end">
            <n-button
              size="small"
              type="error"
              ghost
              class="rounded-3"
              @click="removeExpense(index)"
              :disabled="form.expenses.length === 1"
            >
              <Trash2 :size="14" class="me-1" /> Remove
            </n-button>
          </div>
        </div>

        <!-- Actions -->
        <BaseButton
          btnName="Create Daily Report"
          icon="plus"
          position="ms-auto"
          class="mt-4"
          @click="submitForm"
        />
      </n-form>
    </n-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Plus, Trash2 } from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";
import BaseButton from "@/components/BaseButton.vue";

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

const form = ref({
  project_id: null,
  summary: "",
  materials: [{ material_id: null, used_quantity: null, note: "" }],
  expenses: [{ type: null, amount: null, description: "" }],
});

const materialOptions = [
  { label: "Cement", value: 1 },
  { label: "Steel", value: 2 },
  { label: "Sand", value: 3 },
  { label: "Bricks", value: 4 },
];

const expenseTypeOptions = [
  { label: "Transport", value: "transport" },
  { label: "Labor", value: "labor" },
  { label: "Equipment", value: "equipment" },
  { label: "Other", value: "other" },
];

function addMaterial() {
  form.value.materials.push({
    material_id: null,
    used_quantity: null,
    note: "",
  });
}

function removeMaterial(index) {
  form.value.materials.splice(index, 1);
}

function addExpense() {
  form.value.expenses.push({ type: null, amount: null, description: "" });
}

function removeExpense(index) {
  form.value.expenses.splice(index, 1);
}

function submitForm() {
  const payload = {
    project_id: form.value.project_id,
    summary: form.value.summary,
    materials: form.value.materials,
    expenses: form.value.expenses,
  };

  console.log("Payload:", payload);
}
</script>

<style scoped>

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 18px;
  border: 1px solid #eef1f5;
  border-radius: 10px;
}

.section-row {
  border: 1px solid #eef1f5;
  border-radius: 10px;
  padding: 16px;
}

</style>
