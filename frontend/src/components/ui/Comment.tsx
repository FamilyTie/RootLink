
import  { useState } from 'react'
function Comment({username, profilePhoto, body}) {
    const [liked, setLiked] = useState(false)
  return (
    <div className="">
        
        <div className="flex pl-[5%]">
        <img
          src={profilePhoto? profilePhoto : "/profile.png"}
          className="w-10 mr-5 h-10  rounded-full object-cover shadow-sm ml-2 mt-4"
          alt=""
        />

        <div className="my-auto">
          <p className="text-[22px]   my-auto">
            {username}
          </p>
        </div>
      </div>


        <div>
            <p className="text-[20px] pl-[15%]">{body}</p>
        </div>
        <div className="pl-[15%] flex gap-3">
            <p className="text-gray-500  cursor-pointer">Reply</p>
            <img className={ `w-[1rem] cursor-pointer h-[1rem] my-auto ${liked? "" : "opacity-50"}`} onClick={() => setLiked(liked => !liked) } src={liked? "like (1).png" : "like.png"}></img>
        </div>
    </div>
  )
}

export default Comment