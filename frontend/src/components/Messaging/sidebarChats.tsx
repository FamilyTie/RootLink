import React, { useEffect, useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import { useProfile } from "../../state/store";
import { fetchHandler } from "../../utils";
import { SearchResult } from "../../../Interfaces&Types/interfaces";
const SidebarChats = ({
  onSelectChatroom,
  refresh,
  userid,
  chatRoomId,
  toggle,
}) => {
  const [chatrooms, setChatrooms] = useState([]);
  const [users, setUsers] = useState([]);
  const [initialUsers, setInitialUsers] = useState([]);
  const currentProfile = useProfile((state) => state.currentProfile);
  const [reload, setReload] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const fetchInitialProfiles = async () => {
      try {
        const response = await fetch("/api/profiles");
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        const usersData = await response.json();
        console.log(usersData, "users data");
        setInitialUsers(usersData.slice(0, 4));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchInitialProfiles();
  }, []);



  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    console.log(query);
    try {
      const fetchQuery = async () => {
        const response = await fetchHandler(
          `/api/search?query=${debouncedQuery}`
        );
        const results: SearchResult = response[0];
        console.log(results, "results");
        setSearchResults(
          results.profiles
            .filter((profile) => profile.id !== currentProfile.id)
            .slice(0, 4)
        );
      };
      fetchQuery();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedQuery]);
  console.log(users, "fetched");

  useEffect(() => {
    const getChatrooms = async () => {
      try {
        const response = await fetch(
          `http://localhost:3761/api/chatrooms/user/${userid}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch chatrooms");
        }
        const chatroomsData = await response.json();
        console.log(chatroomsData, "chatroom data");
        setChatrooms(chatroomsData.chatrooms);
        setUsers(chatroomsData.users);
        refresh();
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    getChatrooms();
  }, [reload]);

  console.log(searchResults, "searchResults");

  console.log(userid, "userid");

  const newChat = async (user2_id) => {
    console.log(user2_id, "user2_id");
    try {
      const response = await fetch("http://localhost:3761/api/chatrooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user1_id: userid, user2_id }),
      });
      if (!response.ok) {
        throw new Error("Failed to start chat");
      }
      const chatroom = await response.json();
      setChatrooms([...chatrooms, chatroom]);
      setReload(!reload);
    } catch (error) {
      console.error("Error starting chat:", error);
    }
  };

  const getUsernames = (chatroom) => {
    const userInChatroom = users.filter(
      (user) => chatroom.user1_id === user.id || chatroom.user2_id === user.id
    );

    const otherUsers = userInChatroom.filter((user) => user.id !== userid);

    return otherUsers;
  };

  return (
    <div className="bg-white      text-black h-[93vh] overflow-hidden p-4  border-black">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        placeholder="Start a chat"
        className="w-[95%] placeholder:font-semibold  border p-2 bg-slate-100 rounded mb-4"
      />
      <div className="flex justify-center mb-10 overflow-scroll">
        {(searchResults.length > 0 ? searchResults : initialUsers).map(
          (user) => {
            return (
              <div onClick={() => newChat(user.id)} className="cursor-pointer">
                <img
                  src={searchResults.length > 0 ? user.profile_photo : user.img}
                  alt={user.username}
                  className="w-16 h-16 shadow p-[2px] bg-[#A0D9FF] rounded-full mr-3"
                />
                <p className="font-semibold text-gray-500 text-center r">
                  {searchResults.length > 0
                    ? user.full_name.split(" ")[0]
                    : user.fullName.split(" ")[0]}
                </p>
              </div>
            );
          }
        )}
      </div>
      <div className="flex justify-between">
        <h2 className="text-[20px]  pl-3   font-bold mb-4">Recent Chats</h2>
      </div>

      <ul>
        {chatrooms.length === 0 && (
          <p className="text-[20px] m-auto text-gray-400 font-semibold text-center">
            No Recent Chats
          </p>
        )}
        {chatrooms.map((chatroom) => (
          <li
            key={chatroom.id}
            className={`flex gap-3 ${
              chatRoomId === chatroom.id
                ? "bg-gray-200"
                : " bg-white hover:hover:bg-gray-100 "
            } items-center p-2 mb-2 rounded-lg   transition-all duration-200 cursor-pointer`}
            onClick={() => onSelectChatroom(chatroom.id)}
          >
            {getUsernames(chatroom).map((user) => (
              <div
                key={user.id}
                className="flex w-[20rem] justify-between gap-3 items-center"
              >
                <div className="flex gap-3">
                  <div>
                    <img
                      src={user.img || "https://via.placeholder.com/50"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full  "
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{user.username}</p>
                    <p className="text-sm text-[rgb(158,163,177)]">
                      {user.full_name}
                    </p>
                  </div>
                </div>

                <FiMessageCircle size={20} className="" />
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarChats;
