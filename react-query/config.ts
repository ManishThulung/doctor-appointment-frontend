import axios from "axios";

const BACKEND_URI: string = "http://localhost:8000/api";

// let token: string;

// const user = localStorage.getItem("user");
// const decodedUser = user && JSON.parse(user);
// token = decodedUser && decodedUser?.token;

export const request = axios.create({
  baseURL: BACKEND_URI,
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
    // Authorization: token,
  },
});
