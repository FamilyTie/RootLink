import {
  DefaultReactSuggestionItem,
  getDefaultReactSlashMenuItems,
} from "@blocknote/react"
import { insertCommandsItem, insertAlert } from "./insertCommandItem"
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  insertOrUpdateBlock,
} from "@blocknote/core"
import { ChecklistItem } from "./checkToggle"
import { Alert } from "./Alert"
import { MdChecklist } from "react-icons/md"

// customization

export const getCustomSlashMenuItems = (
  editor: BlockNoteEditor
): DefaultReactSuggestionItem[] => [
  // ...getDefaultReactSlashMenuItems(editor).filter(
  //   (item) => !item.title.toLowerCase().startsWith("heading")
  // ),
  ...getDefaultReactSlashMenuItems(editor).filter(
    (item) => item.title.toLowerCase() !== "heading 1"
  ),
  insertAlert(editor),
  // insertChecklistItem(editor)
  insertCommandsItem(editor),
  // {
  //   title: "Checklist Item",
  //   icon: <MdChecklist />, // Ensure this icon is imported
  //   onItemClick: () => {
  //     const newChecklistItem = {
  //       type: "checklistItem",
  //       content: [{ type: "text", text: "", styles: {} }],
  //       props: { checked: false },
  //     }

  //     // Insert the new block at the current cursor position or at the end
  //     // @ts-ignore
  //     insertOrUpdateBlock(editor, {
  //       type: "checklistItem",
  //     })
  //   },
  // },
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
}

export const placeholders = {
  bulletListItem: "Enter list item...",
  default: "Your Story...",
  heading: "Enter a heading...",
  image: "Click to add an image...",
  numberedListItem: "Enter numbered item...",
  // this glitches block to duplicate
  // paragraph: "Enter paragraph...",
}

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    // custom
    alert: Alert,
    checklistItem: ChecklistItem,
    // checklistItem: checklistItem,
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
