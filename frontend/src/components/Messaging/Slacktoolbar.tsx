import { useYooptaEditor } from "@yoopta/editor"
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

const SlackTopToolbar = ({ handleMessageSubmit }) => {
  const editor = useYooptaEditor()

  // const handleImageInsert = (url: string) => {
  //   if (url) {
  //     editor.insertBlock({
  //       id: `image-${Date.now()}`, // Unique id for the block
  //       type: "image",
  //       value: [], // URL of the image
  //       meta: {
  //         src: url,
  //         order: 0,
  //         depth: 0,
  //       },
  //     })
  //   }
  // }

  // const handleVideoInsert = () => {
  //   const url = prompt("Enter the video URL:");
  //   if (url) {
  //     editor.blocks.video.insert({ src: url });
  //   }
  // };

  return (
    <div className="toolbar">
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
      {/* <span className="separator" /> */}
      {/* <button
        className="toolbarItem"
        // onClick={() => handleImageInsert("https://wallpapers.com/images/featured/dragon-ball-super-broly-dznz07vkati6shws.jpg")}
      >
        <ImageIcon
          size={15}
          strokeWidth={1.5}
        />
      </button> */}
      {/* <button className="toolbarItem" onClick={handleVideoInsert}>
        <VideoIcon size={15} strokeWidth={1.5} />
      </button> */}
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
