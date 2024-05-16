import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/current-user-context";
import { logUserOut } from "../../adapters/auth-adapter";
import { useNavigate } from "react-router-dom";

function Nav2() {
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const navigate = useNavigate();



  
  const handleLogout  = async () => {
    logUserOut();
    setCurrentUser(null);
    navigate("/");
  }
  return (
    <nav className="flex px-[2%] border-b-[1px]  py-[0.5rem] w-screen bg-white absolute z-[1000]  justify-between">
      <div className="flex   gap-1 ">
        <div className=" flex">
          <h3 className="text-[28px] font-semibold">RootLink</h3>

          <img className="w-[22px] self-center" src="/tree2.png" alt="tree" />
        </div>

        <div className="m-auto ml-20 relative">
          <img
            className="absolute w-[1.2rem] left-[6rem] top-[9px] "
            src="/search.png"
          ></img>
          <input
            placeholder="Search something here..."
            className="  pb-1 pl-12 text-[1.3rem] placeholder:text-gray-300 text-[#9DADB8] font-medium  m-auto ml-[5rem] w-[22rem] h-[2.2rem]  rounded  border-[2px] "
          ></input>
        </div>
      </div>

      <div className="flex gap-5">
        <p className="underline m-auto text-[20px] cursor-pointer" onClick={handleLogout}>Logout</p>
        <p className="text-[25px]  font-medium m-auto">{currentUser && currentUser.username}</p>
        <div className="border overflow-hidden rounded-full w-[3rem] h-[3rem]">
          <img  className='w-full m-auto' src={currentUser && (currentUser as any).img}></img>
        </div>
      </div>
    </nav>
  );
}

export default Nav2;
