import Comment from "../ui/Comment"

function Comments({comments}) {
  return (
    <div>
        {comments.map((comment) => {
            return <Comment username={comment.username} body={comment.body} profilePhoto={comment.img} />
        })}
    </div>
  )
}

export default Comments