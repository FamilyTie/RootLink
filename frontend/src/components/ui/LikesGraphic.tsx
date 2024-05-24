import { useState, useEffect } from 'react';
function LikesGraphic({ likes, likes_count }) {
  const [currentLikes, setCurrentLikes] = useState(likes);

  useEffect(() => {
    if (likes[0].profile_id) {
      setCurrentLikes(likes);
    }
    else {
      setCurrentLikes(likes.slice(1));
    }

  }, [likes]);
  return (
    <div className="relative ml-[5%] flex">
      {currentLikes.length > 0 && (
        <img
          src={currentLikes[0].img}
          className="w-10 h-10 bg-white rounded-full object-cover border-2 border-white shadow-sm ml-2 mt-4"
          alt=""
        />
      )}
      {currentLikes.length > 1 && (
        <img
          src={currentLikes[1].img}
          className="w-10 h-10 bg-white translate-x-[-20px] rounded-full object-cover border-2 border-white shadow-sm mt-4"
          alt=""
        />
      )}
      {currentLikes.length > 2 && (
        <img
          src={likes[2].img}
          className="w-10 h-10 bg-white translate-x-[-40px] rounded-full object-cover border-2 border-white shadow-sm mt-4"
          alt=""
        />
      )}
      {likes_count - 3 > 0 && (
        <div
          className={`w-10 h-10 bg-[#074979] ${
            currentLikes.length === 1 ? 'translate-x-[-20px]' : ''
          } ${currentLikes.length === 2 ? 'translate-x-[-40px]' : ''} ${
            currentLikes.length === 3 ? 'translate-x-[-60px]' : ''
          } rounded-full border-2 border-white shadow-sm mt-4 flex items-center justify-center`}
        >
          <p className="m-auto text-white text-[1.3rem]">+{likes_count - 3}</p>
        </div>
      )}
    </div>
  );
}

export default LikesGraphic;