import { Button, Container, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from '../../redux/actions/profile';
import { loadUser } from '../../redux/actions/userAction';

const UpdateProfile = ({user}) => {
    const [name,setName]=useState(user.name);
    const [email,setEmail]=useState(user.email);

    const dispatch=useDispatch()
    const navigate=useNavigate();

    const {loading}=useSelector(state=>state.profile)


    const submitHandler= async e =>{
      e.preventDefault()

      await dispatch(updateProfile(name,email))

      dispatch(loadUser())
      navigate('/profile')

    }

  return (
    <Container py={'16'} minH={"90vh"}>
    <form onSubmit={submitHandler}>

        <Heading children="Change Profile" textAlign={["center",'left']} my="16" textTransform={'uppercase'}/>
        <VStack spacing={'8'}>


        <Input  id='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder=' Name' type={'text'} focusBorderColor={'yellow.500'}/>
        <Input  id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder=' Email' type={'email'} focusBorderColor={'yellow.500'}/>

        
<Button isLoading={loading} w={'full'} colorScheme="yellow" type='submit'>Update Profile </Button>

        </VStack>


    </form>

   </Container>
   
  )
}

export default UpdateProfile