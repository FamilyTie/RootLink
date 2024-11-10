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
    <div   className="">
      <div  className="flex  overflow-hidden  justify-around tablet:justify-between  bg-slate-100">
        <div className=" flex pl-[2rem] pt-[5rem] bg-slate-100 h-screen overflow-hidden rounded-tl-[3rem]">
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
             <div className='tablet-xs:hidden'>
                <SuggestedAccounts />
                </div>
            <div className=" overflow-hidden mt-5">
              
              <FeedPosts posts={posts} refetch={refetchFlag} view={true} />
            </div>
          </div>
        </div>

        <div className="overflow-hidden hidden mt-[5rem]  tablet-xs:flex-col tablet-xs:flex ">
          <SuggestedAccounts />
         
          <div className=" overflow-hidden  ">
            <Map />
            <Feedback />
          </div>
        </div>

        <div className="h-full hidden tablet:flex overflow-hidden">
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
