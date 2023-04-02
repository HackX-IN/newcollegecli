import { server } from "../store";

import axios from 'axios';


export const getAllcourses=(category="",keyword="")=>async(dispatch)=>{
    try {
        dispatch({type:"aIR"})


      const {data} =  await axios.get(`${server}/courses?keyword=${keyword}&category=${category}`,
    
      )

        dispatch({type:"aIS",payload:data.courses})
        
    } catch (error) {
        dispatch({type:"aIF",payload:error.response.data.message
    })
        
    }

}


export const getAllLectures=id=>async(dispatch)=>{
    try {
        dispatch({type:"getCourseR"})


      const {data} =  await axios.get(`${server}/course/${id}`,
      {
        withCredentials:true,
      }
    
      )

        dispatch({type:"getCourseS",payload:data.lectures})
        
    } catch (error) {
        dispatch({type:"getCourseF",payload:error.response.data.message
    })
        
    }

}