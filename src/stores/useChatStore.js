import { create } from 'zustand'
import toast from "react-hot-toast"

import { axiosInstance } from "../utils/axios"
import { useAuthStore } from "./useAuthStore"
import { useUserStore } from "./useUserStore"

export const useChatStore = create((set, get) => ({
  isMessagesLoading: false,
  messages: [],

  getMessages: async (userId) => {
    set({ isMessagesLoading: true })

    try {
      const res = await axiosInstance.get(`/messages/${userId}`)

      set({ messages: res.data })
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  sendMessage: async (messageData) => {
    const selectedUser = useUserStore.getState().selectedUser
    const { messages } = get()

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)

      set({ messages: [...messages, res.data] })
    } catch (error) {
      toast.error(error)
    }
  },

  subscribeToMessages: () => {
    const selectedUser = useUserStore.getState().selectedUser
    if (!selectedUser) return

    const socket = useAuthStore.getState().socket

    socket.on("public room", (newMessage) => {
      const isMessageSentToSelectedUser = newMessage.receiverId === selectedUser._id
      if (!isMessageSentToSelectedUser) return

      set({
        messages: [...get().messages, newMessage]
      })
    })

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id

      if (!isMessageSentFromSelectedUser) return

      set({
        messages: [...get().messages, newMessage]
      })
    })
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket
    socket.off("newMessage")
    socket.off("public room")
  }
}))