import {  Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import { forgetPassword } from '../../redux/actions/profile'

const Forgetpass = () => {
    const[email,setEmail]=useState('')


    const {loading,message,error}=useSelector(state=>state.profile)

    const dispatch=useDispatch();
    const submitHandler=e=>{
      e.preventDefault();

      dispatch(forgetPassword(email));
     
    }
    useEffect(()=>{
      if(error){
        toast.error(error);
        dispatch({type:"clearError"})
      }
      if(message){
        toast.success(message);
        dispatch({type:"clearMessage"})
      }

    },[dispatch,error,message])
  return (
    <Container py={'16'} h='90vh'>
        <form onSubmit={submitHandler}>
            <Heading children='Forget Password' my={'14'} textTransform='upper-case' textAlign={['center','left']}/>
            <VStack spacing={'8'}>
            
            <FormLabel htmlFor='email' children={'Email Address'}/>
            <Input required id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Mail' type={'email'} focusBorderColor={'yellow.500'}/>

            <Button isLoading={loading} type='submit' w={'full'} colorScheme={'yellow'}>Send Reset Link</Button>


            </VStack>




        </form>

    </Container>
  )
}

export default Forgetpass