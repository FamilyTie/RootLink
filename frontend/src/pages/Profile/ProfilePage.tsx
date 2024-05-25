import { useState, useEffect, useContext } from "react";
import { fetchProfileDataByUserId, requestConnection } from "../../utils";
import FeedPosts from "../../components/EditorComponents/FeedPosts";
import { useLocation } from "react-router-dom";
import {useProfile, useConnections} from "../../state/store";

export const Profile = ({ notifications, setNotifications }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [posts, setPosts] = useState([]);
  const [requested, setRequested] = useState(false);
  const [connected, setConnected] = useState(null);
  const [currentProfile, setCurrentProfile] = useProfile((state) => [state.currentProfile, state.setCurrentProfile]);
  
  const [connections, setConnections] = useConnections((state) => [state.connections, state.setConnections]);
  const [userNow, setUserNow] = useState(null);
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  useEffect(() => {
    if (!currentProfile) return;
    setUserNow(currentProfile);
  }, [currentProfile]);

  useEffect(() => {
    if (!userNow || !connections) return;
    const isConnection = connections.some((connection) => {
      return (
        (connection.profile_id1 === userNow.id &&
          connection.profile_id2 === Number(userId)) ||
        (connection.profile_id2 === userNow.id &&
          connection.profile_id1 === Number(userId))
      );
    });
    setConnected(isConnection);
  }, [userNow, connections]);

  console.log(connected, "Connected");
  console.log(userNow, userId, "Current User");

  console.log(notifications, "hello");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchProfileDataByUserId(userId);
        if (response) {
          setProfile(response);
          console.log("Response received:", response);
          const likes = response.posts.reduce(
            (sum, post) =>
              sum +
              (Number.isNaN(parseInt(post.likes_count, 10))
                ? 0
                : parseInt(post.likes_count, 10)),
            0
          );
          const comments = response.posts.reduce(
            (sum, post) => sum + post.comments_count,
            0
          );
          setTotalLikes(likes);
          setTotalComments(comments);
          setLoading(false);
        } else {
          setError("Failed to fetch profile data");
          setLoading(false);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to fetch profile data");
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  // useEffect(() => {
  //   if (!currentUser || !profile || !notifications) return;
  //   const hasSentNotification = notifications.sent.some(
  //     (notification) =>
  //       notification.profile_id_sent === currentUser.id &&
  //       notification.profile_id_received === profile.id
  //   );
  //   setRequested(hasSentNotification);
  // }, [notifications, currentUser, profile]);
  console.log(notifications, "Notifications");
  const handleRequest = async (profileId) => {
    if (userNow) {
      console.log("Requesting connection");
      const connection = await requestConnection(userNow.id, Number(userId));

      setNotifications((prev) => ({
        ...prev,
        sent: [...prev.sent, connection],
      }));
      setRequested(true);
    }
  };

  useEffect(() => {
    console.log(connections, "Connections");
  }, [connections]);

  useEffect(() => {
    console.log(profile, "Profile");
    if (profile) {
      setPosts(
        profile.posts.map((post) => ({
          ...post,
          full_name: profile.full_name,
          profile_photo: profile.img,
          username: profile.username,
        }))
      );
    }
  }, [profile]);

  console.log(posts, "Posts");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const isConnected = connections.some(
    (connection) =>
      (connection.profile_id1 === currentProfile.id &&
        connection.profile_id2 === profile.id) ||
      (connection.profile_id2 === currentProfile.id &&
        connection.profile_id1 === profile.id)
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <h1>Profile</h1>
      <div className="relative">
        <div className="ml-[12.5rem] absolute top-0 left-0 w-[86%] h-[14rem] bg-cover bg-center bg-[rgb(8,66,108)]"></div>
        <div className="ml-[12.5rem] absolute left-0 w-[86%] h-[14rem] bg-cover bg-center"></div>
      </div>
      <div className="relative ml-[15rem] mt-[7rem] w-[80%] h-[20rem] bg-white text-black rounded-md p-4">
        <div className="flex items-start justify-between">
          <div className="flex gap-4 mt-4">
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{connections.length}</p>
                <p className="text-gray-600">Connections</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{profile.posts.length}</p>
                <p className="text-gray-600">Posts</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{totalLikes}</p>
                <p className="text-gray-600">Likes</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{totalComments}</p>
                <p className="text-gray-600">Comments</p>
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 -top-12">
            <img
              className="w-24 h-24 rounded-full border border-slate-100 shadow-lg"
              src={
                profile.img ||
                "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
              }
              alt={profile.full_name}
            />
          </div>
          <div className="flex-shrink-0 mt-4">
            {!connected ? (
              requested ? (
                <button
                  className="bg-white text-[#074979] py-2 px-4 rounded shadow"
                  disabled
                >
                  Requested
                </button>
              ) : (
                <button
                  onClick={() => handleRequest(profile.id)}
                  className="bg-[#074979] text-white py-2 px-4 rounded shadow transition-all duration-300 ease-in-out hover:bg-white border-transparent hover:border-[#074979] border hover:text-[#074979]"
                >
                  Connect
                </button>
              )
            ) : null}
          </div>
        </div>
        <div className="mt-5 text-center">
          <p className="text-xl font-semibold">{profile.full_name}</p>
          <p className="text-gray-600">{profile.username}</p>
        </div>
        <hr className="mt-4 w-full border-t-1 border-gray-200" />
        <div className="mt-5 mx-auto text-center w-[40rem]">
          <p>{profile.bio}</p>
          <h1 className="mt-[5rem] text-[25px] font-semibold">Posts</h1>
        </div>
      </div>
      {posts && (
        <div className="ml-[36.5rem] scale-[0.9] mt-[5rem] w-auto h-auto">
          <FeedPosts refetch={false} posts={posts} view={false} />
        </div>
      )}
    </div>
  );
};
