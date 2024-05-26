import { useState, useEffect, useContext, useRef, FC } from "react";
import { useProfile } from "../../state/store";
import { BlockNoteView } from "@blocknote/mantine";
import CustomSlashMenu from "./Editor-Configs/SlashMenu";
import handleFetch from "./Editor-Configs/Fetching";
import { uploadFile } from "./Editor-Configs/Services";
import {
  getCustomSlashMenuItems,
  theme,
  schema,
  placeholders,
} from "./Editor-Configs/Utility";
import {
  DefaultReactSuggestionItem,
  SuggestionMenuController,
  SuggestionMenuProps,
  useCreateBlockNote,
  BlockTypeSelectItem,
  FormattingToolbar,
  FormattingToolbarController,
  blockTypeSelectItems,
} from "@blocknote/react";
import { filterSuggestionItems } from "@blocknote/core";
import { RiAlertFill } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { uploadFileAndGetURL } from "../../utils";
import { CreatePostProps } from "../../../Interfaces&Types/interfaces";

function CreatePost({
  refetchPosts,
  initialTitle = "",
  initialBody = "",
  initialImage = null,
  postId = null,
  onCancel,
  onSave,
}: CreatePostProps) {
  const currentProfile = useProfile((state) => state.currentProfile);
  const [img, setImg] = useState(null);
  const [thumbnail, setThumbnail] = useState(
    initialImage ? initialImage : null
  );
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [enableSlashMenu, setEnableSlashMenu] = useState(true);
  const [sideMenu, setSideMenu] = useState(true);
  const [dummyState, setDummyState] = useState(false); // Dummy state for re-render
  const MAX_BLOCKS = 15;
  const postButtonRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImg(file);
    const reader = new FileReader();

    reader.onload = (e) => {
      setThumbnail(e.target.result.toString());
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const editor = useCreateBlockNote({
    uploadFile,
    schema,
    placeholders: placeholders,
    trailingBlock: false,
    initialContent: body ? JSON.parse(body) : null,
  });

  const clearEditor = () => {
    const topLevelBlocks = editor.document;
    if (topLevelBlocks.length > 0) {
      const blockIdsToRemove = topLevelBlocks.map((block) => block.id);
      editor.removeBlocks(blockIdsToRemove);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let img_url = img ? await uploadFileAndGetURL(img) : null;
    const postData = {
      title,
      body: JSON.stringify(editor.document),
      profile_id: currentProfile.id,
      img: img_url,
    };

    const options = {
      method: postId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postData),
    };

    const url = postId ? `/api/posts/${postId}` : "/api/posts";
    const [data, error] = await handleFetch(url, options);
    if (!error) {
      setTitle("");
      setImg(null);
      setThumbnail(null);
      clearEditor();
      refetchPosts();
      onCancel();
      onSave(postData);
    } else {
      toast.error("Failed to send post!");
    }
  };

  useEffect(() => {
    const unsubscribe = editor.onChange(() => {
      if (editor.document.length > MAX_BLOCKS) {
        // Remove the last added block if the limit is exceeded
        editor.removeBlocks([editor.document[editor.document.length - 1].id]);
        toast.error(`Maximum limit of ${MAX_BLOCKS} blocks reached.`);
      }
      setBody(JSON.stringify(editor.document));
    });

    return () => unsubscribe();
  }, [editor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === postButtonRef.current) {
            setSideMenu(entry.isIntersecting);
            setDummyState((prev) => !prev); // Toggle dummy state to force re-render
          }
        });
      },
      { threshold: [0, 1] }
    );

    if (postButtonRef.current) {
      observer.observe(postButtonRef.current);
    }

    return () => {
      if (postButtonRef.current) {
        observer.unobserve(postButtonRef.current);
      }
    };
  }, []);

  return (
    <div className="bg-[rgb(294, 124, 204)]">
      <div className="flex bg-white  relative rounded-md w-[30rem] p-5  items-start">
        <div className="w-12 h-12 overflow-hidden absolute  rounded-full object-cover border-4 shadow border-white  ml-2 mt-4">
          {currentProfile && (
            <img src={currentProfile.img} className=" m-auto" alt="" />
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-0">
          <div className="flex items-start" ref={postButtonRef}>
            <div className="flex flex-col gap-3 w-[25rem] pl-14 m-2 mt-6">
              <input
                className="ProseMirror text-[1.3rem] pl-3 w-[20rem] mb-5 placeholder:text-[lightgray] bg-slate-100 m-0 rounded-md p-1 text-[rgb(157, 173, 184]"
                placeholder="Title..."
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              {thumbnail && (
                <div className="overflow-hidden w-[85%] rounded-lg mt-3">
                  <img
                    src={thumbnail}
                    alt="Thumbnail"
                    onClick={() =>
                      document.getElementById("imageUpload").click()
                    }
                    className="cursor-pointer"
                  />
                  <input
                    type="file"
                    id="imageUpload"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </div>
              )}

              <div className="bg-slate-100 pt-1">
                <div className="">
                  <BlockNoteView
                    // @ts-ignore
                    key={dummyState} // Use dummy state as key to force re-render
                    editor={editor}
                    theme={theme}
                    slashMenu={false}
                    data-theming-css-variables-demo
                    data-changing-font-demo
                    formattingToolbar={false}
                    sideMenu={sideMenu}
                    initialContent={body ? JSON.parse(body) : []}
                  >
                    {enableSlashMenu && (
                      <SuggestionMenuController
                        triggerCharacter="/"
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

              <div className="flex  gap-5 self-end">
                <div className="flex gap-1 hover:bg-gray-100 rounded-md p-1  px-3 relative">
                  <input
                    type="file"
                    className="absolute  inset-0 opacity-0 w-full h-full cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <div className=" flex gap-1">
                    <img
                      className="w-[1rem]  m-auto translate-y-[2px] h-[1rem] opacity-30"
                      src="image (1).png"
                      alt="Image Upload"
                    />
                    <p className="text-[21px] font-medium opacity-30">Image</p>
                  </div>
                </div>

                <button
                  className="bg-[#074979] hover:bg-white border-[2px] border-transparent hover:text-[#074979] hover:border-[#074979] transition-all duration-200 self-end text-white text-[1rem] p-1   w-[5rem] rounded-md "
                  type="submit"
                >
                  Post
                </button>
                {postId && (
                  <button
                    className="bg-[#F56565] hover:bg-[#e05353] border-[2px] border-transparent hover:text-white transition-all duration-200 self-end text-white text-[1.2rem] p-1 w-[6rem] rounded-md"
                    onClick={onCancel}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
