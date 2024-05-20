import React, { useState } from "react"
import ChatApp from "./ChatApp"
import SidebarChats from "./sidebarChats"

const ChatLayout = ({ userId, username }) => {
  const [selectedChatroomId, setSelectedChatroomId] = useState(null)
  const [isChatAppVisible, setIsChatAppVisible] = useState(false)

  const handleSelectChatroom = (chatroomId) => {
    setSelectedChatroomId(chatroomId)
    setIsChatAppVisible(true)
  }

  const toggleChatApp = () => {
    setIsChatAppVisible(!isChatAppVisible)
  }

  return (
    <div className="chat-layout flex h-screen overflow-hidden relative">
      <div
        className={`chat-content transform transition-transform duration-500 ${
          isChatAppVisible ? "translate-x-0" : "translate-x-full"
        } w-3/4 absolute left-0`}
      >
        {selectedChatroomId && (
          <ChatApp
            chatroomId={selectedChatroomId}
            userId={userId}
            username={username}
          />
        )}
        <button
          className="absolute top-0 right-0 mt-4 mr-4 p-2 bg-blue-600 text-white rounded"
          onClick={toggleChatApp}
        >
          {isChatAppVisible && "Close Messages"}
        </button>
      </div>
      <div className="sidebar w-1/4 bg-gray-900 text-white absolute right-0 h-full">
        <SidebarChats
          userId={userId}
          onSelectChatroom={handleSelectChatroom}
        />
      </div>
    </div>
  )
}

export default ChatLayout
