import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { HiOutlineGlobeAlt } from "react-icons/hi"

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
