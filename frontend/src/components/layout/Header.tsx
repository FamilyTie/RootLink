import { useContext } from "react";
import { useProfile } from "../../state/store";
import { logUserOut } from "../../adapters/auth-adapter";
import { useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import { useLocation } from "react-router-dom";
import ChatApp from "../Messaging/ChatApp";
import ChatLayout from "../Messaging/ChatLayout";
import { useState } from "react";

function Header() {
  const currentProfile = useProfile((state) => state.currentProfile);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const [chatExpanded, setChatExpanded] = useState<boolean>(false);

  return (
    <nav className="flex px-[2%] border-b-[1px]  py-[0.5rem] w-screen bg-white fixed z-[502]  justify-between">
      <div className="flex   gap-1 ">
        <div className=" flex">
          <h3 className="text-[28px] font-semibold">RootLink</h3>

          <img className="w-[22px] self-center" src="/tree2.png" alt="tree" />
        </div>
        { pathname.startsWith("/feed") &&
          <div className=" mt-2">
        
        </div>
        }
        
      </div>

      <div className="flex gap-3 ">
      
        <p className="text-[25px] hidden phone-lg:flex  font-medium m-auto">
          {currentProfile && currentProfile.username}
        </p>
        <div className="border overflow-hidden rounded-full w-[3rem] h-[3rem]">
          <img
            className="w-full m-auto"
            src={currentProfile && (currentProfile as any).img}
         />
        </div>
        <div onClick={()  => setChatExpanded(!chatExpanded)} className="flex  cursor-pointer flex-col  tablet:hidden  items-center m-auto ">
          <img  src='/chat (1).png' className="w-8 h-8   "  />
          
        </div>
        <div   className={` top-0 duration-300   fixed ${chatExpanded? '  translate-x-[-7.5rem] tablet:hidden  pointer-events-none ' : ' translate-x-[100%]'}`}>
            <ChatLayout refresh={() => {}} username={currentProfile?.username} userId={currentProfile?.id} />
          </div>
      
      </div>
    </nav>
  );
}

export default Header;
