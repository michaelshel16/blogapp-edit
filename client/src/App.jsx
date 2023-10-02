import { useState,useEffect } from 'react';
import  "./index.css";
import "./App.css"; 
import axios from 'axios';
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box"
import { BrowserRouter, Navigate, Route,Routes } from 'react-router-dom';
import HomePage from "./Pages/HomePage.jsx";
import LoginPage from './Pages/LoginPage.jsx';
import Navbar from './components/Navbar.jsx';
import RegisterPage from "./Pages/RegisterPage.jsx";
import NewPost from './Pages/NewPost';
import Footer from './components/Footer';
import UserPostsPage from './Pages/UserPostsPage';
import TechPage from './Pages/TechPage';
import BusinessPage from './Pages/BusinessPage';
import ReviewsPage from './Pages/ReviewsPage';
import PostPage from './components/PostPage';
import { useSelector ,useDispatch} from 'react-redux';
import EditPost from './Pages/EditPost';
import PasswordReset from './Pages/PasswordReset';
import { setTechPosts,setBusinessPosts,setReviewsPosts } from './State';

function App() {
  
   const dispatch = useDispatch();
  
   

    
    
        
    
              
    
               
            
         
            
    
    
    
      
      
    
    
      
         
   
    const isAuth    = Boolean(useSelector((state)=> state.token))
   
    

    
  return (
   <div className='app'>
           


   <Navbar/> 
   <Routes>
     
     <Route path = "/"                 element =  {<HomePage/>}/>

     
     <Route path = "/login"           
      element =  {isAuth?<Navigate to="/"/>:<LoginPage/>}/>
     <Route path = "/register"        
      element =  {isAuth?<Navigate to="/"/>:<RegisterPage/>}/>
     <Route path = "/posts"           
      element =  {isAuth?<UserPostsPage/>:<Navigate to="/"/>}/>
     <Route path = "/createpost"    
        element =  {isAuth?<NewPost/>:<Navigate to="/"/>}/>
     <Route path = "/editpost"
        element =  {isAuth?<EditPost/>:<Navigate to="/"/>}/>
     <Route path = "/passwordreset"  element =  {<PasswordReset/>}/>
     <Route path = "/posts/tech"       element =  {<TechPage/>}/>
     <Route path = "/posts/business"   element =  {<BusinessPage/>}/>
     <Route path = "/posts/reviews"    element =  {<ReviewsPage/>}/>
     <Route path = "/post"             element =  {<PostPage />}/>
</Routes>
     <Footer/>
   

    

   </div>
  )
}

export default App
