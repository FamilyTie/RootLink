import { text } from "express";
import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { SearchResult } from "../../../interfaces";
import { fetchHandler } from "../../utils";
import CurrentUserContext from "../../contexts/current-user-context";
function SideBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { currentUser } = useContext(CurrentUserContext);
  const pathIndexes = {
    "/feed": 1,
    "/search": 2,
    "/discover": 3,
    "/notifications": 4,
    "/messages": 5,
    "/settings": 6,
  };

  const getPathIndex = (path) => {
    // Check for exact matches first
    if (pathIndexes[path] !== undefined) {
      return pathIndexes[path];
    }

    // Check for dynamic routes
    const dynamicRoutes = [
      { path: "/search/", index: 2 },
      // Add other dynamic routes here if needed
    ];

    for (let route of dynamicRoutes) {
      if (path.startsWith(route.path)) {
        return route.index;
      }
    }
  };

  const images = [
    {
      id: 1,
      src: ["/home (1).png", "/home (2).png"],
      text: "Home",
      link: "/feed",
    },
    {
      id: 2,
      src: ["/search1.png", "/search2.png"],
      text: "Search",
      link: "/search",
    },
    {
      id: 3,
      src: ["/compass (2).png", "/compass (3).png"],
      text: "Discover",
      link: "/discover",
    },
    {
      id: 4,
      src: ["/notification.png", "/notification (1).png"],
      text: "Notifications",
    },
    { id: 5, src: ["/send (3).png", "/send (4).png"], text: "Messages" },
    { id: 6, src: ["/setting.png", "/setting (1).png"], text: "Settings" },
  ];

  const [clicked, setClicked] = useState(getPathIndex(pathname));
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Adjust the delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    console.log(query);
    try {
      const fetchQuery = async () => {
        const response = await fetchHandler(
          `/api/search?query=${debouncedQuery}`
        );
        const results: SearchResult = response[0];
        console.log(results, "results");
        setSearchResults(results.profiles.filter((profile) => profile.id !== currentUser.id));
      };
      fetchQuery();
    } catch (error) {
      console.log(error);
    }
  }, [debouncedQuery]);

  console.log(searchResults);
  useEffect(() => {
    setClicked(getPathIndex(pathname));
  }, [pathname]);

  const handleClick = (link) => {
    if (link === "/search") {
      setSearchOpen(!searchOpen);
      setClicked(2);
    } else {
      setSearchOpen(false);

      navigate(link);
      setClicked(getPathIndex(link));
    }
  };

  return (
    <div className="flex ">
      <div
        className={`  z-[501] w-[14%]     h-full fixed bg-white   backdrop-blur-md   overflow-hidden  flex flex-col  pt-[5rem]   transition-all duration-200  `}
      >
        {images.map((image) => (
          <div
            key={image.id}
            onClick={() => handleClick(image.link)}
            className={`py-3   ${
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
        className={`h-full overflow-scroll z-[35]   transition-all duration-[400ms] ${
          searchOpen ? "translate-x-[0px]" : "translate-x-[-35rem]"
        } absolute w-[35rem] bg-white border-r  backdrop-blur bg-opacity-60 `}
      >
        <div className="pt-[5rem]">
          <div className="pb-6 border-b border-gray-100">
            <p className=" text-black  text-[25px] text-center translate-x-[-8px] pb-1 font-semibold ">
              Search
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text "
              className="text bg-white border placeholder:font-medium placeholder:text-gray-300 rounded-md w-[19rem] m-auto  ml-[14.5rem] text-[20px] p-1 "
              placeholder="Search for an account"
            ></input>
          </div>

          {!searchResults || query === '' && (
            <p className="text-[20px] mt-[20%] font-semibold text-center pl-[14rem] text-gray-200">
              No Results
            </p>
          )}
          <div className="w-[19rem] ml-[14.5rem] ">
            {searchResults.length > 0  && query !== '' && 
              searchResults.map((profile) => {
                return (
                  <div className=" justify-between py-3 flex border-b">
                    <div className="flex gap-2">
                      <img
                        className="w-[3rem] bg-white p-1 shadow rounded-full h-[3rem]"
                        src={profile.profile_photo}
                      ></img>
                      <div>
                        <p className="font-semibold text-[20px]">
                          {profile.full_name}
                        </p>
                        <p className="text-[20px] text-gray-500">
                          @{profile.username}
                        </p>
                      </div>
                    </div>
                    <div>
                      <button className="bg-[#074979] text-white p-1 px-4 rounded">
                        Connect
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
}

export default SideBar;
