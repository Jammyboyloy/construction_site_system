<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <div class="d-flex flex-column vh-100">
      <!-- NAVBAR -->
      <div class="navbar-wrapper">
        <div class="navbar-inner shadow-box">
          <div class="d-flex align-items-center gap-2">
            <!-- Hamburger: only on small screens -->
            <button
              class="hamburger-btn d-flex d-lg-none"
              @click="drawerActive = true"
              aria-label="Open menu"
            >
              <Menu :size="18" />
            </button>
            <h5 class="fw-bold m-0 text-prime ls responsive-title">
              {{ t("navbar.title") }}
            </h5>
          </div>

          <div class="nav-info d-flex align-items-center">
            <!-- Bell -->
            <n-dropdown
              trigger="click"
              :options="notificationOptions"
              :theme-overrides="dropdownTheme"
              style="min-width: 280px; padding: 7px 4px"
              @update:show="handleDropdownOpen"
            >
              <div class="bell-wrapper">
                <Bell :size="20" />
                <span v-if="unreadCount > 0" class="bell-badge">
                  {{ unreadCount > 99 ? "99+" : unreadCount }}
                </span>
              </div>
            </n-dropdown>

            <div class="nav-divider d-none d-lg-block" />

            <!-- Profile -->
            <n-dropdown
              trigger="click"
              :options="options"
              @select="handleProfileSelect"
              :theme-overrides="dropdownTheme"
              style="min-width: 150px; padding: 7px 4px"
            >
              <div
                class="d-flex gap-2 align-items-center rounded-3 profile cursor-pointer"
              >
                <img
                  :src="getProfile.avatar"
                  alt=""
                  class="img-fluid rounded-circle object-fit-cover"
                  style="width: 35px; height: 35px"
                />
                <div class="d-none d-sm-flex flex-column">
                  <p class="fs-7 fw-bold m-0 p-0">{{ getProfile.name }}</p>
                  <small class="fs-8 text-secondary">{{
                    getProfile.role
                  }}</small>
                </div>
              </div>
            </n-dropdown>
          </div>
        </div>
      </div>

      <!-- SIDEBAR + CONTENT (desktop) -->
      <div class="layout-wrapper">
        <n-layout has-sider class="layout-card shadow-box">
          <!-- SIDEBAR -->
          <n-layout-sider
            bordered
            collapse-mode="width"
            :collapsed-width="70"
            :width="240"
            :collapsed="collapsed"
            @collapse="collapsed = true"
            @expand="collapsed = false"
            class="py-2 d-none d-lg-flex position-relative"
          >
            <n-menu
              v-model:value="activeKey"
              :collapsed="collapsed"
              :collapsed-width="64"
              :collapsed-icon-size="18"
              :options="menuOptions"
              :expanded-keys="expandedKeys"
              @update:expanded-keys="onUpdateExpandedKeys"
              @update:value="handleMenuClick"
            />

            <div class="custom-trigger" @click="collapsed = !collapsed">
              <ChevronRight
                :size="16"
                :style="{
                  transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
                  transition: 'transform 0.3s',
                }"
              />
            </div>
          </n-layout-sider>

          <n-layout>
            <n-scrollbar>
              <div class="content-area">
                <div class="container-fluid p-3">
                  <router-view />
                </div>
              </div>
            </n-scrollbar>
          </n-layout>
        </n-layout>
      </div>

      <!-- MOBILE DRAWER: visible only on < lg -->
      <n-drawer
        v-model:show="drawerActive"
        :width="260"
        placement="left"
        :trap-focus="false"
        class="d-lg-none"
      >
        <n-drawer-content
          :native-scrollbar="false"
          :body-content-style="{ padding: 0 }"
        >
          <!-- Drawer Header -->
          <template #header>
            <div
              class="d-flex align-items-center justify-content-between w-100"
            >
              <h6 class="fw-bold m-0 text-prime">{{ t("navbar.title") }}</h6>
              <button
                class="hamburger-btn"
                @click="drawerActive = false"
                aria-label="Close menu"
              >
                <X :size="18" />
              </button>
            </div>
          </template>

          <!-- Menu inside drawer -->
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            :expanded-keys="expandedKeys"
            @update:expanded-keys="onUpdateExpandedKeys"
            @update:value="handleMenuClickMobile"
            style="padding: 8px 0"
          />
        </n-drawer-content>
      </n-drawer>
    </div>
  </n-config-provider>
</template>

<script setup>
import { ref, watch, computed, nextTick, h, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { NIcon } from "naive-ui";
import {
  Book,
  User,
  Wine,
  LayoutDashboard,
  Settings,
  Folder,
  FileText,
  Check,
  LogOut,
  Pencil,
  Bell,
  BellRing,
  BellOff,
  Earth,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
} from "lucide-vue-next";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";
import { useNotificationStore } from "@/stores/notification";

const drawerActive = ref(false);
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const profileStore = useProfileStore();
const { getProfile } = storeToRefs(profileStore);

const notificationStore = useNotificationStore();
const { getNotification: notifications, unreadCount } =
  storeToRefs(notificationStore);

onMounted(async () => {
  await profileStore.getMe();
  await notificationStore.getMyNotification();
});

function timeAgo(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 1000);

  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}mn ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  if (diff < 2592000) return `${Math.floor(diff / 604800)}w ago`;
  if (diff < 31536000) return `${Math.floor(diff / 2592000)}mo ago`;
  return `${Math.floor(diff / 31536000)}y ago`;
}

