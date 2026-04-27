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
              :options="notifOptions"
              @select="handleNotifSelect"
              :theme-overrides="dropdownTheme"
              style="min-width: 280px; padding: 7px 4px"
            >
              <div class="bell-wrapper">
                <Bell :size="20" />
                <span v-if="notifications.length > 0" class="bell-badge">
                  {{ notifications.length > 99 ? "99+" : notifications.length }}
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
                  src="https://i.pinimg.com/736x/d1/07/da/d107da6a1d1fd935c529ed7a39c07aac.jpg"
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
  Earth,
  ChevronDown,
  Menu,
  X,
  ChevronRight,
} from "lucide-vue-next";
import { useProfileStore } from "@/stores/profile";
import { storeToRefs } from "pinia";

const drawerActive = ref(false);
const router = useRouter();
const route = useRoute();
const { t, locale } = useI18n();
const profileStore = useProfileStore();
const { getProfile } = storeToRefs(profileStore);

onMounted(async () => {
  await profileStore.getMe();
});

const notifications = ref([
  { id: 1, message: "Your proposal was accepted!" },
  { id: 2, message: "New message from client" },
  { id: 3, message: "Payment released" },
]);

const notifOptions = computed(() => {
  if (notifications.value.length === 0) {
    return [
      {
        label: "No notifications",
        key: "empty",
        disabled: true,
        icon: renderIcon(Bell),
      },
    ];
  }
  return notifications.value.map((n) => ({
    label: n.message,
    key: String(n.id),
    icon: renderIcon(Bell),
  }));
});

function handleNotifSelect(key) {
  notifications.value = notifications.value.filter((n) => String(n.id) !== key);
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const options = computed(() => [
  { label: t("profile.userProfile"), key: "profile", icon: renderIcon(User) },
  {
    label: t("profile.editProfile"),
    key: "editProfile",
    icon: renderIcon(Pencil),
  },
  { label: t("profile.logout"), key: "logout", icon: renderIcon(LogOut) },
]);

function handleProfileSelect(key) {
  if (key === "logout") router.push("/login");
  if (key === "profile") router.push("/profile");
  if (key === "editProfile") router.push("/edit-profile");
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
  {
    label: "Member",
    key: "member",
    icon: renderIcon(User),
    children: [
      {
        label: "Create Member",
        key: "/createMember",
        icon: renderIcon(User),
      },
      {
        label: "View Member",
        key: "/customers",
        icon: renderIcon(User),
      },
    ],
  },
  {
    label: t("menu.beverage"),
    key: "beverage",
    icon: renderIcon(Wine),
    children: [
      { label: t("menu.whisky"), key: "/whisky", icon: renderIcon(Wine) },
      { label: t("menu.wine"), key: "/wine", icon: renderIcon(Wine) },
    ],
  },
  { label: t("menu.settings"), key: "/about", icon: renderIcon(Settings) },
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

<style scoped>
.navbar-wrapper {
  padding: 12px 12px 0 12px;
  background-color: #f3f4f6;
  flex-shrink: 0;
}

.navbar-inner {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 8px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-info {
  gap: 15px;
}

.layout-wrapper {
  flex: 1;
  padding: 8px 12px;
  background-color: #f3f4f6;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.layout-card {
  flex: 1;
  border-radius: 16px !important;
  overflow: hidden !important;
  min-height: 0;
}

.content-area {
  padding: 15px;
}

/* Hamburger button */
.hamburger-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1f1f1f;
  transition: background 0.2s;
}
.hamburger-btn:hover {
  background-color: #f3f4f6;
}

/* Drawer profile section */
.drawer-profile {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 16px 12px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 4px;
}

.bell-wrapper {
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s;
}

.bell-wrapper:hover {
  background-color: #f3f4f6;
}

.custom-trigger {
  position: absolute;
  right: -13px;
  top: 50%;
  transform: translateY(-50%);
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e5e7eb;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: background 0.2s;
}

.bell-badge {
  position: absolute;
  top: 2px;
  right: 2px;
  background-color: #f97316;
  color: white;
  font-size: 9px;
  font-weight: 700;
  min-width: 16px;
  height: 16px;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  line-height: 1;
}

.nav-divider {
  width: 1px;
  height: 24px;
  background-color: #e5e7eb;
}

.profile {
  padding: 3px 15px;
}

.profile:hover {
  background-color: #f3f4f6;
}

:deep(.n-layout-sider) {
  overflow: visible !important;
}

:deep(.n-menu-item-content) {
  border-left: none !important;
  border-radius: 10px !important;
  margin: 2px 8px !important;
  padding-left: 12px !important;
  position: relative !important;
}

:deep(.n-menu-item-content::before) {
  border-radius: 10px !important;
  left: 0 !important;
  right: 0 !important;
}

:deep(.n-menu-item-content__icon) {
  width: 32px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-right: 10px !important;
  flex-shrink: 0 !important;
}

:deep(.n-menu-item--indent) {
  width: 0 !important;
}

:deep(.n-submenu-children .n-menu-item-content) {
  padding-left: 40px !important;
  margin-left: 8px !important;
  margin-right: 8px !important;
}

:deep(.n-menu-item-content--selected::after),
:deep(.n-menu--collapsed .n-menu-item-content--child-active-closed::after) {
  content: "" !important;
  position: absolute !important;
  left: 8px !important;
  top: 8px !important;
  bottom: 8px !important;
  width: 3px !important;
  background-color: #f97316 !important;
  border-radius: 99px !important;
}

:deep(.n-submenu-children .n-menu-item-content--selected::after) {
  content: "" !important;
  position: absolute !important;
  left: 35px !important;
  top: 8px !important;
  bottom: 8px !important;
  width: 4px !important;
  background-color: #f97316 !important;
  border-radius: 99px !important;
}

:deep(.n-scrollbar-rail.n-scrollbar-rail--vertical) {
  top: 77px !important;
  bottom: 30px !important;
  right: 4px !important;
}

:deep(.n-scrollbar-rail.n-scrollbar-rail--vertical .n-scrollbar-thumb) {
  border-radius: 99px !important;
  background-color: rgba(0, 0, 0, 0.15) !important;
  width: 6px !important;
}

/* Hide desktop sider on mobile at layout level */
@media (max-width: 991.98px) {
  :deep(.n-layout-sider) {
    display: none !important;
  }
  .navbar-inner {
    padding: 8px 5px;
  }
  .nav-info {
    gap: 0px;
  }
  .profile {
    padding-right: 5px;
  }
}

.responsive-title {
  font-size: clamp(13px, 3vw, 20px);
}
</style>
