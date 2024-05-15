import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"

const socket = io("http://localhost:3761")

const ChatApp = () => {
  const { id } = useParams() // Extract id
  console.log(id, "id from useParams")
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!id) {
      console.error("No id found in URL")
      return
    }

    // initial messages
    fetch(`http://localhost:3761/api/chatrooms/${id}/messages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }
        return response.json()
      })
      .then((data) => {
        setMessages(data)
        console.log("Fetched messages:", data)
      })
      .catch((error) => console.error("Error fetching messages:", error))

    // Listen for messages
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    })

    // Clean up
    return () => {
      socket.off("message")
    }
  }, [id])

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { chatroomId: id, userId: 1, body: message }

      // save text
      console.log(id, "id before fetch")
      fetch(`http://localhost:3761/api/chatrooms/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to send message")
          }
          return response.json()
        })
        .then((data) => {
          console.log("Message sent:", data)
        })
        .catch((error) => console.error("Error sending message:", error))

      setMessage("")
    }
  }

  return (
    <div>
      <h1>Chat Room {id}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <b>{msg.userId}:</b> {msg.body}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  )
}

export default ChatApp
