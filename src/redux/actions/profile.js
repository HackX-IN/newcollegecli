import { server } from "../store";

import axios from 'axios';


export const updateProfile=(name,email)=>async(dispatch)=>{
    try {
        dispatch({type:"updateProfileRequest"})


      const {data} =  await axios.put(`${server}/updateprofile`,{
        name,email,
      },
      {headers:{
        "Content-Type":"application/json",

    },
    withCredentials:true,
}
      )

        dispatch({type:"updateProfileSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"updateProfileFail",payload:error.response.data.message
    })
        
    }

}



export const updateProfilePic=(formdata)=>async(dispatch)=>{
    try {
        dispatch({type:"updateProfilepictureRequest"})


      const {data} =  await axios.put(`${server}/updateprofilepicture`,formdata,
       
      {headers:{
        "Content-Type":"multipart/form-data",

    },
    withCredentials:true,
}
      )

        dispatch({type:"updateProfilepictureSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"updateProfilepictureFail",payload:error.response.data.message
    })
        
    }

}


export const changePassword=(oldpassword,newpassword)=>async dispatch=>{
    try {
        
        dispatch({type:"changePasswordRequest"})


      const {data} =  await axios.put(`${server}/changepassword`,{
        oldpassword,newpassword,
      },
      {headers:{
        "Content-Type":"application/json",

    },
    withCredentials:true,
}
      )

        dispatch({type:"changePasswordSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"changePasswordFail",payload:error.response.data.message
    })
        
    }

}
export const forgetPassword=email=>async dispatch=>{
    try {
        
        dispatch({type:"forgetPasswordRequest"})


      const {data} =  await axios.post(`${server}/forgetpassword`,{
       email,
      },
      {headers:{
        "Content-Type":"application/json",

    },
    withCredentials:true,
}
      )

        dispatch({type:"forgetPasswordSuccess",payload:data.message})
        
    } catch (error) {
        dispatch({type:"forgetPasswordFail",payload:error.response.data.message
    })
        
    }

}

export const resetPassword=(token,password)=>async dispatch=>{
  try {
      
 dispatch({type:"resetPasswordRequest"})

    const {data} =  await axios.put(`${server}/resetpassword/${token}`,{
      password,
    },

    {headers:{
      "Content-Type":"application/json",

  },
  withCredentials:true,
}
    )

      dispatch({type:"resetPasswordSuccess",payload:data.message})
      
  } catch (error) {
      dispatch({type:"resetPasswordFail",payload:error.response.data.message
  })
      
  }

}

export const AddtoPlaylist= id =>async dispatch=>{
  try {
      
 dispatch({type:"AddtoPlaylistRequest"})

    const {data} =  await axios.post(`${server}/addtoplaylist`,
    {
      id,
    },


    {headers:{
      "Content-Type":"application/json",

  },
  withCredentials:true,
}
    )

      dispatch({type:"AddtoPlaylistSuccees",payload:data.message})
      
  } catch (error) {
      dispatch({type:"AddtoPlaylistFail",payload:error.response.data.message
  })
      
  }

}

export const RemoveFromPlaylist=id=>async dispatch=>{
  try {
      
 dispatch({type:"removeFromPlayistRequest"})

    const {data} =  await axios.delete(`${server}/removefromplaylist?id=${id}`,
    {
      withCredentials:true
    },
      
    )

      dispatch({type:"removeFromPlayistSuccees",payload:data.message})
      
  } catch (error) {
      dispatch({type:"removeFromPlayistFail",payload:error.response.data.message
  })
      
  }

}

