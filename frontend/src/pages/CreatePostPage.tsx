import { useState, useMemo, useRef, useEffect } from "react"
import "@blocknote/core/fonts/inter.css"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/mantine/style.css"
import "./editorStyles.css"
import "@blocknote/core/fonts/inter.css"
import {
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  SuggestionMenuProps,
  useCreateBlockNote,
} from "@blocknote/react"
function CustomSlashMenu(
  props: SuggestionMenuProps<DefaultReactSuggestionItem>
) {
  return (
    <div className={"slash-menu"}>
      {props.items.map((item, index) => (
        <div
          className={`slash-menu-item${
            props.selectedIndex === index ? " selected" : ""
          }`}
          onClick={() => {
            props.onItemClick?.(item)
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}

function CreatePostPage() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const editor = useCreateBlockNote()

  const theme = {
    colors: {
      editor: {
        text: "#333333", // Dark grey text for readability
        background: "rgb(199,199,199)", // Background matching the input
      },
      // Configure other parts of the theme as needed
    },
    borderRadius: 5, // Example border radius
    fontFamily: "Arial, sans-serif", // Example font family
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const postData = { title, body, user_id: 1, profile_id: 1 }
    console.log("Sending body:", JSON.stringify(postData))

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (!response.ok) {
        throw new Error("Failed to create post: " + (await response.text()))
      }

      const responseData = await response.json()
      console.log("Post created:", responseData)

      // Optionally reset form or navigate user to another page
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }
  useEffect(() => {
    if (editor) {
      const unsubscribe = editor.onChange(() => {
        // Assuming editor.document is the correct reference to get the current document state
        const documentData = editor.document // Get the document data directly from the editor

        // Check if there's a specific method to serialize or get text
        const contentAsString = JSON.stringify(documentData) // Serialize the document data safely
        console.log("Serialized editor content:", contentAsString)
        setBody(contentAsString)
      })

      return () => unsubscribe() // Cleanup subscription
    }
  }, [editor])

  return (
    <div className="bg-[rgb(294, 124, 204)]">
      <h1>Create New Post</h1>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-0"
        >
          <div className="border-2 border-orange-500 flex items-start">
            <img
              src="data:image/jpeg;base64,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"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-sm ml-2 mt-2"
              alt=""
            />
            <div className="flex flex-col gap-3 w-[30rem] m-2 mt-6">
              <input
                className="bg-[rgb(199,199,199)] m-0 rounded-md p-1 placeholder-gray-400"
                placeholder="Title..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <BlockNoteView
                editor={editor}
                theme={theme}
                slashMenu={true}
              >
                <SuggestionMenuController
                  triggerCharacter={"/"}
                  suggestionMenuComponent={CustomSlashMenu}
                />
              </BlockNoteView>
            </div>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default CreatePostPage
