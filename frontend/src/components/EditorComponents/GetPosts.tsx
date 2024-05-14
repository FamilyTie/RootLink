import { useState, useEffect, useMemo } from "react"
import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import { BlockNoteEditor } from "@blocknote/core"
import "@blocknote/mantine/style.css"
import "./editorStyles.css"
import { schema } from "./Editor-Configs/Utility"
import CreateAPost from "./CreatePost"
import handleFetch from "./Editor-Configs/Fetching"
import { ToastContainer, toast } from "react-toastify"
import { buildCommentTree } from "./Posts-Config/CommentTree"
import { IndividualPostEditor } from "./Posts-Config/Editors"

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
      console.log(commentsData, "commentsdata")
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

      console.log(postsWithComments, "postcom")
      setPosts(postsWithComments)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  const toggleCommentsVisibility = (postId) => {
    setPosts((currentPosts) =>
      currentPosts.map((post) => {
        if (post.id === postId) {
          return { ...post, showComments: !post.showComments }
        }
        return post
      })
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
export default GetPosts
