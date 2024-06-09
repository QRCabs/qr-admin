import axios from "axios";

let endpoint = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080",
});

try {
  const token = JSON.parse(localStorage?.getItem("user"))?.token;

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
} catch (err) {
  console.log(err);
}

export default endpoint;
