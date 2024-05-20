import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import GetPosts from "./components/EditorComponents/GetPosts";
import CreatePost from "./components/EditorComponents/CreatePost";
import Feed from "./pages/Feed";
import ChatApp from "./components/Messeging/mess";
import VideoChat from "./components/videoCalling/videochat";

export default function App() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    checkForLoggedInUser().then((userObject) =>
      setCurrentUser(userObject.profile)
    );
  }, [setCurrentUser]);

  console.log(currentUser);

  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/create-post" element={<CreatePost refetchPosts={undefined} />} />
          <Route path="/get-posts" element={<GetPosts />} />
          <Route path="/chat/:id" element={<ChatApp />} />
          <Route path="/video-chat/:userId/:callUserId" element={<VideoChat />} /> 
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
