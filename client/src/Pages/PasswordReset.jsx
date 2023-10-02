import React, { useState } from 'react';
import "./PasswordReset.css";
import { MuiOtpInput } from 'mui-one-time-password-input'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';


const PasswordReset = () => {

   const location                             = useLocation();
   const navigate                             = useNavigate();
   const Otp                                  = location.state.Otp;
   const email                                = location.state.email;
   const [password,setpassword]               = useState("")
   const [otp,setotp]                         = useState('');
   const [verified,setverified]               = useState(false);
   const [passwordCheck,setpasswordCheck]     = useState(true);
   const [newpassword,setnewpassword]         = useState("");
   const [confirmpaswword,setconfirmpassword] = useState("");
   
    

   const handleOtpSubmit = ()=>
   { 
    if(Otp == otp)
    {
      setverified(true)
    }
    else
    {
      setverified(false);
    }
     

   }

   const handlePasswordSubmit = () =>
   { 
     if(confirmpaswword == newpassword)
     {

      axios.patch("http://localhost:4000/blog/v1/passwordreset/user",
      {
        email:email,
        newPassword:password
      })
      .then((res)=>
      {
        if(res.status == 200)
        {
          navigate("/login")
        }
        else
        {
          navigate("/home")
        }
      })
      .catch((error)=>
      {
        console.log(error)
      })
     }
     else
     {
      setpasswordCheck(false)
     }
    
   }
  return (
    <div className='reset-container'>
      {
         verified?
          <div className='set-password'>
            <input placeholder='Enter new password' 
            onChange={(event)=>{setnewpassword(event.target.value)}}/>
            <input placeholder='Confirm password' 
            onChange={(event)=>{setconfirmpassword(event.target.value)}}/>
            
            {Boolean(passwordCheck)?<div>{""}</div>:
              <div>password doesn't match</div>}

              <button onClick={()=>handlePasswordSubmit()}>SUBMIT</button>
            
          </div>:
           <div className='otp-input'>
            <h2>Enter OTP</h2>

           <MuiOtpInput display= 'flex' gap= {3} 
             length={4}
             value={otp}
            className='otp-input-box'
            onChange={(newValue)=>{setotp(newValue)}}  />

           
           <button onClick={()=>handleOtpSubmit()}>SUBMIT</button>
           </div>
      }
      
      
      </div>
      
       

      
      
      
   
  )
}

export default PasswordReset
