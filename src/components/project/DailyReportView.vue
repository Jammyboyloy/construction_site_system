<template>
  <div class="row pt-3 g-4">
    <!-- SUMMARY -->
    <div class="col-12">
      <div class="d-flex gap-3 align-items-center mb-3">
        <h5 class="fw-bold">Daily Summary</h5>

        <n-popselect
          v-model:value="selectedDate"
          :options="options"
          :to="false"
          scrollable
          v-if="props.dailyReport.length > 0"
        >
          <n-button class="rounded-3">
            {{ formatDateTime(selectedDate) }}
          </n-button>
        </n-popselect>
      </div>

      <div class="daily-summary bg-main shadow-box rounded-4">
        <p class="m-0">
          {{ activeReport?.summary || "No daily report selected" }}
        </p>
      </div>
    </div>

    <!-- IMAGES -->
    <div class="col-12">
      <div class="card p-4 rounded-4 shadow-box border-3">
        <h5 class="fw-bold mb-3">Site Progress Photos</h5>

        <n-image-group>
          <n-carousel
            v-if="photos.length"
            :slides-per-view="2"
            :space-between="10"
            :show-dots="false"
            show-arrow
            draggable
          >
            <n-image
              v-for="(src, index) in photos"
              :key="index"
              :src="src"
              object-fit="cover"
              style="border-radius: 8px; width: 100%; height: 250px"
            />
          </n-carousel>
          <div v-else class="no-image">No Images Available</div>
        </n-image-group>
      </div>
    </div>

    <!-- MATERIAL -->
    <div class="col-12">
      <h5 class="fw-bold mb-3">Material Used</h5>
      <n-data-table
        :columns="materialColumns"
        :data="materialData"
        :pagination="false"
        :bordered="false"
        class="task-table"
      />
    </div>

    <!-- EXPENSE -->
    <div class="col-12">
      <h5 class="fw-bold mb-3">Expensed</h5>
      <n-data-table
        :columns="expenseColumns"
        :data="expenseData"
        :pagination="false"
        :bordered="false"
        class="task-table"
      />
    </div>
  </div>
</template>

<script setup>
import { h, ref, computed, watch } from "vue";
import { NAvatar } from "naive-ui";

const props = defineProps({
  project: Object,
  dailyReport: Array,
});

const selectedDate = ref(null);


const formatDateTime = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};


const options = computed(() => {
  const map = new Map();

  (props.dailyReport || []).forEach((r) => {
    const key = new Date(r.created_at).toISOString().slice(0, 16);

    if (!map.has(key)) {
      map.set(key, {
        label: formatDateTime(r.created_at),
        value: r.created_at,
      });
    }
  });

  return Array.from(map.values());
});


watch(
  () => props.dailyReport,
  (val) => {
    if (val?.length) {
      selectedDate.value = val[0].created_at;
    }
  },
  { immediate: true }
);


const activeReport = computed(() => {
  if (!props.dailyReport?.length) return null;

  return props.dailyReport.find(
    (r) => r.created_at === selectedDate.value
  );
});


const photos = computed(() => {
  return (
    activeReport.value?.images?.map((img) =>
      typeof img === "string" ? img : img.url
    ) || []
  );
});


const materialData = computed(() => activeReport.value?.materials || []);
const expenseData = computed(() => activeReport.value?.expenses || []);


const materialColumns = [
  {
    title: "Material Name",
    key: "name",
    render: (row) =>
      h("div", { style: "display:flex; align-items:center; gap:15px;" }, [
        h(NAvatar, { src: row.image || "", round: true, size: 40 }),
        h("strong", row.name),
      ]),
  },
  { title: "Quantity Used", key: "used_quantity" },
  { title: "Note", key: "note" },
];

const expenseColumns = [
  { title: "Type", key: "type" },
  { title: "Description", key: "description" },
  {
    title: "Amount",
    key: "amount",
    render: (row) => h("span", { class: "fw-bold" }, `$${row.amount}`),
  },
];
</script>

<style scoped>
.daily-summary {
  border-left: 5px solid #1d5fbf;
  color: #4b5563;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55;
  padding: 22px 24px;
}

.no-image {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f3f4f6;
  border-radius: 8px;
  font-weight: 600;
  color: #6b7280;
}

:deep(.n-base-select-menu) {
  padding: 6px 0 !important;
  border-radius: 15px;
  min-width: 280px !important; 
}

:deep(.n-base-select-menu .n-base-select-option) {
  padding: 9px 28px !important;
}

:deep(.n-base-select-option__check) {
  padding-right: 35px !important;
}

</style>