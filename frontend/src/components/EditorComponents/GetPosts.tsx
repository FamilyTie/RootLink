import { useState, useEffect, useMemo } from "react"
import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import { BlockNoteEditor } from "@blocknote/core"
import "@blocknote/mantine/style.css"
import "./editorStyles.css"
import { schema } from "./configs/Utility"
import CreateAPost from "./CreatePost"
import handleFetch from "./configs/Fetching"
import { ToastContainer, toast } from "react-toastify"
function GetPosts() {
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetchComments()
  }, [])

  async function fetchComments() {
    try {
      const response = await fetch("http://localhost:1090/api/comments")
      if (!response.ok) throw new Error("Failed to fetch comments")
      const commentsData = await response.json()
      setComments(commentsData) // Set fetched comments into state
      fetchPosts(commentsData) // Call fetchPosts here after comments are loaded
    } catch (error) {
      console.error("Error fetching comments:", error)
    }
  }

  async function fetchPosts(comments) {
    try {
      const response = await fetch("http://localhost:1090/api/posts")
      if (!response.ok) throw new Error("Failed to fetch posts")
      const postsData = await response.json()
      const reversedPosts = postsData.reverse()
      const postsWithComments = reversedPosts.map((post) => ({
        ...post,
        comments: buildCommentTree(
          comments.filter((comment) => comment.postId === post.id)
        ),
        showComments: false,
      }))
      setPosts(postsWithComments)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  function buildCommentTree(comments) {
    const commentMap = {}
    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, children: [] }
    })

    const rootComments = []
    comments.forEach((comment) => {
      if (comment.comment_id) {
        if (commentMap[comment.comment_id]) {
          commentMap[comment.comment_id].children.push(commentMap[comment.id])
        }
      } else {
        rootComments.push(commentMap[comment.id])
      }
    })
    return rootComments
  }

  const toggleCommentsVisibility = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => ({
        ...post,
        showComments:
          post.id === postId ? !post.showComments : post.showComments,
      }))
    )
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-center text-3xl font-bold text-purple-600 mb-10">
        Create a Post
      </h1>
      <div className="max-w-xl w-full rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-gray-300 my-4 mx-auto">
        <CreateAPost />
      </div>
      <h1 className="text-center text-3xl font-bold text-purple-600 mb-10">
        View Posts
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {posts.map((post) => (
          <IndividualPostEditor
            key={post.id}
            post={post}
            toggleCommentsVisibility={toggleCommentsVisibility}
            fetchComments={fetchComments}
          />
        ))}
      </div>
    </div>
  )
}

function IndividualPostEditor({
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

  const toggleCommentForm = (commentId) => {
    setCommentFormsVisibility((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  const handleCommentSubmit = async (e, postId, commentId, isTopLevel) => {
    e.preventDefault()
    const newCommentBody = e.target.elements.commentBody.value

    const newComment = {
      post_id: postId,
      body: newCommentBody,
      profile_id: 1, // Assuming a static profile ID for example
    }

    // Assign comment_id only if it's a reply to a non-top-level comment
    if (!isTopLevel) {
      // @ts-ignore
      newComment.comment_id = commentId
    }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newComment),
    }

    try {
      const response = await fetch(
        "http://localhost:1090/api/comments",
        options
      )
      if (!response.ok) throw new Error("Failed to post comment")
      await response.json()
      toast.success("Comment sent successfully!")
      fetchComments()
    } catch (error) {
      console.error("Sending Comment Failed", error)
      toast.error("Failed to send comment!")
    }

    setCommentFormsVisibility((prev) => ({ ...prev, [commentId]: false }))
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
        {post.showComments && post.comments && renderComments(post.comments, 0)}
      </div>
      <button
        onClick={() => toggleCommentsVisibility(post.id)}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        {post.showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>
  )

  function renderComments(comments, level) {
    return comments.map((comment) => (
      <div
        key={comment.id}
        className={`ml-${4 * level} ${
          level !== 0 ? "border-l-2 border-gray-300" : ""
        } pl-4 my-2`}
      >
        <p className="text-sm text-gray-700">{comment.body}</p>
        <button
          onClick={() => toggleCommentForm(comment.id)}
          className="text-blue-500 hover:text-blue-700 text-sm"
        >
          Reply
        </button>
        {commentFormsVisibility[comment.id] && (
          <form
            onSubmit={(e) =>
              handleCommentSubmit(
                e,
                post.id,
                comment.id,
                comment.comment_id === null
              )
            }
          >
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
        {comment.children && renderComments(comment.children, level + 1)}
      </div>
    ))
  }
}

export default GetPosts
