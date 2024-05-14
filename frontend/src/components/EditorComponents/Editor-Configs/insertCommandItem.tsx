import {
  BlockNoteEditor,
  PartialBlock,
  insertOrUpdateBlock,
} from "@blocknote/core"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { RiAlertFill } from "react-icons/ri"
// everything in editor kept its shortcuts so this will have those as text
export const insertCommandsItem = (editor: BlockNoteEditor) => ({
  title: "Commands",
  onItemClick: () => {
    const currentBlock = (editor.getTextCursorPosition() as any).block

    const commandBlocks: PartialBlock[] = [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "List Of ALl Commands",
            styles: { bold: true },
          },
        ],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "CMD SHIFT L", styles: { bold: true } },
        ],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "SHIFT", styles: { bold: true } }],
      },
      {
        type: "paragraph",
        content: [{ type: "text", text: "ALT T", styles: { bold: true } }],
      },
    ]

    // Inserting the new blocks after the current one.
    editor.insertBlocks(commandBlocks, currentBlock, "after")
  },
  aliases: ["CMDS", "COMDS", "COMMANDS"],
  group: "Other",
  icon: <HiOutlineGlobeAlt size={18} />,
  subtext: "Shows All Commands",
})

export const insertAlert = (editor: BlockNoteEditor) => ({
  title: "Alert",
  onItemClick: () => {
    // @ts-ignore
    insertOrUpdateBlock(editor, {
      type: "alert",
    })
  },
  aliases: [
    "alert",
    "notification",
    "emphasize",
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Other",

  icon: <RiAlertFill />,
})
