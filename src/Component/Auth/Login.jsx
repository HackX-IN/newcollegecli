import { Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../redux/actions/userAction'

const Login = () => {
const [email,setEmail]=useState("")
const [password,setPassword]=useState("")

const dispatch=useDispatch()

const submitHandler=(e)=>{

    e.preventDefault();
    dispatch(login(email,password))

}

  return (
   <Container h={'95vh'}>
    <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading children={'Welcome to New College Course'}/>

        <form onSubmit={submitHandler} style={{width:'100%'}}>
            <Box marginY={'4'}>
            <FormLabel htmlFor='email' children={'Email Address'}/>
            <Input required id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Mail' type={'email'} focusBorderColor={'yellow.500'}/>


            </Box>
            <Box marginY={'4'}>
            <FormLabel htmlFor='Password' children={'Password'}/>
            <Input required id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your password' type={'password'} focusBorderColor={'yellow.500'}/>

            </Box>
            <Box>
                <Link to='/forgetpassword'><Button fontSize={'sm'} variant='link' color={'red.300'}>forget password?</Button></Link>
            </Box>
            <Button my={'4'} colorScheme='yellow' type='submit' alignItems={'center'} ml='45%' justifyContent={'center'} >Login</Button>

            <Box my={'4'}>
                New User ?{' '}<Link to='/signup'><Button colorScheme={'yellow'} variant='link'> Sign-Up </Button>{' '}Here</Link>
            </Box>
        </form>

    </VStack>
   </Container>
  )
}

export default Login