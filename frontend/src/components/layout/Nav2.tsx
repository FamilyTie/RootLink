import { useContext } from "react";
import { useProfile } from "../../state/store";
import { logUserOut } from "../../adapters/auth-adapter";
import { useNavigate } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import { useLocation } from "react-router-dom";
function Nav2() {
  const currentProfile = useProfile((state) => state.currentProfile);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;


  return (
    <nav className="flex px-[2%] border-b-[1px]  py-[0.5rem] w-screen bg-white fixed z-[502]  justify-between">
      <div className="flex   gap-1 ">
        <div className=" flex">
          <h3 className="text-[28px] font-semibold">RootLink</h3>

          <img className="w-[22px] self-center" src="/tree2.png" alt="tree" />
        </div>
        { pathname.startsWith("/feed") &&
          <div className="ml-20 mt-2">
        
        </div>
        }
        
      </div>

      <div className="flex gap-5">
      
        <p className="text-[25px]  font-medium m-auto">
          {currentProfile && currentProfile.username}
        </p>
        <div className="border overflow-hidden rounded-full w-[3rem] h-[3rem]">
          <img
            className="w-full m-auto"
            src={currentProfile && (currentProfile as any).img}
          ></img>
        </div>
      </div>
    </nav>
  );
}

export default Nav2;
