import { createI18n } from "vue-i18n";

const messages = {
  en: {
    menu: {
      dashboard: "Dashboard",
      projects: "Projects",
      createProject: "Create Project",
      categories: "View Project",
      member: "Member",
      createMember: "Create Member",
      viewMember: "View Member",
      beverage: "Beverage",
      whisky: "Whisky",
      wine: "Wine",
      settings: "Settings",
    },
    profile: {
      userProfile: "User Profile",
      editProfile: "Edit Profile",
      logout: "Logout",
    },
    navbar: {
      title: "Construction Site",
    },
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome back!",
    },
  },
  km: {
    menu: {
      dashboard: "ផ្ទាំងគ្រប់គ្រង",
      projects: "គម្រោង",
      createProject: "បង្កើតគម្រោង",
      categories: "ប្រភេទ",
      member: "សមាជិក",
      createMember: "បង្កើតសមាជិក",
      viewMember: "ពីនិត្យមើលសមាជិក",
      beverage: "គ្រឿងផឹក",
      whisky: "វីស្គី",
      wine: "ស្រា",
      settings: "ការកំណត់",
    },
    profile: {
      userProfile: "គណនីអ្នកប្រើ",
      editProfile: "កែប្រែប្រវត្តិរូប",
      logout: "ចាកចេញ",
    },
    navbar: {
      title: "គេហទំព័រសំណង់",
    },
    dashboard: {
      title: "ផ្ទាំងគ្រប់គ្រង",
      welcome: "សូមស្វាគមន៍មកវិញ!",
    },
  },
};

const i18n = createI18n({
  legacy: false, // use Composition API mode
  locale: "en", // default language
  fallbackLocale: "en",
  messages,
});

export default i18n;
