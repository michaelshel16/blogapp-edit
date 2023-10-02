import { createSlice } from "@reduxjs/toolkit";


const initialState = 
{
  
   user:null,
   post:null,
   editPost:null,
   userPosts:[],
   techPosts:[],
   businessPosts:[],
   reviewsPosts:[],
   imageStore:[],
   token:null,
}


 const authSlice = createSlice({

name:"auth",
initialState,
reducers:{

    setTechPosts:(state,action)=>
    {
       state.techPosts = action.payload.techPosts
    },
    setBusinessPosts:(state,action)=>
    {
       state.businessPosts = action.payload.businessPosts
    },
    setReviewsPosts:(state,action)=>
    {
       state.reviewsPosts = action.payload.reviewsPosts
    },
    setimageStore:(state,action)=>
    {
     state.imageStore = action.payload.imageStore
    },
     setLogin:(state,action)=>
    {
      
       
        state.user       = action.payload.user
        state.token      = action.payload.token

    },
    setUserPosts:(state,action)=>
    {
      state.userPosts  = action.payload.userPosts
    },
    setPost:(state,action)=>
    {
       state.post = action.payload.post
    },
    setEditPost:(state,action)=>
    {
      state.editPost = action.payload.editPost
    },
    
    setLogout:(state,action)=>
    {

        state.user       = initialState.user
        state.token      = initialState.token
        state.userPosts  = initialState.userPosts
        state.editPost   = initialState.editPost
    }
}


});

export const 
{setMode,setLogin,setLogout,
   setTechPosts,setBusinessPosts,setUserPosts,
   setReviewsPosts,setPost,setEditPost,setimageStore} = authSlice.actions;

const authReducer = authSlice.reducer

export default authReducer


