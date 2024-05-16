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
} from "lucide-react"
import "./Slack.css"
import { FiSend } from "react-icons/fi"
import { Tooltip } from "react-tooltip"

const SlackTopToolbar = ({ handleMessageSubmit }) => {
  const editor = useYooptaEditor()

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
        onClick={() => {
          editor.blocks.Blockquote.toggle({ focus: true })
        }}
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
        onClick={() => {
          editor.blocks.Code.toggle({ focus: true })
        }}
      >
        <FileCodeIcon
          size={15}
          strokeWidth={1.5}
        />
      </button>
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
        />
      </button>
      <Tooltip id="submission" />
    </div>
  )
}

export { SlackTopToolbar }
