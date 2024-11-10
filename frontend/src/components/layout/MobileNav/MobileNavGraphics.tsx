import { SideBarGraphicsProps } from "../../../../Interfaces&Types/interfaces";
import { useState, useEffect } from "react";
import { getPathIndex } from "../../../utils";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pathIndexes, images } from "../SideBar/data";
import { logUserOut } from "../../../adapters/auth-adapter";
import { useProfile } from "../../../state/store";
function MobileNavGraphics({ setNotificationsOpen, setSearchOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const [clicked, setClicked] = useState(getPathIndex(pathname, pathIndexes));

  //handling navigation based on item clicked by user
  useEffect(() => {
    setClicked(getPathIndex(pathname, pathIndexes));
  }, [pathname]);

  const handleClick = (link) => {
    if (link === "/search") {
      setSearchOpen(true);
      setNotificationsOpen(false);
      setClicked(2);
    } else if (link === "/notifications") {
      setNotificationsOpen(true);
      setSearchOpen(false);
      setClicked(3);
    } else {
      setSearchOpen(false);
      setNotificationsOpen(false);

      navigate(link);
      setClicked(getPathIndex(link, pathIndexes));
    }
  };

  const handleLogout = async () => {
    logUserOut();
    const setCurrentProfile = useProfile((state) => state.setCurrentProfile);
    setCurrentProfile(null);
    navigate("/");
  };

  return (
    <div
      className={`  flex h-[5rem]  z-[650]    w-screen fixed bottom-[0]  bg-white   backdrop-blur-md   overflow-hidden    pt-[5rem]   transition-all duration-200  `}
    >
      <div className=" flex justify-around w-screen translate-y-[-4.5rem] pb-5">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleClick(image.link)}
            className={`py-5   ${
              clicked === image.id
                ? " border-b-[5px]  pb-7     border-[#074979]"
                : "pb-[1.15rem]  border-transparent"
            } cursor-pointer transition-all duration-300  gap-5 flex`}
          >
            <img
              src={clicked === image.id ? image.src[1] : image.src[0]}
              alt=""
              className={`w-[25px] mouse h-[25px] ${
                clicked === image.id
                  ? "text-[#074979]"
                  : "text-black  opacity-50 "
              }`}
            />
        
          </div>
        ))}
      </div>

      <div
        onClick={() => handleLogout()}
        className="flex  pl-8 pt-8 cursor-pointer gap-3"
      >
        {/* <img src="/exit.png" className="opacity-50 w-[25px]"></img>
        <p className="text-[20px]  opacity-50 font-medium textshadow2">
          Logout
        </p> */}
      </div>
    </div>
  );
}

export default MobileNavGraphics;
