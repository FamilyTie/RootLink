// import { useState, useEffect, useMemo } from "react"
// import "@blocknote/core/fonts/inter.css"
// import { BlockNoteView } from "@blocknote/mantine"
// import { useBlockNoteEditor } from "@blocknote/react"
// import "@blocknote/mantine/style.css"
// import "./editorStyles.css"

// function GetPostsPage() {
//   const [posts, setPosts] = useState([])

//   // Fetch posts from the API

//   return (
//     <div className="bg-[rgb(294, 124, 204)]">
//       <h1>View Posts</h1>
//       {posts.map((post) => (
//         <IndividualPostEditor
//           key={post.id}
//           post={post}
//         />
//       ))}
//     </div>
//   )
// }

// function IndividualPostEditor({ post }) {
//   const [initialContent, setInitialContent] = useState(undefined)

//   useEffect(() => {
//     // Simulate loading content for each post
//     // Here, we assume post.body is already in the expected format.
//     // Convert from JSON string to object if necessary.
//     setInitialContent(JSON.parse(post.body))
//   }, [post.body])

//   const editor = useMemo(() => {
//     if (!initialContent) {
//       return undefined
//     }
//     return useBlockNoteEditor.create({ initialContent })
//   }, [initialContent])

//   if (!editor) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div>
//       <h2>{post.title}</h2>
//       <BlockNoteView editor={editor} />
//     </div>
//   )
// }

// export default GetPostsPage
import { useState, useEffect, useMemo } from "react"
import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import { BlockNoteEditor } from "@blocknote/core"
import "@blocknote/mantine/style.css"
import "./editorStyles.css"
import { schema } from "./configs/Utility"

function GetPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch("/api/posts")
      if (!response.ok) throw new Error("Failed to fetch posts")
      const postsData = await response.json()

      // Reverse the array of posts here to correct the order
      const reversedPosts = postsData.reverse()

      // Simulated comment data
      const comments = [
        {
          id: 1,
          comment_id: null,
          post_id: 1,
          profile_id: 1,
          text: "This is a fascinating post about technology advancements!",
        },
        {
          id: 2,
          comment_id: 1,
          post_id: 1,
          profile_id: 2,
          text: "Absolutely agree! The rapid development in AI is quite astounding.",
        },
        {
          id: 3,
          comment_id: 2,
          post_id: 1,
          profile_id: 3,
          text: "It's not just AI, even quantum computing is breaking new grounds.",
        },
        {
          id: 4,
          comment_id: 3,
          post_id: 1,
          profile_id: 2,
          text: "True, the synergy between quantum computing and AI will define the next decade.",
        },
        {
          id: 5,
          comment_id: null,
          post_id: 2,
          profile_id: 3,
          text: "Great insights on sustainable energy sources. Thanks for sharing!",
        },
        {
          id: 6,
          comment_id: 5,
          post_id: 2,
          profile_id: 4,
          text: "No problem! Glad you found it useful. What's your take on solar vs. wind energy?",
        },
        {
          id: 7,
          comment_id: null,
          post_id: 3,
          profile_id: 1,
          text: "Interesting perspective on modern education systems.",
        },
        {
          id: 8,
          comment_id: 7,
          post_id: 3,
          profile_id: 4,
          text: "It's a complex issue, but reform is certainly needed.",
        },
        {
          id: 9,
          comment_id: 8,
          post_id: 3,
          profile_id: 1,
          text: "Definitely. It's about finding the right balance between technology and traditional methods.",
        },
        {
          id: 10,
          comment_id: 8,
          post_id: 3,
          profile_id: 3,
          text: "True, and also integrating global perspectives to provide a well-rounded education.",
        },
        {
          id: 11,
          comment_id: null,
          post_id: 4,
          profile_id: 2,
          text: "This has been a great discussion on the future of urban transport.",
        },
        {
          id: 12,
          comment_id: 11,
          post_id: 4,
          profile_id: 1,
          text: "Indeed, urban mobility solutions have to be sustainable yet practical.",
        },
      ]

      // Assign comments to their respective posts
      const postsWithComments = reversedPosts.map((post) => ({
        ...post,
        comments: comments.filter((comment) => comment.post_id === post.id),
      }))
      console.log(postsWithComments)
      setPosts(postsWithComments)
    }

    fetchPosts()
  }, [])

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <h1 className="text-center text-3xl font-bold text-purple-600 mb-10">
        View Posts
      </h1>
      <div className="flex flex-col items-center space-y-4">
        {posts.map((post) => (
          <IndividualPostEditor
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  )
}

function IndividualPostEditor({ post }) {
  const [initialContent, setInitialContent] = useState(undefined)

  useEffect(() => {
    setInitialContent(JSON.parse(post.body))
  }, [post.body])

  const editor = useMemo(() => {
    if (!initialContent) {
      return undefined
    }
    const options = { initialContent, schema, readOnly: true, editable: false }
    return BlockNoteEditor.create(options)
  }, [initialContent])

  const renderComments = (comments, parentId = null, level = 0) => {
    return comments
      .filter((comment) => comment.comment_id === parentId)
      .map((comment) => (
        <div
          key={comment.id}
          className={`ml-${4 * level} border-l-2 ${
            level === 0 ? "border-gray-200" : "border-gray-300"
          } pl-4 my-2`}
        >
          <p className="text-sm text-gray-700">{comment.text}</p>
          {renderComments(comments, comment.id, level + 1)}
        </div>
      ))
  }

  if (!editor) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-xl w-full rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-gray-300 my-4">
      <h2 className="text-xl font-semibold text-purple-700 mb-2">
        {post.title}
      </h2>
      <BlockNoteView
        // @ts-ignore
        className="non-interactive-editor"
        editor={editor}
        editable={false}
        theme={"light"}
      />
      <div className="mt-4 space-y-2">{renderComments(post.comments)}</div>
    </div>
  )
}

export default GetPosts
