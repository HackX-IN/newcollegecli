import { Box, Heading, HStack, Stack, VStack } from '@chakra-ui/react'
import React from 'react'
import {TiSocialInstagramCircular,TiSocialLinkedinCircular} from 'react-icons/ti'
import {CgWebsite} from 'react-icons/cg'
import '../style.css'

const Footer = () => {
  return (
   <Box padding={'4'} bg={"#474787"} minH={'18vh'} position={"relative"} >
<Stack direction={['column','row']}>
    <VStack alignItems={['center','flex-start']} width={'100%'}>
        <Heading cursor={'pointer'} children={"All Right Reserved "} color={"white"} size="lg" className='ho'/>

        <Heading  cursor={'pointer'} fontFamily={'body'} size={'sm'} children= '© 2023 Inamul Hasan.'  className='ho' color={"white"}/>


    </VStack>

    <HStack spacing={['2','10']} justifyContent='center'  color={'white'} fontSize='50'>
        <a className='ho'  href='https://www.instagram.com/the.newcollege/' target={'_blank'}>
            <TiSocialInstagramCircular/>
        </a>
        <a  className='ho' href='https://www.linkedin.com/school/thenewcollege/' target={'_blank'}>
            <TiSocialLinkedinCircular
            />
        </a>
        <a className='ho'  href='https://www.thenewcollege.edu.in/' target={'_blank'}>
            <CgWebsite/>
        </a>


    </HStack>
</Stack>

   </Box>
  )
}

export default Footer