<template>
  <div class="row pt-3 g-4">
    <div class="col-12">
      <h5 class="fw-bold mb-3">Daily Summary</h5>
      <div class="daily-summary bg-main shadow-box rounded-4">
        <p class="m-0">
          Structural concrete pour for the main columns on Level 12 completed
        </p>
      </div>
    </div>

    <div class="col-12">
      <div class="card p-4 rounded-4 shadow-box border-3">
        <h5 class="fw-bold mb-3">Site Progress Photos</h5>
        <n-image-group>
          <n-carousel
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
              :style="{
                borderRadius: '8px',
                width: '100%',
                height: '250px',
              }"
            />
          </n-carousel>
        </n-image-group>
      </div>
    </div>

    <div class="col-12">
      <h5 class="fw-bold mb-3">Material Used</h5>
      <n-data-table
        :columns="materialColumns"
        :data="materialData"
        :pagination="false"
        :bordered="false"
        :class="['task-table', { 'h-100': materialData.length === 0 }]"
      />
    </div>

    <div class="col-12">
      <h5 class="fw-bold mb-3">Expensed</h5>
      <n-data-table
        :columns="expenseColumns"
        :data="expenseData"
        :pagination="false"
        :bordered="false"
        :class="['task-table', { 'h-100': materialData.length === 0 }]"
      />
    </div>
  </div>
</template>

<script setup>
import { h } from "vue";
import { NAvatar } from "naive-ui";

const photos = [
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
];

const materialColumns = [
  {
    title: "Material Name",
    key: "name",
    render: (row) =>
      h("div", { style: "display:flex; align-items:center; gap:15px;" }, [
        h(NAvatar, {
          src: row.img,
          round: true,
          size: 40,
          objectFit: "cover",
        }),
        h("strong", row.name),
      ]),
  },
  { title: "Quantity", key: "qty" },
  { title: "Note", key: "note" },
];

const materialData = [
  {
    img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100",
    name: "Ready-mix Concrete (C40)",
    qty: "450 m³",
    note: "Level 12 slab",
  },
  {
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100",
    name: "Steel Rebar (16mm)",
    qty: "2.4 Tons",
    note: "Column reinforcement",
  },
  {
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100",
    name: "Curing Compound",
    qty: "12 Units",
    note: "Applied to slab area",
  },
];

const expenseColumns = [
  {
    title: "Type",
    key: "type",
  },
  {
    title: "Description",
    key: "description",
  },
  {
    title: "Amount",
    key: "amount",
    render: (row) => h("span", { class: "fw-bold" }, `$${row.amount}`),
  },
];

const expenseData = [
  { type: "transport", amount: 50, description: "Truck fuel" },
  { type: "labor", amount: 1200, description: "Extension for finishing crew" },
  { type: "equipment", amount: 2200, description: "Specialized pump hire" },
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
</style>
