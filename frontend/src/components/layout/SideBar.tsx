import { text } from "express";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchResult } from "../../../interfaces";
import { fetchHandler, getPostOptions } from "../../utils";
import {useProfile, useConnections, useNotifications} from "../../state/store";
import { requestConnection } from "../../utils";
import { logUserOut } from "../../adapters/auth-adapter";

function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  const [currentProfile, setCurrentProfile] = useProfile((state) => [state.currentProfile, state.setCurrentProfile]);
  const [connections, setConnections] = useConnections((state) => [state.connections, state.setConnections]);
  const [notifications, setNotifications] =  useNotifications((state) => [state.notifications, state.setNotifications]);
  
  const pathIndexes = {
    "/feed": 1,
    "/search": 2,
    "/discover": 3,
    "/notifications": 4,
    "/messages": 5,
    "/settings": 6,
  };
console.log(connections, "connections sidebar")
  const getPathIndex = (path) => {
    // Check for exact matches first
    if (pathIndexes[path] !== undefined) {
      return pathIndexes[path];
    }

    // Check for dynamic routes
    const dynamicRoutes = [
      { path: "/search/", index: 2 },
      // Add other dynamic routes here if needed
    ];

    for (let route of dynamicRoutes) {
      if (path.startsWith(route.path)) {
        return route.index;
      }
    }
  };

  const images = [
    {
      id: 1,
      src: ["/home (1).png", "/home (2).png"],
      text: "Home",
      link: "/feed",
    },
    {
      id: 2,
      src: ["/search1.png", "/search2.png"],
      text: "Search",
      link: "/search",
    },

    {
      id: 3,
      src: ["/notification.png", "/notification (1).png"],
      text: "Notifications",
      link: "/notifications",
    },

    { id: 4, src: ["/setting.png", "/setting (1).png"], text: "Settings" },
  ];

  const [clicked, setClicked] = useState(getPathIndex(pathname));
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [similarUsers, setSimilarUsers] = useState([]);


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
          results.profiles.filter((profile) => profile.id !== currentProfile.id)
        );
      };
      fetchQuery();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedQuery]);


  useEffect(() => {
    setClicked(getPathIndex(pathname));
  }, [pathname]);

  const handleClick = (link) => {
    if (link === "/search") {
      setSearchOpen(true);
      setNotificationsOpen(false);
      setClicked(2);
    } else if (link === "/notifications") {
      setNotificationsOpen(true);
      setSearchOpen(false);
      setClicked(3);
    } else {
      setSearchOpen(false);
      setNotificationsOpen(false);

      navigate(link);
      setClicked(getPathIndex(link));
    }
  };




  const handleCreateConnection = async (profile_id, noti_id) => {
    setAcceptedProfiles((prev) => ({
      ...prev,
      [noti_id]: { ...prev[noti_id], accepted: true },
    }));
   const response = await fetchHandler(`api/connection`, getPostOptions({ profile_id1: currentProfile.id, profile_id2: profile_id }));
    if (response) {
      const deleted = await fetchHandler(`api/notifications/${noti_id}`, { method: "DELETE" });
  
 
        console.log("Connection request successful")
        setNotifications({ ...notifications, received: notifications.received.filter(noti => noti.id !== noti_id) })
      
    } else {
      console.log("Connection request failed")
    }
  }



  const [requestedProfiles, setRequestedProfiles] = useState({});
  const [acceptedProfiles, setAcceptedProfiles] = useState({});


  useEffect(() => {
    if (!currentProfile) return;
    const processedResults = searchResults.map((profile) => {
      const hasSentNotification = notifications.sent.some(notification =>
        notification.profile_id_sent === currentProfile.id &&
        notification.profile_id_received === profile.id
      );
      return { ...profile, requested: hasSentNotification };
      
    });
  
    setRequestedProfiles(processedResults.reduce((acc, profile) => {
      acc[profile.id] = profile;
      return acc;
    }, {}));
  }, [query, searchResults, notifications, currentProfile]);

  console.log(requestedProfiles, 'searchResults')

  const handleRequest = async (profileId) => {
    if (currentProfile) {
      const connection = await requestConnection(currentProfile.id, profileId);
      if (connection) {
        setNotifications((prev) => ({
          ...prev,
          sent: [...prev.sent, connection],
        }));


      }
        setRequestedProfiles((prev) => ({
          ...prev,
          [profileId]: { ...prev[profileId], requested: true },
        }));
      }
    
  };


  const handleLogout = async () => {
    logUserOut();
    setCurrentProfile(null);
    navigate("/");
  };
  
  return (
    <div className="flex  ">
      <div
        className={`  z-[501] w-[14%]      h-full fixed bg-white   backdrop-blur-md   overflow-hidden  flex flex-col  pt-[5rem]   transition-all duration-200  `}
      >
        <div className="border-b border-dashed pb-5">
          {images.map((image) => (
            <div
              key={image.id}
              onClick={() => handleClick(image.link)}
              className={`py-5   ${
                clicked === image.id
                  ? " border-l-[5px] pl-8   bg-gray-50  border-[#074979]"
                  : " pl-6 border-l-[5px] border-transparent"
              } cursor-pointer transition-all duration-300  gap-5 flex`}
            >
              <img
                src={clicked === image.id ? image.src[1] : image.src[0]}
                alt=""
                className={`w-[25px] mouse h-[25px] ${
                  clicked === image.id
                    ? "text-[#074979]"
                    : "text-black  opacity-50 "
                }`}
              />
              <p
                className={`text-[20px] transition-all   translate-y-[-3px] my-auto textshadow2 ${
                  clicked === image.id
                    ? "text-[#074979] "
                    : "text-black opacity-50"
                } font-medium `}
              >
                {image.text}
              </p>
            </div>
          ))}
        </div>
        <div onClick={() => handleLogout()} className="flex  pl-8 pt-8 cursor-pointer gap-3">
          <img src='/exit.png' className="opacity-50 w-[25px]" ></img>
          <p className="text-[20px]  opacity-50 font-medium textshadow2">Logout</p>
        </div>
      </div>
      <div
        className={`h-full overflow-scroll z-[35]   transition-all duration-[400ms] ${
          searchOpen ? "translate-x-[0px]" : "translate-x-[-35rem]"
        } absolute w-[35rem] bg-white border-r  backdrop-blur-lg bg-opacity-60 `}
      >
        <div className="pt-[5rem]">
          <div className="pb-6 border-b border-gray-100">
            <p className=" text-black  text-[25px] text-center translate-x-[-8px] pb-1 font-semibold ">
              Search
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text "
              className="text bg-white border placeholder:font-medium placeholder:text-gray-300 rounded-md w-[19rem] m-auto  ml-[14.5rem] text-[20px] p-1 "
              placeholder="Search for an account"
            ></input>
          </div>

          {!searchResults ||
            (query === "" && (
              <p className="text-[20px] mt-[20%] font-semibold text-center pl-[14rem] text-gray-200">
                No Results
              </p>
            ))}
          <div className="w-[19rem] ml-[14.5rem] ">
            {searchResults.length > 0 &&
              query !== "" &&
              searchResults.map((profile) => {
                
                return (
                  <div className=" justify-between py-3 flex border-b">
                    <a href={`/profile/${profile.id}`}><div>
                    <div className="flex gap-2">
                      <img
                        className="w-[3rem] bg-white p-1 shadow rounded-full h-[3rem]"
                        src={profile.profile_photo}
                      ></img>
                      <div>
                        <p className="font-semibold text-[20px]">
                          {profile.full_name}
                        </p>
                        <p className="text-[20px] text-gray-500">
                          @{profile.username}
                        </p>
                      </div>
                    </div>
                    </div>
                    </a>
                    
                    <div>
                      {connections.some(
                        (connection) =>
                          (connection.profile_id1 === currentProfile.id &&
                            connection.profile_id2 === profile.id) ||
                          (connection.profile_id2 === currentProfile.id &&
                            connection.profile_id1 === profile.id)
                      ) ? (
                        <div></div>
                      ) : requestedProfiles[profile.id]?.requested ? (
                        <button className="bg-white text-[#074979] p-1 px-4 rounded" disabled>
                          Requested
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRequest(profile.id)}
                          className="bg-[#074979] text-white p-1 px-4 rounded"
                        >
                          Connect
                        </button>
                      )}
                    </div>
                  </div>
                  
                );
              })}
          </div>
        </div>
      </div>






      <div
        className={`h-full overflow-scroll z-[35]   transition-all duration-[400ms] ${
          notificationsOpen ? "translate-x-[0px]" : "translate-x-[-35rem]"
        } absolute w-[35rem] bg-[#074979] border-r border-[#074979]  backdrop-blur-lg bg-opacity-60 `}
      >
        <div className="pt-[5rem]">
          <div className="pb-6 border-b border-[#074a7963]">
            <p className=" text-white text-[25px] text-center translate-x-[-8px]  pl-5 font-semibold ">
              Notifications
            </p>
            
          </div>

          {!notifications  && (
              <p className="text-[20px] mt-[20%] font-semibold text-center pl-[14rem] text-gray-200">
                No Results
              </p>
            )}
          <div className="w-[19rem] ml-[14.5rem] ">
            {notifications.received.length > 0 &&
              notifications.received.filter(noti => !acceptedProfiles[noti.id]?.accepted).map((noti) => {
                return (
                  <div className="  text-white justify-between py-3  border-b border-[#074a7968]">
                    <div className="flex gap-2">
                      <img
                        className="w-[3rem] bg-[#074979] p-[2px] shadow rounded-full h-[3rem]"
                        src={noti.profile_img}
                      ></img>
                      <div>
                        <p className="font-semibold  self-center text-[21px]">
                          {noti.profile_username} wants to connect
                        </p>
                     
                      </div>
                    </div>
                    <div className="flex gap-5 m-auto justify-center pt-5">
                      <button onClick={() => handleCreateConnection(noti.profile_id_sent, noti.id)} className="bg-[#074979] hover:opacity-70 transition-all duration-200 text-white p-1 px-4 rounded">
                        Accept
                      </button>
                      <button className="bg-white border hover:opacity-70 transition-all duration-200 border-[#074979] text-[#074979] p-1 px-4 rounded">
                        Decline
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default SideBar;
