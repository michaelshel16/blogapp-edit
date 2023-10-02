import React from 'react';
import { Container } from '@mui/material';
import PostMainImage from "../assets/pixel2.jpg";
import "./PostPage.css";
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useState ,useEffect} from 'react';
import axios from 'axios';


const PostPage = () => {
  
  const location = useLocation();
  const post     = location.state

  return (
    
        <Container>
        
        
           <div className='post-page-container'>

          
              <div className='post-page-header'>
                <div className='post-page-type'>
                        {post.postType}
                </div>
                <div className='post-page-title'>
                  <h1>{post.title}</h1>  
                </div>
              
                <div className='post-page-subtitle'>
                  <h3>{post.subtitle}</h3> 
                </div>
              <div className='post-page-author'>
                  <h3>{post.author}</h3>
                  Posted on {post.date}
              </div>
              </div>

              <div className='post-page-main-image'>
                <img src={`http://localhost:4000/assets/${post.image}`} 
                alt='no image available'/>
              </div>
                <div className='post-page-content'
                >
                  <div dangerouslySetInnerHTML={{__html:post.content}}/>
                </div>
              </div>
          
        
           
        </Container>
      
    
  )
}

export default PostPage
