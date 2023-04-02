import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import { changePassword } from '../../redux/actions/profile';

const ChangePassword = () => {
    const [oldpassword,setOldPassword]=useState("");
    const [newpassword,setNewPassword]=useState("");

    const dispatch=useDispatch()


    const submitHandler=e=>{
      e.preventDefault()

      dispatch(changePassword(oldpassword,newpassword))

    }

    const {loading,message,error}=useSelector(state =>state.profile)

    useEffect(()=>{

      if(error)
      {
        toast.error(error)
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message)
        dispatch({type:"clearMessage"})
      }

    },[dispatch,error,message])


  return (
   <Container py={'16'} minH={"90vh"}>
    <form onSubmit={submitHandler}>

        <Heading children="Change Password" textAlign={["center",'left']} my="16" textTransform={'uppercase'}/>
        <VStack spacing={'8'}>


        <Input required id='password' value={oldpassword} onChange={(e)=>setOldPassword(e.target.value)} placeholder='Enter Old password' type={'password'} focusBorderColor={'yellow.500'}/>

        <Input required id='password' value={newpassword} onChange={(e)=>setNewPassword(e.target.value)} placeholder='Enter New password' type={'password'} focusBorderColor={'yellow.500'}/>

<Button isLoading={loading} w={'full'} colorScheme="yellow" type='submit'>Change </Button>

        </VStack>


    </form>

   </Container>
  )
}

export default ChangePassword