import React from "react";
import { useParams } from "react-router-dom";
import VideoChat from "./videochat";



const VideoChatWrapper: React.FC = () => {
  const { callUserId } = useParams<{ callUserId: string }>();
  return <VideoChat callUserId={callUserId!} />;
};

export default VideoChatWrapper;
