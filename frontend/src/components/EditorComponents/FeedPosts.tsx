import { useState, useEffect } from "react"
import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import { BlockNoteEditor } from "@blocknote/core"
import "@blocknote/mantine/style.css"
import "./editorStyles.css"
import { schema } from "./Editor-Configs/Utility"
import handleFetch from "./Editor-Configs/Fetching"
import { ToastContainer, toast } from "react-toastify"
import { buildCommentTree } from "./Posts-Config/CommentTree"
import { Post } from "./Posts-Config/Post"
import { profileForPost } from "../../utils"

function FeedPosts({ posts, view }) {
  console.log(posts)

  return (
    <div className="bg-gray-100 min-h-screen pb-10">
      <div className="flex flex-col ">
        {posts.map((post) => (
          <Post
            key={post.id}
            postBody={JSON.parse(post.body)}
            post={post}
            view={view}
            onEdit={undefined}
          />
        ))}
      </div>
    </div>
  )
}

export default FeedPosts
