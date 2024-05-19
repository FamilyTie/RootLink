import React, { useEffect, useState } from "react"
import { FiMessageCircle } from "react-icons/fi"
const SidebarChats = ({ userId, onSelectChatroom }) => {
  const [chatrooms, setChatrooms] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    const getChatrooms = async () => {
      try {
        const response = await fetch(
          `http://localhost:3761/api/chatrooms/user/${userId}`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch chatrooms")
        }
        const chatroomsData = await response.json()
        console.log(chatroomsData, "chatroom data")
        setChatrooms(chatroomsData.chatrooms)
        setUsers(chatroomsData.users)
      } catch (error) {
        console.error("Error fetching chatrooms:", error)
      }
    }

    getChatrooms()
  }, [userId])

  const getUsernames = (chatroom) => {
    const userInChatroom = users.filter(
      (user) => chatroom.user1_id === user.id || chatroom.user2_id === user.id
    )

    const otherUsers = userInChatroom.filter((user) => user.id !== userId)

    return otherUsers
  }

  return (
    <div className="bg-[rgb(229,229,229)] text-black h-full p-4 border-2 border-black">
      <h2 className="text-xl font-bold mb-4">Your Contacts</h2>
      <ul>
        {chatrooms.map((chatroom) => (
          <li
            key={chatroom.id}
            className="flex items-center p-2 mb-2 rounded-lg hover:bg-gray-700 cursor-pointer"
            onClick={() => onSelectChatroom(chatroom.id)}
          >
            {getUsernames(chatroom).map((user) => (
              <div
                key={user.id}
                className="flex items-center"
              >
                <div>
                  <img
                    src={user.img || "https://via.placeholder.com/50"}
                    alt={user.username}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                </div>
                <div>
                  <p className="font-semibold">{user.username}</p>
                  <p className="text-sm text-[rgb(158,163,177)]">
                    {user.full_name}
                  </p>
                </div>
                <FiMessageCircle
                  size={20}
                  className="ml-44"
                />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SidebarChats
