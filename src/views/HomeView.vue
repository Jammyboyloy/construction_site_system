<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-space vertical>
      <n-layout has-sider style="height: 100vh">
        <n-layout-sider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >
          <n-menu
            v-model:value="activeKey"
            :collapsed="collapsed"
            :collapsed-width="64"
            :collapsed-icon-size="20"
            :options="menuOptions"
            :expanded-keys="expandedKeys"
            @update:expanded-keys="onUpdateExpandedKeys"
            class="custom-menu"
          />
        </n-layout-sider>

        <n-layout content-style="padding: 30px;">
          <div class="container-fluid bg-danger text-white p-3">
            <h2>Content Area</h2>
            <p>Selected: {{ activeKey }}</p>
          </div>
        </n-layout>
      </n-layout>
    </n-space>
  </n-config-provider>
</template>

<script setup>
import { ref, h, computed, watch, nextTick, onMounted, onUnmounted } from "vue";
import { NIcon, NConfigProvider } from "naive-ui";
import {
  Book,
  User,
  Wine,
  LayoutDashboard,
  Settings,
  Folder,
  FileText,
} from "lucide-vue-next";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: "Dashboard",
    key: "dashboard",
    icon: renderIcon(LayoutDashboard),
  },
  {
    label: "Books",
    key: "books",
    icon: renderIcon(Book),
    children: [
      { label: "All Books", key: "all-books", icon: renderIcon(FileText) },
      { label: "Categories", key: "categories", icon: renderIcon(Folder) },
    ],
  },
  {
    label: "Users",
    key: "users",
    icon: renderIcon(User),
    children: [
      { label: "Admin", key: "admin", icon: renderIcon(User) },
      { label: "Customers", key: "customers", icon: renderIcon(User) },
    ],
  },
  {
    label: "Beverage",
    key: "beverage",
    icon: renderIcon(Wine),
    children: [
      { label: "Whisky", key: "whisky", icon: renderIcon(Wine) },
      { label: "Wine", key: "wine", icon: renderIcon(Wine) },
    ],
  },
  {
    label: "Settings",
    key: "settings",
    icon: renderIcon(Settings),
  },
];

const activeKey = ref("dashboard");
const collapsed = ref(false);
const expandedKeys = ref([]);

function onUpdateExpandedKeys(keys) {
  expandedKeys.value = keys;
}

const activeParentKey = computed(() => {
  for (const option of menuOptions) {
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

// ✅ SIMPLEST REAL FIX: inject a dynamic CSS rule targeting active parent
function updateActiveBorderStyle() {
  let styleEl = document.getElementById("active-parent-border-style");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "active-parent-border-style";
    document.head.appendChild(styleEl);
  }

  if (activeParentKey.value && showParentBorder.value) {
    // ✅ Use CSS that PERMANENTLY shows the border via --child-active class
    // but also covers the case when --child-active is temporarily removed
    styleEl.innerHTML = `
      /* Always show border on parent when a child is active */
      .n-menu-item-content--child-active::after,
      .n-menu-item-content--child-active-closed::after {
        content: "" !important;
        position: absolute !important;
        left: 10px !important;
        top: 10px !important;
        bottom: 10px !important;
        width: 4px !important;
        background-color: #0078d4 !important;
        border-radius: 10px !important;
      }
      /* Also for collapsed popover parent */
      .n-menu--collapsed .n-menu-item-content--child-active::after {
        content: "" !important;
        position: absolute !important;
        left: 10px !important;
        top: 10px !important;
        bottom: 10px !important;
        width: 4px !important;
        background-color: #0078d4 !important;
        border-radius: 10px !important;
      }
    `;
  } else {
    styleEl.innerHTML = "";
  }
}

watch(
  [activeKey, expandedKeys, collapsed],
  async () => {
    await nextTick();
    updateActiveBorderStyle();
  },
  { immediate: true }
);


const themeOverrides = {
  common: {
    primaryColor: "#0078d4",
    primaryColorHover: "#106ebe",
    primaryColorPressed: "#005a9e",
    primaryColorSuppl: "#0078d4",
  },
  Menu: {
    collapsedPopoverWidth: 220,
  },
};
</script>

<style scoped>
:deep(.n-menu-item-content::before) {
  border-radius: 4px !important;
  left: 4px !important;
  right: 4px !important;
}

:deep(.n-menu-item-content--selected::before) {
  border-radius: 4px !important;
  left: 4px !important;
  right: 4px !important;
}

:deep(.n-menu-item-content) {
  border-left: none !important;
  border-radius: 0 !important;
  position: relative !important;
  padding-left: 16px !important;
}

:deep(.n-menu-item-content__icon) {
  width: 36px !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-right: 8px !important;
  flex-shrink: 0 !important;
}

:deep(.n-submenu-children .n-menu-item-content) {
  padding-left: 45px !important;
}

:deep(.n-menu-item--indent) {
  width: 0 !important;
}

:deep(.n-menu-item-content--selected::after) {
  content: "" !important;
  position: absolute !important;
  left: 10px !important;
  top: 10px !important;
  bottom: 10px !important;
  width: 4px !important;
  background-color: #0078d4 !important;
  border-radius: 10px !important;
}

:deep(.n-submenu-children .n-menu-item-content--selected::after) {
  left: 38px !important;
}

:deep(.n-menu-item-content--child-active-closed::after) {
  content: "" !important;
  position: absolute !important;
  left: 10px !important;
  top: 10px !important;
  bottom: 10px !important;
  width: 4px !important;
  background-color: #0078d4 !important;
  border-radius: 10px !important;
}

:deep(.n-menu--collapsed .n-menu-item-content--child-active-closed::after) {
  content: "" !important;
  position: absolute !important;
  left: 10px !important;
  top: 10px !important;
  bottom: 10px !important;
  width: 4px !important;
  background-color: #0078d4 !important;
  border-radius: 10px !important;
}
</style>