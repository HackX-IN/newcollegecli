import { Button, Container, Heading, HStack, Input,Stack,Text, VStack,Image, Select } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllcourses } from '../../redux/actions/course'
import { AddtoPlaylist } from '../../redux/actions/profile'
import { loadUser } from '../../redux/actions/userAction'
import './course.css'

const Courses = () => {
    const addtoplaylisthand=(courseId)=>{
        
        dispatch(AddtoPlaylist(courseId),
        dispatch(loadUser()))

    }
    const Course=({views,title,imagesrc,id,addtoplaylisthand,creator,descip,lcc})=>{
        return(
            <VStack className='course1' alignItems={["center","flex-start"]}>
                
                <Image src={`${imagesrc}`} boxSize='60' objectFit={'contain'}  />
                <Heading textAlign={['center','left']} maxW='200px' size={'sm'} fontFamily='sans-serif' noOfLines={3} children={title}/>
                <Text children={descip} noOfLines={2}/>
                <HStack>
                <Text children={'creator'} textTransform='uppercase' fontWeight={'bold'}/>

                <Text children={creator} fontFamily="body" textTransform={'uppercase'}/>


                </HStack>

                <Heading textAlign={'center'} size="xs" children={`Lectures ${lcc}` } textTransform={"uppercase"}/>
                <Heading  size="xs" children={`Views ${views}`} textTransform={"uppercase"}/>

                <Stack direction={['column','row']} alignItems='center'>
                    <Link to={`/course/${id}`}>
                        <Button colorScheme={'yellow'}>Watch Now</Button>
                    </Link>
                    <Button variant={'ghost'} colorScheme={'yellow'} onClick={()=>addtoplaylisthand(id)}>Add To Playlist</Button>
                </Stack>

            </VStack>
        )
    }
    const dispatch=useDispatch()
    const [keyword,setKeyword]=useState('')
    const [category,setCategory]=useState('')
    const categories=["Web-Development","Artificial Intelligence" ,"Data Science","Game Development", "Game Development","Software Engineering","Bussiness Analyst","Data Mining"]


    const {loading,courses,error,message}=useSelector(state=>state.course)


    useEffect(()=>{

        dispatch(getAllcourses(category,keyword))
        if(error){
            toast.error(error);
            dispatch({type:"clearError"})
        }
        if(message){
            toast.success(message);
            dispatch({type:"clearMessage"})
        }
      


    },[category,keyword,dispatch,error,message])






  return (
   <Container minW={'95vh'} maxW='container.lg' paddingY={'8'}>
    <Heading children='All Courses' m={'8'}/>

    <Input value={keyword} onChange={(e)=>setKeyword(e.target.value)}
    placeholder="Search A Course..." type={'text'} focusBorderColor="yellow.500"/>
    <HStack justifyContent={'flex-end'} w={'30vh'} overflowX={'auto'} paddingY='8' alignItems={'center'} css={{"&::-webkit-scrollbar":{display:'none'}}}>
        {
            <Select focusBorderColor='purple.300' value={category} onChange={(e)=>setCategory(e.target.value)}>

<option value={""}>Category</option>

{categories.map(item=>(
    <option  value={item}>{item}</option>
))}



</Select>
        }
      


    </HStack>
    <Stack direction={["column","row"]} flexWrap='wrap' justifyContent={['flex-start',"space-evenly"]} alignItems={["center","flex-start"]}>
       {
        courses.length>0? courses.map((item)=>(
            <Course key={item._id} title={item.title} descip={item.descip} views={item.views} imagesrc={item.poster.url} id={item._id} 
            creator={item.createdBy} lcc={item.numOfVideos}
            addtoplaylisthand={addtoplaylisthand} />
        )):
        <Heading opacity={'0.5'} mt="4" textAlign={'center'} alignItems={'center'} color="red.500" children="Course Not Found" />
              }

    </Stack>

   </Container>
  )
}

export default Courses