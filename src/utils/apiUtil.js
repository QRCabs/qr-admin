import axios from "axios";
import store from "../store";

let endpoint = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

try {
  // const loggedInToken = store.getState().user.token;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJUeXBlIjoiYWRtaW4iLCJlbWFpbCI6ImFraGlsQGdtYWlsLmNvbSIsImFkbWluSWQiOiI2NWUyZjUyMzY2NDU2MjRlMjZjMjA3YzkifSwiaWF0IjoxNzA5MzczMjc3LCJleHAiOjE3NDA5MDkyNzd9.bP1VmBubUXjdMijNW_DIVnWl7GKsSAxsG_gTghf_LrI";
  if (token) {
    endpoint.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
} catch (err) {}

export default endpoint;
