import { Quill } from "react-quill";
import 'quill-paste-smart';



let toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],       
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],              
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      
    [{ 'indent': '-1'}, { 'indent': '+1' }],          
    [{ 'direction': 'rtl' }],                        
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],       
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         
  ];
  
  let quill = new Quill('#editor', {
    modules: {
      theme: 'snow',
      toolbar: toolbarOptions,
      clipboard: {
        allowed: {
            tags: ['a', 'b', 'strong', 'u', 's', 'i', 'p', 'br', 'ul', 'ol', 'li', 'span'],
            attributes: ['href', 'rel', 'target', 'class']
        },
        keepSelection: true,
        substituteBlockElements: true,
        magicPasteLinks: true,
        hooks: {
            uponSanitizeElement(node, data, config) {
                console.log(node);
            },
        },
    },
},
     
    },
    
  );

  export default quill;