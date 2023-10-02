import React, { useEffect, useState } from 'react';
import "./LoginPage.css";
import axios from "axios";
import {FcGoogle} from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {setLogin,setUserPosts} from "../State/index.jsx";
import { signInWithGoogle}  from "../components/FireBase.jsx";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';




const LoginPage = () => {
  const [email,setEmail]         = useState("");
  const [password,setPassword]   = useState("");
  const [isclicked,setisclicked] = useState(false); 
  const dispatch                 = useDispatch();
  const navigate                 = useNavigate();
  const [visiblity,setvisibilty] = useState(false);
  const handleVisbility = ()=>
  {
    visiblity?setvisibilty(false):setvisibilty(true)
  }
  

  const handleFormSubmit = (e)=>
  { e.preventDefault() 
    const UserCredentials = {
      email:email,
      password:password
    }
    axios.post("http://localhost:4000/blog/v1/login",UserCredentials,
    {
      headers:{"Content-type":"application/json"}
    }).then((res)=>
    {  
       const loggedInResponse = res.data;
    
       dispatch(setLogin({
        user :loggedInResponse.user,
        token:loggedInResponse.token,
        
      }))

       if(loggedInResponse)
       { axios.get(`http://localhost:4000/blog/v1/${loggedInResponse.user._id}/posts`,
       {headers:{"Authorization":`Bearer ${loggedInResponse.token}`}}
     
     ).then((res)=>
     {
       
       dispatch(setUserPosts({
        userPosts:res.data
       }))
     })
     navigate("/")
        
        
      }
      
    })
     
   
   
      
  
     


  }

  const googleLogin = async (e)=>
  { e.preventDefault()
    try
    
    {
    const result = await signInWithGoogle()
    const email  = result.user.email
   
    const UserCrendentials = 
      {
        email:email,
        
      } 
    const Userdata = await axios.post("http://localhost:4000/blog/v1/gmaillogin",
      UserCrendentials)
    
      if(Userdata)
      {
        dispatch(setLogin({
          user:Userdata.data.user,
          token:Userdata.data.token
        }))
       const user  = Userdata.data.user;
       const token = Userdata.data.token;
        const UserPosts = await
         axios.get(`http://localhost:4000/blog/v1/${user._id}/posts`,
        {headers:{Authorization:`Bearer ${token}`}})
        
        console.log(UserPosts)
         dispatch(setUserPosts({
          userPosts:UserPosts.data
         }))
         navigate("/") 
      }
      
    } 
    catch (error) 
    { 
      navigate("/register")
    }
    
     
     
   
    
      
    }
     
   

  const handlePasswordReset = async (e) =>
  { 
    e.preventDefault()
    
    try 
    {
      const user = await axios.post("http://localhost:4000/blog/v1/finduser",
      {email:email})
  
      if(user)
      {
        const Otp = Math.floor(1000+Math.random()*9000);
        axios.post("http://localhost:4000/blog/v1/passwordverify/user",
        {
          email:email,
          Otp:Otp
        })
        navigate("/passwordreset",{state:{Otp:Otp,email:email}})
      }
      
    
    }
   catch (error)
   {
     alert("Please register or signup")
     navigate("/register"); 
   }
    
   
  }
  

  return (
    <div className='container-lg'>
         {
          isclicked?
          <div className='reset-email'>
        <input
         onChange=
        {e=>setEmail(e.target.value)} placeholder='Enter your email Id'/>
        <div>
        <button onClick={(e)=>{handlePasswordReset(e)}}>SUBMIT</button>
      </div>
      </div>:
      
      <div className='login-container' >
       <div className='login-form-container'>
       <form className='login-form' onSubmit={handleFormSubmit}>

             <div className='email-input'>
             <label>
                 Email
             </label>
             <input type = "text" placeholder='Enter your email' 
             onChange={e=> setEmail(e.target.value)}
             name='email'
             />

             </div>
               <div className='password-input'>
               
                <label>
                 password
               </label>
                
               <div className='password-input-box'>
               <input
               type={visiblity?"text":"password"} 
               placeholder='Enter your password' 
               onChange={e=> setPassword(e.target.value)}
               name='password'/>
               <div>
               {visiblity?
               <VisibilityOutlinedIcon color='primary' onClick={()=>handleVisbility()}/>:
               <VisibilityOffOutlinedIcon color='primary' onClick={()=> handleVisbility()}/>}
               </div>
             
               
               
               </div>
               
               
               
               </div>
               <div className='submit-button'>
               <button type='submit'>Login</button>
               </div>
               

               
               
               
             </form>
           <div className='forgot-password'>
           <h4>Forgot password</h4> 
           <span onClick={()=> {setisclicked(true)}} 
           className='forgot-password-link'>
             click here</span>
            </div>
     
     
 </div>
 
     <div className='google-login-signin'>
      <h3>Or</h3>
     <button  onClick={(e)=>googleLogin(e)}>
           Sign In with Google <FcGoogle/></button>
     </div>
    
 </div>
  
         }
         
        


      
    
    </div>

    
  )
}

export default LoginPage
