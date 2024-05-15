
import { text } from "express"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
function SideBar() {
    const images = [
        {id: 1, src: ['/home (3).png', '/home (4).png'], text: 'Home'},
        {id: 2, src: ['/compass (1).png', '/compass.png'], text: 'Discover'},
        {id: 3, src: ['/bell (1).png', '/bell.png'], text: 'Notifications'},
        {id: 4, src: ['/send (2).png', '/send (1).png'], text: 'Messages'},
        {id: 5, src: ['/settings.png', '/settings (1).png'], text: 'Settings'},
    ]
    const [clicked, setClicked] = useState(null)
  return (
    <div className=' w-[5%] hover:w-[14%] h-full fixed bg-white overflow-hidden   flex flex-col gap-7 pt-[6rem] pl-6   transition-all duration-200  '>
       {images.map((image) => (
        <div key={image.id} onClick={() => setClicked(image.id)} className={` cursor-pointer transition-all duration-300  gap-8 flex`}>
          <img
            src={clicked === image.id ? image.src[1] : image.src[0]}
            alt=""
            className='w-[20px] h-[20px]'
          />
          <p className={`text-[20px] transition-all   translate-y-[-6px] my-auto ${clicked === image.id? "text-[#074979]" : "text-[#9DADB8]"} font-semibold `}>{image.text}</p>
        </div>
      ))}
    </div>
    
  )
}

export default SideBar

/* Rectangle 27 */


