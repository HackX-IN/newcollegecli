import { Box, Button, Container, FormLabel, Heading, Input, Textarea, VStack } from '@chakra-ui/react'
import{ React,useEffect,useState} from 'react'
import { Link } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { CourseRequest } from '../../redux/actions/other'
import { toast } from 'react-hot-toast'

const Request = () => {
    const [name,setName]=useState('')
    const [email,setEmail]=useState('')
    const [course,setCourse]=useState('')
    
    const dispatch=useDispatch()

    const {loading,error,message:smessage }=useSelector(state=>state.other)



    const SubmitHandler=(e)=>{
        e.preventDefault()
        dispatch(CourseRequest(name,email,course))

    }

    useEffect(()=>{
      if(error){
         toast.error(error)
         dispatch({type:'clearError'})
       }
   
       if(smessage){
         toast.success(smessage)
         dispatch({type:'clearMessage'})
       }
  

   },[dispatch,error,smessage])







  return (
    <Container h={'90vh'}>
    <VStack h={'full'} justifyContent='center' spacing={'16'}>
        <Heading children='Request New Course'/>
        <form onSubmit={SubmitHandler} style={{width:'100%'}}>
        <Box marginY={'4'}>
            <FormLabel htmlFor='name' children={'Name'}/>
            <Input required id='name' value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter Your name' type={'text'} focusBorderColor={'yellow.500'}/>


            </Box>
            <Box marginY={'4'}>
            <FormLabel htmlFor='email' children={'Email Address'}/>
            <Input required id='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter Your Mail' type={'email'} focusBorderColor={'yellow.500'}/>


            </Box>
            <Box marginY={'4'}>
            <FormLabel htmlFor='course' children={'course'}/>
            <Textarea required id='course' value={course} onChange={(e)=>setCourse(e.target.value)} placeholder='Explain the Course.... ' focusBorderColor={'yellow.500'}/>

            </Box>
           
            <Button isLoading={loading} my={'4'} colorScheme='yellow' type='submit'>Send Request</Button>

            <Box my={'4'}>
              See Available Course!{' '}<Link to='/course'><Button colorScheme={'yellow'} variant='link'> Click </Button>{' '}Here</Link>
            </Box>
        </form>
    </VStack>

   </Container>
  )
}

export default Request