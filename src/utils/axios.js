import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_HOST}/api`,
  withCredentials: true,
})