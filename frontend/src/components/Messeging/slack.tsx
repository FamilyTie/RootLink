import YooptaEditor, { createYooptaEditor } from "@yoopta/editor"
import Blockquote from "@yoopta/blockquote"
import Paragraph from "@yoopta/paragraph"
import Image from "@yoopta/image"
import { uploadFileAndGetURL } from "../../utils"
import {
  Bold,
  Italic,
  CodeMark,
  Strike,
  Underline,
  Highlight,
} from "@yoopta/marks"
import Lists from "@yoopta/lists"
import Link from "@yoopta/link"
import Video from "@yoopta/video"
import File from "@yoopta/file"
import Code from "@yoopta/code"
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list"
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar"
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool"
import { useMemo, useEffect } from "react"
import { SlackTopToolbar } from "./Slacktoolbar"
import "./Slack.css"

const plugins = [
  Paragraph.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Blockquote.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Image.extend({
    options: {
      async onUpload(file) {
        const data = await uploadFileAndGetURL(file)

        return {
          src: data,
          alt: "cloudinary",
          sizes: {
            width: 200,
            height: 200,
          },
        }
      },
    },
  }),
  Video,
  File,
  Lists.BulletedList.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Lists.NumberedList.extend({
    options: {
      HTMLAttributes: {
        className: `chatText`,
      },
    },
  }),
  Link,
  Code,
]
const TOOLS = {
  Toolbar: {
    tool: Toolbar,
    render: DefaultToolbarRender,
  },
  ActionMenu: {
    tool: Toolbar,
    render: DefaultActionMenuRender,
  },
  LinkTool: {
    tool: LinkTool,
    render: DefaultLinkToolRender,
  },
}
const MARKS = [Bold, Italic, CodeMark, Strike, Underline, Highlight]

const SlackChat = ({ sendMessage }) => {
  const editor = useMemo(() => createYooptaEditor(), [])

  function handleMessageSubmit() {
    const content = editor.getEditorValue()
    console.log("submitContent", content)
    sendMessage(JSON.stringify(content)) // Send the editor content as a string
    editor.setEditorValue({
      "142475fb-e046-404c-98be-3ef60c3ab7b9": {
        id: "142475fb-e046-404c-98be-3ef60c3ab7b9",
        value: [
          {
            id: "c1825d1d-ec3d-49c5-a260-2dc0bfa3521f",
            type: "paragraph",
            children: [{ text: "" }],
            props: { nodeType: "block" },
          },
        ],
        type: "Paragraph",
        meta: { order: 0, depth: 0 },
      },
    })
  }

  function handleChange(value) {
    console.log("value", value)
    const editorContent = editor.getEditorValue()
    console.log(JSON.stringify(editorContent), "content")
  }

  useEffect(() => {
    editor.on("change", handleChange)
    return () => {
      // [IMPORTANT] - unsubscribe from event on unmount
      editor.off("change", handleChange)
    }
  }, [editor])

  return (
    <div
      id="slack"
      className="relative"
    >
      <div className="relative border border-gray-600 rounded-lg bg-gray-900 w-full max-w-xl mx-auto">
        <div className="flex flex-col pt-10 px-4 pb-4">
          <YooptaEditor
            editor={editor}
            // @ts-ignore
            plugins={plugins}
            marks={MARKS}
            className="editor text-white"
            placeholder="Type your message..."
            selectionBoxRoot={false}
            width="100%"
            submit={handleMessageSubmit}
          >
            <SlackTopToolbar handleMessageSubmit={handleMessageSubmit} />
          </YooptaEditor>
        </div>
      </div>
    </div>
  )
}

export { SlackChat }
