
import { text } from "express"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useLocation } from 'react-router-dom';

function SideBar() {
    const location = useLocation();
    const navigate = useNavigate();
    const pathname = location.pathname;
    const pathIndexes = {
        '/feed' : 1,
        '/search' : 2, 
        '/discover' :  3,
        '/notifications': 4,
        "/messages" : 5,
       "/settings" : 6,
    }

    const getPathIndex = (path) => {
        // Check for exact matches first
        if (pathIndexes[path] !== undefined) {
          return pathIndexes[path];
        }
      
        // Check for dynamic routes
        const dynamicRoutes = [
          { path: '/search/', index: 2 },
          // Add other dynamic routes here if needed
        ];
      
        for (let route of dynamicRoutes) {
          if (path.startsWith(route.path)) {
            return route.index;
          }
        }
    }

    const images  =[
        {id: 1, src: ['/home (1).png', '/home (2).png'], text: 'Home', link: '/feed'},
        {id: 2, src: ["/search1.png", "/search2.png"], text: "Search" , link:"/search"},
        {id: 3, src: ['/compass (2).png', '/compass (3).png'], text: 'Discover' , link: '/discover'},
        {id: 4, src: ['/notification.png', '/notification (1).png'], text: 'Notifications'},
        {id: 5, src: ['/send (3).png', '/send (4).png'], text: 'Messages'},
        {id: 6, src: ['/setting.png', '/setting (1).png'], text: 'Settings'},
    ]
    
   
    const [clicked, setClicked] = useState(getPathIndex(pathname))
    useEffect(() => {
        setClicked(getPathIndex(pathname))
    }, [pathname])

    const handleClick = (link) => {
        if(!link) {
         setClicked(2)

        }
        else {
            navigate(link);
        }
        

    }

  return (
    <div >
        <div className={`  z-[501] w-[14%]    h-full fixed bg-white   backdrop-blur-md   overflow-hidden  flex flex-col  pt-[5rem]   transition-all duration-200  `}>
        {images.map((image) => (
        <div key={image.id}  onClick={() => handleClick(image.link)} className={` pl-6 py-3   ${clicked === image.id? " border-l-[5px] bg-gray-50  border-[#074979]" : " border-l-[5px] border-transparent"} cursor-pointer transition-all duration-300  gap-5 flex`}>
          <img
            src={clicked === image.id ? image.src[1] : image.src[0]}
            alt=""
            className={`w-[25px] mouse h-[25px] ${clicked === image.id? "text-[#074979]" : "text-black  opacity-50 "}`}
          />
          <p className={`text-[20px] transition-all   translate-y-[-3px] my-auto textshadow2 ${clicked === image.id? "text-[#074979] " : "text-black opacity-50"} font-medium `}>{image.text}</p>
        </div>
      ))}
        </div>
       
    </div>
    
  )
}

export default SideBar


