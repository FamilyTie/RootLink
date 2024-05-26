import YooptaEditor, { createYooptaEditor } from "@yoopta/editor"
import { Bold, Italic, CodeMark, Strike, Underline } from "@yoopta/marks"
const MARKS = [Bold, Italic, CodeMark, Strike, Underline]

export const Message = ({msg, index, userId, plugins}: {msg: any, index: number, userId: number | string, plugins: any}) => {
    const editor = createYooptaEditor()
    const isUserMessage = msg.user_sent === userId

    return (
      <div
        key={index}
       className=""
      >

          <div className="flex">
          {!isUserMessage && <b className="block mb-2 text-black">{msg.username}:</b>}
       
          </div>
        
        <div  className={`relative gap-3 flex p-4 mb-4 max-w-xs rounded-lg shadow-md ${
          isUserMessage?
           "bg-[#074979] text-black translate-x-[193%] self-end"
           : "bg-[#074979] text-black self-start" 
        }`}>
           
        <div >

        <YooptaEditor
          editor={editor}
          // @ts-ignore
          plugins={plugins}
          marks={MARKS}
          readOnly
          value={JSON.parse(msg.body)}
          className="editor"
        />
        <div
          className={`absolute top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent ${
            isUserMessage
            ?  "border-l-8 border-[#074979] -right-2"
              : "border-r-8 border-[#074979] -left-2"
             
          }`}
        ></div>

        </div>  

        
        
          </div>
      
      </div>
    )
  }    