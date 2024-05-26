import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile, useConnections, useNotifications } from "../../state/store";
import CreatePost from "../../components/EditorComponents/CreatePost";
import FeedPosts from "../../components/EditorComponents/FeedPosts";
import handleFetch from "../../components/EditorComponents/Editor-Configs/Fetching";
import ChatLayout from "../../components/Messaging/ChatLayout";
import Map from "../../components/layout/Map";
import SuggestedAccounts from "./SuggestedAccounts";
import Feedback from "./Feedback";

function Feed({ refresh }: { refresh: () => void }){
  const currentProfile = useProfile((state) => state.currentProfile);
  const [refetchFlag, setRefetchFlag] = useState(false);
  const [posts, setPosts] = useState([]);


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


  return (
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
          <SuggestedAccounts />
         
          <div className="  ">
            <Map />
            <Feedback />
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
