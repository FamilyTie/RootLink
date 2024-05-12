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
      const data = await response.json()
      console.log(data, "dataa")
      setPosts(data)
    }

    fetchPosts()
  }, [])
  // const hardcodedPosts = [
  //   {
  //     id: 1,
  //     title: "Search Post",
  //     body: '[{"id":"83504fd2-f8e1-4601-83c7-51700383195b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"looking for my brother he\'s Indian","styles":{}}],"children":[]},{"id":"5c5b1604-ced4-4110-81b5-92716a7656a9","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"he\'s 1 feet tall","styles":{}}],"children":[]},{"id":"e1a180ca-6045-4045-9b4c-70efd7dec9d8","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"short","styles":{}}],"children":[]},{"id":"cdcbe5c7-e7d7-4888-9217-8f5ba60df0bc","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"brown","styles":{}}],"children":[]},{"id":"8b5f13dc-7a62-4d01-9a42-9d49c963119d","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]',
  //   },
  //   {
  //     id: 2,
  //     title: "Search Post",
  //     body: '[{"id":"2f1d6e01-e189-46be-a0a9-2181260e2c3b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"my mom left me im white ","styles":{}}],"children":[]},{"id":"bff3338c-d7ab-4da7-bd29-75fd36ac5ea2","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"she said im ugly ","styles":{}}],"children":[]},{"id":"1d584a4a-e41a-4427-b33c-685f31d5b662","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"dumb ","styles":{}}],"children":[]},{"id":"e7cec08b-041c-4010-8660-32494492b61e","type":"bulletListItem","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"get no bishes ","styles":{}}],"children":[]},{"id":"956142ba-9c74-458e-9a91-fe53fb1ce1b8","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]',
  //   },
  // ]
  // useEffect(() => {
  //   // Assuming hardcodedPosts is imported or defined above
  //   setPosts(hardcodedPosts)
  // }, [])

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

  console.dir(editor)
  console.log(editor)

  if (!editor) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-xl w-full rounded overflow-hidden shadow-lg bg-white p-5 border-2 border-gray-300">
      <h2 className="text-xl font-semibold text-purple-700 mb-2">
        {post.title}
      </h2>
      <div className="border-t border-gray-300 mt-2">
        <BlockNoteView
          // @ts-ignore
          className="non-interactive-editor px-2 py-2"
          editor={editor}
          editable={false}
          theme={"light"}
        />
      </div>
    </div>
  )
}

export default GetPosts
