import {Box,  ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Button, Grid, Heading, HStack, Image, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { GiCancel } from 'react-icons/gi'
import { RiDeleteBin7Fill } from 'react-icons/ri'
import { TiWarning } from 'react-icons/ti'
import { useDispatch, useSelector } from 'react-redux';
import cursor from '../../Assets/images/cursor.ico';
import Sidebar from '../Sidebar';
import CModal from './CModal';
import { Link } from 'react-router-dom'
import {getAllcourses, getAllLectures} from '../../../redux/actions/course'
import { addLectures, deleteCourse, deleteLectures } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';

const AdminCourses = () => {

   const{isOpen,onClose,onOpen}=useDisclosure();

   const dispatch=useDispatch();


   const[courseId,setCourseId]=useState("")
   const[courseTitle,setCourseTitle]=useState("")
   

   const {courses,lectures}=useSelector(state=>state.course)
   const {loading,error,message}=useSelector(state=>state.admin)

   const coursedetailshandler=(courseId,title)=>{
      dispatch(getAllLectures(courseId))
     onOpen();
     setCourseId(courseId)
     setCourseTitle(title)


   }
   const deleteHandler=(courseId)=>{
      dispatch(deleteCourse(courseId))


      console.log(courseId);
   }
   const deleteLectureButtonHandler=async(courseId,lectureId)=>{

      await dispatch(deleteLectures(courseId,lectureId))
      dispatch(getAllLectures(courseId))



      
      
   
   };
   const addLecturehand=async(e,courseId,title,description,video)=>{

      e.preventDefault()
   const myForm=new FormData();

    myForm.append('title',title);
    myForm.append('description',description);
  
    myForm.append('file',video);

   await dispatch(addLectures(myForm,courseId));
   dispatch(getAllLectures(courseId))

}

   useEffect(()=>{
      if(error){
         toast.error(error)
         dispatch({type:'clearError'})
       }
   
       if(message){
         toast.success(message)
         dispatch({type:'clearMessage'})
       }
   

      dispatch(getAllcourses())

   },[dispatch,error,message])


  return (
 <Grid css={{
    cursor:`url(${cursor}),default`,
 }} minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>

    <Box p={['0','8']} overflowX={'auto'}>
    <Heading textTransform={'uppercase'} children="All Users" my={'16'} textAlign={['center','left']} />
    <TableContainer w={['100vw','full']}>
      <Table variant={'simple'} size='lg'>

         <TableCaption>All Availables Courses In DB</TableCaption>

         <Thead>
            <Tr>
               <Th>Id</Th>
               <Th>Poster</Th>
               <Th>Title</Th>
               <Th>Category</Th>
               <Th>Creator</Th>
               <Th isNumeric>Views</Th>
               <Th isNumeric>Lectures</Th>
               <Th isNumeric>Action</Th>
            </Tr>
         </Thead>

         <Tbody>

            {
               courses.map(item=>(
                  <Row coursedetailshandler={coursedetailshandler} deleteHandler={deleteHandler} key={item._id} item={item}
                  loading={loading}/>

               ))
            }

          
         </Tbody>

      </Table>

    </TableContainer>

    <CModal isOpen={isOpen} onClose={onClose} deleteButtonHandler={deleteLectureButtonHandler} 
    id={courseId} courseTitle={courseTitle}
    addLecturehand={addLecturehand} lectures={lectures} loading={loading}/>

    </Box>
<Sidebar/>

 </Grid>
  )
}



function Row({item,coursedetailshandler,deleteHandler,loading}){


   const { isOpen, onToggle, onClose } = useDisclosure()
   return(
      <Tr>
         <Td>{item._id}</Td>
         <Td>
            <Image src={item.poster.url}/>
         </Td>
         <Td>{item.title}</Td>
         <Td textTransform={'uppercase'}>{item.category}</Td>
         <Td>{item.createdBy}</Td>
         <Td isNumeric>{item.views}</Td>
         <Td isNumeric>{item.numOfVideos}</Td>
        
         <Td isNumeric>
            <HStack justifyContent={'flex-end'}>
               <Button isLoading={loading} onClick={()=>coursedetailshandler(item._id,item.title)} variant={'outline'} color='purple.500'>View Lecture</Button>
               <Button  mr={5} onClick={onToggle} className='ho'>
               <RiDeleteBin7Fill/></Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='left'
        closeOnBlur={false}
        
      >
        <PopoverTrigger   >
          <Button colorScheme='red'><TiWarning /></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'></PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete?
          </PopoverBody>
          <PopoverFooter
           display='flex' justifyContent='flex-end'>
            <ButtonGroup  size='sm'>
               <Link to="/admin/dashboard">
              <Button variant='outline'><GiCancel /></Button></Link>
              <Button isLoading={loading} onClick={()=>deleteHandler(item._id)} color={'purple.600'}>
                  <RiDeleteBin7Fill/>
               </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
               
            

            </HStack>

         </Td>
      </Tr>
   )
}
export default AdminCourses