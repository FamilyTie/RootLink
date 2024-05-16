
import { text } from "express"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
function SideBar({page}) {


    const images = [
        {id: 1, src: ['/home (1).png', '/home (2).png'], text: 'Home', link: '/feed'},
        {id: 2, src: ['/compass (2).png', '/compass (3).png'], text: 'Discover'},
        {id: 3, src: ['/notification.png', '/notification (1).png'], text: 'Notifications'},
        {id: 4, src: ['/send (3).png', '/send (4).png'], text: 'Messages'},
        {id: 5, src: ['/setting.png', '/setting (1).png'], text: 'Settings'},
    ]
    const [clicked, setClicked] = useState(null)
    useEffect(() => {
        setClicked(page)
    })

    const handleClick = (link) => {
        //navigate to the link
        const navigate = useNavigate();
        navigate(link);
    }

  return (
    <div className={` w-[14%]   h-full fixed bg-white   backdrop-blur-md   overflow-hidden  flex flex-col  pt-[5rem]   transition-all duration-200  `}>
       {images.map((image) => (
        <div key={image.id} onClick={() => handleClick(image.link)} className={` pl-6 py-3 pt-5 ${clicked === image.id? " border-l-[5px] bg-gray-50  border-[#074979]" : ""} cursor-pointer transition-all duration-300  gap-5 flex`}>
          <img
            src={clicked === image.id ? image.src[1] : image.src[0]}
            alt=""
            className={`w-[25px] h-[25px] ${clicked === image.id? "text-[#074979]" : "text-black opacity-50"}`}
          />
          <p className={`text-[20px] transition-all   translate-y-[-3px] my-auto textshadow2 ${clicked === image.id? "text-[#074979] " : "text-black opacity-50"} font-medium `}>{image.text}</p>
        </div>
      ))}
    </div>
    
  )
}

export default SideBar

/* Rectangle 27 */


