<template>
  <div class="d-flex flex-column gap-4">
    <div class="row pt-3 g-4">
      <div class="col-lg-5">
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

      <div class="col-lg-3">
        <div class="card p-4 rounded-4 shadow-box border-3">
          <n-progress
            type="circle"
            :percentage="percent"
            :offset-degree="180"
            style="width: 160px"
            :stroke-width="9"
            color="#f97316"
            class="mx-auto mb-3"
          />
          <p class="text-center mb-0 text-secondary fs-6">Overall Progress</p>
        </div>
      </div>

      <div class="col-lg-4">
        <div
          class="card p-4 rounded-4 shadow-box border-3 d-flex flex-column justify-content-center gap-4"
          style="height: 252px"
        >
          <h5 class="m-0 fw-bold">
            <User size="25" class="text-prime me-2" /> Supervisor
          </h5>

          <div
            class="d-flex align-items-center gap-2 bg-main p-3 rounded-4 shadow-box"
          >
            <n-avatar round :size="45" :src="supervisor.src" />
            <div>
              <p class="m-0 mb-1 fs-6 fw-bold">{{ supervisor.name }}</p>
              <p class="m-0 fs-7 text-secondary ls">
                {{ supervisor.email }}
              </p>
            </div>
          </div>

          <button
            v-if="supervisor"
            class="shadow-box border-3 rounded-3 p-2 bg-white"
          >
            <ArrowRightLeft size="16" class="me-1" /> Change Supervisor
          </button>
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
    </div>

    <div class="row g-4">
      <div class="col-lg-12">
        <h5 class="fw-bold mb-3 text-center">Material</h5>
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
</template>

<script setup>
import { h, onActivated, onMounted, ref, watch } from "vue";
import { NAvatar, NProgress, NTag } from "naive-ui";
import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  DollarSign,
  MapPin,
  User,
  UserPlus,
} from "lucide-vue-next";

const supervisorOptions = [
  {
    label: "Lay Jammy",
    value: "lay",
    src: "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg",
    email: "jammylay@gmail.com",
  },
  {
    label: "John Doe",
    value: "john",
    src: "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg",
    email: "john@gmail.com",
  },
];

const percent = ref(0);
const target = 65;
let animationFrame = null;

const confirmSupervisor = () => {
  const found = supervisorOptions.find(
    (o) => o.value === selectedSupervisor.value,
  );
  if (found) {
    emit("update:supervisor", {
      name: found.label,
      email: found.email,
      src: found.src,
    });
  }
  showModal.value = false;
};

const startAnimation = () => {
  percent.value = 0;
  let current = 0;

  const animate = () => {
    current += (target - current) * 0.1;
    percent.value = Math.round(current);

    if (current < target) {
      animationFrame = requestAnimationFrame(animate);
    } else {
      percent.value = target;
      cancelAnimationFrame(animationFrame);
    }
  };

  animate();
};

onMounted(startAnimation);
onActivated(startAnimation);

watch(
  () => props.active,
  (isActive) => {
    if (isActive) startAnimation();
  },
);

const photos = [
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel1.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel3.jpeg",
  "https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel4.jpeg",
];

const data2 = [
  {
    name: "Structural Steel",
    used: "62",
    remaining: "38% left",
    image: "https://i.pinimg.com/736x/xx1.jpg",
  },
  {
    name: "Concrete Mix",
    used: "450",
    remaining: "55% left",
    image: "https://i.pinimg.com/736x/xx2.jpg",
  },
  {
    name: "Elec. Conduit",
    used: "1.2",
    remaining: "82% left",
    image: "https://i.pinimg.com/736x/xx3.jpg",
  },
];

const columns2 = [
  {
    title: "MATERIAL NAME",
    key: "name",
    render(row) {
      return h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, {
          src: row.image,
          round: true,
          size: 28,
          objectFit: "cover",
        }),
        h("span", { class: "fw-medium" }, row.name),
      ]);
    },
  },
  {
    title: "USED",
    key: "used",
  },
  {
    title: "REMAINING",
    key: "remaining",
    render(row) {
      return h("div", {}, [
        h("span", { class: "text-prime fw-bold me-1" }, row.remaining),
      ]);
    },
  },
];
</script>

<style scoped>
.dashed-box {
  border: 2px dashed #d9d9d9;
  border-radius: 12px;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s;
}

.dashed-box:hover {
  border-color: #f97316;
  color: #f97316;
}

.dashed-box:hover .text-secondary {
  color: #f97316 !important;
}
</style>
