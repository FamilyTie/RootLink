

function LikesGraphic({likes}) {
  return (
    <div className="relative ml-[5%] flex">
        
        <img
          src={likes[0].profilePicture}
          className="w-10 mr-5 h-10  rounded-full object-cover border-2 border-white shadow-sm ml-2 mt-4"
          alt=""
        />
       {likes.length > 1 && 
        <img
        src={likes[1].profilePicture}
        className="w-10 mr-5 h-10   translate-x-[-45px] rounded-full object-cover border-2 border-white shadow-sm mt-4"
        alt=""
      />
       }
       {likes.length > 2 && 
            <img
            src={likes[2].profilePicture}
            className="w-10 mr-5 h-10   translate-x-[-80px] rounded-full object-cover border-2 border-white shadow-sm mt-4"
            alt=""
          />
       }
        
        <div className={`w-10 mr-5 h-10  bg-[#074979] ${likes.length === 1 && 'translate-x-[-45px]'} ${likes.length === 2 && 'translate-x-[-80px]'}   ${likes.length === 3 && 'translate-x-[-120px]'} rounded-full object-cover border-2 border-white  shadow-sm mt-4`}><p className="m-auto text-white pl-[7px] text-[1.3rem]">+5</p></div>

      </div>
  )
}

export default LikesGraphic