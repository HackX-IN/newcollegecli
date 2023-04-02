import {  Alert, Box, Button, ButtonGroup, Grid, Heading, HStack, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../Assets/images/cursor.ico';
import Sidebar from '../Sidebar';
import {useDispatch, useSelector} from 'react-redux'
import { deleteUserRole, getAllUsers, updateUserRole } from '../../../redux/actions/admin';
import { toast } from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import {GiCancel} from 'react-icons/gi'
import {TiWarning } from 'react-icons/ti'


const Users = () => {


   const {users,loading,error,message}=useSelector(state=>state.admin)

  

   const dispatch=useDispatch()

   const updateHandler=(userId)=>{

      dispatch(updateUserRole(userId))
    

   }


   const deleteHandler=(userId)=>{

         dispatch(deleteUserRole(userId))
   
    
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
   

      dispatch(getAllUsers())



   },[dispatch,error,message])


  return (
 <Grid css={{
    cursor:`url(${cursor}),default`,
 }} minH={'100vh'} templateColumns={['1fr','5fr 1fr']}>

<Box p={['0','16']} overflowX={'auto'}>
    <Heading textTransform={'uppercase'} children="All Users" my={'16'} textAlign={['center','left']} />
    <TableContainer w={['100vw','full']}>
      <Table variant={'simple'} size='lg'>

         <TableCaption>All Availables Users In DB</TableCaption>

         <Thead>
            <Tr>
               <Th>Id</Th>
               <Th>Name</Th>
               <Th>Email</Th>
               <Th>Role</Th>
               <Th>Subscripation</Th>
               <Th isNumeric>Action</Th>
            </Tr>
         </Thead>

         <Tbody>
            {
              users && users.map((item)=>(
                  <Row updateHandler={updateHandler} deleteHandler={deleteHandler} key={item._id} item={item} loading={loading}/>

               ))
            }

         
         </Tbody>



      </Table>

    </TableContainer>



    </Box>



<Sidebar/>

 </Grid>
  )
}

export default Users

function Row({item,updateHandler,deleteHandler,loading}){

   const { isOpen, onToggle, onClose } = useDisclosure()
   return(
      
      <Tr>
         <Td>{item._id}</Td>
         <Td>{item.name}</Td>
         <Td>{item.email}</Td>
         <Td>{item.role}</Td>
         <Td>{item.subscription && item.subscription.status==='active'?'Active':'Not Active'}</Td>
         <Td isNumeric>
            <HStack justifyContent={'flex-end'}>
               <Button onClick={()=>updateHandler(item._id)} isLoading={loading} variant={'outline'} color='purple.500'>Change role</Button>



               <Button mr={5} onClick={onToggle}>
               <RiDeleteBin7Fill/></Button>
      <Popover
        returnFocusOnClose={false}
        isOpen={isOpen}
        onClose={onClose}
        placement='left'
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button colorScheme='transparent'><TiWarning/></Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight='semibold'></PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete this User?
          </PopoverBody>
          <PopoverFooter
           display='flex' justifyContent='flex-end'>
            <ButtonGroup size='sm'>
               <Link to="/admin/dashboard">
              <Button variant='outline'><GiCancel /></Button></Link>
              <Button onClick={()=>deleteHandler(item._id)} isLoading={loading} color={'purple.600'}>
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