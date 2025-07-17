import { create } from 'zustand'
import toast from "react-hot-toast"

import { axiosInstance } from '../utils/axios'

export const useUserStore = create((set) => ({
  selectedUser: null,
  isUsersLoading: false,
  users: [],

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const res = await axiosInstance.get("/users")

      set({ users: res.data })
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isUsersLoading: false })
    }
  },
}))