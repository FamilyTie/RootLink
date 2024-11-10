import { text } from "express";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchResult } from "../../../../Interfaces&Types/interfaces";
import { fetchHandler, getPostOptions } from "../../../utils";
import {
  useProfile,
  useConnections,
  useNotifications,
} from "../../../state/store";
import { requestConnection } from "../../../utils";
import { logUserOut } from "../../../adapters/auth-adapter";
import { getPathIndex } from "../../../utils";
import { images, pathIndexes } from "../SideBar/data";
import SideBarGraphics from "../SideBar/SideBarGraphics";
import SideBarSearch from "../SideBar/SideBarSearch";
import SideBarNotifications from "../SideBar/SideBarNotifications";
import MobileNavGraphics from "./MobileNavGraphics";

function MobileNav() {
  const setCurrentProfile = useProfile((state) => state.setCurrentProfile);
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useNotifications((state) => [
    state.notifications,
    state.setNotifications,
  ]);

  useEffect(() => {
    console.log(notifications, "Notifications");
  }, [notifications]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    logUserOut();
    setCurrentProfile(null);
    navigate("/");
  };

  return (
    <div className="flex   ">
      <MobileNavGraphics
        setSearchOpen={setSearchOpen}
        setNotificationsOpen={setNotificationsOpen}
      />
      <SideBarSearch searchOpen={searchOpen} />
      <SideBarNotifications notificationsOpen={notificationsOpen} />

      <div></div>
    </div>
  );
}

export default MobileNav;
