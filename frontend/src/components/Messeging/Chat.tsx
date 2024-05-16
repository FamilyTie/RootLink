import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import io from "socket.io-client"
import YooptaEditor, { createYooptaEditor } from "@yoopta/editor"
import { SlackChat } from "./slack"
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

const ChatApp = () => {
  const { id } = useParams() // Extract id
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!id) {
      console.error("No id found in URL")
      return
    }

    // Join the chat room
    socket.emit("joinRoom", id)

    // Fetch initial messages
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

    // Listen for new messages
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage])
    })

    // Clean up
    return () => {
      socket.off("message")
    }
  }, [id])

  const sendMessage = (messageContent) => {
    if (messageContent.trim()) {
      const newMessage = { chatroomId: id, userId: 1, body: messageContent }

      // Save the message
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
          // Emit the message via socket
          socket.emit("message", newMessage)
        })
        .catch((error) => console.error("Error sending message:", error))
    }
  }

  const renderMessage = (msg, index) => {
    console.log(msg.body, "msgg")
    const editor = createYooptaEditor()
    return (
      <div
        key={index}
        className="p-2 mb-2 border-b border-gray-600 bg-gray-800 rounded-md"
      >
        <b>{msg.userId}:</b>
        <YooptaEditor
          editor={editor}
          // @ts-ignore
          plugins={plugins}
          marks={MARKS}
          readOnly
          value={JSON.parse(msg.body)}
          className="editor"
        />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen w-1/2 bg-[#232529] text-white border-r border-[#565856]">
      {/* <h1 className="text-center my-4 text-2xl font-bold">Chat Room {id}</h1> */}
      <div className="flex-1 overflow-y-auto p-4 mx-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {messages.map((msg, index) => renderMessage(msg, index))}
      </div>
      <div className="p-4 bg-[#232529]">
        <SlackChat sendMessage={sendMessage} />
      </div>
    </div>
  )
}

export default ChatApp
