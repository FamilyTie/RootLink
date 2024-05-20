import Comment from "../ui/Comment"

function Comments({ comments }) {
  return (
    <div>
      {comments.map((comment) => {
        console.log("comments per post", comment)
        console.log("comments per postsss", comment)
        return (
          <Comment
            username={comment.username}
            body={comment.body}
            profilePhoto={comment.img}
          />
        )
      })}
    </div>
  )
}

export default Comments
