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
import ChatApp from "./components/Messaging/ChatApp"
import { useState } from "react"
import Discover from "./pages/Search"
import Layout from "./Layout"
import Search from "./pages/Search"
import SidebarChats from "./components/Messaging/sidebarChats"
import ChatLayout from "./components/Messaging/ChatLayout"
import 'leaflet/dist/leaflet.css';
import Map from "./components/layout/Map"
import ConnectionsContext from "./contexts/connectionsContext"


export default function App() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const { connections, setConnections } = useContext(ConnectionsContext)
  const [refreshUser, setRefreshUser] = useState(false)
  const [notifications, setNotifications] = useState({ received: [], sent: [] })
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
      console.log(user.profile, "Hello World")
    }

    checkLoggedIn()
  }, [setCurrentUser])


  useEffect(() => {
    const getConnections = async () => {
      if (currentUser && currentUser.id) {
        try {
          const connections = await fetchHandler(`/api/connection/${currentUser.id}`);
          console.log(connections, "Hello World");
          if (connections) {
            setConnections(connections[0]);
          }
        } catch (error) {
          console.error('Error fetching connections:', error);
        }
      }
    };

    getConnections();
  }, [currentUser, setConnections]);


 
  useEffect(() => {
    const notifications = async () => {
      const received = await fetchHandler(`/api/notifications/${currentUser.id}`);
      const sent = await fetchHandler(`/api/notifications/sent/${currentUser.id}`);
      setNotifications({ received: received[0], sent: sent[0] });
    }
    notifications()
  }, [currentUser])

  console.log(notifications, 'notifications')
  console.log(currentUser, "Hello World")
  console.log(connections, "Hello World")


  
  const handleRefresh = () => {
    setRefreshUser(!refreshUser)
  }


  
  return (
    <>
      {/* <SiteHeadingAndNav /> */}
      <main className="">
        <Routes>
          <Route
            path="/"
            element={<Home />}
          />

          <Route element={<Layout notifications={notifications} setNotifications={setConnections} />}>
            <Route
              path="/search/:query?"
              element={<Search />}
            />
            <Route
              path="/feed"
              element={<Feed refresh={handleRefresh} notifications={notifications} />}
            />
            <Route path='/map' element={<Map />} />
          </Route>

          <Route
            path="/login"
            element={<LoginPage refresh={handleRefresh} />}
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
                userId={currentUser && currentUser.id}
                username={undefined}
               
                chatroomId={undefined}
              />
            }
          />
          <Route
            path="/chats"
            element={
              <SidebarChats
              userid={currentUser && currentUser.id}
              chatRoomId={undefined}
                refresh={handleRefresh}
                onSelectChatroom={undefined}
              />
            }
          />
          <Route
            path="/chats-Lay"
            element={
              <ChatLayout
              refresh={handleRefresh}
              userId={currentUser && currentUser.id}
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
          {/* <Route
            path="/slack"
            element={<SlackChat sendMessage={undefined} />}
          /> */}
          {/* Add the new route */}
         
          <Route
            path="*"
            element={<NotFoundPage />}
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
