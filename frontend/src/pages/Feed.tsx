import { useContext } from "react";
import CurrentUserContext from "../contexts/current-user-context";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/layout/SideBar";
import HomeNav from "../components/layout/HomeNav";
import Nav2 from "../components/layout/Nav2";
import CreatePostPage from "./CreatePostPage";

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
      <div className="w-full pl-[10rem] pt-[5rem]  bg-gray-100     rounded-tl-[3rem]   h-screen">
      <CreatePostPage />
      </div>
      
    </div>
  );
}

export default Feed;
