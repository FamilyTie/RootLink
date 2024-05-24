import { useState } from "react"
import { buildBlockData, generateId, useYooptaEditor } from "@yoopta/editor"
import {
  List,
  ListOrdered,
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  LinkIcon,
  TextQuoteIcon,
  CodeIcon,
  FileCodeIcon,
  UnderlineIcon,
  ImageIcon,
  VideoIcon,
} from "lucide-react"
import "./Slack.css"
import { FiSend } from "react-icons/fi"
import { Tooltip } from "react-tooltip"
import { uploadFileAndGetURL } from "../../utils"

const SlackTopToolbar = ({ handleMessageSubmit }) => {
  const editor = useYooptaEditor()
  const [imageFileInput, setImageFileInput] = useState(null)
  const [videoFileInput, setVideoFileInput] = useState(null)

  const handleImageFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const url = await uploadFileAndGetURL(file)
        insertImage(url)
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }

  const handleVideoFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      try {
        const url = await uploadFileAndGetURL(file)
        insertVideo(url)
      } catch (error) {
        console.error("Error uploading file:", error)
      }
    }
  }

  const insertImage = (url) => {
    if (url) {
      editor.insertBlock(
        buildBlockData({
          type: "Image",
          value: [
            {
              id: generateId(),
              type: "image",
              children: [{ text: "" }],
              props: {
                nodeType: "void",
                src: `${url}`,
                alt: "alt",
              },
            },
          ],
        })
      )
    }
  }

  const insertVideo = (url) => {
    if (url) {
      editor.insertBlock(
        buildBlockData({
          type: "Video",
          value: [
            {
              id: generateId(),
              type: "video",
              children: [{ text: "" }],
              props: {
                nodeType: "void",
                src: `${url}`,
                alt: "video",
              },
            },
          ],
        })
      )
    }
  }

  const handleImageInsert = () => {
    if (imageFileInput) {
      imageFileInput.click()
    }
  }

  const handleVideoInsert = () => {
    if (videoFileInput) {
      videoFileInput.click()
    }
  }

  return (
    <div className="toolbar">
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        ref={(input) => setImageFileInput(input)}
        onChange={handleImageFileChange}
      />
      <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        ref={(input) => setVideoFileInput(input)}
        onChange={handleVideoFileChange}
      />
      <button
        className="toolbarItem"
        data-state-active={editor.formats.bold?.isActive()}
        onClick={() => editor.formats.bold.toggle()}
      >
        <BoldIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <button
        className="toolbarItem"
        data-state-active={editor.formats.italic?.isActive()}
        onClick={() => editor.formats.italic.toggle()}
      >
        <ItalicIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <button
        className="toolbarItem"
        data-state-active={editor.formats.strike?.isActive()}
        onClick={() => editor.formats.strike.toggle()}
      >
        <StrikethroughIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <button
        className="toolbarItem"
        data-state-active={editor.formats.underline?.isActive()}
        onClick={() => editor.formats.underline.toggle()}
      >
        <UnderlineIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <span className="separator" />
      <button
        className="toolbarItem"
        onClick={() => alert("in progress")}
      >
        <LinkIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <span className="separator" />
      <button
        className="toolbarItem"
        data-state-active={editor.blocks.NumberedList?.isActive()}
        onClick={() => editor.blocks.NumberedList.toggle({ focus: true })}
      >
        <ListOrdered
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <button
        className="toolbarItem"
        data-state-active={editor.blocks.BulletedList?.isActive()}
        onClick={() => editor.blocks.BulletedList.toggle({ focus: true })}
      >
        <List
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <span className="separator" />
      <button
        className="toolbarItem"
        data-state-active={editor.blocks.Blockquote?.isActive()}
        onClick={() => editor.blocks.Blockquote.toggle({ focus: true })}
      >
        <TextQuoteIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <span className="separator" />
      <button
        className="toolbarItem"
        onClick={() => editor.formats.code.toggle()}
      >
        <CodeIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <button
        className="toolbarItem"
        onClick={() => editor.blocks.Code.toggle({ focus: true })}
      >
        <FileCodeIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <span className="separator" />
      <button
        className="toolbarItem"
        onClick={handleImageInsert}
      >
        <ImageIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <button
        className="toolbarItem"
        onClick={handleVideoInsert}
      >
        <VideoIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
      <span className="separator" />
      <button
        className="toolbarItem"
        onClick={() => handleMessageSubmit()}
        data-tooltip-id="submission"
        data-tooltip-content="Submit Message!"
        data-tooltip-place="bottom"
      >
        <FiSend
          size={15}
          strokeWidth={1.5}
          color="aqua"
        />
      </button>
      <Tooltip id="submission" />
    </div>
  )
}

export { SlackTopToolbar }
