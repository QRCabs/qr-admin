/* eslint-disable prettier/prettier */

import axios from "axios";
import store from "../store";

const loggedInToken = store.getState()?.login?.verifyOtp?.token;

let endpoint = axios.create({
  baseURL: process.env.baseURL || "http://localhost:8080",
});

try {
  if (loggedInToken) {
    endpoint.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${loggedInToken}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
} catch (err) {}

export default endpoint;
