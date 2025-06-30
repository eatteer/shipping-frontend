import { LOCAL_STORAGE_USER_KEY } from "@/contexts/auth/auth-provider";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 1000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

api.interceptors.request.use(
  (config) => {
    let token = "";

    try {
      const rawUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

      if (rawUser) {
        const user = JSON.parse(rawUser);
        token = user.token;
      }
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      const data = error.response.data;

      if (data.code === "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED") {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);

        window.location.href = "/auth/sign-in?expired=true";

        return Promise.reject(new Error("Session expired."));
      }
    }

    return Promise.reject(error);
  }
);
