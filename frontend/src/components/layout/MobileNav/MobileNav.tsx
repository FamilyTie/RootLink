import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useProfile, useNotifications } from "../../../state/store";
import { logUserOut } from "../../../adapters/auth-adapter";
import MobileNavGraphics from "./MobileNavGraphics";
import MobileNavSearch from "./MobileNavSearch";
import MobileNavNotifications from "./MobileNavNotifications";

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
    <div className="h-[5rem]    ">
      <MobileNavGraphics
        setSearchOpen={setSearchOpen}
        setNotificationsOpen={setNotificationsOpen}
      />
      <MobileNavSearch searchOpen={searchOpen} />
      <MobileNavNotifications notificationsOpen={notificationsOpen} />

      <div></div>
    </div>
  );
}

export default MobileNav;
