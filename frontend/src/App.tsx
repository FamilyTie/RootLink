import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignUpPage from "./pages/SignUp";
import LoginPage from "./pages/Login";
import SiteHeadingAndNav from "./components/layout/SiteHeadingAndNav";
import NotFoundPage from "./pages/NotFound";
import UserContext from "./contexts/current-user-context";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import UsersPage from "./pages/Users";
import UserPage from "./pages/User";
import CreatePostPage from "./pages/CreatePostPage";
import Feed from "./pages/Feed";
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
      {/* <SiteHeadingAndNav /> */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserPage />} />
          <Route path="/create-post" element={<CreatePostPage />} /> // Add the
          new route
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
