import React from 'react';
import DomainPage from '../components/DomainPage';
import { useSelector } from 'react-redux';
import businessadimage1 from "../assets/businessad1.jpg";
import businessadimage2 from "../assets/businessad2.jpg";
import businessadimage3 from "../assets/businessad3.jpg";

const BusinessPage = () => {
  
  const posts    = useSelector((state)=>state.businessPosts)
  const Adimages = {
    image1:businessadimage1,
    image2:businessadimage2,
    image3:businessadimage3

  }
  
  return (
    <div>
      <DomainPage posts={posts} Adimages={Adimages}/>
    </div>
  )
}

export default BusinessPage
