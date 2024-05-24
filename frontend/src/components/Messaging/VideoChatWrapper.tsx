import React from "react"
import { useParams } from "react-router-dom"
import VideoChat from "./VideoChat"

const VideoChatWrapper: React.FC = () => {
  const { callUserId } = useParams<{ callUserId: string }>()
  return <VideoChat />
}

export default VideoChatWrapper
