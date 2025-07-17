import { create } from 'zustand'
import { io } from "socket.io-client"
import toast from 'react-hot-toast'
import { axiosInstance } from '../utils/axios.js'

const BASE_URL = `${import.meta.env.VITE_BACKEND_API_HOST}/`

export const useAuthStore = create((set, get) => ({
  onlineUsers: [],
  socket: null,
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingIn: false,

  connectSocket: () => {
    const { authUser } = get()
    if (!authUser || get().socket?.connected) return

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id
      }
    })
    socket.connect()

    set({ socket: socket })
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds })
    })
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect()
  },

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({ authUser: res.data })
      get().connectSocket()
    } catch (error) {
      console.log(error)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/auth/signup", { name: data })
      set({ authUser: res.data })
      get().connectSocket()

      toast.success('Signup successfully!')
    } catch (error) {
      toast.error(error)
    } finally {
      set({ isSigningUp: false })
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true })
    try {
      const res = await axiosInstance.post("/auth/login", { name: data })
      set({ authUser: res.data })
      get().connectSocket()

      toast.success('Logged in successfully!')
    } catch (error) {
      toast.error(error)
    } finally {
      set({ isLoggingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout")
      set({ authUser: null })
      get().disconnectSocket()

      toast.success("Logged out successfully!")
    } catch (error) {
      toast.error(error)
    }
  }
}))