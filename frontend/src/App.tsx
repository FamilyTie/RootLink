import { useContext, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import SignUpPage from "./pages/SignUp"
import LoginPage from "./pages/Login"
import NotFoundPage from "./pages/NotFound"
import CurrentUserContext from "./contexts/current-user-context"
import { checkForLoggedInUser } from "./adapters/auth-adapter"
import UsersPage from "./pages/Users"
import UserPage from "./pages/User"
import GetPosts from "./components/EditorComponents/FeedPosts"
import CreatePost from "./components/EditorComponents/CreatePost"
import Feed from "./pages/Feed"
import ChatApp from "./components/Messeging/mess"
import { fetchHandler } from "./utils"

export default function App() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await checkForLoggedInUser();
      if (user) {
        const likedPosts = await fetchHandler(`/api/posts/liked/${user.profile.id}`)
        user.profile['likedPosts'] =  new Set(likedPosts[0])
      }
      setCurrentUser(user.profile);
    }

    checkLoggedIn()
 
  }, [setCurrentUser]);
  console.log(currentUser, 'Hello World');
  return (
    <>
      {/* <SiteHeadingAndNav /> */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route path="/feed" element={<Feed />} />
          <Route
            path="/sign-up"
            element={<SignUpPage />}
          />
          <Route
            path="/users"
            element={<UsersPage />}
          />
          <Route
            path="/users/:id"
            element={<UserPage />}
          />
          <Route
            path="/create-post"
            element={<CreatePost refetchPosts={undefined} />}
          />
          <Route
            path="/chat/:id"
            element={<ChatApp />}
          />
          // Add the new route
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
    </>
  );
}
