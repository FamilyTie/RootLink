import { useNotifications, useProfile } from "../../../state/store";
import { fetchHandler, getPostOptions } from "../../../utils";
import { useState } from "react";



function SideBarNotifications({notificationsOpen} : {notificationsOpen: boolean}) {
    const [acceptedProfiles, setAcceptedProfiles] = useState({});
    const currentProfile = useProfile((state) => state.currentProfile);
    const [notifications, setNotifications] = useNotifications((state) => [state.notifications, state.setNotifications]);
    

    const handleDeclineConnection = async (noti_id) => {
        const deleted = await fetchHandler(`api/notifications/${noti_id}`, {
          method: "DELETE",
        });
        if (deleted) {
          console.log("Notification deleted successfully");
          setNotifications({
            ...notifications,
            received: notifications.received.filter((noti) => noti.id !== noti_id),
          });
        } else {
          console.log("Notification deletion failed");
        }
      };

      
      const handleCreateConnection = async (profile_id, noti_id) => {
        setAcceptedProfiles((prev) => ({
          ...prev,
          [noti_id]: { ...prev[noti_id], accepted: true },
        }));
        const response = await fetchHandler(
          `api/connection`,
          getPostOptions({
            profile_id1: currentProfile.id,
            profile_id2: profile_id,
          })
        );
        if (response) {
          const deleted = await fetchHandler(`api/notifications/${noti_id}`, {
            method: "DELETE",
          });
    
          console.log("Connection request successful");
          setNotifications({
            ...notifications,
            received: notifications.received.filter((noti) => noti.id !== noti_id),
          });
        } else {
          console.log("Connection request failed");
        }
      };
    
  return (
    
    <div
    className={`h-full overflow-scroll z-[35]   transition-all duration-[400ms] ${
      notificationsOpen ? "translate-x-[0px]" : "translate-x-[-35rem]"
    } absolute w-[35rem] bg-[#074979] border-r border-[#074979]  backdrop-blur-lg bg-opacity-60 `}
  >
    <div className="pt-[5rem]">
      <div className="pb-6 border-b border-[#074a7963]">
        <p className=" text-white text-[25px] text-center translate-x-[-8px]  pl-5 font-semibold ">
          Notifications
        </p>
      </div>

      {notifications && notifications.received
      
     ? <div className="w-[19rem] ml-[14.5rem] ">
      {notifications.received.length > 0 &&
        notifications.received
          .filter((noti) => !acceptedProfiles[noti.id]?.accepted)
          .map((noti) => {
            return (
              <div className="  text-white justify-between py-3  border-b border-[#074a7968]">
                <div className="flex gap-2">
                  <img
                    className="w-[3rem] bg-[#074979] p-[2px] shadow rounded-full h-[3rem]"
                    src={noti.profile_img}
                  ></img>
                  <div>
                    <p className="font-semibold  self-center text-[21px]">
                      {noti.profile_username} wants to connect
                    </p>
                  </div>
                </div>
                <div className="flex gap-5 m-auto justify-center pt-5">
                  <button
                    onClick={() =>
                      handleCreateConnection(
                        noti.profile_id_sent,
                        noti.id
                      )
                    }
                    className="bg-[#074979] hover:opacity-70 transition-all duration-200 text-white p-1 px-4 rounded"
                  >
                    Accept
                  </button>
                  <button onClick={() => handleDeclineConnection(noti.id)} className="bg-white border hover:opacity-70 transition-all duration-200 border-[#074979] text-[#074979] p-1 px-4 rounded">
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
    </div>
      :(
        <p className="text-[20px] mt-[20%] font-semibold text-center pl-[14rem] text-gray-200">
          No Results
        </p>
      )}
      
    </div>
  </div>

  )
}

export default SideBarNotifications