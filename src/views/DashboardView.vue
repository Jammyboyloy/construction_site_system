<template>
  <div>
    <div class="d-flex align-items-center justify-content-between mb-3">
      <BaseTitle title="Dashboard" />
      <n-tag round :bordered="false" type="warning">
        {{ todayLabel }}
      </n-tag>
    </div>

    <div class="row g-4">
      <div
        v-for="item in stats"
        :key="item.label"
        class="col-12 col-sm-6 col-xl-3"
      >
        <div class="card dashboard-card shadow-box rounded-4 border-3">
          <div class="d-flex justify-content-between align-items-start">
            <div>
              <p class="text-secondary fs-7 mb-2">{{ item.label }}</p>
              <h3 class="fw-bold mb-1">{{ item.value }}</h3>
              <div
                class="d-flex align-items-center gap-1 fs-7"
                :class="item.trendType === 'up' ? 'text-success' : 'text-prime'"
              >
                <component :is="item.trendType === 'up' ? TrendingUp : Clock" :size="14" />
                <span>{{ item.note }}</span>
              </div>
            </div>
            <div class="stat-icon">
              <component :is="item.icon" :size="22" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mt-1">
      <div class="col-12 col-xl-6">
        <div class="card p-4 rounded-4 shadow-box border-3 h-100">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <h5 class="fw-bold mb-0">Project Overview</h5>
            <button class="view-link">View All Projects</button>
          </div>

          <div class="project-overview">
            <div class="donut-wrap">
              <div class="project-donut">
                <div class="donut-center">
                  <h4 class="fw-bold mb-0">24</h4>
                  <p class="m-0">TOTAL</p>
                </div>
              </div>
            </div>

            <div class="overview-content">
              <div class="overview-stats">
                <div
                  v-for="item in projectSummary"
                  :key="item.label"
                  class="overview-stat"
                >
                  <h6 class="fw-bold mb-1">{{ item.value }}</h6>
                  <p class="m-0">{{ item.label }}</p>
                </div>
              </div>

              <div class="overview-bars">
                <div
                  v-for="project in overviewProjects"
                  :key="project.name"
                  class="overview-bar-item"
                >
                  <div class="d-flex justify-content-between mb-1">
                    <span class="fw-bold">{{ project.name }}</span>
                    <span class="fw-bold">{{ project.progress }}%</span>
                  </div>
                  <n-progress
                    type="line"
                    :percentage="project.progress"
                    :show-indicator="false"
                    :height="8"
                    color="#f97316"
                    rail-color="#edf2f7"
                    processing
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-xl-6">
        <div class="card p-4 rounded-4 shadow-box border-3">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 class="fw-bold mb-1">Recent Daily Reports</h5>
              <p class="m-0 text-secondary fs-7">Latest supervisor submissions</p>
            </div>
          </div>
          <n-data-table
            :columns="reportColumns"
            :data="reports"
            :pagination="false"
            :bordered="false"
            class="dashboard-table"
          />
        </div>
      </div>
    </div>

  
  </div>
</template>

