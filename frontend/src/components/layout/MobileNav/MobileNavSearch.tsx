import { useState, useEffect } from "react";
import { fetchHandler } from "../../../utils";
import { SearchResult } from "../../../../Interfaces&Types/interfaces";
import {
  useProfile,
  useConnections,
  useNotifications,
} from "../../../state/store";
import { requestConnection } from "../../../utils";

function MobileNavSearch({ searchOpen }: { searchOpen: boolean }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [requestedProfiles, setRequestedProfiles] = useState({});
  const currentProfile = useProfile((state) => state.currentProfile);
  const connections = useConnections((state) => state.connections);
  const [notifications, setNotifications] = useNotifications((state) => [
    state.notifications,
    state.setNotifications,
  ]);

  // Debouncing search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  // Fetching search results based on query
  useEffect(() => {
    try {
      const fetchQuery = async () => {
        const response = await fetchHandler(
          `/api/search?query=${debouncedQuery}`
        );
        const results: SearchResult = response[0];
        console.log(results, "results");
        if (results) {
          setSearchResults(
            results.profiles.filter(
              (profile) => profile.id !== currentProfile.id
            )
          );
        }
      };
      fetchQuery();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedQuery]);

  // Handling if user has already sent a request to a profile in which case the 'requested' button will be rendered
  useEffect(() => {
    if (!currentProfile || !notifications.sent) return;
    const processedResults = searchResults.map((profile) => {
      const hasSentNotification = notifications.sent.some(
        (notification) =>
          notification.profile_id_sent === currentProfile.id &&
          notification.profile_id_received === profile.id
      );
      return { ...profile, requested: hasSentNotification };
    });

    setRequestedProfiles(
      processedResults.reduce((acc, profile) => {
        acc[profile.id] = profile;
        return acc;
      }, {})
    );
  }, [query, searchResults, notifications, currentProfile]);

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

  return (
    searchResults && (
      <div
        className={`h-[100vh] fixed translate-y-[-100vh] duration-300 overflow-hidden z-[35]   ${
          searchOpen ? " opacity-100" : " opacity-0 pointer-events-none"
        }  w-screen bg-white border-r  backdrop-blur-lg bg-opacity-60 `}
      >
        <div className="pt-[5rem]">
          <div className="pb-6 border-b border-gray-100">
            <p className=" text-black  text-[2.5rem] pl-5  m-auto pb-5 font-semibold ">
              Search
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text "
              className="text bg-white border placeholder:font-medium placeholder:text-gray-300 rounded-md w-[90%] m-auto   text-[20px] p-1 "
              placeholder="Search for an account"
            ></input>
          </div>

          {(!searchResults || searchResults.length === 0) && query !== "" && (
            <p className="text-[20px] mt-[20%] font-semibold text-center  text-gray-200">
              No Results
            </p>
          )}

          <div className="w-[95%] m-auto  ">
            {searchResults.length > 0 &&
              query !== "" &&
              searchResults.map((profile) => {
                return (
                  <div className=" justify-between py-3 flex border-b">
                    <a href={`/profile/${profile.id}`}>
                      <div>
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
                      {connections &&
                      connections.some(
                        (connection) =>
                          (connection.profile_id1 === currentProfile.id &&
                            connection.profile_id2 === profile.id) ||
                          (connection.profile_id2 === currentProfile.id &&
                            connection.profile_id1 === profile.id)
                      ) ? (
                        <div></div>
                      ) : requestedProfiles[profile.id]?.requested ? (
                        <button
                          className="bg-white text-[#074979] p-1 px-4 rounded"
                          disabled
                        >
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
    )
  );
}

export default MobileNavSearch;