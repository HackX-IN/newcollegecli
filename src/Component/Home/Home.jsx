import React from 'react'
import { Heading, Stack, VStack,Text, Button,Image, Box, HStack } from '@chakra-ui/react'
import './Home.css'
import { Link } from 'react-router-dom';
import logo from '../Assets/images/default.png';
import {CgGoogle,CgYoutube} from 'react-icons/cg'
import {SiUdemy,SiCoursera}from "react-icons/si"
import {DiAws} from "react-icons/di";
import intro from '../Assets/Videos/new college.mp4';


export const Home = () => {
  return (
    <section className='home'>

        <div className='container'>

        <Stack
        direction={["column","row"]}
        height="100%"
        justifyContent={["center","space-between"]}
        alignItems="center"
        spacing={["16","56"]}
        >
<VStack width={"full"} alignItems={['center' , 'flex-end']} spacing='8'>
    <Heading style={{texttransform:"UPPERCASE"}} children="Learn From The Experts" size={'2xl'}/>
    <Text textAlign={['center','left']} fontFamily='cursive' fontSize={'2xl'} children="Learn a valueable Content From The Best Staff" />
    <Link to="/course">
        <Button size={'lg'} colorScheme='yellow'>
            Explore Now
        </Button>
    </Link>

</VStack>

<Image  className='vector-gray' boxSize={"md"} src={logo} objectFit="contain"/>




       </Stack>

        </div>
        <Box padding={'8'} bg="blackAlpha.800">
            <Heading textAlign={"center"} fontFamily="body" color={"yellow.400"} children="OUR BRANDS"/>
            <HStack className='logos' justifyContent={"space-evenly"} marginTop='4'>
                <CgGoogle/>
                <CgYoutube/>
                <SiCoursera/>
                <SiUdemy/>
                <DiAws/>
            </HStack>
        </Box>
        <div className="container2">
            <video className='vd1' autoPlay={true} loop controls controlsList='nodownload noplayback nofullscreen' src={intro}>
            </video>


        </div>
    </section>

  )
}
