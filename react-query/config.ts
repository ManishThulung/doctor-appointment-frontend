import axios from "axios";

const BACKEND_URI: string = "http://localhost:8000/api";

export const request = axios.create({
  withCredentials: true,
  baseURL: BACKEND_URI,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});
