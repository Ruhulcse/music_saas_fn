/**
 * axios setup to use mock service
 */

import axios from "axios";
const apiUrl = "https://music-saas.onrender.com";
const axiosServices = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/vnd.api+json",
    "Content-Type": "application/json",
  },
});

// interceptor for http
axiosServices.interceptors.request.use((request) => {
  const token = localStorage.getItem("serviceToken");
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }

  return request;
});

export default axiosServices;
