import axios from "axios";

const API = axios.create({
  baseURL: "https://note-apps-p81s.onrender.com/api",   // backend
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = token;
  return req;
});

export default API;
