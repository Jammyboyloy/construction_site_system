import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: "/login",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/admin/",
      component: () => import("../layouts/AdminLayout.vue"),
      children: [
        {
          path: "dashboard",
          component: () => import("../views/DashboardView.vue"),
        },
        {
          path: "createProject",
          component: () => import("../views/admin/project/CreateProjectView.vue"),
        },
        {
          path: "editProject/:id",
          component: () => import("../views/admin/project/EditProjectView.vue"),
        },
        {
          path: "viewProject",
          component: () => import("../views/admin/project/ProjectView.vue"),
        },
        {
          path: "viewProjectById/:id",
          component: () => import("../views/admin/project/ViewProjectById.vue"),
        },
        {
          path: "createMember",
          component: () => import("../views/admin/member/CreateMemberView.vue"),
        },
        {
          path: "about",
          component: () => import("../views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/supervisor/",
      component: () => import("../layouts/SupervisorLayout.vue"),
      children: [
        {
          path: "myProject",
          component: () => import("../views/supervisor/GetMyProjectView.vue"),
        },
        {
          path: "attendance",
          component: () => import("../views/supervisor/CheckInCheckOutView.vue"),
        },
        {
          path: "createTask",
          component: () => import("../views/supervisor/CreateTaskView.vue"),
        },
        {
          path: "createDailyReport",
          component: () => import("../views/supervisor/CreateDailyReportView.vue"),
        },
        {
          path: "PreviewTaskWorker",
          component: () => import("../views/supervisor/PreviewTaskWorkerView.vue"),
        },
        {
          path: "ViewTask",
          component: () => import("../views/supervisor/ViewProjectTask.vue"),
        },
        {
          path: "myProfile",
          component: () => import("../views/MyProfileView.vue"),
        },
      ],
    },
    {
      path: "/worker/",
      component: () => import("../layouts/WorkerLayout.vue"),
      children: [
        {
          path: "myProject",
          component: () => import("../views/worker/GetMyProject.vue"),
        },
        {
          path: "myTask",
          component: () => import("../views/worker/GetMyTaskView.vue"),
        },
        {
          path: "scanQr",
          component: () => import("../views/worker/ScanAttendance.vue"),
        },
      ],
    },
    {
      path: "/client/",
      component: () => import("../layouts/ClientLayout.vue"),
      children: [
        {
          path: "myProject",
          component: () => import("../views/supervisor/GetMyProjectView.vue"),
        },
        {
          path: "attendance",
          component: () => import("../views/supervisor/CheckInCheckOutView.vue"),
        },
        {
          path: "ViewTask",
          component: () => import("../views/supervisor/ViewProjectTask.vue"),
        },
      ],
    },
  ],
});

export default router;
