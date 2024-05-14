import { useMemo, useImperativeHandle, useRef, useEffect } from "react"
import * as React from "react"
import YooptaEditor, {
  createYooptaEditor,
  YooptaContentValue,
} from "@yoopta/editor"
import Paragraph from "@yoopta/paragraph"
import Blockquote from "@yoopta/blockquote"
import Embed from "@yoopta/embed"
import Image from "@yoopta/image"
import Link from "@yoopta/link"
import Callout from "@yoopta/callout"
import Video from "@yoopta/video"
import File from "@yoopta/file"
import { NumberedList, BulletedList, TodoList } from "@yoopta/lists"
import {
  Bold,
  Italic,
  CodeMark,
  Underline,
  Strike,
  Highlight,
} from "@yoopta/marks"
import { HeadingOne, HeadingThree, HeadingTwo } from "@yoopta/headings"
import Code from "@yoopta/code"
import ActionMenuList, {
  DefaultActionMenuRender,
} from "@yoopta/action-menu-list"
import Toolbar, { DefaultToolbarRender } from "@yoopta/toolbar"
import LinkTool, { DefaultLinkToolRender } from "@yoopta/link-tool"

const plugins = [
  Paragraph,
  HeadingOne,
  HeadingTwo,
  HeadingThree,
  Blockquote,
  Callout,
  NumberedList,
  BulletedList,
  TodoList,
  Code,
  Link,
  Embed,
  Image,
  Video,
  File,
]

const TOOLS = {
  ActionMenu: {
    render: DefaultActionMenuRender,
    tool: ActionMenuList,
  },
  Toolbar: {
    render: DefaultToolbarRender,
    tool: Toolbar,
  },
  LinkTool: {
    render: DefaultLinkToolRender,
    tool: LinkTool,
  },
}

const MARKS = [Bold, Italic, CodeMark, Underline, Strike, Highlight]

const Editor = React.forwardRef((props, ref) => {
  const editor = useMemo(() => createYooptaEditor(), [])

  useImperativeHandle(ref, () => ({
    getEditorValue: () => editor.getEditorValue(),
    clear: () => {
      const editorValue = editor.getEditorValue()
      if (editorValue && editorValue.blocks) {
        editorValue.blocks.forEach((block) => {
          editor.deleteBlock(block.id)
        })
      }
    },
  }))

  useEffect(() => {
    const handleChange = (value) => {
      console.log("DATA ON CHANGE", value)
    }

    editor.on("change", handleChange)
    return () => {
      editor.off("change", handleChange)
    }
  }, [editor])

  return (
    <YooptaEditor
      editor={editor}
      // @ts-ignore
      plugins={plugins}
      marks={MARKS}
      tools={TOOLS}
      placeholder="Type text..."
    />
  )
})

export default Editor
