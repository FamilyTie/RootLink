import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react"
import { insertCommandsItem } from "./insertCommandItem"
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
} from "@blocknote/core"
import { Alert } from "./Alert"
// customization 

export const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  ...getDefaultReactSlashMenuItems(editor),
  insertCommandsItem(editor),
]

export const theme = {
  colors: {
    editor: {
      text: "#333333",
      background: "rgb(199,199,199)",
    },
    borderRadius: 5,
    fontFamily: "Arial, sans-serif",
  },
  outerHeight: "500px",
}

export const placeholders = {
  bulletListItem: "Enter list item...",
  default: "Type...",
  heading: "Enter a heading...",
  image: "Click to add an image...",
  numberedListItem: "Enter numbered item...",
  paragraph: "Your Story...",
}

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    // custom 
    alert: Alert, 
  },
})
// each one is a empty paragraph - can't be fully empty due to placeholder
export const defaultBlockAmount = [
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "",
        styles: {},
      },
    ],
  },
  {
    type: "paragraph",
    content: [{ type: "text", text: " ", styles: {} }],
  },
  {
    type: "paragraph",
    content: [{ type: "text", text: " ", styles: {} }],
  },
  {
    type: "paragraph",
    content: [{ type: "text", text: " ", styles: {} }],
  },
]
