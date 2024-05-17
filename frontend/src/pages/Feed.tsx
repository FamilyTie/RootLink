import { useContext, useEffect } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import HomeNav from "../components/layout/HomeNav";
import Nav2 from "../components/layout/Nav2";
import CreatePost from "../components/EditorComponents/CreatePost";
import FeedPosts from "../components/EditorComponents/FeedPosts";
import { useState } from "react";
import handleFetch from "../components/EditorComponents/Editor-Configs/Fetching";
function Feed() {
  const { currentUser } = useContext(CurrentUserContext)
  const [refetchFlag, setRefetchFlag] = useState(false)
  const [posts, setPosts] = useState([])
  setTimeout(() => {
    if (!currentUser) {
        const navigate = useNavigate()
        navigate("/")
    }
  }, 1000)
  

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await handleFetch("/api/posts");
      setPosts(posts[0]);
    }
    fetchPosts();
  }, [refetchFlag]);

  const handleRefetch = () => {
    setRefetchFlag(!refetchFlag);
  }

  return (
    <div className="">
      <div className="overlay-shadow absolute   w-full bottom-0 h-[5rem]"></div>
      <div className="w-full  pl-[15rem] pt-[5rem]     bg-slate-100 h-screen overflow-scroll   rounded-tl-[3rem]   ">
        
        <div className="h-full overflow-scroll">
          <CreatePost  refetchPosts={handleRefetch} />
          <div className="mt-5">
            <FeedPosts posts={posts} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
