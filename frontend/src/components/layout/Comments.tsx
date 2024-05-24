import React from "react"
import Comment from "../ui/Comment"

function Comments({ comments, addReply, deleteComment }) {
  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          id={comment.id}
          username={comment.username}
          profilePhoto={comment.img}
          body={comment.body}
          children={comment.children}
          addReply={addReply}
          isTopLevel={true}
          profileId={comment.profile_id} // Pass profileId to Comment
          deleteComment={deleteComment} // Pass deleteComment function to Comment
        />
      ))}
    </div>
  )
}

export default Comments
