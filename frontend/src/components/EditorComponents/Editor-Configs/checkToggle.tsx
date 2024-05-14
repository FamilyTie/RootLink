import { createReactBlockSpec } from "@blocknote/react"
import { useEffect, useRef } from "react"

export const ChecklistItem = createReactBlockSpec(
  {
    type: "checklistItem",
    propSchema: {
      checked: {
        type: "boolean",
        default: false,
      },
    },
    content: "inline",
  },
  {
    render: ({ block, editor }) => {
      const textRef = useRef(null)

      useEffect(() => {
        // Immediately focus the text input when the block is rendered
        if (textRef.current) {
          textRef.current.focus()
          // Set the cursor at the start (or end) of the contentEditable
          const range = document.createRange()
          const sel = window.getSelection()
          range.setStart(textRef.current, 0)
          range.collapse(true)
          sel.removeAllRanges()
          sel.addRange(range)
        }
      }, [])

      return (
        <div
          className="checklist-item"
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <input
            type="checkbox"
            checked={block.props.checked}
            onChange={() => {
              editor.updateBlock(block.id, {
                ...block,
                props: {
                  ...block.props,
                  checked: !block.props.checked,
                },
              })
            }}
            style={{ marginRight: "10px" }}
          />
          <div
            ref={textRef}
            contentEditable
            onInput={(e) => {
              editor.updateBlock(block.id, {
                ...block,
                // @ts-ignore
                content: [{ type: "text", text: e.target.textContent }],
              })
            }}
            suppressContentEditableWarning={true}
            style={{
              flexGrow: 1,
              minHeight: "20px",
              outline: "none",
              border: "1px solid #ccc",
              padding: "5px",
            }}
          />
        </div>
      )
    },
  }
)
