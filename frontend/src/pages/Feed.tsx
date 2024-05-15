import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import HomeNav from "../components/layout/HomeNav";
import Nav2 from "../components/layout/Nav2";
import CreateAPost from "../components/EditorComponents/CreatePost";
import Post from "../components/layout/Post";

function Feed() {
  // const { currentUser } = useContext(CurrentUserContext)
  // if (!currentUser) {
  //     const navigate = useNavigate()
  //     navigate("/")
  // }

  return (
    <div className="">
      <Nav2 />
      <SideBar />
      <div className="overlay-shadow absolute   w-full bottom-0 h-[5rem]"></div>
      <div className="w-full  pl-[15rem] pt-[5rem]     bg-slate-100 h-screen overflow-scroll   rounded-tl-[3rem]   ">
        
        <div className="h-full overflow-scroll">
          <CreateAPost refetchPosts={undefined} />
          <div className="mt-5">
            <Post />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
