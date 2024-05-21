import React from 'react';

function ProfileCard({id, img, name}) {
  return (
    <div>
      <div className="w-[20rem] mx-auto bg-white rounded-lg overflow-hidden ">
        <div className="border-b px-4 pb-6">
          <div className="text-center my-4">
            <img
              className="h-32 w-32 rounded-full border-4 border-white mx-auto my-4"
              src={img}
              alt=""
            />
            <div className="py-2">
              <h3 className="font-bold text-2xl text-gray-800 mb-1">{name}</h3>
              
            </div>
          </div>
          <div className="flex pb-10 gap-2 px-2">
            <button className="flex-1 rounded-full bg-blue-600 text-white antialiased font-bold hover:bg-blue-800 px-4 py-2">
              Follow
            </button>
            <button className="flex-1 rounded-full border-2 border-gray-400 font-semibold text-black px-4 py-2">
              Message
            </button>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default ProfileCard;

