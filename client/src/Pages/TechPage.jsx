import React from 'react';
import DomainPage from '../components/DomainPage';
import { useSelector } from 'react-redux';
import techadimage1 from "../assets/techad1.jpg";
import techadimage2 from "../assets/techad2.jpg";
import techadimage3 from "../assets/techad3.jpg";

const TechPage = () => {

 const posts    = useSelector((state)=> state.techPosts)
 const Adimages = {
  image1:techadimage1,
  image2:techadimage2,
  image3:techadimage3
 }

    return (
    <div>
      <DomainPage posts = {posts} Adimages={Adimages}/>
    </div>
  )
}

export default TechPage
