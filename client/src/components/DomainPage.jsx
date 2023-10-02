import React, { useEffect } from 'react';
import "./DomainPage.css";
import { Container } from '@mui/material';
import DomainPostimg from "../assets/pixel2.jpg";
import BlogCard from "./BlogCard.jsx";
import AdBox from './AdBox';
import { Formik } from 'formik';
import * as yup from "yup";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const newsLetterSchema = yup.object().shape({
   email:yup.string().email().required("required")

});

const initalnewsLetter = { email:''}


const DomainPage = ({posts ,Adimages}) => {
  const navigate = useNavigate();
  const [DomainArray,setDomainArray] = useState([]);
  const [loading,setloading]         = useState(true)
  const [DomainPost,setDomainPost]   = useState(null);
  
  useEffect(()=>
  { const runOnce = async()=>
  { setloading(true)
    const length = posts.length;
    let IndexArray = [];
    let tempArray  = [];
   
    const postArray = posts;
    while(IndexArray.length<6)
    {
      let candidateInt = Math.floor(Math.random()*length-1)+1
      if(IndexArray.indexOf(candidateInt)===-1)
      IndexArray.push(candidateInt)
    }
    
    
    for(let i=0;i<=5;i++)
    { if(i<5)
      {
        tempArray.push(postArray[IndexArray[i]])
        
      }
      else
      { 
        setDomainPost(postArray[IndexArray[i]])
      }
      
    }

    
    setDomainArray(tempArray);
    setloading(false)

  }
  runOnce(); 
  },[])

 
  const handleEmailSubmit = async(values,onSubmitProps) =>{
  
    axios.post("http://localhost:4000/blog/v1/newsletter",values)
    .then((res)=>
    {
      console.log(res);
    })
    onSubmitProps.resetForm();
  
  }
   
  

 

  return (
    
    <div>
        <AdBox Adimages = {Adimages}/>
        {loading&&<div>loading</div>}
        {!loading&&(
        <div>
         <Container>
      <div className='domain-page-container'>
       
        <div className='domain-page-big-post'>

          <div className='domain-page-post-image'>
           <img src={`http://localhost:4000/assets/${DomainPost.image}`} 
           alt='no image available'/>
          </div>
           <div className='domain-page-post-info'>
           <div className='domain-page-post-title'
           onClick={()=>{navigate("/post",{state:DomainPost})}}>
            <h1>{DomainPost.title}</h1> 
          </div>
          <div className='domain-page-post-subtitle'>
             <h3>{DomainPost.subtitle}</h3>
          </div>
          <div className='domain-page-post-author'>
            {DomainPost.author}
          </div>
           </div>
          
        </div>
           
            <div className='domain-post-card-container'>
            { DomainArray.map((item,index)=>
              
            ( 
             
            <BlogCard
            onClick={()=>navigate("/post",{state:item})}
            key = {index} 
            post={item}/>
            ))
             
            }
            
           
          
           </div>
          
        
      </div>
      <div className='domain-post-newsletter-container'>
         <div className='domain-post-newsletter-title'>
           <h1>Subscribe to our Newsletter</h1>
         </div>
         <div className='domain-post-newsletter-email'>
          <Formik 
            onSubmit={handleEmailSubmit}
            initialValues={initalnewsLetter}
            validationSchema={newsLetterSchema}
          >
            {({
              values,
              errors,
             
              handleChange,
              handleSubmit,
              setFieldValue,
              resetForm
            })=>( 
            
              <form onSubmit={handleSubmit}>
                <div className='domain-post-newsletter-email-input'>
                <input name='email' type='email' placeholder='enter your mail id '
              onChange={handleChange}
              value={values.email}/>
              {Boolean(errors.email)?<div className='errors'>{errors.email}</div>:''}
              <button type='submit'>
                  Subscribe
                </button>
                </div>

                
              
              </form>)
              }
         
          
          </Formik>
           
         </div>
      </div>

  </Container>

          
        </div>)}
       
    </div>
    
  
  )
}

export default DomainPage