<script setup>
import { h } from "vue";
import { NAvatar, NTag } from "naive-ui";
import BaseTitle from "@/components/BaseTitle.vue";
import {
  BriefcaseBusiness,
  CalendarDays,
  Clock,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-vue-next";

const todayLabel = new Intl.DateTimeFormat("en-US", {
  weekday: "short",
  month: "short",
  day: "numeric",
  year: "numeric",
}).format(new Date());

const stats = [
  {
    label: "Total Projects",
    value: "18",
    note: "4 active now",
    trendType: "up",
    icon: BriefcaseBusiness,
  },
  {
    label: "Workers On Site",
    value: "126",
    note: "12 assigned today",
    trendType: "up",
    icon: Users,
  },
  {
    label: "Pending Reports",
    value: "7",
    note: "Need review",
    trendType: "pending",
    icon: CalendarDays,
  },
  {
    label: "Monthly Expense",
    value: "$24.5K",
    note: "72% budget used",
    trendType: "pending",
    icon: DollarSign,
  },
];

const projects = [
  {
    name: "Skyline Tower - Phase 2",
    location: "Phnom Penh",
    progress: 65,
    status: "In Progress",
    tagType: "info",
  },
  {
    name: "Villa Borey Project",
    location: "Kandal",
    progress: 42,
    status: "Foundation",
    tagType: "warning",
  },
  {
    name: "Warehouse Renovation",
    location: "Sen Sok",
    progress: 82,
    status: "Ahead",
    tagType: "success",
  },
  {
    name: "Riverfront Office Fit-out",
    location: "Daun Penh",
    progress: 28,
    status: "Delayed",
    tagType: "error",
  },
];

const projectSummary = [
  {
    label: "ACTIVE",
    value: "12",
  },
  {
    label: "COMPLETED",
    value: "8",
  },
  {
    label: "PLANNING",
    value: "4",
  },
];

const overviewProjects = [
  {
    name: "Skyline Tower",
    progress: 85,
  },
  {
    name: "Bridge Renovation",
    progress: 45,
  },
  {
    name: "Eco-Mall Complex",
    progress: 22,
  },
];

const reports = [
  {
    project: "Skyline Tower - Phase 2",
    supervisor: "Lay Jammy",
    avatar:
      "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg",
    date: "02 May 2026",
    status: "Reviewed",
    type: "success",
  },
  {
    project: "Villa Borey Project",
    supervisor: "John Doe",
    avatar:
      "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg",
    date: "02 May 2026",
    status: "Pending",
    type: "warning",
  },
  {
    project: "Warehouse Renovation",
    supervisor: "Jane Smith",
    avatar:
      "https://i.pinimg.com/736x/d4/31/f3/d431f371ff8022afe63ca21363c87252.jpg",
    date: "01 May 2026",
    status: "Reviewed",
    type: "success",
  },
];

const reportColumns = [
  {
    title: "PROJECT",
    key: "project",
    render(row) {
      return h("span", { class: "fw-bold" }, row.project);
    },
  },
  {
    title: "SUPERVISOR",
    key: "supervisor",
    render(row) {
      return h("div", { class: "d-flex align-items-center gap-2" }, [
        h(NAvatar, {
          src: row.avatar,
          round: true,
          size: 30,
          objectFit: "cover",
        }),
        h("span", row.supervisor),
      ]);
    },
  },
  {
    title: "DATE",
    key: "date",
  },
  {
    title: "STATUS",
    key: "status",
    render(row) {
      return h(
        NTag,
        {
          round: true,
          bordered: false,
          type: row.type,
        },
        { default: () => row.status },
      );
    },
  },
];

</script>

<style scoped>
.dashboard-card {
  min-height: 135px;
  padding: 22px;
}

.stat-icon {
  align-items: center;
  background: #fff7ed;
  border-radius: 14px;
  color: #f97316;
  display: flex;
  height: 48px;
  justify-content: center;
  width: 48px;
}

.project-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.project-row {
  border-bottom: 1px solid #eef0f3;
  padding-bottom: 18px;
}

.project-row:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}

.progress-value {
  min-width: 44px;
  text-align: right;
}

.view-link {
  background: transparent;
  border: 0;
  color: #f97316;
  font-size: 12px;
  font-weight: 700;
  padding: 0;
}

.project-overview {
  align-items: center;
  display: grid;
  gap: 28px;
  grid-template-columns: 170px 1fr;
}

.donut-wrap {
  display: flex;
  justify-content: center;
}

.project-donut {
  align-items: center;
  background: conic-gradient(#f97316 0deg 216deg, #14b88a 216deg 306deg, #e9eef5 306deg 360deg);
  border-radius: 50%;
  display: flex;
  height: 140px;
  justify-content: center;
  width: 140px;
}

.donut-center {
  align-items: center;
  background: #fff;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  height: 90px;
  justify-content: center;
  width: 90px;
}

.donut-center p,
.overview-stat p {
  color: #667085;
  font-size: 10px;
  font-weight: 700;
}

.overview-content {
  display: flex;
  flex-direction: column;
  gap: 22px;
  min-width: 0;
}

.overview-stats {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.overview-stat {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px;
  text-align: center;
}

.overview-bars {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.overview-bar-item span {
  color: #1f2937;
  font-size: 12px;
}

.budget-ring {
  display: flex;
  justify-content: center;
}

.budget-grid {
  display: grid;
  gap: 18px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.activity-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.activity-item {
  align-items: center;
  background: #f8fafc;
  border: 1px solid #edf0f3;
  border-radius: 14px;
  display: flex;
  gap: 12px;
  min-height: 78px;
  padding: 14px;
}

:deep(.dashboard-table .n-data-table-wrapper) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.dashboard-table .n-data-table-th) {
  background-color: #fff !important;
  color: #8e99a7 !important;
  font-size: 12px !important;
  font-weight: 700 !important;
}

@media (max-width: 575px) {
  .activity-grid,
  .budget-grid {
    grid-template-columns: 1fr;
  }

  .project-overview {
    grid-template-columns: 1fr;
  }

  .overview-stats {
    grid-template-columns: 1fr;
  }
}
</style>
