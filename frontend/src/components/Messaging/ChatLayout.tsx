import React, { useState, useEffect } from "react";
import ChatApp from "./ChatApp";
import SidebarChats from "./sidebarChats";
import io from "socket.io-client";

const socket = io("http://localhost:3761");

const ChatLayout = ({ userId, username, refresh }) => {
  const [selectedChatroomId, setSelectedChatroomId] = useState(null);
  const [isChatAppVisible, setIsChatAppVisible] = useState(false);

  useEffect(() => {
    if (selectedChatroomId) {
      socket.emit("joinRoom", selectedChatroomId);
    }

    return () => {
      if (selectedChatroomId) {
        socket.emit("leaveRoom", selectedChatroomId);
      }
    };
  }, [selectedChatroomId]);

  const handleSelectChatroom = (chatroomId) => {
    if (selectedChatroomId) {
      socket.emit("leaveRoom", selectedChatroomId);
    }
    setSelectedChatroomId(chatroomId);
    setIsChatAppVisible(true);
  };

  const toggleChatApp = () => {
    if (isChatAppVisible) {
      if (selectedChatroomId) {
        socket.emit("leaveRoom", selectedChatroomId);
      }
      setSelectedChatroomId(null);
    }
    setIsChatAppVisible(!isChatAppVisible);
    refresh();
  };

  return (
    <div className="chat-layout z-[420] pt-[4rem] flex h-[95vh] overflow-hidden ">
      <div
        className={`chat-content overflow-hidden transform transition-all duration-300 ${
          isChatAppVisible ? "translate-x-[18%]" : "translate-x-[110%]"
        } w-3/4 absolute left-0`}
      >
        {selectedChatroomId && (
          <ChatApp
            chatroomId={selectedChatroomId}
            userId={userId}
            username={username}
            toggleChatApp={toggleChatApp} // Pass toggle function to ChatApp
          />
        )}
        <button
          className="absolute top-0 right-[10rem] mt-4 mr-4 p-2 font-medium text-[#074979] bg-white border-[2px] h-[2.8rem] border-[#074979] shadow rounded"
          onClick={toggleChatApp}
        >
          {isChatAppVisible && "Close Messages"}
        </button>
      </div>
      <div className="sidebar w-[20rem] bg-white text-black absolute right-0">
        <SidebarChats
          userid={userId}
          toggle={toggleChatApp}
          refresh={refresh}
          onSelectChatroom={handleSelectChatroom}
          chatRoomId={selectedChatroomId}
        />
      </div>
    </div>
  );
};

export default ChatLayout;