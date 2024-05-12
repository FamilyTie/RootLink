import { useState, useEffect, FC } from "react"
import { BlockNoteView } from "@blocknote/mantine"
import CustomSlashMenu from "./configs/SlashMenu"
import {
  uploadFile,
  handleLocation,
  insertImageBlock,
} from "./configs/Services"
import {
  getCustomSlashMenuItems,
  theme,
  schema,
  placeholders,
  defaultBlockAmount,
} from "./configs/Utility"
import handleFetch from "./configs/Fetching"
import {
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  getDefaultReactSlashMenuItems,
  SuggestionMenuProps,
  useCreateBlockNote,
  BlockTypeSelectItem,
  FormattingToolbar,
  FormattingToolbarController,
  blockTypeSelectItems,
} from "@blocknote/react"
import { filterSuggestionItems } from "@blocknote/core"
import { RiAlertFill } from "react-icons/ri"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

// The Slash Menu is only thing custom / customizable from the css file
// Theme in utility if for the editor block itself
// The serialized content is the body that must be seeded for get posts editor to work / recognize
// language in the dictionary section - docs
// will make it force blocks to stay minimum - rn u can take them off
// default placeholder color i will fix a bit later
function CreateAPost() {
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [location, setLocation] = useState(null)
  const [enableSlashMenu, setEnableSlashMenu] = useState(true)
  const MAX_BLOCKS = 15
  console.log(schema)
  const editor = useCreateBlockNote({
    uploadFile,
    schema,
    placeholders: placeholders,
    trailingBlock: false,
    // @ts-ignore
    initialContent: defaultBlockAmount,
    // dictionary: locales.nl
  })

  const clearEditor = () => {
    const topLevelBlocks = editor.document
    if (topLevelBlocks.length > 0) {
      const blockIdsToRemove = topLevelBlocks.map((block) => block.id)
      editor.removeBlocks(blockIdsToRemove)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postData = { title, body, user_id: 1, profile_id: 1 }
    console.log("body for postman", body)
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }

    const [data, error] = await handleFetch("/api/posts", options)
    if (!error) {
      console.log("Post Sent", data)
      setTitle("")
      clearEditor()
      toast.success("Post sent successfully!")
    } else {
      console.log("Sending Post Failed", error)
      toast.error("Failed to send post!")
    }
  }

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      if (editor.document.length > MAX_BLOCKS) {
        // Remove the last added block if the limit is exceeded
        editor.removeBlocks([editor.document[editor.document.length - 1].id])
        toast.error(`Maximum limit of ${MAX_BLOCKS} blocks reached.`)
      }
      const contentAsString = JSON.stringify(editor.document)
      setBody(contentAsString)
      console.log("Serialized editor content:", contentAsString)
    })

    return () => unsubscribe()
  }, [editor])
  console.dir(editor)
  return (
    <div className="bg-[rgb(294, 124, 204)]">
      <h1>Create New Post</h1>
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
      <div className="flex items-start">
        <img
          src="your-image-source-here"
          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 shadow-sm ml-2 mt-2"
          alt=""
        />
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-0"
        >
          <div className="flex items-start">
            <div className="flex flex-col gap-3 w-[30rem] m-2 mt-6">
              <input
                className="ProseMirror bg-[rgb(199,199,199)] m-0 rounded-md p-1 placeholder-gray-400"
                placeholder="Title..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className=".ProseMirror">
                {/* @ts-ignore */}
                <BlockNoteView
                  editor={editor}
                  theme={theme}
                  slashMenu={false}
                  data-theming-css-variables-demo
                  formattingToolbar={false}
                >
                  {enableSlashMenu && (
                    <SuggestionMenuController
                      triggerCharacter={"/"}
                      suggestionMenuComponent={
                        CustomSlashMenu as FC<
                          SuggestionMenuProps<DefaultReactSuggestionItem>
                        >
                      }
                      getItems={async (query) =>
                        filterSuggestionItems(
                          getCustomSlashMenuItems(editor),
                          query
                        )
                      }
                    />
                  )}
                  <FormattingToolbarController
                    formattingToolbar={() => (
                      <FormattingToolbar
                        blockTypeSelectItems={[
                          ...blockTypeSelectItems(editor.dictionary),
                          {
                            name: "Alert",
                            type: "alert",
                            icon: RiAlertFill,
                            isSelected: (block) => block.type === "alert",
                          } satisfies BlockTypeSelectItem,
                        ]}
                      />
                    )}
                  />
                </BlockNoteView>
              </div>
              <button
                className="bg-blue-500 text-white p-2 rounded "
                type="submit"
              >
                Submit
              </button>
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => insertImageBlock(editor)}
              >
                Insert Image Block
              </button>
              <button
                className="bg-green-500 text-white p-2 rounded"
                onClick={() => handleLocation(setLocation)}
              >
                Post Location
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateAPost
