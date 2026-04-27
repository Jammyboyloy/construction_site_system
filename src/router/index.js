import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
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
          path: "viewProject",
          component: () => import("../views/admin/project/ProjectView.vue"),
        },
        {
          path: "viewProjectById",
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
      ],
    },
  ],
});

export default router;
