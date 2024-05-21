import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/current-user-context";
import SideBar from "../components/layout/SideBar";
import HomeNav from "../components/layout/HomeNav";
import Nav2 from "../components/layout/Nav2";
import CreatePost from "../components/EditorComponents/CreatePost";
import FeedPosts from "../components/EditorComponents/FeedPosts";
import handleFetch from "../components/EditorComponents/Editor-Configs/Fetching";
import ChatLayout from "../components/Messaging/ChatLayout";

function Feed(refresh) {
  const { currentUser } = useContext(CurrentUserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [similarUsers, setSimilarUsers] = useState([]);
  const [viewAll, setViewAll] = useState(false);
  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (user && user.similarProfiles) {
      const similarData = user.similarProfiles.most_similar_profiles;
      const fetchSimilarProfiles = async () => {
        const res = await Promise.all(
          similarData.map(async (profile) => {
            const response = await fetch(`/api/profiles/${profile.profile_id}`);
            const data = await response.json();
            return { ...data, similarity: profile.similarity };
          })
        );
        setSimilarUsers(res);
      };
      fetchSimilarProfiles();
    }
  }, [user]);

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
  }

  return (
    <div className="overflow-hidden">
      <div className="flex overflow-hidden bg-slate-100">
        <div className="w-[52rem] flex pl-[15rem] pt-[5rem] bg-slate-100 h-screen overflow-hidden rounded-tl-[3rem]">
          <div style={{ height: '100%', overflow: 'scroll', scrollbarWidth: 'none', msOverflowStyle: 'none' }} className="h-full overflow-scroll">
            <CreatePost refetchPosts={handleRefetch} />
            <div className="mt-5">
              <FeedPosts posts={posts} />
            </div>
          </div>
        </div>

        <div >
          <div className={`w-[20rem] relative transition-all duration-200 rounded-md p-5 bg-white mt-[5rem] h-[${17 + (5 * (similarUsers.length - 1))}rem]`}>
            <div className="flex border-b pb-2 justify-between">
              <p className="text-[22px]">Suggested Account</p>
              {similarUsers.length > 1 && <p onClick={handleViewAll} className="text-[20px] hover:opacity-70 cursor-pointer font-semibold text-blue-500">
                View All
              </p> }
            </div>

            <div className="flex gap-3 pt-3">
              <img
                src={similarUsers[0]?.img}
                className="w-14 h-14 rounded-full p-[2px]"
                alt="Similar User"
              />
              <p className="text-[22px] font-medium self-center text-gray-400">
                {similarUsers[0]?.fullName}
              </p>
            </div>
            <h1 className="text-[22px] pb-5 font-medium">
              {Math.floor(60 + similarUsers[0]?.similarity * 40)}% Match
            </h1>
            <div className="flex gap-2 justify-center">
              <button
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
            {viewAll && similarUsers.length > 1 &&
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
            })
          
          }
          </div>

         
        </div>

        <div className="bg-slate-100 h-full overflow-hidden">
          {currentUser && (
            <ChatLayout
              refresh={refresh}
              userId={currentUser.id}
              username={currentUser.username}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
