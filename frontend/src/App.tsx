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
import { fetchHandler } from "./utils"
import ChatApp from "./components/Messeging/ChatApp"
import { useState } from "react"
import SidebarChats from "./components/Messeging/sidebarChats"
import ChatLayout from "./components/Messeging/ChatLayout"
export default function App() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const [refreshUser, setRefreshUser] = useState(false)
  useEffect(() => {
    const checkLoggedIn = async () => {
      const user = await checkForLoggedInUser()
      if (user) {
        const likedPosts = await fetchHandler(
          `/api/posts/liked/${user.profile.id}`
        )
        user.profile["likedPosts"] = new Set(likedPosts[0])
      }
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
      {/* <SiteHeadingAndNav /> */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />
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
            path="/create-post"
            element={<CreatePost refetchPosts={undefined} />}
          />
          <Route
            path="/chat/:id"
            element={
              <ChatApp
                username={undefined}
                userId={undefined}
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
          {/* <Route
            path="/slack"
            element={<SlackChat sendMessage={undefined} />}
          /> */}
          // Add the new route
          <Route
            path="fed"
            element={<Feed />}
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
