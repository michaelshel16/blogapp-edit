import React, { useState } from 'react';
import { Container } from '@mui/material';
import Dropzone from 'react-dropzone';
import "./NewPost.css";
import axios from 'axios';
import {store} from "../main.jsx";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import quill from '../components/EditorModule';
import { useDispatch, useSelector } from 'react-redux';
import { setUserPosts } from '../State';
import { useNavigate } from 'react-router-dom';
import Resizer from "react-image-file-resizer";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';







const NewPost = () => 
{
  const [postData,setPostData] = useState({
    title:'',
    subtitle:'',
    postType:'tech',
    imageContent:'',
    content:'',
    
    
  
  })
  const [titleCheck,settitleCheck]                 = useState(true);
  const [subtitleCheck,setsubtitleCheck]           = useState(true);
  const [imageContentCheck,setimageContentCheck]   = useState(true);
  const [contentCheck,setContentCheck]             = useState(true);
  
  

 
  const errorMessages = {
   
    tileError:"Provide a title",
    subtitleError:"Give a subtitle please",
    contentError:"Give us a content",
    imageError:"please upload an image",
    dateError:"select the date"

  }

  

 

  

  const dispatch  = useDispatch();
  const navigate  = useNavigate();
  const state     = store.getState();
  const user      = state.user
  const token     = state.token;
  const post      = state.editPost;
  const posts     = state.userPosts;
  
  
  const contentHandler = (value)=>
  {
    setPostData((prev)=>{
    return{
      ...prev,content:value
    }})
    
  }
  
  const resizeFile = (file) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1280,
      720,
      "JPEG",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file"
    );
  });
  
  const handleFormSubmit = async(e)=>{
    e.preventDefault();
    try {
      
    let lastName = ""
 
   
   
    for(let key in postData)
    { 
      switch(key)
      {
        case'title':
         postData.title===''?settitleCheck(false):settitleCheck(true)
        break
        case'subtitle':
         postData.subtitle===''?setsubtitleCheck(false):setsubtitleCheck(true)
        break
        case'content':
          postData.content===''?setContentCheck(false):setContentCheck(true)
         break
        case'imageContent':
          postData.imageContent===''?setimageContentCheck(false):setimageContentCheck(true)
         break
        
        
      }
    }
   
   
   
    

   
  if((postData.title&&postData.subtitle&&postData.content
    &&postData.imageContent&&postData))
    { console.log(token);
      const formData = new FormData();

      const modifiedImage = await resizeFile(postData.imageContent)
      
      for(let value in postData)
      { 
        
        value==="imageContent"?formData.append(value,modifiedImage):
        formData.append(value,postData[value])
        
        
      }
      formData.append("image",postData.imageContent.name)
      formData.append("userId",user._id)
      
      formData.append("email",user.email)
      user.lastName==="no last name"?lastName="":lastName=user.lastName
   
      
      formData.append("author",user.firstName+" "+lastName)
      const newPost = await axios.post("http://localhost:4000/blog/v1/user/posts"
      ,formData,
      {headers:{
       "Content-Type":"multipart/form-data",
       "Authorization":`Bearer ${token}`}})
      
      let newPosts = [];
      
      posts.map((item)=>
      {
        newPosts.push(item)
      })
  
      newPosts.push(newPost.data)
   
      dispatch(setUserPosts({
        userPosts:newPosts
      }))
        navigate("/posts")
      }
      else
      {
        alert("Please fill all the fields")
      }
    }
    
    catch (error) 
    {
      console.log(error) 
    }}
    
    
  
  
 
  return (
  <Container>
     

        <form onSubmit={handleFormSubmit}>
          <div className='post-container'>
                <div className='post-title' >
                  <label>Title</label>
                  <input name="title" 
                  onChange={e=>setPostData({...postData,title:e.target.value})}
                 />
                 <span>{titleCheck?'':errorMessages.tileError}</span>
                </div>
               <div className='post-sub-title'>
                <label>Subtitle</label>
                  <input name='subtitle' 
                    onChange={e=>{
                     
                      setPostData({...postData,subtitle:e.target.value}) }}
                  />
                   <span>{subtitleCheck?'':errorMessages.subtitleError}</span>
              
                  
                </div>

                <div className='post-content-type'>
                    <label>Which domain you want to post?</label>
                    <select name='postType' 
                     onChange={e=>setPostData({...postData,postType:e.target.value})}
                     
                     
                     
                     >
                      <option value={"tech"}>TECH</option>
                      <option value={"business"}>BUSINESS</option>
                      <option value={"reviews"}>REVIEWS</option>
                    </select>
                    

                </div>
                <div className='post-content'>
                  <div className='post-content-editor'>
                  <ReactQuill 
                 theme="snow"
                 
                 modules={quill.modules} 
                 name = "content"
                 onChange={contentHandler}
                 value={postData.content}
                
                />
                 
                  </div>
                  
                <span>{contentCheck?'':errorMessages.contentError}</span>
                </div>
                <div className='post-image'
                
                >
                 <Dropzone
                   name="imageContent" 
                   acceptedFiles= ".jpg,.jpeg,.png"
                   multiple = {false}
                  
                 
                  onDrop={
                    (acceptedFiles)=>
                    { console.log(acceptedFiles[0])
                      setPostData({...postData,imageContent:acceptedFiles[0]})
                    }
                  }
                  
                 >
                   {({getRootProps,getInputProps})=>
                   
                   (
                       <div {...getRootProps()} className='post-image-dropzone'>
                             
                          <input {...getInputProps()} />
                          {!postData.imageContent?(<p>Drag or Click here to insert Picture Only HD </p>):(<p>{postData.imageContent.name}</p>)}
                       </div>
                             


                   )}
                  
                  
                  
                  </Dropzone>  
                  <span>{imageContentCheck?'':errorMessages.imageError}</span> 
                </div>
               
              
                <div className='post-submit-button'>
            <button type='submit'>Submit</button>
           </div>
              </div>
             




        </form>






    
  </Container>
  )}

export default NewPost
