import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import BlogCard from "../components/BlogCard.jsx"
import HomePageImg from "../assets/pixel2.jpg"
import "./HomePage.css";
import BackgroundPost from "../components/BackgroundPost.jsx";

//import PostTypeCard from '../components/PostTypeCard';

import axios from 'axios';
import { useEffect,useState} from 'react';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setTechPosts,setBusinessPosts,setReviewsPosts,setimageStore } from '../State';
import {  useNavigate } from 'react-router-dom';


const HomePage = () => {
 
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading,setLoading]               = useState(true);
  const [CompleteArray,setcompleteArray]   = useState([]);
  const [HomePageArray,setHomePageArray]   = useState([]);
  const [HomeImageArray,setHomeImageArray] = useState([]);
  const [HeaderPost,setHeaderPost]         = useState(null);
  const [BgPost,setBgpost]                 = useState(null);
  
  axios.defaults.withCredentials
  
  useEffect(()=>
  {
  
   const fetchData = async()=>{
    setLoading(true);
    try 
    {
      const resArr = await axios.all(
        [axios.get("http://localhost:4000/blog/v1/posts/tech"),
        axios.get("http://localhost:4000/blog/v1/posts/business"),
        axios.get("http://localhost:4000/blog/v1/posts/reviews")],)

        
        
        
       
        const array = resArr[0].data.concat(resArr[1].data,resArr[2].data)

        
        const length = array.length;  
        
        let imageArray = [];

        array.map(async(item)=>{
          const result = await axios.get(`${item.image.imageUrl}`)

          imageArray.push(result)
        })

        setHomeImageArray(imageArray);
        console.log(imageArray)
        dispatch(setimageStore({
          imageStore:imageArray
        }))
          

        
        let tempArray = [];
        let IndexArray = [];
        console.log(array);
        
        setcompleteArray(array);
        
        
        dispatch(setTechPosts({
          techPosts:resArr[0].data
        }))

        dispatch(setBusinessPosts({
          businessPosts:resArr[1].data
        }))

        dispatch(setReviewsPosts({
          reviewsPosts:resArr[2].data
        }))

        

        
    
     
         while(IndexArray.length<7)
         {
           let candidateInt = Math.floor(Math.random()*length-1)+1
           if(IndexArray.indexOf(candidateInt)===-1)
           IndexArray.push(candidateInt)
         }
     
        console.log(IndexArray);
          
         for(let i=0;i<=5;i++)
         { if(i<5)
           {
           tempArray.push(array[IndexArray[i]])
           
           }
           else
           { 
            
            setHeaderPost(array[IndexArray[i]])
           
             setBgpost(array[IndexArray[i+1]])
           }
           
           
         }
        
         setHomePageArray(tempArray);
       
     
   
    } 
    catch (error) 
    {
      console.log(error);
    }  
  
    setLoading(false);


    }
    fetchData();
  },[])
 
   const imageFetcher = async(url)=>
   { console.log(url);
     const image = await axios.get(`${url}`)

     return image
   }
 
  
   
  
   
 

    

    return (

       <div >
        {loading&&<div>loading</div>}
          {!loading&&(<div>
            <Container>
        
        <div className='home-container'>
          
             <div className='home-page-post'>
               <div className='home-page-post-image'>
                  <img src={()=>imageFetcher(HeaderPost.image.imageUrl)}
                   alt='image not available'/>
               </div>
               <div className='home-page-post-content'>
               <div className='home-page-post-content-title'
               onClick={()=>{navigate("/post",{state:HeaderPost})}}>
                  <h1 >{HeaderPost.title}</h1>
               </div>
               <div className='home-page-post-content-summary'>
                  {HeaderPost.subtitle}
               </div>
               <div className='home-page-post-content-author'>
                 {HeaderPost.author}
               </div>
               </div>
              
 
             </div>
 
 
           <div className='home-todays-picks'>
             <div><h3>TODAY'S PICKS</h3></div>
           
               
               <div className='home-todays-picks-slider-card'>
               { HomePageArray.map((item,index)=>
               (
                 <BlogCard post = {item} 
                  key={index}
                 />
               ))
                 
               }
               
               
               </div>
               
             
           </div>
           
        </div>
       </Container>
       <BackgroundPost post = {BgPost}/>
            
          </div>
            
          )} 
   
      </div>
      
    
  )
}

export default HomePage

