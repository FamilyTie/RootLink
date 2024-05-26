import { SideBarGraphicsProps } from "../../../../Interfaces&Types/interfaces";
import { useState, useEffect } from "react";
import { getPathIndex } from "../../../utils";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { pathIndexes, images } from "./data";
import { logUserOut } from "../../../adapters/auth-adapter";
import { useProfile } from "../../../state/store";
function SideBarGraphics({ setNotificationsOpen, setSearchOpen }) {
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
      className={`  z-[501] w-[14%]      h-full fixed bg-white   backdrop-blur-md   overflow-hidden  flex flex-col  pt-[5rem]   transition-all duration-200  `}
    >
      <div className="border-b border-dashed pb-5">
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleClick(image.link)}
            className={`py-5   ${
              clicked === image.id
                ? " border-l-[5px] pl-8   bg-gray-50  border-[#074979]"
                : " pl-6 border-l-[5px] border-transparent"
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
            <p
              className={`text-[20px] transition-all   translate-y-[-3px] my-auto textshadow2 ${
                clicked === image.id
                  ? "text-[#074979] "
                  : "text-black opacity-50"
              } font-medium `}
            >
              {image.text}
            </p>
          </div>
        ))}
      </div>

      <div
        onClick={() => handleLogout()}
        className="flex  pl-8 pt-8 cursor-pointer gap-3"
      >
        <img src="/exit.png" className="opacity-50 w-[25px]"></img>
        <p className="text-[20px]  opacity-50 font-medium textshadow2">
          Logout
        </p>
      </div>
    </div>
  );
}

export default SideBarGraphics;
