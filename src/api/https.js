import { useAuthStore } from "@/stores/auth";
import axios from "axios";
const api = axios.create({
  baseURL: "https://construction-site-api-3uii.onrender.com",
});

api.interceptors.request.use((config) => {
  const auth = useAuthStore();
  if (auth.token) config.headers.Authorization = `Bearer ${auth.token}`;
  return config;
});

export default api;
