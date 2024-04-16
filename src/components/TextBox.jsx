import { useState } from "react";
import sanitizeHtml from 'sanitize-html';


export default function TextBox() {
  const [text,setText] = useState("")

  function boldText(){
    const selection = document.getSelection();
    const range = selection.getRangeAt(0);
    const bold = document.createElement("b");
    range.surroundContents(bold);
    // if(selection.anchorNode === selection.focusNode && selection.anchorNode.parentNode.className === "text-box"){
    //   
    //   
    // }
  }
  /* 
  const clean = sanitizeHtml(dirty, {
  allowedTags: [ 'b', 'i', 'em', 'strong', 'a' ],
  allowedAttributes: {
    'a': [ 'href' ]
  },
  allowedIframeHostnames: ['www.youtube.com']
});
*/

  /* document.addEventListener("keypress", event => {
    if(event.key === "h"){
        const selection = document.getSelection();
        // If you have only one element in your selection and it is the text in a .note-text
        if(selection.anchorNode === selection.focusNode && selection.anchorNode.parentNode.className === "note-text"){
            // Puts your selection in a span with class highlight
            const range = selection.getRangeAt(0);
            const span = simpleElement("span","highlight");
            span.addEventListener("click",clickHighlight);
            range.surroundContents(span);
        }
    }
}) */
return(
  <>
    <div className="text-box" contentEditable={true}
    // onBlur={t => setText(t.currentTarget.innerHTML)}
    // dangerouslySetInnerHTML={{__html: text}}
    ></div>
    <div className="toolbar">
      <button className="bold-button" onClick={boldText}>Bold</button>
    </div>
  </>
)
}