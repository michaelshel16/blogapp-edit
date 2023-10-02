import React from 'react';
import "./PostTypeCard.css";
import postImage from "../assets/pixel2.jpg";
const PostTypeCard = ({posts}) => {
  
  const postPusher = () =>
  { let arrIndex = [];

    let arr      = []; 
   
    while(arrIndex.length<5)
    {
      let candidateInt = Math.floor((Math.random()*length)+1)
      if(arrIndex.indexOf(candidateInt)===-1)
      arr.push(candidateInt)
    }
   for(let i=0;i<5;i++)
   {
    arr[i] = HomePageArray[arrIndex[i]]
   }
   return (arr)
  }

  const arrayPost = postPusher();

  return (
      
    
    <div className='post-type-card-container'>
      {arrayPost.map((item,index)=>
        <div key={index}>
        <div className='post-type-card-title'>
            {item.postType}
      </div>
      <div className='post-type-card-content'>
        <div className='post-type-card-image'>
          <img src={`http://localhost:4000/assets/${item.image}`} alt='no image'/>  
        </div>
          <div className='post-type-card-content-subtitle'>
             {item.subtitle}
          </div>
          
        </div>
      </div>) 
       
        }
      
      </div>
 
  )
}

export default PostTypeCard
