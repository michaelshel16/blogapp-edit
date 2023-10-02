import React from 'react';
import BackgroundImage from "../assets/pixel2.jpg";
import "./BackgroundPost.css";
import PostTypeCard from './PostTypeCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BackgroundPost = ({post}) => {

  const techPosts     = useSelector((state)=> state.techPosts)
  const businessPosts = useSelector((state)=>state.businessPosts)
  const reviewsPosts  = useSelector((state)=> state.reviewsPosts)

  const navigate = useNavigate()
  
  return (
    <div className='bg-post-container'>
      <div className='bg-post-read-more' 
      onClick={()=>navigate("/post",{state:post})}>
        <h1>Read more <ArrowForwardIcon/></h1>
      </div>
      <div className='bg-post-image'>
          <img src ={`http://localhost:4000/assets/${post.image}`}
           alt='no image available'/>
        </div>
      <div className='bg-post-content'>
        
      <div className='bg-post-title'>
          <h1>{post.title}</h1>
      </div>
      <div className='bg-post-summary'>
          {post.subtitle}
      </div>
      </div>
     <div className='post-type-cards-container'>
        
      </div>
      
    </div>
  )
}

export default BackgroundPost
