import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true, 
});


api.interceptors.request.use((config) => {
  const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));

  if (adminInfo?.token) {
    config.headers.Authorization = `Bearer ${adminInfo.token}`;
  }

  return config;
});

export default api;
