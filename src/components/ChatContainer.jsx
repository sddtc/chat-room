import { useEffect, useRef } from "react"

import { useAuthStore } from "../stores/useAuthStore"
import { useChatStore } from "../stores/useChatStore"
import { useUserStore } from "../stores/useUserStore"
import ChatHeader from "./ChatHeader"
import DefaultMessageContainer from "./DefaultMessageContainer"
import MessageInput from "./MessageInput"

const ChatContainer = () => {
  const { selectedUser } = useUserStore()
  const { messages, getMessages, isMessagesLoading, subscribeToMessages,
    unsubscribeFromMessages } = useChatStore()
  const { authUser } = useAuthStore()
  const messageEndRef = useRef(null)

  useEffect(() => {
    getMessages(selectedUser._id)
    subscribeToMessages()
    return () => unsubscribeFromMessages()
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages])

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <DefaultMessageContainer />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(m => (
          <div
            key={m._id}
            className={`chat ${m.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            ref={messageEndRef}
          >
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(m.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {m.text && <p>{m.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  )
}

export default ChatContainer