import { useState, useEffect, FC, useContext } from "react"
import UserContext from "../../contexts/current-user-context"
import { BlockNoteView } from "@blocknote/mantine"
import CustomSlashMenu from "./Editor-Configs/SlashMenu"
import handleFetch from "./Editor-Configs/Fetching"
import {
  uploadFile,
  handleLocation,
  insertImageBlock,
} from "./Editor-Configs/Services"
import {
  getCustomSlashMenuItems,
  theme,
  schema,
  placeholders,
  defaultBlockAmount,
} from "./Editor-Configs/Utility"
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
import { uploadFileAndGetURL } from "../../utils"

function CreatePost({ refetchPosts }) {
  const { currentUser } = useContext(UserContext)
  const [img, setImg] = useState(null)
  const [thumbnail, setThumbnail] = useState(null)
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")
  const [enableSlashMenu, setEnableSlashMenu] = useState(true)
  const MAX_BLOCKS = 15
  console.log(schema)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setImg(file)
    const reader = new FileReader()

    reader.onload = (e) => {
      setThumbnail(e.target.result)
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const editor = useCreateBlockNote({
    uploadFile,
    schema,
    placeholders: placeholders,
    trailingBlock: false,
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
    let img_url = await uploadFileAndGetURL(img)
    console.warn(img_url) // This is the image URL
    const postData = { title, body, profile_id: currentUser.id, img: img_url }

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    }

    const [data, error] = await handleFetch("/api/posts", options)
    if (!error) {
      console.log("Post Sent", data)
      setTitle("")
      setImg(null)
      setThumbnail(null)
      clearEditor()
      refetchPosts()
    } else {
      console.log("Sending Post Failed", error)
      toast.error("Failed to send post!")
    }
  }

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      console.log(editor.document.length)
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
      <div className="flex bg-white  rounded-md w-[35rem] p-5  items-start">
        <div className="w-12 mr-5 h-12 overflow-hidden  rounded-full object-cover border-4 shadow border-white  ml-2 mt-4">
          <img
            src={currentUser && (currentUser as any).img}
            className=" w-full m-auto"
            alt=""
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-0"
        >
          <div className="flex items-start">
            <div className="flex flex-col gap-3 w-[25rem] m-2 mt-6">
              <input
                className="ProseMirror text-[1.3rem] pl-3 w-[20rem]    mb-5 placeholder:text-[lightgray] bg-slate-100  m-0 rounded-md p-1 text-[rgb(157, 173, 184]"
                placeholder="Title..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {thumbnail && (
                <div className="overflow-hidden w-[85%] ] rounded-lg mt-3">
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                  />
                </div>
              )}

              <div className="bg-slate-100 pt-1  ">
                <div className="">
                  {/* @ts-ignore */}
                  <BlockNoteView
                    editor={editor}
                    theme={theme}
                    slashMenu={false}
                    data-theming-css-variables-demo
                    data-changing-font-demo
                    formattingToolbar={false}
                    // sideMenu={false}
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
              </div>

              <div className="flex gap-5 self-end">
                <div className="flex gap-1 hover:bg-gray-100 rounded-md p-1  px-3 relative">
                  <input
                    type="file"
                    className="absolute z-[500] inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className="z-[400] flex gap-1">
                    <img
                      className="w-[1.5rem] m-auto h-[1.5rem] opacity-30"
                      src="image (1).png"
                      alt="Image Upload"
                    />
                    <p className="text-[23px] font-medium opacity-30">Image</p>
                  </div>
                </div>

                <button
                  className="bg-[#074979] hover:bg-white border-[2px] border-transparent hover:text-[#074979] hover:border-[#074979] transition-all duration-200 self-end text-white text-[1.2rem] p-1  w-[6rem] rounded-md "
                  type="submit"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePost
