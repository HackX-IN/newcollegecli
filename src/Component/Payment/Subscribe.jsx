import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BuySubscribe } from '../../redux/actions/userAction'
import { server } from '../../redux/store'
import {toast} from 'react-hot-toast';
import logo from "../Assets/images/bg.png"

const Subscribe = ({user}) => {

  const dispatch=useDispatch()

  const [key,setKey]=useState("")

  const {loading,error,subscriptionId}=useSelector(state=>state.subscription)
  const {error:serror}=useSelector(state=>state.course)


  const subscribeHandler=async()=>{

   const {data }= await axios.get(`${server}/razorpaykey`)

   setKey(data.key);

   dispatch(BuySubscribe())

  }

  useEffect((e)=>{
    if(error){
      toast.error(error)
      dispatch({type:"clearError"})
    }
    if(serror){
      toast.error(serror)
      dispatch({type:"clearError"})
    }

    if(subscriptionId){
      console.log(subscriptionId);
      const openPop=()=>{

        const options={

          key,
          name:"NCC COURSE",
          description:"Get Access To All Premium Content",
          image:logo,
          subscription_id:subscriptionId,
          callback_url:`${server}/paymentverification`,
          prefill:{
            name:user.name,
            email:user.email,
            contact:""
          },
          notes:{
            address:"The New College,Chennai"
          },
          theme:{
            color:"#FFC800"
          }

        }
        const razor=new window.Razorpay(options)
        razor.open();



      }
      openPop()
      e.preventDefault();
    }


  },[dispatch,error,key,subscriptionId,user.name,user.email,serror])



  return (
    <Container h={'90vh'} padding='16'>

     <Heading children='Welcome' my={'8'} textAlign='center'/>

     <VStack boxShadow={'lg'} alignItems='stretch' borderRadius={'lg'} spacing='0'>
      <Box bg={'yellow.400'} p='4' css={{borderRadius:"8px 8px 0 0"}}>
        <Text color={'black'} children= {`Pro Pack -₹199`}/>

      </Box>
      <Box p={'4'}>
        <VStack textAlign={'center'} px="8" mt={'4'} spacing='8'>
          <Text children={`Join Pro Pack and get access to all Content`} />
          <Heading size={'md'} children={"₹199 Only/-"}/>
        </VStack>
        <Button onClick={subscribeHandler} isLoading={loading} my={'8'} w="full" colorScheme={'yellow'}>Buy Now</Button>

      </Box>

      <Box bg={"blackAlpha.600"} p="4" css={{borderRadius:"0 0 8px 8px"}}>
        <Heading color={'white'} children="100% Refund On Cancellation" textTransform={"uppercase"} size="sm"/>
        <Text fontSize={'xs'} children={"*Terms and condition Apply" } color="white"/>

      </Box>

     </VStack>

    </Container>
  )
}

export default Subscribe