<template>
  <div>
    <div class="d-flex align-items-center mb-3">
      <BaseTitle title="Skyline Tower-Phase 2" />
    </div>

    <n-tabs type="line" animated>
      <n-tab-pane
        name="overview"
        tab="Overview"
        class="d-flex flex-column gap-4"
      >
        <div class="d-flex flex-column gap-4">
          <div class="row pt-3 g-4">
            <div class="col-lg-6">
              <div class="card shadow-box rounded-4 border-3">
                <div class="card-img" style="height: 245px">
                  <img
                    src="https://i.pinimg.com/1200x/03/91/eb/0391eb49f97bd74318fd5e3797aeef26.jpg"
                    alt="Project Image"
                    class="w-100 h-100 object-fit-cover rounded-4"
                  />
                  <div class="card-img-overlay bg-dark opacity-50 rounded-4"></div>
                  <div class="card-img-overlay text-light">
                    <h6 class="text-prime fs-6 ls fw-bold mt-2">Project Overview</h6>
                    <h4 class="fw-bold mb-3 ls">Skyline Tower-Phase 2</h4>
                    <div class="d-flex align-items-center mb-2">
                      <MapPin size="20" />
                      <p class="m-0 fs-6 ms-1 fw-bold ls">Phnom Penh</p>
                    </div>
                    <div class="d-flex align-items-center mb-2">
                      <DollarSign size="20" />
                      <p class="m-0 fs-6 ms-1 fw-bold ls">50000</p>
                    </div>
                    <div class="d-flex align-items-center fs-6 gap-1 mb-3 fw-bold ls">
                      <Calendar size="20" />
                      <p class="m-0 mx-1">20 Jan 2026</p>
                      <ArrowRight size="20" />
                      <p class="m-0 mx-1">20 Jun 2027</p>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                      <n-avatar
                        round
                        :size="35"
                        src="https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg"
                      />
                      <div>
                        <p class="m-0 fs-8">Client</p>
                        <p class="m-0 fs-7 fw-bold">Lay Jammy</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-6">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <n-progress
                  type="circle"
                  :percentage="65"
                  :offset-degree="180"
                  style="width: 160px"
                  :stroke-width="9"
                  color="#f97316"
                  class="mx-auto mb-3"
                />
                <p class="text-center mb-0 text-secondary fs-6">Overall Progress</p>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-lg-12">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <div class="d-flex justify-content-between">
                  <div>
                    <h5 class="mb-2 fw-bold">Budget Allocation</h5>
                    <div class="d-flex mb-2">
                      <p class="m-0 fs-7 text-secondary me-1">Total Budget:</p>
                      <DollarSign size="15" class="text-prime" />
                      <p class="m-0 fs-7 fw-bold ls text-prime">50000</p>
                    </div>
                  </div>
                  <div>
                    <div class="d-flex mb-2">
                      <DollarSign size="20" class="text-prime" />
                      <h5 class="m-0 fw-bold ls text-prime">50000</h5>
                    </div>
                    <p class="m-0 text-secondary fs-7">Utilized to date</p>
                  </div>
                </div>
                <div class="mb-2">
                  <n-progress
                    type="line"
                    :percentage="60"
                    :show-indicator="false"
                    processing
                    :height="15"
                    color="#f97316"
                  />
                </div>
                <div class="d-flex fs-7 justify-content-end mt-1">
                  <p class="m-0 text-secondary me-1">Project Budget:</p>
                  <DollarSign size="15" class="text-prime" />
                  <p class="m-0 fw-bold ls text-prime me-1">50000</p>
                  <p class="m-0 text-secondary">Remaining</p>
                </div>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-12">
              <div class="card p-4 rounded-4 shadow-box border-3">
                <h5 class="fw-bold mb-3">Site Progress Photos</h5>
                <n-image-group>
                  <n-carousel
                    :slides-per-view="3"
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
                      :style="{ borderRadius: '8px', width: '100%', height: '250px' }"
                    />
                  </n-carousel>
                </n-image-group>
              </div>
            </div>
          </div>

          <div class="row g-4">
            <div class="col-lg-12">
              <h5 class="fw-bold mb-3">Material</h5>
              <n-data-table
                :columns="columns2"
                :data="data2"
                :pagination="data2.length >= 4 ? { pageSize: 3 } : false"
                :bordered="false"
                :class="['task-table', { 'h-100': data2.length === 0 }]"
              />
            </div>
          </div>
        </div>
      </n-tab-pane>

      <n-tab-pane name="team" tab="Team">
        <div class="row pt-3 g-4">
          <div class="col-lg-4">
            <div
              class="card p-4 rounded-4 shadow-box border-3 d-flex flex-column justify-content-center gap-4"
            >
              <h5 class="m-0 fw-bold">
                <User size="25" class="text-prime me-2" /> Supervisor
              </h5>
              <div class="d-flex align-items-center gap-2 bg-main p-3 rounded-4 shadow-box">
                <n-avatar round :size="45" :src="supervisor.src" />
                <div>
                  <p class="m-0 mb-1 fs-6 fw-bold">{{ supervisor.name }}</p>
                  <p class="m-0 fs-7 text-secondary ls">{{ supervisor.email }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="col-lg-8">
            <n-data-table
              :columns="columns3"
              :data="data3"
              :pagination="data3.length >= 4 ? { pageSize: 3 } : false"
              :bordered="false"
              :class="['task-table tb-h', { 'h-100': data3.length === 0 }]"
            />
          </div>
        </div>
      </n-tab-pane>

      <n-tab-pane name="dailyReport" tab="Daily Report">
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
                    :style="{ borderRadius: '8px', width: '100%', height: '250px' }"
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
              :class="['task-table', { 'h-100': expenseData.length === 0 }]"
            />
          </div>
        </div>
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<script setup>
import { h, ref } from "vue";
import { NTag, NAvatar, NProgress } from "naive-ui";
import {
  MapPin,
  DollarSign,
  Calendar,
  ArrowRight,
  ArrowRightLeft,
  User,
} from "lucide-vue-next";
import BaseTitle from "@/components/BaseTitle.vue";

// ── Supervisor ──────────────────────────────────────────────
const supervisor = ref({
  name: "John Supervisor",
  email: "john@example.com",
  src: "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg",
});

// ── Photos ──────────────────────────────────────────────────
const photos = [
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
];

// ── Material table (overview) ────────────────────────────────
const data2 = [
  { name: "Structural Steel", used: "62", remaining: "38% left", image: "https://i.pravatar.cc/40?img=1" },
  { name: "Concrete Mix",     used: "450", remaining: "55% left", image: "https://i.pravatar.cc/40?img=2" },
  { name: "Elec. Conduit",    used: "1.2", remaining: "82% left", image: "https://i.pravatar.cc/40?img=3" },
];

const columns2 = [
  {
    title: "MATERIAL NAME",
    key: "name",
    render: (row) =>
      h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, { src: row.image, round: true, size: 28, objectFit: "cover" }),
        h("span", { class: "fw-medium" }, row.name),
      ]),
  },
  { title: "USED", key: "used" },
  {
    title: "REMAINING",
    key: "remaining",
    render: (row) => h("span", { class: "text-prime fw-bold" }, row.remaining),
  },
];

