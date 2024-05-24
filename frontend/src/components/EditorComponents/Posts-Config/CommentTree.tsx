export function buildCommentTree(comments) {
  const commentMap = {}
  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, children: [] }
  })

  const rootComments = []
  comments.forEach((comment) => {
    if (comment.parent_comment_id) {
      if (commentMap[comment.parent_comment_id]) {
        commentMap[comment.parent_comment_id].children.push(
          commentMap[comment.id]
        )
      } else {
        console.log("Parent comment for comment ID:", comment.id, "not found.")
      }
    } else {
      rootComments.push(commentMap[comment.id])
    }
  })
  return rootComments
}
