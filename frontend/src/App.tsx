import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/Sign-up/SignUp";
import LoginPage from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFound";
import { checkForLoggedInUser } from "./adapters/auth-adapter";
import Feed from "./pages/Feed/Feed";
import { fetchHandler, getCurrentUserProfile, getNotificationsForCurrentProfile , getConnectionsForCurrentProfile} from "./utils";
import ChatApp from "./components/Messaging/ChatApp";
import Layout from "./Layout";
import SidebarChats from "./components/Messaging/sidebarChats";
import ChatLayout from "./components/Messaging/ChatLayout";
import "leaflet/dist/leaflet.css";
import Map from "./components/layout/Map";
import { useConnections, useProfile, useNotifications } from "./state/store";
import { Profile } from "./pages/Profile/ProfilePage";
import Settings from "./pages/Settings/settingsPage";
import VideoChatWrapper from "./components/Messaging/VideoChatWrapper";


export default function App() {
  const [currentProfile, setCurrentProfile] = [useProfile((state) => state.currentProfile), useProfile((state) => state.setCurrentProfile)];
  const [connections, setConnections] = [useConnections((state) => state.connections), useConnections((state) => state.setConnections)];
  const [refreshUser, setRefreshUser] = useState(false);
  const [notifications, setNotifications] = useNotifications((state) => [state.notifications, state.setNotifications]);

  //populating currentProfile state 
  useEffect(() => {
    const saveCurrentUserProfile = async () => {
      await getCurrentUserProfile(setCurrentProfile);
    };

    saveCurrentUserProfile();
  }, [setCurrentProfile, refreshUser]);



  //populating connections state with connections of user signed in
  useEffect(() => {
    if (!currentProfile) return;
    const saveCurrentProfilesConnections = async () => {
      await getConnectionsForCurrentProfile(currentProfile.id, setNotifications);
    };

    saveCurrentProfilesConnections();
  }, [currentProfile, setConnections]);



  //populating notifications state with notifications of user signed in
  useEffect(() => {
    if (!currentProfile) return;
    const saveCurrentProfilesNotifications = async () => {
      await getNotificationsForCurrentProfile(currentProfile.id, setNotifications);
    };
    saveCurrentProfilesNotifications();
  }, [currentProfile]);


  const handleRefresh = () => {
    setRefreshUser(refreshUser => !refreshUser);
  };



  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            element={
              <Layout
              />
            }
          >
            <Route
              path="/feed"
              element={
                <Feed refresh={handleRefresh}  />
              }
            />
            <Route path="/map" element={<Map />} />
            <Route
              path="/profile/:id"
              element={
                <Profile
                  notifications={notifications}
                  setNotifications={setNotifications}
                />
              }
            />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route
            path="/login"
            element={<LoginPage refreshUser={handleRefresh} />}
          />

          <Route
            path="/sign-up"
            element={<SignUpPage refresh={handleRefresh} />}
          />
          <Route
            path="/chat/:id"
            element={
              <ChatApp
                toggleChatApp={undefined}
                userId={currentProfile && currentProfile.id}
                username={undefined}
                chatroomId={undefined}
              />
            }
          />
          <Route
            path="/chats"
            element={
              <SidebarChats
                toggle={undefined}
                userid={currentProfile && currentProfile.id}
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
                userId={currentProfile && currentProfile.id}
                username={undefined}
              />
            }
          />
          <Route
            path="/sign-up"
            element={<SignUpPage refresh={handleRefresh} />}
          />

          {/* <Route
            path="/slack"
            element={<SlackChat sendMessage={undefined} />}
          /> */}
          {/* Add the new route */}

          <Route path="/video-chat/:id" element={<VideoChatWrapper />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