// ── Team table ───────────────────────────────────────────────
const data3 = ref([
  {
    name: "John Doe",
    image: "https://i.pravatar.cc/40?img=10",
    skill: "Electrician",
    rate: "$25",
    active: true,
  },
  {
    name: "Jane Smith",
    image: "https://i.pravatar.cc/40?img=20",
    skill: "Plumber",
    rate: "$18",
    active: false,
  },
  {
    name: "Mike Johnson",
    image: "https://i.pravatar.cc/40?img=30",
    skill: "Carpenter",
    rate: "$30",
    active: true,
  },
]);

const columns3 = [
  {
    title: "NAME",
    key: "name",
    render: (row) =>
      h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, { src: row.image, round: true, size: 32, objectFit: "cover" }),
        h("span", { class: "fw-medium" }, row.name),
      ]),
  },
  {
    title: "SKILL TYPE",
    key: "skill",
    render: (row) =>
      h(NTag, { bordered: false, round: true, size: "small", type: "info", style: "font-weight:500; padding:0 12px" },
        { default: () => row.skill }),
  },
  {
    title: "RATE",
    key: "rate",
    render: (row) => h("span", { class: "fw-bold text-prime" }, row.rate),
  },
  {
    title: "STATUS",
    key: "status",
    render: (row) =>
      h(NTag, { bordered: false, round: true, size: "small", type: row.active ? "success" : "error", style: "font-weight:500; padding:0 12px" },
        { default: () => (row.active ? "Active" : "Inactive") }),
  },
];

// ── Daily Report ─────────────────────────────────────────────
const materialColumns = [
  {
    title: "Material Name",
    key: "name",
    render: (row) =>
      h("div", { style: "display:flex; align-items:center; gap:15px;" }, [
        h(NAvatar, { src: row.img, round: true, size: 40, objectFit: "cover" }),
        h("strong", row.name),
      ]),
  },
  { title: "Quantity", key: "qty" },
  { title: "Note", key: "note" },
];

const materialData = [
  { img: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=100", name: "Ready-mix Concrete (C40)", qty: "450 m³", note: "Level 12 slab" },
  { img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100",    name: "Steel Rebar (16mm)",       qty: "2.4 Tons", note: "Column reinforcement" },
  { img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=100", name: "Curing Compound",          qty: "12 Units", note: "Applied to slab area" },
];

const expenseColumns = [
  { title: "Type",        key: "type" },
  { title: "Description", key: "description" },
  {
    title: "Amount",
    key: "amount",
    render: (row) => h("span", { class: "fw-bold" }, `$${row.amount}`),
  },
];

const expenseData = [
  { type: "Transport",  amount: 50,   description: "Truck fuel" },
  { type: "Labor",      amount: 1200, description: "Extension for finishing crew" },
  { type: "Equipment",  amount: 2200, description: "Specialized pump hire" },
];
</script>

<style scoped>
:deep(.n-carousel-item) {
  width: auto !important;
}

:deep(.n-image) {
  width: 100% !important;
  display: block;
}

:deep(.n-image img) {
  width: 100% !important;
  height: 250px !important;
  object-fit: cover;
  border-radius: 8px;
}

:deep(.n-tabs-tab__label) {
  font-size: 15px;
  font-weight: 550;
  letter-spacing: 0.2px;
}

:deep(.task-table .n-data-table-wrapper) {
  overflow: hidden;
  background-color: #ffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.06);
  border: 3px solid #ebebeb;
  border-radius: 12px;
}

:deep(.n-data-table-th) {
  background-color: #ffff !important;
  color: #8e99a7 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
  padding: 18px !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.n-data-table-td) {
  padding: 15px !important;
  height: 60px !important;
}

:deep(.tb-h .n-data-table-td) {
  padding: 15px !important;
  height: 63px !important;
}

:deep(.n-data-table__pagination) {
  padding-top: 5px !important;
  padding-bottom: 0px !important;
}

:deep(.task-table .n-data-table-tbody tr:last-child td) {
  border-bottom: none !important;
}

:deep(.task-table .n-data-table-td) {
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.daily-summary {
  border-left: 5px solid #1d5fbf;
  color: #4b5563;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.55;
  padding: 22px 24px;
}
</style>