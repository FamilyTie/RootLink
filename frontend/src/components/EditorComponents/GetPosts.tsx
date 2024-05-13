import { useState, useEffect, useMemo } from "react"
import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import { BlockNoteEditor } from "@blocknote/core"
import "@blocknote/mantine/style.css"
import "./editorStyles.css"
import { schema } from "./configs/Utility"
import CreateAPost from "./CreatePost"

const comments = [
  {
    id: 1,
    comment_id: null,
    post_id: 1,
    profile_id: 1,
    body: "This is a fascinating post about technology advancements!",
  },
  {
    id: 2,
    comment_id: 1,
    post_id: 1,
    profile_id: 2,
    body: "Absolutely agree! The rapid development in AI is quite astounding.",
  },
  {
    id: 3,
    comment_id: 2,
    post_id: 1,
    profile_id: 3,
    body: "It's not just AI, even quantum computing is breaking new grounds.",
  },
  {
    id: 4,
    comment_id: 3,
    post_id: 1,
    profile_id: 2,
    body: "True, the synergy between quantum computing and AI will define the next decade.",
  },
  {
    id: 5,
    comment_id: null,
    post_id: 2,
    profile_id: 3,
    body: "Great insights on sustainable energy sources. Thanks for sharing!",
  },
  {
    id: 6,
    comment_id: 5,
    post_id: 2,
    profile_id: 4,
    body: "No problem! Glad you found it useful. What's your take on solar vs. wind energy?",
  },
  {
    id: 7,
    comment_id: null,
    post_id: 3,
    profile_id: 1,
    body: "Interesting perspective on modern education systems.",
  },
  {
    id: 8,
    comment_id: 7,
    post_id: 3,
    profile_id: 4,
    body: "It's a complex issue, but reform is certainly needed.",
  },
  {
    id: 9,
    comment_id: 8,
    post_id: 3,
    profile_id: 1,
    body: "Definitely. It's about finding the right balance between technology and traditional methods.",
  },
  {
    id: 10,
    comment_id: 8,
    post_id: 3,
    profile_id: 3,
    body: "True, and also integrating global perspectives to provide a well-rounded education.",
  },
  {
    id: 11,
    comment_id: null,
    post_id: 4,
    profile_id: 2,
    body: "This has been a great discussion on the future of urban transport.",
  },
  {
    id: 12,
    comment_id: 11,
    post_id: 4,
    profile_id: 1,
    body: "Indeed, urban mobility solutions have to be sustainable yet practical.",
  },
  {
    id: 13,
    comment_id: 1,
    post_id: 1,
    profile_id: 1,
    body: "Indeed, very cool !!!",
  },
  {
    id: 14,
    comment_id: 10,
    post_id: 3,
    profile_id: 3,
    body: "right",
  },
  {
    id: 15,
    comment_id: null,
    post_id: 2,
    profile_id: 3,
    body: "worddd",
  },
]
function GetPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("http://localhost:1090/api/posts")
      if (!response.ok) throw new Error("Failed to fetch posts")
      const postsData = await response.json()
      const reversedPosts = postsData.reverse()

      const postsWithComments = reversedPosts.map((post) => ({
        ...post,
        comments: buildCommentTree(
          comments.filter((comment) => comment.post_id === post.id)
        ),
        showComments: false,
      }))

      console.log(postsWithComments)
      setPosts(postsWithComments)
    }

    fetchPosts()
  }, [])

  function buildCommentTree(comments) {
    const commentMap = {}
    comments.forEach((comment) => {
      commentMap[comment.id] = { ...comment, children: [] }
    })

    const rootComments = []
    comments.forEach((comment) => {
      if (comment.comment_id) {
        commentMap[comment.comment_id].children.push(commentMap[comment.id])
      } else {
        rootComments.push(commentMap[comment.id])
      }
    })
    return rootComments
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
          />
        ))}
      </div>
    </div>
  )
}

function IndividualPostEditor({ post, toggleCommentsVisibility }) {
  const [initialContent, setInitialContent] = useState(undefined)
  const [commentFormsVisibility, setCommentFormsVisibility] = useState({})
  const toggleCommentForm = (commentId) => {
    setCommentFormsVisibility((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }
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

  const handleCommentSubmit = (event, commentId, postId) => {
    event.preventDefault()
    const newCommentBody = event.target.elements.commentBody.value
    console.log({
      id: comments.length + 1,
      comment_id: commentId,
      post_id: postId,
      body: newCommentBody,
      profile_id: 1, // Assuming a static profile ID for example
    })
    // Reset the textarea visibility state
    setCommentFormsVisibility((prev) => ({ ...prev, [commentId]: false }))
  }

  return (
    <div className="max-w-xl w-full rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-gray-300 my-4">
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
        {post.showComments && post.comments && renderComments(post.comments)}
      </div>
      <button
        onClick={() => toggleCommentsVisibility(post.id)}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
      >
        {post.showComments ? "Hide Comments" : "Show Comments"}
      </button>
    </div>
  )

  function renderComments(comments, level = 0) {
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
        {comment.children && renderComments(comment.children, level + 1)}
      </div>
    ))
  }
}

export default GetPosts
