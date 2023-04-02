import { Box, Grid, Heading, Text, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux'
import {Navigate, useParams} from 'react-router-dom';
import { getAllLectures } from '../../redux/actions/course';
import Loader from '../Layout/Loader';

const CoursePage = ({user}) => {

    (function(d, m){
        var kommunicateSettings = 
            {"appId":"759db1e09799cbda4af53ab2ff4ef226","popupWidget":true,"automaticChatOpenOnNavigation":true};
        var s = document.createElement("script"); s.type = "text/javascript"; s.async = true;
        s.src = "https://widget.kommunicate.io/v2/kommunicate.app";
        var h = document.getElementsByTagName("head")[0]; h.appendChild(s);
        window.kommunicate = m; m._globals = kommunicateSettings;
    })(document, window.kommunicate || {});
   
    const [lectureNumber,setLectureNumber]=useState(0)

    const {lectures,loading}=useSelector(state=>state.course)

    




const dispatch=useDispatch()
const params=useParams()

useEffect(()=>{
    dispatch(getAllLectures(params.id))



},[dispatch,params.id])


if(user.role!=="admin" && user.role !=='newian'  && (user.subscription ===undefined || user.subscription.status !== "active")){


    return <Navigate to = {'/subscribe'} />
    
}










  return (
    loading?<Loader/> :(
        <Grid mt={'4rem'} minH={"90vh"} templateColumns={['1fr','3fr 1fr']} ml={'4.3rem'}>
            {
                lectures && lectures.length>0 ?(
                    <>
                    <Box>
    <video width={"100%"} className='vd1' autoPlay={true} controls controlsList='nodownload noplayback' src={lectures[lectureNumber].video.url}>
     </video>

     <Heading m={'4'} children={`#${lectureNumber+1} ${lectures[lectureNumber].title}`}/>

     <Heading m={'4'} children="Description"/>

     <Text m={"4"} children={lectures[lectureNumber].description}/>


    </Box>

    <VStack>

        {
            lectures.map((item,index)=>(
                <button onClick={()=>setLectureNumber(index)} key={item._id} style={{width:"100%",padding:"1rem",textAlign:"center",margin:'0',borderBottom:'1px solid rgba(0,0,0,0.2)'}}>
                    <Text noOfLines={'1'}>
                        #{index+1} {item.title}
                    </Text>
                </button>
                

            ))
        }
    </VStack>

                    </>
                ):
                <Heading textAlign={'center'} alignItems={'center'} ml={'15%'}  children="NO LECTURES FOUND"/>
            }
    
   </Grid>
    )
   
  )
}

export default CoursePage