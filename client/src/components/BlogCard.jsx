import React from 'react';

import "./BlogCard.css";
import { useNavigate } from 'react-router-dom';


const BlogCard = ({post}) => {

  const navigate = useNavigate();

 
  return (
    <div className='blog-card-container' onClick={()=>
    navigate("/post",{state:post})}>
        <div className='blog-card-image'>
        <img src={`http://localhost:4000/assets/${post.image}`} 
        alt='no image available'/>

        </div>
        
       
       <div className='blog-card-title'>
        {post.title}
       </div>
       
       <div className='blog-card-author'>
        {post.author}
       </div>
        
    
          
        
    </div>
  )
}

export default BlogCard
