import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile, useConnections } from "../../state/store";
import SideBar from "../../components/layout/SideBar";
import HomeNav from "../Home/HomeNav";
import Nav2 from "../../components/layout/Nav2";
import CreatePost from "../../components/EditorComponents/CreatePost";
import FeedPosts from "../../components/EditorComponents/FeedPosts";
import handleFetch from "../../components/EditorComponents/Editor-Configs/Fetching";
import ChatLayout from "../../components/Messaging/ChatLayout";
import Map from "../../components/layout/Map";
import { requestConnection } from "../../utils";

function Feed({ notifications, refresh }) {
  const [currentProfile, setCurrentProfile] = [useProfile((state) => state.currentProfile), useProfile((state) => state.setCurrentProfile)];
  const [connections, setConnections] = [useConnections((state) => state.connections), useConnections((state) => state.setConnections)];
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  const [resetPost, setResetPost] = useState(false);
  
  useEffect(() => {
    if (!currentProfile) {
      navigate("/");
    } else {
      setUser(currentProfile);
      setLoading(false);
    }
    4;
  }, [currentProfile, navigate]);

  useEffect(() => {
    if (user && user.similarProfiles) {
      const similarData = user.similarProfiles.most_similar_profiles;
      const fetchSimilarProfiles = async () => {
        try {
          const res = await Promise.all(
            similarData.map(async (profile) => {
              const response = await fetch(
                `/api/profiles/${profile.profile_id}`
              );
              if (!response.ok) {
                throw new Error(
                  `Failed to fetch profile with id ${profile.profile_id}`
                );
              }
              const data = await response.json();
              return { ...data, similarity: profile.similarity };
            })
          );

          const filteredSimilarUsers = res
            .filter(
              (similarUser) =>
                !connections.some(
                  (connection) =>
                    connection.profile_id1 === similarUser.id ||
                    connection.profile_id2 === similarUser.id
                )
            )
            .map((similarUser) => {
              const hasSentNotification = notifications.sent.some(
                (notification) =>
                  notification.profile_id_sent === user.id &&
                  notification.profile_id_received === similarUser.id
              );
              const hasReceivedNotification = notifications.received.some(
                (notification) =>
                  notification.profile_id_sent === similarUser.id &&
                  notification.profile_id_received === user.id
              );
              return {
                ...similarUser,
                requested: hasSentNotification,
                received: hasReceivedNotification,
              };
            });

          setSimilarUsers(filteredSimilarUsers);
        } catch (error) {
          console.error("Error fetching similar profiles:", error);
        }
      };

      fetchSimilarProfiles();
    }
  }, [user, connections, notifications]);

  console.log(similarUsers, "similarUsers");
  console.log(notifications, "notifications");

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await handleFetch("/api/posts");
      setPosts(posts[0]);
    };
    fetchPosts();
  }, [refetchFlag]);

  const handleRefetch = () => {
    setRefetchFlag(!refetchFlag);
  };

  if (loading) {
    return null;
  }

  const handleViewAll = () => {
    setViewAll(!viewAll);
  };

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

    refresh();
  };

  console.log(posts, "posts");

  return currentProfile &&  (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden  bg-slate-100">
        <div className="w-[48rem] flex pl-[15rem] pt-[5rem] bg-slate-100 h-screen overflow-hidden rounded-tl-[3rem]">
          <div
            style={{
              height: "100%",
              overflow: "scroll",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            className="h-full overflow-scroll"
          >
            <CreatePost
              onCancel={undefined}
              onSave={undefined}
              refetchPosts={handleRefetch}
            />
            <div className="mt-5">
              <FeedPosts posts={posts} refetch={refetchFlag} view={true} />
            </div>
          </div>
        </div>

        <div>
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
          <div className="  ">
            <Map />
            <div className="flex justify-between px-5 bg-white rounded py-4 mt-5 w-[24rem]">
              <div>
                <h1 className="text-[20px] font-semibold">
                  Feature Suggestions?
                </h1>
                <p className="w-[10rem]">
                  Help us solve our mission by providing feedback!
                </p>
              </div>
              <img
                className="w-[4rem] h-[4.5rem] align-middle my-auto"
                src="/code.png"
              ></img>
            </div>
          </div>
        </div>

        <div className="bg-slate-100 h-full overflow-hidden">
          {currentProfile && (
            <ChatLayout
              refresh={refresh}
              userId={currentProfile.id}
              username={currentProfile.username}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
