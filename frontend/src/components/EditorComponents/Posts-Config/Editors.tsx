import { useState, useEffect, useMemo } from "react"
import { BlockNoteView } from "@blocknote/mantine"
import { BlockNoteEditor } from "@blocknote/core"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { schema } from "../Editor-Configs/Utility"
import handleFetch from "../Editor-Configs/Fetching"

export function IndividualPostEditor({
  post,
  toggleCommentsVisibility,
  fetchComments,
}) {
  const [initialContent, setInitialContent] = useState(undefined)
  const [commentFormsVisibility, setCommentFormsVisibility] = useState({})

  useEffect(() => {
    if (post.body) {
      try {
        const parsedContent = JSON.parse(post.body)
        setInitialContent(parsedContent)
      } catch (error) {
        console.error("Failed to parse post body:", error)
      }
    }
  }, [post.body])

  const editor = useMemo(() => {
    if (initialContent) {
      try {
        return BlockNoteEditor.create({
          initialContent,
          schema,
          readOnly: true,
          editable: false,
        })
      } catch (error) {
        console.error("Failed to create editor:", error)
      }
    }
  }, [initialContent])

  if (!editor) {
    return <div>Loading editor...</div>
  }

  const handleCommentSubmit = async (e, commentId, postId) => {
    e.preventDefault()
    const newCommentBody = e.target.elements.commentBody.value
    const newComment = {
      user_id: 1, // Replace with actual user_id from your auth context or state
      post_id: postId,
      body: newCommentBody,
      comment_id: commentId,
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }
    console.log(newComment)

    const [data, error] = await handleFetch("/api/comments", options)
    if (!error) {
      console.log("Comment Sent", data)
      toast.success("Comment sent successfully!")
      fetchComments() // Refresh comments after successful submission
    } else {
      console.log("Sending Comment Failed", error)
      toast.error("Failed to send comment!")
    }
    setCommentFormsVisibility((prev) => ({ ...prev, [commentId]: false }))
  }

  function renderComments(comments, level = 0) {
    return comments.length === 0 && level === 0 ? (
      <div>
        <button
          onClick={() =>
            setCommentFormsVisibility({
              ...commentFormsVisibility,
              [""]: true,
            })
          }
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
        >
          Add Comment
        </button>
        {commentFormsVisibility[""] && (
          <form onSubmit={(e) => handleCommentSubmit(e, null, post.id)}>
            <textarea
              name="commentBody"
              className="border p-2 mt-2 w-full"
              placeholder="Write a comment..."
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
            >
              Submit Comment
            </button>
          </form>
        )}
      </div>
    ) : (
      comments.map((comment) => (
        <div
          key={comment.id}
          className={`ml-${4 * level} ${
            level !== 0 ? "border-l-2 border-gray-300" : ""
          } pl-4 my-2`}
        >
          <p className="text-sm text-gray-700">{comment.body}</p>
          <button
            onClick={() =>
              setCommentFormsVisibility({
                ...commentFormsVisibility,
                [comment.id]: !commentFormsVisibility[comment.id],
              })
            }
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Reply
          </button>
          {commentFormsVisibility[comment.id] && (
            <form onSubmit={(e) => handleCommentSubmit(e, comment.id, post.id)}>
              <textarea
                name="commentBody"
                className="border p-2 mt-2 w-full"
                placeholder="Write a reply..."
              ></textarea>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2"
              >
                Submit Reply
              </button>
            </form>
          )}
          {comment.children &&
            comment.children.length > 0 &&
            renderComments(comment.children, level + 1)}
        </div>
      ))
    )
  }

  return (
    <div className="max-w-xl w-full rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-gray-300 my-4">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="font-semibold text-purple-700 mb-2 text-6xl">
        {post.title}
      </h2>
      <BlockNoteView
        // @ts-ignore
        editor={editor}
        editable={false}
        theme={"light"}
      />
      <div className="mt-4 space-y-2">
        {post.showComments && renderComments(post.comments)}
      </div>
      <button
        onClick={() => toggleCommentsVisibility(post.id)}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        {post.showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>
  )
}
