import { useState } from "react"
import { Send } from 'lucide-react'
import toast from "react-hot-toast"

import { useChatStore } from "../stores/useChatStore"

const MessageInput = () => {
  const [text, setText] = useState("")
  const { sendMessage } = useChatStore()

  const handleSendingMessage = async (e) => {
    e.preventDefault()
    if (!text.trim()) return

    try {
      await sendMessage({ text: text.trim() })
      setText("")
    } catch (error) {
      toast.error("Sending message failed, please try agian later", error)
    }
  }

  return (
    <div className="p-4 w-full">
      <form onSubmit={handleSendingMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim()}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput