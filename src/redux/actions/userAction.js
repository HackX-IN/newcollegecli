import { server } from "../store";

import axios from 'axios';



export const login=(email,password)=>async(dispatch)=>{
    try {
        dispatch({type:"loginRequest"});

        const {data}=await axios.post(`${server}/login`,{email,password},{
            headers:{
                "Content-Type":"application/json",

            },
            withCredentials:true,
        })

        


        dispatch({type:"loginSuccess",payload:data});
        
    } catch (error) {
        dispatch({type:"loginFail",payload:error.response.data.message});
        
    }
}
export const register=formdata=>async(dispatch)=>{
    try {
        dispatch({type:"registerRequest"});

        const {data}=await axios.post(`${server}/register`,formdata,{
            headers:{
                "Content-Type":"multipart/formdata",

            },
            withCredentials:true,
        })

       


        dispatch({type:"registerSuccess",payload:data});
        
    } catch (error) {
        dispatch({type:"registerFail",payload:error.response.data.message});
        
    }
}
export const loadUser=()=>async(dispatch)=>{
    try {
        dispatch({type:"loadUserRequest"});

        const {data}=await axios.get(`${server}/me`,{
         
            withCredentials:true,
        })

       


        dispatch({type:"loadUserSuccess",payload:data.user});
        
    } catch (error) {
        dispatch({type:"loadUserFail",payload:error.response.data.message});
        
    }
}

export const Logout=()=>async(dispatch)=>{
    try {
        dispatch({type:"logoutRequest"});

        const {data}=await axios.get(`${server}/logout`,{
         
            withCredentials:true,
        })

      


        dispatch({type:"logoutSuccess",payload:data.message});
        
    } catch (error) {
        dispatch({type:"logoutFail",payload:error.response.data.message});
        
    }
}



export const BuySubscribe=()=>async(dispatch)=>{
    try {
        dispatch({type:"buySubscribeRequest"});

        const {data}=await axios.get(`${server}/subscribe`,{
            
            withCredentials:true,
        })


        dispatch({type:"buySubscribeSuccess",payload:data.subscriptionId});
        
    } catch (error) {
        dispatch({type:"buySubscribeFail",payload:error.response.data.message});
        
    }
}


export const CancelSubscribe=()=>async(dispatch)=>{
    try {
        dispatch({type:"CancelSubscribeRequest"});

        const {data}=await axios.delete(`${server}/subscribe/cancel`,{
                     withCredentials:true,
      })
    
        dispatch({type:"CancelSubscribeSuccess",payload:data.message});
        
    } catch (error) {
        dispatch({type:"CancelSubscribeFail",payload:error.response.data.message});
        
    }
}


