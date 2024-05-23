import { useContext, useEffect, useState } from "react"
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
import { fetchHandler } from "./utils"
import ChatApp from "./components/Messeging/ChatApp"
import Discover from "./pages/Search"
import Layout from "./Layout"
import Search from "./pages/Search"
import SidebarChats from "./components/Messeging/sidebarChats"
import ChatLayout from "./components/Messeging/ChatLayout"
import Profile from "./components/ProfilePage"
import Settings from "./components/settingsPage"
import VideoChatWrapper from "./components/Messeging/VideoChatWrapper"

export default function App() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const [refreshUser, setRefreshUser] = useState(false)

  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await checkForLoggedInUser()
      // if (user) {
      //   const likedPosts = await fetchHandler(
      //     `/api/posts/liked/${user.profile.id}`
      //   );
      //   user.profile["likedPosts"] = new Set(likedPosts[0]);
      // }
      setCurrentUser(user.profile)
    }

    checkLoggedIn()
  }, [setCurrentUser, refreshUser])
  console.log(currentUser, "Hello World")

  const handleRefresh = () => {
    setRefreshUser(!refreshUser)
  }

  return (
    <>
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
          <Route element={<Layout />}>
            <Route
              path="/search/:query?"
              element={<Search />}
            />
            <Route
              path="/feed"
              element={<Feed />}
            />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/settings"
              element={<Settings />}
            />
          </Route>
          <Route
            path="/login"
            element={<LoginPage refresh={handleRefresh} />}
          />
          <Route
            path="/feed"
            element={<Feed />}
          />
          <Route
            path="/sign-up"
            element={<SignUpPage refresh={handleRefresh} />}
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
            path="/chat/:id"
            element={
              <ChatApp
                username={undefined}
                userId={2}
                chatroomId={undefined}
              />
            }
          />
          <Route
            path="/chats"
            element={
              <SidebarChats
                userId={2}
                onSelectChatroom={undefined}
              />
            }
          />
          <Route
            path="/chats-Lay"
            element={
              <ChatLayout
                userId={2}
                username={undefined}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<SignUpPage refresh={handleRefresh} />}
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
            path="fed"
            element={<Feed />}
          />
          <Route
            path="/video-chat/:id"
            element={<VideoChatWrapper />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </main>
    </>
  )
}
