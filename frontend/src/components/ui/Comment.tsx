import React, { useState, useContext } from "react"
import Comments from "../layout/Comments" // Ensure you have this import for rendering child comments
import CurrentUserContext from "../../contexts/current-user-context" // Import the user context
import { GoTrash } from "react-icons/go"

function Comment({
  id,
  username,
  profilePhoto,
  body,
  children,
  addReply,
  isTopLevel,
  profileId, // Add profileId to props
  deleteComment, // Add deleteComment function to props
}) {
  const { currentUser } = useContext(CurrentUserContext) // Get the current user context
  const [liked, setLiked] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyText, setReplyText] = useState("")

  const handleReply = async () => {
    if (replyText.trim() === "") return

    // Call addReply function passed as a prop to handle reply submission
    await addReply(id, replyText)

    // Reset reply form
    setReplyText("")
    setShowReplyForm(false)
  }

  return (
    <div className={`p-2 my-2 ${isTopLevel ? " bg-white" : ""}`}>
      <div className="flex pl-[5%] relative">
        <img
          src={profilePhoto ? profilePhoto : "/profile.png"}
          className="w-10 mr-5 h-10 rounded-full object-cover shadow-sm ml-2 mt-4"
          alt=""
        />
        <div className="my-auto">
          <p className="text-[22px] my-auto">{username}</p>
        </div>
        {currentUser && currentUser.id === profileId && (
          <button
            onClick={() => deleteComment(id)}
            className="absolute top-0 right-0 mt-4 mr-4 text-red-500"
          >
            <GoTrash
              size={18}
              color="gray"
            />
          </button>
        )}
      </div>
      <div>
        <p className="text-[20px] pl-[15%]">{body}</p>
      </div>
      <div className="pl-[15%] flex gap-3">
        <p
          className="text-gray-500 cursor-pointer"
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </p>
        <img
          className={`w-[1rem] cursor-pointer h-[1rem] my-auto ${
            liked ? "" : "opacity-50"
          }`}
          onClick={() => setLiked((liked) => !liked)}
          src={liked ? "like (1).png" : "like.png"}
          alt="like"
        />
      </div>
      {showReplyForm && (
        <div className="pl-[15%] mt-2">
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
          />
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={handleReply}
          >
            Submit Reply
          </button>
        </div>
      )}
      {children && children.length > 0 && (
        <div className="ml-[8%] mt-4 border-l-2 border-gray-200">
          <Comments
            comments={children}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        </div>
      )}
    </div>
  )
}

export default Comment
