export function buildCommentTree(comments) {
  const commentMap = {}
  comments.forEach((comment) => {
    commentMap[comment.id] = { ...comment, children: [] }
  })

  const rootComments = []
  comments.forEach((comment) => {
    if (comment.commentId) {
      if (commentMap[comment.commentId]) {
        commentMap[comment.commentId].children.push(commentMap[comment.id])
      } else {
        console.warn("Missing parent comment for comment ID:", comment.id)
      }
    } else {
      rootComments.push(commentMap[comment.id])
    }
  })
  return rootComments
}
