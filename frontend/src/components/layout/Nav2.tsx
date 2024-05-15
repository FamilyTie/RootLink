import { useState, useEffect } from "react";

function Nav2() {
  const letters = "Search something here...".split("");
  const [searchPlaceHolder, setSearchPlaceHolder] = useState("");

  useEffect(() => {
    letters.forEach((letter, index) => {
      setTimeout(() => {
        setSearchPlaceHolder((prev) => prev + letter);
      }, index * 100); // Adjust the delay as needed
    });
  }, []);
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
            placeholder={searchPlaceHolder}
            className="  pb-1 pl-12 text-[1.3rem] text-[#9DADB8] font-medium  m-auto ml-[5rem] w-[22rem] h-[2.2rem]  rounded  border-[2px] "
          ></input>
        </div>
      </div>

      <div className="flex gap-5">
        <p className="text-[25px]  font-medium m-auto">Bryan Ramos</p>
        <div className="border rounded-full w-[3rem] h-[3rem]"></div>
      </div>
    </nav>
  );
}

export default Nav2;
