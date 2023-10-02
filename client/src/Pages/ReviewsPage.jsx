import React from 'react';
import DomainPage from '../components/DomainPage';
import { useSelector } from 'react-redux';
import reviewadimage1 from "../assets/reviewad1.jpg"
import reviewadimage2 from "../assets/reviewad2.jpg";
import reviewadimage3 from "../assets/reviewad3.jpg";
const ReviewsPage = () => {
     
    const  posts  = useSelector((state)=> state.reviewsPosts)
    const  Adimages = {
       image1:reviewadimage1,
       image2:reviewadimage2,
       image3:reviewadimage3
    }
    return (
    <div>
      <DomainPage posts={posts} Adimages={Adimages}/>
    </div>
  )
}

export default ReviewsPage