const notificationOptions = computed(() => {
  if (notifications.value.length === 0) {
    return [
      {
        label: "No notifications",
        key: "empty",
        disabled: true,
        icon: renderIcon(BellOff),
      },
    ];
  }
  return notifications.value.map((n) => ({
    key: String(n.id),
    icon: renderIcon(BellRing),
    label: () =>
      h("div", { style: "display: flex; gap: 8px" }, [
        h("span", { style: "font-size: 14px" }, n.message),
        h("span", { style: "font-size: 14px" }, "·"),
        h(
          "span",
          { style: "font-size: 12px; color: #999" },
          timeAgo(n.created_at),
        ),
      ]),
  }));
});

async function handleDropdownOpen(show) {
  if (show && unreadCount.value > 0) {
    await notificationStore.readAllNotification();
  }
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const options = computed(() => [
  { label: t("profile.userProfile"), key: "profile", icon: renderIcon(User) },
  { label: t("profile.logout"), key: "logout", icon: renderIcon(LogOut) },
]);

function handleProfileSelect(key) {
  if (key === "logout") router.push("/login");
  if (key === "profile") router.push("/client/myProfile");
}

const menuOptions = computed(() => [
  {
    label: "Dashboard",
    key: "/dashboard",
    icon: renderIcon(LayoutDashboard),
  },
  {
    label: "Project",
    key: "projects",
    icon: renderIcon(Book),
    children: [
      {
        label: "Create Project",
        key: "/createProject",
        icon: renderIcon(FileText),
      },
      {
        label: "View Project",
        key: "/viewProject",
        icon: renderIcon(Folder),
      },
    ],
  },
  { label: t("menu.settings"), key: "/client/myProfile", icon: renderIcon(Settings) },
]);

const activeKey = ref(route.path);
const collapsed = ref(false);
const expandedKeys = ref([]);

function handleMenuClick(key) {
  if (key.startsWith("/")) router.push(key);
}

function handleMenuClickMobile(key) {
  if (key.startsWith("/")) {
    router.push(key);
    drawerActive.value = false;
  }
}

watch(
  () => route.path,
  (newPath) => {
    activeKey.value = newPath;
  },
);

function onUpdateExpandedKeys(keys) {
  expandedKeys.value = keys;
}

const activeParentKey = computed(() => {
  for (const option of menuOptions.value) {
    if (option.children) {
      const found = option.children.find((c) => c.key === activeKey.value);
      if (found) return option.key;
    }
  }
  return null;
});

const showParentBorder = computed(() => {
  if (!activeParentKey.value) return false;
  if (collapsed.value) return true;
  return !expandedKeys.value.includes(activeParentKey.value);
});

function updateActiveBorderStyle() {
  let styleEl = document.getElementById("active-parent-border-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "active-parent-border-style";
    document.head.appendChild(styleEl);
  }
  if (activeParentKey.value && showParentBorder.value) {
    styleEl.innerHTML = `
      .n-menu-item-content--child-active::after,
      .n-menu-item-content--child-active-closed::after {
        content: "";
        position: absolute;
        left: 8px;
        top: 8px;
        bottom: 8px;
        width: 3px;
        background-color: #f97316;
        border-radius: 99px;
      }
      .n-menu-item-content--child-active,
      .n-menu-item-content--child-active-closed,
      .n-menu-item--child-active > .n-menu-item-content,
      .n-menu-item--child-active-closed > .n-menu-item-content {
        background-color: #F3F4F6 !important;
      }
      .n-menu-item-content--child-active .n-menu-item-content-header,
      .n-menu-item-content--child-active .n-icon,
      .n-menu-item-content--child-active-closed .n-menu-item-content-header,
      .n-menu-item-content--child-active-closed .n-icon {
        color: #f97316 !important;
      }
    `;
  } else {
    styleEl.innerHTML = "";
  }
}

const dropdownTheme = {
  common: { borderRadius: "8px" },
};

watch(
  [activeKey, expandedKeys, collapsed],
  async () => {
    await nextTick();
    updateActiveBorderStyle();
  },
  { immediate: true },
);

const themeOverrides = {
  common: {
    primaryColor: "#f97316",
    primaryColorHover: "#1A1A2E",
    primaryColorPressed: "#c2410c",
    primaryColorSuppl: "#F3F4F6",
    bodyColor: "#ffff",
    baseColor: "#ffffff",
    cardColor: "#ffffff",
    textColorBase: "#1f1f1f",
    textColor1: "#2c2c2c",
    textColor2: "#555555",
    textColor3: "#888888",
    borderColor: "#e5e5e5",
    dividerColor: "#e5e5e5",
  },
  Layout: { siderColor: "#ffff" },
  Menu: {
    itemColorHover: "#F3F4F6",
    itemTextColorHover: "#1A1A2E",
    itemColorActive: "#F3F4F6",
    itemTextColorActive: "#f97316",
    itemColorActiveHover: "#F3F4F6",
    itemTextColorActiveHover: "#f97316",
    itemColorActiveCollapsed: "#F3F4F6",
    itemTextColorChildActive: "#1A1A2E",
    itemTextColorChildActiveHover: "#1A1A2E",
    itemColorChildActiveHover: "#F3F4F6",
    itemIconColorChildActive: "#1A1A2E",
    itemIconColorChildActiveHover: "#1A1A2E",
    arrowColorChildActive: "#1A1A2E",
    arrowColorChildActiveHover: "#1A1A2E",
  },
  Input: {
    heightMedium: "40px",
    border: "1px solid #e5e5e5",
    borderHover: "1px solid #f97316",
    borderFocus: "1px solid #f97316",
    boxShadowFocus: "1px solid #f97316",
  },
};
</script>
