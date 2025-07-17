import { X } from 'lucide-react'

import { useAuthStore } from "../stores/useAuthStore"
import { useUserStore } from "../stores/useUserStore"

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useUserStore()
  const { onlineUsers } = useAuthStore()

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader