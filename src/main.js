import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// npm install vue-toastification@next
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

// npm install lucide-vue-next
import * as LucideIcons from "lucide-vue-next";

import naive from "naive-ui";
import i18n from './i18n'

// npm install primevue primeicons
import PrimeVue from "primevue/config";
import "primeicons/primeicons.css"; // icons
// npm install @primevue/themes
import Aura from "@primeuix/themes/aura";

import "./assets/main.css";
import "./assets/theme.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.use(naive);
app.use(i18n);

app.use(Toast, {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  transition: "Vue-Toastification__bounce", // bottom → top slide
});

for (const [key, component] of Object.entries(LucideIcons)) {
  app.component(key, component);
}

app.mount("#app");
