import { useState, useEffect, useRef } from "react"
import io from "socket.io-client"
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor"
import { SlackChat } from "./SlackEditor"
import "./Slack.css" // Assuming you have some CSS for styling specific to SlackChat
import Blockquote from "@yoopta/blockquote"
import Paragraph from "@yoopta/paragraph"
import Image from "@yoopta/image"
import { Bold, Italic, CodeMark, Strike, Underline } from "@yoopta/marks"
import Lists from "@yoopta/lists"
import Link from "@yoopta/link"
import Video from "@yoopta/video"
import File from "@yoopta/file"
import Code from "@yoopta/code"
import { Message } from "./Message"
import { ChatAppProps } from "../../../Interfaces&Types/interfaces"

const plugins = [
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Blockquote.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Image,
  Video,
  File,
  Lists.BulletedList.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Lists.NumberedList.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Link,
  Code,
]
const MARKS = [Bold, Italic, CodeMark, Strike, Underline]
const socket = io("http://localhost:3761")

const ChatApp = ({userId, chatroomId,  username, toggleChatApp}: ChatAppProps) => {
  const [messages, setMessages] = useState([])
  const [messageBodies, setMessageBodies] = useState(new Set())

  useEffect(() => {
    if (!chatroomId) {
      console.error("No chatroomId provided")
      return
    }

    // Join the chat room
    socket.emit("joinRoom", chatroomId)

    // Fetch initial messages
    fetch(`http://localhost:3761/api/chatrooms/${chatroomId}/messages`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch messages")
        }
        return response.json()
      })
      .then((data) => {
        const uniqueMessages = []
        const uniqueMessageBodies = new Set()

        data.forEach((message) => {
          if (!uniqueMessageBodies.has(message.body)) {
            uniqueMessages.push(message)
            uniqueMessageBodies.add(message.body)
          }
        })

        setMessages(uniqueMessages.reverse())
        setMessageBodies(uniqueMessageBodies)
        console.log("Fetched messages:", uniqueMessages)
      })
      .catch((error) => console.error("Error fetching messages:", error))

    // Listen for new messages
    const handleMessage = (newMessage) => {
      if (!messageBodies.has(newMessage.body)) {
        setMessages((prevMessages) => [newMessage, ...prevMessages])
        setMessageBodies((prevBodies) =>
          new Set(prevBodies).add(newMessage.body)
        )
      }
    }

    socket.on("message", handleMessage)

    // Clean up
    return () => {
      socket.off("message", handleMessage)
    }
  }, [chatroomId, messageBodies])

  const sendMessage = (messageContent) => {
    if (messageContent.trim()) {
      const newMessage = {
        chatroomId,
        userId,
        body: messageContent,
      }

      console.log("Sending message:", newMessage)

      // Save the message
      fetch(`http://localhost:3761/api/chatrooms/${chatroomId}/messages`, {
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
          // Emit the message via socket
          socket.emit("message", data) // Use the full message object returned from the server
        })
        .catch((error) => console.error("Error sending message:", error))
    }
  }

 
  
  return (
    <div className="flex flex-col pt-[4rem] relative  h-[93vh] over w-[88%] overflow-hidden bg-slate-100 bg-opacity-50 border-r backdrop-blur  text-[rgb(218,219,221)]">
      
      <div className="flex-1 overflow-y-auto p-4 mx-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {messages.map((msg, index) => <Message index={index} msg={msg} userId={userId} plugins={plugins} />)}
        <div  />
      </div>
      <div className="p-4  bg-white  bg-opacity-70 backdrop-blur shadow-lg ">
        <SlackChat sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatApp





