import { useState, useEffect } from "react";
import {
  useProfile,
  useNotifications,
  useConnections,
} from "../../state/store";
import { useNavigate } from "react-router-dom";
import { getSimilarProfiles, requestConnection } from "../../utils";

function SuggestedAccounts() {
  const [similarUsers, setSimilarUsers] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentProfile] = useProfile((state) => [state.currentProfile]);
  const connections = useConnections((state) => state.connections);
  const [notifications, setNotifications] = useNotifications((state) => [
    state.notifications,
    state.setNotifications,
  ]);

  const handleConnect = async (profile_id) => {
    requestConnection(user.id, similarUsers[0].id).then((connection) => {
      console.log(connection);
      setSimilarUsers(
        similarUsers.map((user) => {
          if (user.id === profile_id) {
            return { ...user, requested: true };
          } else return user;
        })
      );
    });
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentProfile) {
      navigate("/");
    } else {
      setUser(currentProfile);
      setLoading(false);
    }
    4;
  }, [currentProfile, navigate]);

  
  //Getting similar profiles to display (invloles filtering profiles that user has already connected with or sent a request to)
  useEffect(() => {
    if (user && user.similarProfiles) {
      const similarData = user.similarProfiles.most_similar_profiles;
      const getProfilesSimilarToCurrentProfile = async () => {
        getSimilarProfiles(user, setSimilarUsers, connections, notifications);
      };

      getProfilesSimilarToCurrentProfile();
    }
  }, [user, connections, notifications]);

  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

  return (
    <div
      className={`w-[24rem] h-[16rem] relative transition-all duration-200 overflow-hidden rounded-md p-5 bg-white mt-[5rem] h-[${
        viewAll && 17 + 5 * (similarUsers.length - 1)
      }rem]`}
    >
      <div className="flex border-b pb-2 justify-between">
        <p className="text-[22px] font-medium text-gray-500">
          Suggested Account
        </p>
        {similarUsers.length > 1 && (
          <p
            onClick={handleViewAll}
            className="text-[20px] hover:opacity-70 cursor-pointer font-semibold text-blue-500"
          >
            View All
          </p>
        )}
      </div>

      {similarUsers.length > 0 ? (
        <div>
          <div className="flex pl-10  gap-3 pt-3">
            <img
              src={similarUsers[0]?.img}
              className="w-14 h-14 rounded-full p-[2px]"
              alt="Similar User"
            />
            <p className="text-[22px] font-medium self-center text-gray-400">
              {similarUsers[0]?.fullName}
            </p>
          </div>
          <h1 className="text-[22px] pb-5 pl-10 font-medium">
            {Math.floor(60 + similarUsers[0]?.similarity * 40)}% Match
          </h1>

          {!similarUsers[0]?.requested && !similarUsers[0]?.received ? (
            <div className="flex gap-2 pb-5 m-auto justify-center">
              <button
                onClick={() => handleConnect(similarUsers[0].id)}
                className="bg-[#074979] hover:bg-white border-[2px] border-transparent hover:text-[#074979] hover:border-[#074979] transition-all duration-200 self-end text-white text-[1.1rem] p-1 w-[8rem] rounded-md"
                type="submit"
              >
                Connect
              </button>

              <button
                className="bg-white hover:opacity-70 border-[2px] border-gray-300 transition-all duration-200 self-end text-gray-300 text-[1.1rem] p-1 w-[8rem] rounded-md"
                type="submit"
              >
                Ignore
              </button>
            </div>
          ) : (
            !similarUsers[0].received && (
              <button
                className="  m-auto flex justify-center bg-white border-[2px] text-[#074979] border-[#074979] transition-all duration-200 self-end text-[1.1rem] p-1 w-[8rem] rounded-md"
                type="submit"
              >
                Requested
              </button>
            )
          )}

          {viewAll &&
            similarUsers.length > 1 &&
            similarUsers.slice(1).map((user) => {
              return (
                <div className="flex h-[5rem]  gap-3 pt-5 border-b">
                  <img
                    src={user.img}
                    className="w-14 h-14 rounded-full p-[2px]"
                    alt="Similar User"
                  />
                  <p className="text-[22px] font-medium self-center text-gray-400">
                    {user.fullName}
                  </p>
                </div>
              );
            })}
        </div>
      ) : (
        <p className="m-auto align-middle text-center pt-14 text-[20px] font-medium text-gray-400">
          No New Suggestions{" "}
        </p>
      )}
    </div>
  );
}

export default SuggestedAccounts;
