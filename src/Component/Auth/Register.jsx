import { Avatar, Box, Button, Container, FormLabel, Heading, Input, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../../redux/actions/userAction'

export const fileupload={
    "&::file-selector-button":{
        cursor:"pointer",marginLeft:"-5%",
        width:"110%",border:"none",height:"100%",
        color:"#ECC94B", backgroundColor:"white"
    } 

}

const Register = () => {
    const imagehandler=(e)=>{
        const file = e.target.files[0];
        const reader=new FileReader();

        reader.readAsDataURL(file)
        reader.onloadend=()=>{
            setImageprev(reader.result)
            setImage(file)
        }

    }

    const dispatch=useDispatch()


    const [name,setName]=useState("")

    const [email,setEmail]=useState("")
const [password,setPassword]=useState("")
const [imageprev,setImageprev]=useState("")
const [image,setImage]=useState("")


const submitHandler=e=>{
    e.preventDefault()
    const myForm=new FormData();

    myForm.append('name',name);
    myForm.append('email',email);
    myForm.append('password',password);
    myForm.append('file',image);

    dispatch(register(myForm));
}

  return (
    <Container h={'98vh'}>
    <VStack h={'full'} justifyContent="center" spacing={'16'}>
        <Heading textTransform={'uppercase'} children={'Registration'}/>

        <form onSubmit={submitHandler} style={{width:'100%'}}>
            <Box my='4' display={'flex'} justifyContent='center' spacing='16'>
                <Avatar src={imageprev} size={'2xl'}/>
            </Box>

        <Box marginY={'4'} >

            <FormLabel htmlFor='name' children={' Name'}/>
            <Input required id='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your Name' type={'text'} focusBorderColor={'yellow.500'}/>


            </Box>
            <Box marginY={'4'}>
            <FormLabel htmlFor='email' children={'Email Address'}/>
            <Input required id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Mail' type={'email'} focusBorderColor={'yellow.500'}/>


            </Box>
            <Box marginY={'4'}>
            <FormLabel htmlFor='password' children={'Password'}/>
            <Input required id='password' value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Enter Your password' type={'password'} focusBorderColor={'yellow.500'}/>

            </Box>
            <Box marginY={'4'}>
            <FormLabel htmlFor='Choose avatar' children={'Avatar'}/>
            <Input accept='image/*' required id='Choose Avatar'   type={'file'} focusBorderColor={'yellow.500'} 
            css={fileupload} onChange={imagehandler} />

            </Box>
           
            <Button my={'4'} colorScheme='yellow' type='submit' ml='40%'>Sign-up</Button>

            <Box my={'4'}>
               Already signup ?{' '}<Link to='/login'><Button colorScheme={'yellow'} variant='link'> Login </Button>{' '}Here</Link>
            </Box>
        </form>
    </VStack>
   </Container>
  )
}

export default Register